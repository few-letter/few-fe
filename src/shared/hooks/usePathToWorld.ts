"use client";

import { usePathname } from "next/navigation";
import { WorldType } from "@/shared/types";
import { WORLD_TYPES } from "@/shared/constants";

const castToWorldType = (pathName: string): WorldType => {
  const isWorldType = WORLD_TYPES.includes(pathName as WorldType);

  return isWorldType ? (pathName as WorldType) : WorldType.LOCAL;
};

export const usePathToWorld = (): WorldType => {
  const pathname = usePathname();
  const segment = pathname.split("/")[1];

  return castToWorldType(segment);
};
