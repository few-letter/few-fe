import type { CategoryCode } from "../types";

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

const CATEGORY_CODE_TO_IMAGE: Record<CategoryCode, string | null> = {
  0: "/images/newscard/category0.png",
  2: "/images/newscard/category2.png",
  4: "/images/newscard/category4.png",
  8: "/images/newscard/category8.png",
  16: "/images/newscard/category16.png",
  32: "/images/newscard/category32.png",
} as const;

const MIN_SWIPE_DISTANCE = 50;
const CAROUSEL_GAP = 24;
const INDICATOR_TOTAL_WIDTH = 300;

export {
  INDICATOR_TOTAL_WIDTH,
  CATEGORY_CODE_TO_COLOR,
  CATEGORY_CODE_TO_EMOJI,
  CATEGORY_CODE_TO_IMAGE,
  MIN_SWIPE_DISTANCE,
  CAROUSEL_GAP,
};
