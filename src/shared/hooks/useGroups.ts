"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getGroupsOptions } from "@/shared/remotes";
import type { WorldType } from "@/shared/types";

export const useGroups = (worldType: WorldType) => {
  const options = getGroupsOptions(worldType);
  const { data } = useSuspenseQuery(options);

  return data.data.groups;
};
