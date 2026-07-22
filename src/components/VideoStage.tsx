import { useEffect, useRef, useState } from 'react';
import useViewportSize from '../hooks/useViewportSize';
import {
  broadcastLayout,
  clampScrubFraction,
  DEFAULT_VIDEO_FRAME,
  FOCUS_SCRUB_FRACTION,
  readFocusScrubFromUrl,
  stageTransform,
  tvAlignmentDebug,
  tvScreenRect,
  type VideoFrameSize,
} from '../lib/tvGeometry';
import TvBroadcast from './TvBroadcast';
import type { SectionId } from '../data/sections';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4';

/** Fraction of the video's duration scrubbed by a full-width mouse sweep. */
const SENSITIVITY = 0.8;

function useTvDebug() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    setEnabled(new URLSearchParams(window.location.search).has('tv-debug'));
  }, []);
  return enabled;
}

function useFocusScrubFraction() {
  const [fraction, setFraction] = useState(() => readFocusScrubFromUrl() ?? FOCUS_SCRUB_FRACTION);
  return [fraction, setFraction] as const;
}

interface VideoStageProps {
  activeSection: SectionId | null;
  onSelectSection: (id: SectionId) => void;
  onExit: () => void;
  photoVisible: boolean;
}

/**
 * Full-screen background stage: the scrubbed video, the profile photo on the
 * TV glass, and the broadcast layer the TV shows in focus mode. Everything
 * shares one transform, so zooming reads as a camera move into a TV that is
 * already displaying the content. Scrubbing is disabled while focused.
 */
export default function VideoStage({
  activeSection,
  onSelectSection,
  onExit,
  photoVisible,
}: VideoStageProps) {
  const focused = activeSection !== null;
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const [scrubFraction, setScrubFraction] = useState(0);
  const [focusZoomReady, setFocusZoomReady] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);
  const [videoFrame, setVideoFrame] = useState<VideoFrameSize>(DEFAULT_VIDEO_FRAME);
  const { width, height } = useViewportSize();
  const tvDebug = useTvDebug();
  const [focusScrubFraction, setFocusScrubFraction] = useFocusScrubFraction();

  const seekVideoToFraction = (fraction: number, onDone: () => void) => {
    const video = videoRef.current;
    const clamped = clampScrubFraction(fraction);
    const targetTime = video?.duration ? clamped * video.duration : 0;
    targetTimeRef.current = targetTime;
    setScrubFraction(clamped);

    if (!video) {
      onDone();
      return () => {};
    }

    const finish = () => {
      setScrubFraction(
        video.duration ? video.currentTime / video.duration : clamped,
      );
      onDone();
    };

    if (Math.abs(video.currentTime - targetTime) < 0.05) {
      finish();
      return () => {};
    }

    const onSeeked = () => {
      video.removeEventListener('seeked', onSeeked);
      finish();
    };

    video.addEventListener('seeked', onSeeked);
    video.currentTime = targetTime;
    return () => video.removeEventListener('seeked', onSeeked);
  };

  // Seek to the forward-facing frame before starting the zoom transform so
  // overlay geometry and the video frame stay in sync.
  useEffect(() => {
    if (!focused) {
      setFocusZoomReady(false);
      return;
    }

    setFocusZoomReady(false);
    return seekVideoToFraction(focusScrubFraction, () => setFocusZoomReady(true));
  }, [focused, focusScrubFraction]);

  // ?tv-debug — arrow keys nudge focus scrub while a section is open.
  useEffect(() => {
    if (!tvDebug || !focused) return;

    const nudge = (delta: number) => {
      setFocusScrubFraction((current) => clampScrubFraction(current + delta));
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        nudge(0.01);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        nudge(-0.01);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [tvDebug, focused, setFocusScrubFraction]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const syncFrameSize = () => {
      if (video.videoWidth > 0 && video.videoHeight > 0) {
        setVideoFrame({ width: video.videoWidth, height: video.videoHeight });
      }
    };

    syncFrameSize();
    video.addEventListener('loadedmetadata', syncFrameSize);
    return () => video.removeEventListener('loadedmetadata', syncFrameSize);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || focused) return;

    let prevX: number | null = null;
    let seeking = false;

    // Seeks are serialized through the `seeked` event so a fast-moving
    // mouse never floods the decoder with seek requests.
    const seekTo = (time: number) => {
      seeking = true;
      video.currentTime = time;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!video.duration) return;
      if (prevX === null) {
        prevX = event.clientX;
        return;
      }
      const delta = event.clientX - prevX;
      prevX = event.clientX;
      const offset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      targetTimeRef.current = Math.min(
        Math.max(targetTimeRef.current + offset, 0),
        video.duration,
      );
      if (!seeking) seekTo(targetTimeRef.current);
    };

    const handleSeeked = () => {
      setScrubFraction(video.duration ? video.currentTime / video.duration : 0);
      if (Math.abs(targetTimeRef.current - video.currentTime) > 0.01) {
        seekTo(targetTimeRef.current);
      } else {
        seeking = false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    video.addEventListener('seeked', handleSeeked);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, [focused]);

  const geometryScrub = focused ? focusScrubFraction : scrubFraction;
  const useFocusGlass = focused;
  const glass = tvScreenRect(width, height, geometryScrub, videoFrame, useFocusGlass);
  const layout = broadcastLayout(width, height, geometryScrub, videoFrame, useFocusGlass);
  const transform =
    focused && focusZoomReady
      ? stageTransform(width, height, geometryScrub, videoFrame)
      : 'none';
  const alignment = tvDebug
    ? tvAlignmentDebug(width, height, scrubFraction, focusScrubFraction, focused, videoFrame)
    : null;

  const broadcast = (
    <TvBroadcast
      activeSection={activeSection}
      onSelectSection={onSelectSection}
      onExit={onExit}
      framed={!layout}
    />
  );

  return (
    <div
      className="fixed inset-0 z-0 origin-top-left transition-transform duration-[800ms] ease-[cubic-bezier(0.33,0,0.15,1)] motion-reduce:transition-none"
      style={{ transform }}
    >
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
      />
      {tvDebug && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute z-[5] border-2 border-red-500 bg-red-500/10"
            style={{
              left: glass.left,
              top: glass.top,
              width: glass.width,
              height: glass.height,
              borderRadius: '5% / 12%',
            }}
          />
          <div className="pointer-events-none fixed bottom-4 left-4 z-[6] max-w-md rounded bg-black/85 px-3 py-2 font-mono text-[10px] leading-relaxed text-white">
            <p className="font-semibold text-red-300">
              {focused
                ? `Focus scrub: ${focusScrubFraction.toFixed(3)} · video t: ${scrubFraction.toFixed(3)}`
                : `Mouse scrub: ${scrubFraction.toFixed(3)}`}
            </p>
            {alignment && (
              <>
                <p className="mt-1 text-white/80">
                  Video frame: {alignment.frame.width}×{alignment.frame.height}
                  {alignment.frameMatchesDefaults ? ' ✓' : ' ⚠ differs from tvGeometry constants'}
                </p>
                <p className="text-white/80">
                  Glass box: {Math.round(alignment.glass.width)}×{Math.round(alignment.glass.height)}px
                  at ({Math.round(alignment.glass.left)}, {Math.round(alignment.glass.top)})
                </p>
              </>
            )}
            <p className="mt-1 text-white/70">
              Red box hugs TV glass? If not → calibrate GLASS_AT_START. If yes but TV
              faces left → raise FOCUS_SCRUB_FRACTION (→ key or ?tv-focus=0.12).
            </p>
            <p className="text-white/60">
              Zoom math only moves/scales — it cannot rotate the TV in the video.
            </p>
          </div>
        </>
      )}
      {!photoFailed && (
        <img
          src="/images/profile.png"
          alt="Saksham Pandey"
          onError={() => setPhotoFailed(true)}
          className={`absolute object-cover transition-opacity duration-500 ${
            photoVisible && !focused ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            left: glass.left,
            top: glass.top,
            width: glass.width,
            height: glass.height,
            borderRadius: '5% / 12%',
          }}
        />
      )}
      {layout ? (
        <div
          className="absolute origin-top-left"
          style={{
            left: layout.left,
            top: layout.top,
            width: layout.width,
            height: layout.height,
            transform: `scale(${layout.scale})`,
          }}
        >
          {broadcast}
        </div>
      ) : (
        <div className="absolute inset-x-3 inset-y-12">{broadcast}</div>
      )}
    </div>
  );
}
