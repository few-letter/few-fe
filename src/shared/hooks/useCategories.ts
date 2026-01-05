"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getCategoriesOptions } from "@/shared/remotes";

import type { WorldType } from "@/shared/types";

export const useCategories = (worldType: WorldType) => {
  const options = getCategoriesOptions(worldType);
  const { data } = useSuspenseQuery(options);

  return data.data;
};
