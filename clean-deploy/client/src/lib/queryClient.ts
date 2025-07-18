import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

// Improved API error handling
async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    try {
      // Try to parse error as JSON first
      const errorData = await res.json();
      const errorMessage = errorData.message || errorData.error || `Error ${res.status}: ${res.statusText}`;
      throw new Error(errorMessage);
    } catch (jsonError) {
      // If JSON parsing fails, use text or status
      const text = await res.text() || res.statusText;
      throw new Error(`${res.status}: ${text}`);
    }
  }
}

// Enhanced API request with better error handling
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  try {
    const res = await fetch(url, {
      method,
      headers: data ? { "Content-Type": "application/json" } : {},
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
    });

    await throwIfResNotOk(res);
    return res;
  } catch (error) {
    // Show error toast for API errors 
    if (error instanceof Error) {
      toast({
        title: "Request failed",
        description: error.message,
        variant: "destructive",
      });
    }
    throw error;
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    try {
      const res = await fetch(queryKey[0] as string, {
        credentials: "include",
      });

      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        return null;
      }

      await throwIfResNotOk(res);
      return await res.json();
    } catch (error) {
      // Log the error but don't show toast for queries (to avoid multiple toasts)
      console.error("Query error:", error);
      throw error;
    }
  };

// Configure query client with better error handling
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 60000, // 1 minute stale time for better performance
      retry: 1, // Allow one retry for network issues
      // Global error handler for queries
      onError: (error) => {
        if (error instanceof Error) {
          console.error("Query error:", error.message);
        }
      },
    },
    mutations: {
      retry: false,
      // Global error handler for mutations
      onError: (error) => {
        if (error instanceof Error) {
          // Errors are already handled in apiRequest with toasts
          console.error("Mutation error:", error.message);
        }
      },
    },
  },
});
