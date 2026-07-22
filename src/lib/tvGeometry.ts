export interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

const VIDEO_WIDTH = 3828;
const VIDEO_HEIGHT = 2164;

/** Must match the video element's object-position (70% center). */
const OBJECT_POSITION_X = 0.7;
const OBJECT_POSITION_Y = 0.5;

export interface VideoFrameSize {
  width: number;
  height: number;
}

export const DEFAULT_VIDEO_FRAME: VideoFrameSize = {
  width: VIDEO_WIDTH,
  height: VIDEO_HEIGHT,
};

/**
 * TV glass rect as fractions of the video frame, measured on the first and
 * last frame. The head drifts right as the clip is scrubbed, so callers pass
 * the current scrub fraction and we interpolate between the two keyframes.
 *
 * To re-calibrate from a frame grab (VIDEO_WIDTH × VIDEO_HEIGHT px):
 *   x      = screenLeft   / VIDEO_WIDTH
 *   y      = screenTop    / VIDEO_HEIGHT
 *   width  = screenWidth  / VIDEO_WIDTH
 *   height = screenHeight / VIDEO_HEIGHT
 * Tweak in 0.002–0.005 steps, or use ?tv-debug=1 to show a red calibration box.
 */
const GLASS_AT_START = { x: 0.556, y: 0.262, width: 0.160, height: 0.198 };
const GLASS_AT_END = { x: 0.628, y: 0.248, width: 0.150, height: 0.205 };

/**
 * Glass rect measured on the forward-facing frame (same moment as FOCUS_SCRUB_FRACTION).
 * Focus zoom always uses this — not lerp(START, END), which drifts if the TV rotates
 * faster than the screen position moves. Re-measure on a frame grab once FOCUS_SCRUB
 * is tuned; until then this is seeded from linear interpolation at FOCUS_SCRUB_FRACTION.
 */
function glassAtScrub(t: number) {
  return {
    x: lerp(GLASS_AT_START.x, GLASS_AT_END.x, t),
    y: lerp(GLASS_AT_START.y, GLASS_AT_END.y, t),
    width: lerp(GLASS_AT_START.width, GLASS_AT_END.width, t),
    height: lerp(GLASS_AT_START.height, GLASS_AT_END.height, t),
  };
}

/**
 * Scrub position where the TV faces the camera (0 = first frame, 1 = last).
 * If focus zoom still looks angled left, increase in ~0.02 steps (try 0.08–0.18),
 * then re-measure GLASS_AT_FOCUS on that frame. Live-tune with ?tv-focus=0.12.
 */
export const FOCUS_SCRUB_FRACTION = 0;

let GLASS_AT_FOCUS = glassAtScrub(FOCUS_SCRUB_FRACTION);

export function clampScrubFraction(value: number): number {
  return Math.min(Math.max(value, 0), 1);
}

export function readFocusScrubFromUrl(): number | null {
  if (typeof window === 'undefined') return null;
  const param = new URLSearchParams(window.location.search).get('tv-focus');
  if (param === null) return null;
  const parsed = Number(param);
  return Number.isFinite(parsed) ? clampScrubFraction(parsed) : null;
}

/** Below this viewport width the zoom is skipped and the panel goes full screen. */
export const FOCUS_BREAKPOINT = 768;

const PANEL_VIEWPORT_SHARE = 0.8;
const PANEL_ASPECT =
  (GLASS_AT_START.width * VIDEO_WIDTH) / (GLASS_AT_START.height * VIDEO_HEIGHT);

/** Fine-tune where the focused broadcast panel lands on screen (px). */
const FOCUS_PANEL_NUDGE_X = 0;

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

function objectCoverOffsets(
  vw: number,
  vh: number,
  frameWidth: number,
  frameHeight: number,
) {
  const scale = Math.max(vw / frameWidth, vh / frameHeight);
  const displayedWidth = frameWidth * scale;
  const displayedHeight = frameHeight * scale;
  return {
    scale,
    displayedWidth,
    displayedHeight,
    offsetX: (vw - displayedWidth) * OBJECT_POSITION_X,
    offsetY: (vh - displayedHeight) * OBJECT_POSITION_Y,
  };
}

function glassRectForKeyframe(
  glass: { x: number; y: number; width: number; height: number },
  vw: number,
  vh: number,
  frame: VideoFrameSize,
): Rect {
  const { displayedWidth, displayedHeight, offsetX, offsetY } = objectCoverOffsets(
    vw,
    vh,
    frame.width,
    frame.height,
  );
  return {
    left: offsetX + glass.x * displayedWidth,
    top: offsetY + glass.y * displayedHeight,
    width: glass.width * displayedWidth,
    height: glass.height * displayedHeight,
  };
}

/** Viewport-space rect of the TV glass at the given scrub fraction (0..1). */
export function tvScreenRect(
  vw: number,
  vh: number,
  scrubFraction: number,
  frame: VideoFrameSize = DEFAULT_VIDEO_FRAME,
  useFocusGlass = false,
): Rect {
  const glass = useFocusGlass ? GLASS_AT_FOCUS : glassAtScrub(scrubFraction);
  return glassRectForKeyframe(glass, vw, vh, frame);
}

export interface TvAlignmentDebug {
  frame: VideoFrameSize;
  frameMatchesDefaults: boolean;
  scrubFraction: number;
  focusScrubFraction: number;
  useFocusGlass: boolean;
  glass: Rect;
  glassFraction: { x: number; y: number; width: number; height: number };
  focusPanel: Rect | null;
  objectCover: ReturnType<typeof objectCoverOffsets>;
}

export function tvAlignmentDebug(
  vw: number,
  vh: number,
  scrubFraction: number,
  focusScrubFraction: number,
  focused: boolean,
  frame: VideoFrameSize = DEFAULT_VIDEO_FRAME,
): TvAlignmentDebug {
  const useFocusGlass = focused;
  const glassFraction = focused ? GLASS_AT_FOCUS : glassAtScrub(scrubFraction);
  return {
    frame,
    frameMatchesDefaults:
      frame.width === VIDEO_WIDTH && frame.height === VIDEO_HEIGHT,
    scrubFraction,
    focusScrubFraction,
    useFocusGlass,
    glass: tvScreenRect(vw, vh, scrubFraction, frame, useFocusGlass),
    glassFraction,
    focusPanel: focusPanelRect(vw, vh),
    objectCover: objectCoverOffsets(vw, vh, frame.width, frame.height),
  };
}

/** Where focused TV content sits, or null below the breakpoint. */
export function focusPanelRect(vw: number, vh: number): Rect | null {
  if (vw < FOCUS_BREAKPOINT) return null;
  const width = Math.min(vw * PANEL_VIEWPORT_SHARE, vh * PANEL_VIEWPORT_SHARE * PANEL_ASPECT);
  const height = width / PANEL_ASPECT;
  return {
    left: (vw - width) / 2 + FOCUS_PANEL_NUDGE_X,
    top: (vh - height) / 2,
    width,
    height,
  };
}

function zoomScale(panel: Rect, glass: Rect) {
  return Math.max(panel.width / glass.width, panel.height / glass.height);
}

/** CSS transform that zooms the stage so the TV glass lands on the focus panel. */
export function stageTransform(
  vw: number,
  vh: number,
  scrubFraction: number,
  frame: VideoFrameSize = DEFAULT_VIDEO_FRAME,
): string {
  const panel = focusPanelRect(vw, vh);
  if (!panel) return 'none';
  const glass = tvScreenRect(vw, vh, scrubFraction, frame, true);
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

/**
 * Layout for the broadcast layer that lives inside the stage: content is laid
 * out at full panel size and counter-scaled down onto the glass, so the stage
 * zoom cancels the scale exactly (net 1:1) and text lands crisp on the panel.
 * Null below the breakpoint — the mobile fallback skips the zoom entirely.
 */
export function broadcastLayout(
  vw: number,
  vh: number,
  scrubFraction: number,
  frame: VideoFrameSize = DEFAULT_VIDEO_FRAME,
  useFocusGlass = false,
): BroadcastLayout | null {
  const panel = focusPanelRect(vw, vh);
  if (!panel) return null;
  const glass = tvScreenRect(vw, vh, scrubFraction, frame, useFocusGlass);
  const scale = zoomScale(panel, glass);
  return {
    left: glass.left + glass.width / 2 - panel.width / (2 * scale),
    top: glass.top + glass.height / 2 - panel.height / (2 * scale),
    width: panel.width,
    height: panel.height,
    scale: 1 / scale,
  };
}
