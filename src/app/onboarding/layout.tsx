"use client";

// import ui components from shadcn/ui
import { Toaster } from "@/components/ui/toaster";

// Import React query components
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import Provider
import { SessionStoreProvider } from "@/app/providers/session";

const queryClient = new QueryClient();

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionStoreProvider>
        <div className="p-4 mx-auto container">{children}</div>
        <Toaster />
        <ReactQueryDevtools />
      </SessionStoreProvider>
    </QueryClientProvider>
  );
}
