import { useEffect, useRef, useState } from 'react';
import useViewportSize from '../hooks/useViewportSize';
import {
  DEFAULT_VIDEO_FRAME,
  FOCUS_IMAGE,
  focusImageStageTransform,
  focusOverlayRect,
  tvScreenRect,
  videoStageTransform,
  type VideoFrameSize,
} from '../lib/tvGeometry';
import TvBroadcast from './TvBroadcast';
import type { SectionId } from '../data/sections';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4';

const SENSITIVITY = 0.8;
const ZOOM_MS = 500;

function useTvDebug() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    setEnabled(new URLSearchParams(window.location.search).has('tv-debug'));
  }, []);
  return enabled;
}

interface VideoStageProps {
  activeSection: SectionId | null;
  onSelectSection: (id: SectionId) => void;
  onExit: () => void;
  photoVisible: boolean;
}

/**
 * Home: mouse-scrubbed background video with optional profile photo on the TV.
 * Focus phase 1 (0–800ms): stage zooms into the video's CRT screen.
 * Focus phase 2 (800ms+): overlay fades in with tv-focus.png and the broadcast.
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
  const [focusImageReady, setFocusImageReady] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);
  const [videoFrame, setVideoFrame] = useState<VideoFrameSize>(DEFAULT_VIDEO_FRAME);
  const { width, height } = useViewportSize();
  const tvDebug = useTvDebug();

  // Preload the focus still so there's no flash when the overlay fades in.
  useEffect(() => {
    const img = new Image();
    img.src = FOCUS_IMAGE.src;
    if (img.complete) {
      setFocusImageReady(true);
      return;
    }
    const onLoad = () => setFocusImageReady(true);
    img.addEventListener('load', onLoad);
    return () => img.removeEventListener('load', onLoad);
  }, []);

  // Read actual video dimensions once available so tvScreenRect is accurate.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const sync = () => {
      if (video.videoWidth > 0 && video.videoHeight > 0) {
        setVideoFrame({ width: video.videoWidth, height: video.videoHeight });
      }
    };
    sync();
    video.addEventListener('loadedmetadata', sync);
    return () => video.removeEventListener('loadedmetadata', sync);
  }, []);

  // On entering focus: seek to frame 0 so the zoom target matches the geometry.
  useEffect(() => {
    if (!focused) return;
    targetTimeRef.current = 0;
    setScrubFraction(0);
    const video = videoRef.current;
    if (video) video.currentTime = 0;
  }, [focused]);

  // Phase 2: reveal the still + broadcast overlay after the zoom completes.
  useEffect(() => {
    if (!focused) {
      setOverlayVisible(false);
      return;
    }
    const timer = window.setTimeout(() => setOverlayVisible(true), ZOOM_MS);
    return () => clearTimeout(timer);
  }, [focused]);

  // Scrub the video with horizontal mouse movement while at home.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || focused) return;

    let prevX: number | null = null;
    let seeking = false;

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

  const scrubGlass = tvScreenRect(width, height, scrubFraction, videoFrame);
  const overlayLayout = focusOverlayRect(width, height);
  const transform = focused ? videoStageTransform(width, height, videoFrame) : 'none';
  const focusImgTransform = focusImageStageTransform(width, height);
  const overlayShown = overlayVisible && focusImageReady;

  const broadcast = (
    <TvBroadcast
      activeSection={activeSection}
      onSelectSection={onSelectSection}
      onExit={onExit}
      framed={false}
    />
  );

  return (
    <>
      {/* Stage: video only — zooms into the CRT on focus (phase 1), hidden once overlay is up. */}
      <div
        className={`fixed inset-0 z-0 origin-top-left transition-transform duration-[800ms] ease-[cubic-bezier(0.33,0,0.15,1)] motion-reduce:transition-none ${
          overlayShown ? 'invisible' : ''
        }`}
        style={{ transform, transitionDuration: `${ZOOM_MS}ms` }}
      >
        <video
          ref={videoRef}
          src={VIDEO_URL}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
        />

        {!photoFailed && !focused && (
          <img
            src="/images/profile.png"
            alt="Saksham Pandey"
            onError={() => setPhotoFailed(true)}
            className={`absolute object-cover transition-opacity duration-500 ${
              photoVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              left: scrubGlass.left,
              top: scrubGlass.top,
              width: scrubGlass.width,
              height: scrubGlass.height,
              borderRadius: '5% / 12%',
            }}
          />
        )}

        {tvDebug && (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute z-[5] border-2 border-red-500 bg-red-500/10"
              style={{
                left: scrubGlass.left,
                top: scrubGlass.top,
                width: scrubGlass.width,
                height: scrubGlass.height,
                borderRadius: '5% / 12%',
              }}
            />
            <div className="pointer-events-none fixed bottom-4 left-4 z-[6] max-w-md rounded bg-black/85 px-3 py-2 font-mono text-[10px] leading-relaxed text-white">
              <p className="font-semibold text-red-300">
                {`Scrub glass · t=${scrubFraction.toFixed(3)}`}
              </p>
              <p className="mt-1 text-white/70">
                Red box should hug the CRT screen on the video.
                Tune GLASS_AT_START / GLASS_AT_END in tvGeometry.ts.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Overlay: tv-focus.png (zoomed to match) + broadcast — fades in after zoom lands (phase 2). */}
      <div
        className={`fixed inset-0 z-[5] transition-opacity duration-500 ${
          overlayShown ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {/* tv-focus.png zoomed so its CRT aligns with the panel the video zoomed into */}
        <div
          className="absolute inset-0 origin-top-left overflow-hidden bg-neutral-900"
          style={{ transform: focusImgTransform }}
        >
          <img
            src={FOCUS_IMAGE.src}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-contain object-center"
          />
        </div>

        {/* Broadcast content sits at the panel rect on top of the zoomed image */}
        <div
          className="absolute"
          style={{
            left: overlayLayout.left,
            top: overlayLayout.top,
            width: overlayLayout.width,
            height: overlayLayout.height,
          }}
        >
          {broadcast}
        </div>
      </div>
    </>
  );
}
