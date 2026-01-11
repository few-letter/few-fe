export enum WorldType {
  LOCAL = "local",
  GLOBAL = "global",
}

export interface World {
  type: WorldType;
  name: string;
  url: string;
}
