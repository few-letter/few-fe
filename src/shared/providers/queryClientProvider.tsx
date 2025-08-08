"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/api/client/queryClient";

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
