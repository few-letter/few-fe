"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getGroupsOptions } from "@/shared/remotes";
import type { WorldType } from "@/shared/types";

export const useGroups = (worldType: WorldType, date: string) => {
  const options = getGroupsOptions(worldType, date);
  const { data } = useSuspenseQuery(options);

  return data.data.groups;
};
