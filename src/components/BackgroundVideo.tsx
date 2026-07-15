import { useEffect, useRef } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4';

/** Fraction of the video's duration scrubbed by a full-width mouse sweep. */
const SENSITIVITY = 0.8;

/**
 * Full-screen background video scrubbed forward/backward by horizontal
 * mouse movement. Seeks are serialized through the `seeked` event so a
 * fast-moving mouse never floods the decoder with seek requests.
 */
export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let prevX: number | null = null;
    let targetTime = 0;
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
      targetTime = Math.min(Math.max(targetTime + offset, 0), video.duration);
      if (!seeking) seekTo(targetTime);
    };

    const handleSeeked = () => {
      if (Math.abs(targetTime - video.currentTime) > 0.01) {
        seekTo(targetTime);
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
  }, []);

  return (
    <video
      ref={videoRef}
      src={VIDEO_URL}
      muted
      playsInline
      preload="auto"
      className="fixed inset-0 z-0 h-full w-full object-cover object-[70%_center]"
    />
  );
}
