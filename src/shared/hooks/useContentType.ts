"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getContentTypesOptions } from "@/shared/remotes";
import { WorldType } from "@/shared/types";
import type { CodeValueResponse } from "@/shared/types";

export const useContentType = (worldType: WorldType) => {
  const options = getContentTypesOptions();
  const { data } = useSuspenseQuery(options);
  const currentContentType = data.find((item: CodeValueResponse) => item.value === worldType);

  return currentContentType?.code ?? null;
};