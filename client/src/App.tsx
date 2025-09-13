import { Suspense, useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppShell } from "@/components/AppShell";
import { PanelRouter } from "@/components/PanelRouter";

function App() {
  // Initialize dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppShell>
          <Suspense 
            fallback={
              <div className="container-responsive py-6">
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading...</p>
                  </div>
                </div>
              </div>
            }
          >
            <PanelRouter />
          </Suspense>
        </AppShell>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;