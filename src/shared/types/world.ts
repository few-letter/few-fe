export enum WorldType {
  LOCAL = "local-news",
  GLOBAL = "global-news",
}

export interface World {
  type: WorldType;
  name: string;
  url: string;
}
