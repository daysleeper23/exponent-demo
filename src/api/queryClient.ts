import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 5, // 5 hours
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      retry: 0, // Retry failed queries twice
    },
  },
});

export default queryClient;