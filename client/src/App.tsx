import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TopNavbar } from "@/components/TopNavbar";
import Dashboard from "@/pages/Dashboard";
import ClientsPage from "@/pages/ClientsPage";
import TerminalPage from "@/pages/TerminalPage";
import NetworkPage from "@/pages/NetworkPage";
import ScenariosPage from "@/pages/ScenariosPage";
import TelemetryPage from "@/pages/TelemetryPage";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/clients" component={ClientsPage} />
      <Route path="/remote-access" component={TerminalPage} />
      <Route path="/network" component={NetworkPage} />
      <Route path="/scenarios" component={ScenariosPage} />
      <Route path="/surveillance" component={() => <div className="container-responsive py-6"><div className="text-center py-20"><h1 className="text-2xl font-semibold mb-4">Surveillance & Monitoring</h1><p className="text-muted-foreground">Advanced surveillance features coming soon...</p></div></div>} />
      <Route path="/post-exploitation" component={() => <div className="container-responsive py-6"><div className="text-center py-20"><h1 className="text-2xl font-semibold mb-4">Post-Exploitation Tools</h1><p className="text-muted-foreground">Advanced exploitation tools coming soon...</p></div></div>} />
      <Route path="/automation" component={() => <div className="container-responsive py-6"><div className="text-center py-20"><h1 className="text-2xl font-semibold mb-4">Automation & Tasking</h1><p className="text-muted-foreground">Command automation features coming soon...</p></div></div>} />
      <Route path="/telemetry" component={TelemetryPage} />
      <Route path="/batch" component={() => <div className="container-responsive py-6"><div className="text-center py-20"><h1 className="text-2xl font-semibold mb-4">Batch Operations</h1><p className="text-muted-foreground">Advanced batch command execution coming soon...</p></div></div>} />
      <Route path="/analysis" component={() => <div className="container-responsive py-6"><div className="text-center py-20"><h1 className="text-2xl font-semibold mb-4">Analysis & Intelligence</h1><p className="text-muted-foreground">Data analysis and intelligence tools coming soon...</p></div></div>} />
      <Route path="/reports" component={() => <div className="container-responsive py-6"><div className="text-center py-20"><h1 className="text-2xl font-semibold mb-4">Reports & Documentation</h1><p className="text-muted-foreground">Operational reports and documentation coming soon...</p></div></div>} />
      <Route path="/users" component={() => <div className="container-responsive py-6"><div className="text-center py-20"><h1 className="text-2xl font-semibold mb-4">User Management</h1><p className="text-muted-foreground">User access control and management coming soon...</p></div></div>} />
      <Route path="/logs" component={() => <div className="container-responsive py-6"><div className="text-center py-20"><h1 className="text-2xl font-semibold mb-4">System Logs</h1><p className="text-muted-foreground">Comprehensive system logging and audit trails coming soon...</p></div></div>} />
      <Route path="/resources" component={() => <div className="container-responsive py-6"><div className="text-center py-20"><h1 className="text-2xl font-semibold mb-4">Resources</h1><p className="text-muted-foreground">Resources page coming soon...</p></div></div>} />
      <Route path="/settings" component={() => <div className="container-responsive py-6"><div className="text-center py-20"><h1 className="text-2xl font-semibold mb-4">Settings</h1><p className="text-muted-foreground">Settings page coming soon...</p></div></div>} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen w-full bg-background text-foreground">
          <TopNavbar />
          <main className="w-full">
            <Router />
          </main>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;