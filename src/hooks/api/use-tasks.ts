import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "@/api/task";
import { Task } from "@/types/task";

export function useTasks() {
  // The useQuery hook automates:
  //  - Caching
  //  - Background refetch
  //  - Stale/inactive state management
  //  - Request status tracking
  return useQuery<Task[], Error>({
    queryKey: ["tasks"],   // Unique key for caching
    queryFn: fetchTasks,   // Function that actually fetches and validates data
    staleTime: 1000 * 60,  // 1 minute
    // Additional config like retry, refetchOnWindowFocus, etc. can be added
  });
}
