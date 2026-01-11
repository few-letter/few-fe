import { World, WorldType } from "@/shared/types";
import { CLIENT_ROUTES } from "@/shared/constants";

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
