import { cache } from "react";
import {
  isServer,
  QueryClient,
  type DefaultOptions,
} from "@tanstack/react-query";

const makeQueryClient = (options?: DefaultOptions) =>
  new QueryClient({
    defaultOptions: options,
  });

let browserQueryClient: QueryClient | undefined = undefined;

const getServerQueryClient = cache(() =>
  makeQueryClient({
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 0,
      gcTime: 1000 * 60 * 5,
    },
  })
);

export const getQueryClient = () => {
  if (isServer) {
    return getServerQueryClient();
  } else {
    if (!browserQueryClient)
      browserQueryClient = makeQueryClient({
        queries: {
          staleTime: 60 * 1000,
          refetchOnWindowFocus: false,
          retry: 1,
          gcTime: 1000 * 60 * 5,
        },
      });
    return browserQueryClient;
  }
};
