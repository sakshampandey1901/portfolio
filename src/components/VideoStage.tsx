import { useEffect, useRef, useState } from 'react';
import useViewportSize from '../hooks/useViewportSize';
import { broadcastLayout, stageTransform, tvScreenRect } from '../lib/tvGeometry';
import TvBroadcast from './TvBroadcast';
import type { SectionId } from '../data/sections';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4';

/** Fraction of the video's duration scrubbed by a full-width mouse sweep. */
const SENSITIVITY = 0.8;

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
  const [photoFailed, setPhotoFailed] = useState(false);
  const { width, height } = useViewportSize();

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

  const glass = tvScreenRect(width, height, scrubFraction);
  const layout = broadcastLayout(width, height, scrubFraction);
  const transform = focused ? stageTransform(width, height, scrubFraction) : 'none';

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
            borderRadius: '8% / 12%',
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
