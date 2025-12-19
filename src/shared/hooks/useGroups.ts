"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getGroupsOptions } from "@/shared/remotes";
import { formatDateToYYYYMMDD, getRefreshDate } from "@/shared/utils";

export const useGroups = () => {
  const newsDate = getRefreshDate(new Date());
  const newsDateFormatted = formatDateToYYYYMMDD(newsDate);
  const options = getGroupsOptions(newsDateFormatted);
  const { data } = useSuspenseQuery(options);

  return data.data.groups;
};
