import { TopNavbar } from "./TopNavbar";
import { GlobalStatusBar } from "./GlobalStatusBar";
import { GlobalQuickActions } from "./GlobalQuickActions";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <TopNavbar />
      
      {/* Global Header with Status and Quick Actions */}
      <div className="border-b border-border bg-card">
        <div className="container-responsive py-4">
          <div className="flex items-center justify-between">
            <GlobalStatusBar />
            <GlobalQuickActions />
          </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <main className="w-full">
        {children}
      </main>
    </div>
  );
}