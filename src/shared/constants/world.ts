import type { WorldType } from "@/shared/types";

interface World {
  type: WorldType;
  name: string;
  url: string;
}

export const WORLDS: World[] = [
  {
    type: "local",
    name: "국내 뉴스",
    url: "/local",
  },
  {
    type: "global",
    name: "해외 뉴스",
    url: "/global",
  },
];
