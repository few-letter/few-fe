import type { CategoryCode } from "../types";

const INDICATOR_TOTAL_WIDTH = 300;
const CATEGORY_CODE_TO_COLOR: Record<CategoryCode, string> = {
  0: "text-badge-pink",
  2: "text-badge-purple",
  4: "text-badge-yellow",
  8: "text-badge-green",
  16: "text-badge-blue",
  32: "text-badge-red",
} as const;

const CATEGORY_CODE_TO_EMOJI: Record<CategoryCode | "all", string> = {
  all: "🔥",
  0: "🔮",
  2: "💻",
  4: "🏡",
  8: "🏛️",
  16: "💰",
  32: "🌎",
} as const;

const MIN_SWIPE_DISTANCE = 50;
const CAROUSEL_GAP = 24;

export {
  INDICATOR_TOTAL_WIDTH,
  CATEGORY_CODE_TO_COLOR,
  CATEGORY_CODE_TO_EMOJI,
  MIN_SWIPE_DISTANCE,
  CAROUSEL_GAP,
};
