"use client";

import {
  isServer,
  QueryClient,
  QueryClientProvider,
  type DefaultOptions,
} from "@tanstack/react-query";

const makeQueryClient = (options?: DefaultOptions) =>
  new QueryClient({
    defaultOptions: options,
  });

//클라이언트 쿼리(싱글톤)
let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient({
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 0,
        gcTime: 1000 * 60 * 5, //5분 뒤에 캐시 삭제
      },
    });
  } else {
    if (!browserQueryClient)
      browserQueryClient = makeQueryClient({
        queries: {
          refetchOnWindowFocus: false,
          retry: 0,
          gcTime: Infinity,
        },
      });
    return browserQueryClient;
  }
};

export const QueryClientProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
