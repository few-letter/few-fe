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

export const getQueryClient = () => {
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
        },
      });
    return browserQueryClient;
  }
};
