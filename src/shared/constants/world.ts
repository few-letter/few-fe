import { World, WorldType } from "@/shared/types";
import { CLIENT_ROUTES } from "@/shared/constants";
import type { Tab } from "@/shared/components/Tabs";

export const WORLD_TYPES: WorldType[] = Object.values(WorldType);

const LOCAL_WORLD: World = {
  type: WorldType.LOCAL,
  name: "국내 뉴스",
  url: CLIENT_ROUTES.LOCAL,
};

const GLOBAL_WORLD: World = {
  type: WorldType.GLOBAL,
  name: "해외 뉴스",
  url: CLIENT_ROUTES.GLOBAL,
};

export const WORLDS: World[] = [LOCAL_WORLD, GLOBAL_WORLD];

export enum WorldContentType {
  LOCAL = "local-news",
  GLOBAL = "global-news",
}

export const WORLD_TABS: Tab<WorldContentType>[] = [
  { value: WorldContentType.LOCAL, label: LOCAL_WORLD.name },
  { value: WorldContentType.GLOBAL, label: GLOBAL_WORLD.name },
];
