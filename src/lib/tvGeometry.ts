export interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

const VIDEO_WIDTH = 3828;
const VIDEO_HEIGHT = 2164;

/** Must match the scrub video element's object-position (70% center). */
const VIDEO_OBJECT_POSITION_X = 0.7;
const VIDEO_OBJECT_POSITION_Y = 0.5;

export interface VideoFrameSize {
  width: number;
  height: number;
}

export const DEFAULT_VIDEO_FRAME: VideoFrameSize = {
  width: VIDEO_WIDTH,
  height: VIDEO_HEIGHT,
};

/** Scrub video: TV glass fractions at first and last frame. */
const GLASS_AT_START = { x: 0.556, y: 0.262, width: 0.160, height: 0.198 };
const GLASS_AT_END = { x: 0.628, y: 0.248, width: 0.150, height: 0.205 };

/** Focus still — tight front-facing CRT crop (public/images/tv-focus.png). */
export const FOCUS_IMAGE = {
  src: '/images/tv-focus.png',
  width: 928,
  height: 1024,
  /** Centered crop — this image is a tight portrait, not the wide video frame. */
  objectPositionX: 0.5,
  objectPositionY: 0.5,
  /** CRT screen on the monitor; tune with ?tv-debug=1. */
  glass: { x: 0.14, y: 0.08, width: 0.78, height: 0.54 },
} as const;

const PANEL_VIEWPORT_SHARE = 0.8;
const MOBILE_PANEL_VIEWPORT_SHARE = 0.92;
const MOBILE_BREAKPOINT = 768;

const FOCUS_PANEL_ASPECT =
  (FOCUS_IMAGE.glass.width * FOCUS_IMAGE.width) /
  (FOCUS_IMAGE.glass.height * FOCUS_IMAGE.height);

/** Fine-tune where the focused broadcast panel lands on screen (px). */
const FOCUS_PANEL_NUDGE_X = 0;

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

function objectFitOffsets(
  vw: number,
  vh: number,
  frameWidth: number,
  frameHeight: number,
  objectPositionX: number,
  objectPositionY: number,
  fit: 'cover' | 'contain',
) {
  const scale =
    fit === 'cover'
      ? Math.max(vw / frameWidth, vh / frameHeight)
      : Math.min(vw / frameWidth, vh / frameHeight);
  const displayedWidth = frameWidth * scale;
  const displayedHeight = frameHeight * scale;
  return {
    scale,
    displayedWidth,
    displayedHeight,
    offsetX: (vw - displayedWidth) * objectPositionX,
    offsetY: (vh - displayedHeight) * objectPositionY,
  };
}

function glassRectForKeyframe(
  glass: { x: number; y: number; width: number; height: number },
  vw: number,
  vh: number,
  frame: VideoFrameSize,
  objectPositionX: number,
  objectPositionY: number,
  fit: 'cover' | 'contain',
): Rect {
  const { displayedWidth, displayedHeight, offsetX, offsetY } = objectFitOffsets(
    vw,
    vh,
    frame.width,
    frame.height,
    objectPositionX,
    objectPositionY,
    fit,
  );
  return {
    left: offsetX + glass.x * displayedWidth,
    top: offsetY + glass.y * displayedHeight,
    width: glass.width * displayedWidth,
    height: glass.height * displayedHeight,
  };
}

function glassAtScrub(t: number) {
  return {
    x: lerp(GLASS_AT_START.x, GLASS_AT_END.x, t),
    y: lerp(GLASS_AT_START.y, GLASS_AT_END.y, t),
    width: lerp(GLASS_AT_START.width, GLASS_AT_END.width, t),
    height: lerp(GLASS_AT_START.height, GLASS_AT_END.height, t),
  };
}

/** Viewport-space TV glass while scrubbing the background video. */
export function tvScreenRect(
  vw: number,
  vh: number,
  scrubFraction: number,
  frame: VideoFrameSize = DEFAULT_VIDEO_FRAME,
): Rect {
  return glassRectForKeyframe(
    glassAtScrub(scrubFraction),
    vw,
    vh,
    frame,
    VIDEO_OBJECT_POSITION_X,
    VIDEO_OBJECT_POSITION_Y,
    'cover',
  );
}

/** Viewport-space CRT screen on the focus still image (matches object-contain). */
export function focusImageScreenRect(vw: number, vh: number): Rect {
  return glassRectForKeyframe(
    FOCUS_IMAGE.glass,
    vw,
    vh,
    { width: FOCUS_IMAGE.width, height: FOCUS_IMAGE.height },
    FOCUS_IMAGE.objectPositionX,
    FOCUS_IMAGE.objectPositionY,
    'contain',
  );
}

function focusPanelRect(vw: number, vh: number, panelAspect: number): Rect {
  const isMobile = vw < MOBILE_BREAKPOINT;
  const share = isMobile ? MOBILE_PANEL_VIEWPORT_SHARE : PANEL_VIEWPORT_SHARE;
  const width = Math.min(vw * share, vh * share * panelAspect);
  const height = width / panelAspect;
  return {
    left: (vw - width) / 2 + (isMobile ? 0 : FOCUS_PANEL_NUDGE_X),
    top: (vh - height) / 2,
    width,
    height,
  };
}

function zoomScale(panel: Rect, glass: Rect) {
  return Math.max(panel.width / glass.width, panel.height / glass.height);
}

/** Zoom the focus still so the CRT screen lands on the centered panel. */
export function focusImageStageTransform(vw: number, vh: number): string {
  const panel = focusPanelRect(vw, vh, FOCUS_PANEL_ASPECT);
  const glass = focusImageScreenRect(vw, vh);
  const scale = zoomScale(panel, glass);
  const tx = panel.left + panel.width / 2 - (glass.left + glass.width / 2) * scale;
  const ty = panel.top + panel.height / 2 - (glass.top + glass.height / 2) * scale;
  return `translate(${tx}px, ${ty}px) scale(${scale})`;
}

export interface BroadcastLayout {
  left: number;
  top: number;
  width: number;
  height: number;
  scale: number;
}

/** Counter-scaled broadcast layer on the focus still's CRT screen. */
export function focusImageBroadcastLayout(vw: number, vh: number): BroadcastLayout {
  const panel = focusPanelRect(vw, vh, FOCUS_PANEL_ASPECT);
  const glass = focusImageScreenRect(vw, vh);
  const scale = zoomScale(panel, glass);
  return {
    left: glass.left + glass.width / 2 - panel.width / (2 * scale),
    top: glass.top + glass.height / 2 - panel.height / (2 * scale),
    width: panel.width,
    height: panel.height,
    scale: 1 / scale,
  };
}

/**
 * Zoom the scrub video (at frame 0) so its CRT glass lands on the focus panel.
 * Used for phase 1 of the focus transition — the zoom happens on the live video.
 */
export function videoStageTransform(
  vw: number,
  vh: number,
  frame: VideoFrameSize = DEFAULT_VIDEO_FRAME,
): string {
  const panel = focusPanelRect(vw, vh, FOCUS_PANEL_ASPECT);
  const glass = tvScreenRect(vw, vh, 0, frame);
  const scale = zoomScale(panel, glass);
  const tx = panel.left + panel.width / 2 - (glass.left + glass.width / 2) * scale;
  const ty = panel.top + panel.height / 2 - (glass.top + glass.height / 2) * scale;
  return `translate(${tx}px, ${ty}px) scale(${scale})`;
}

/**
 * The focus panel rect in viewport coordinates — used to position the broadcast
 * inside the overlay (which sits outside the zoomed stage, so no counter-scale needed).
 */
export function focusOverlayRect(vw: number, vh: number): Rect {
  return focusPanelRect(vw, vh, FOCUS_PANEL_ASPECT);
}
