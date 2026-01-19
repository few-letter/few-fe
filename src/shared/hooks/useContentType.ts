"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getContentTypesOptions } from "@/shared/remotes";
import { WorldContentType } from "@/shared/constants/world";
import type { CodeValueResponse } from "@/shared/types";

export const useContentType = (worldContentType: WorldContentType) => {
  const options = getContentTypesOptions();
  const { data } = useSuspenseQuery(options);
  const currentContentType = data.find((item: CodeValueResponse) => item.value === worldContentType);

  return currentContentType?.code ?? null;
};