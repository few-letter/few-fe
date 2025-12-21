"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getGroupsOptions } from "@/shared/remotes";

export const useGroups = (date: string) => {
  const options = getGroupsOptions(date);
  const { data } = useSuspenseQuery(options);

  return data.data.groups;
};
