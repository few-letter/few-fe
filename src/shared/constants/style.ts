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

export { INDICATOR_TOTAL_WIDTH, CATEGORY_CODE_TO_COLOR };
