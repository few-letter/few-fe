"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getCategoriesOptions } from "@/shared/remotes";

export const useCategories = () => {
  const options = getCategoriesOptions();
  const { data } = useSuspenseQuery(options);

  return data.data;
};
