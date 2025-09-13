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

// Sessions Pages
import AllSessionsPage from "@/pages/sessions/AllSessionsPage";
import ActiveSessionsPage from "@/pages/sessions/ActiveSessionsPage";
import SessionHistoryPage from "@/pages/sessions/SessionHistoryPage";
import NewSessionPage from "@/pages/sessions/NewSessionPage";
import SessionSettingsPage from "@/pages/sessions/SessionSettingsPage";

// Payloads Pages
import WindowsPayloadsPage from "@/pages/payloads/WindowsPayloadsPage";
import LinuxPayloadsPage from "@/pages/payloads/LinuxPayloadsPage";
import MacOSPayloadsPage from "@/pages/payloads/MacOSPayloadsPage";
import WebPayloadsPage from "@/pages/payloads/WebPayloadsPage";
import MobilePayloadsPage from "@/pages/payloads/MobilePayloadsPage";
import PayloadGeneratorPage from "@/pages/payloads/PayloadGeneratorPage";

// Exploits Pages
import LocalExploitsPage from "@/pages/exploits/LocalExploitsPage";
import RemoteExploitsPage from "@/pages/exploits/RemoteExploitsPage";
import WebExploitsPage from "@/pages/exploits/WebExploitsPage";
import SearchExploitsPage from "@/pages/exploits/SearchExploitsPage";
import ExploitHistoryPage from "@/pages/exploits/ExploitHistoryPage";

// Modules Pages
import PostExploitationPage from "@/pages/modules/PostExploitationPage";
import PersistencePage from "@/pages/modules/PersistencePage";
import PrivilegeEscalationPage from "@/pages/modules/PrivilegeEscalationPage";
import LateralMovementPage from "@/pages/modules/LateralMovementPage";
import ReconnaissancePage from "@/pages/modules/ReconnaissancePage";
import DataExfiltrationPage from "@/pages/modules/DataExfiltrationPage";
import AntiForensicsPage from "@/pages/modules/AntiForensicsPage";

// Listeners Pages
import HTTPListenersPage from "@/pages/listeners/HTTPListenersPage";
import HTTPSListenersPage from "@/pages/listeners/HTTPSListenersPage";
import TCPListenersPage from "@/pages/listeners/TCPListenersPage";
import UDPListenersPage from "@/pages/listeners/UDPListenersPage";
import DNSListenersPage from "@/pages/listeners/DNSListenersPage";
import SMBListenersPage from "@/pages/listeners/SMBListenersPage";
import ListenerManagerPage from "@/pages/listeners/ListenerManagerPage";
import ListenerTemplatesPage from "@/pages/listeners/ListenerTemplatesPage";

// Reports Pages
import ExecutiveSummaryPage from "@/pages/reports/ExecutiveSummaryPage";
import TechnicalReportPage from "@/pages/reports/TechnicalReportPage";
import AttackTimelinePage from "@/pages/reports/AttackTimelinePage";
import EvidenceCollectionPage from "@/pages/reports/EvidenceCollectionPage";
import ScreenshotsPage from "@/pages/reports/ScreenshotsPage";
import ExportDataPage from "@/pages/reports/ExportDataPage";

import { useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/clients" component={ClientsPage} />
      <Route path="/remote-access" component={TerminalPage} />
      <Route path="/network" component={NetworkPage} />
      <Route path="/scenarios" component={ScenariosPage} />
      <Route path="/telemetry" component={TelemetryPage} />

      {/* Sessions Routes */}
      <Route path="/sessions/all" component={AllSessionsPage} />
      <Route path="/sessions/active" component={ActiveSessionsPage} />
      <Route path="/sessions/history" component={SessionHistoryPage} />
      <Route path="/sessions/new" component={NewSessionPage} />
      <Route path="/sessions/settings" component={SessionSettingsPage} />

      {/* Payloads Routes */}
      <Route path="/payloads/windows" component={WindowsPayloadsPage} />
      <Route path="/payloads/linux" component={LinuxPayloadsPage} />
      <Route path="/payloads/macos" component={MacOSPayloadsPage} />
      <Route path="/payloads/web" component={WebPayloadsPage} />
      <Route path="/payloads/mobile" component={MobilePayloadsPage} />
      <Route path="/payloads/generator" component={PayloadGeneratorPage} />

      {/* Exploits Routes */}
      <Route path="/exploits/local" component={LocalExploitsPage} />
      <Route path="/exploits/remote" component={RemoteExploitsPage} />
      <Route path="/exploits/web" component={WebExploitsPage} />
      <Route path="/exploits/search" component={SearchExploitsPage} />
      <Route path="/exploits/history" component={ExploitHistoryPage} />

      {/* Modules Routes */}
      <Route path="/modules/post-exploitation" component={PostExploitationPage} />
      <Route path="/modules/persistence" component={PersistencePage} />
      <Route path="/modules/privilege-escalation" component={PrivilegeEscalationPage} />
      <Route path="/modules/lateral-movement" component={LateralMovementPage} />
      <Route path="/modules/reconnaissance" component={ReconnaissancePage} />
      <Route path="/modules/data-exfiltration" component={DataExfiltrationPage} />
      <Route path="/modules/anti-forensics" component={AntiForensicsPage} />

      {/* Listeners Routes */}
      <Route path="/listeners/http" component={HTTPListenersPage} />
      <Route path="/listeners/https" component={HTTPSListenersPage} />
      <Route path="/listeners/tcp" component={TCPListenersPage} />
      <Route path="/listeners/udp" component={UDPListenersPage} />
      <Route path="/listeners/dns" component={DNSListenersPage} />
      <Route path="/listeners/smb" component={SMBListenersPage} />
      <Route path="/listeners/manager" component={ListenerManagerPage} />
      <Route path="/listeners/templates" component={ListenerTemplatesPage} />

      {/* Reports Routes */}
      <Route path="/reports/executive-summary" component={ExecutiveSummaryPage} />
      <Route path="/reports/technical-report" component={TechnicalReportPage} />
      <Route path="/reports/attack-timeline" component={AttackTimelinePage} />
      <Route path="/reports/evidence-collection" component={EvidenceCollectionPage} />
      <Route path="/reports/screenshots" component={ScreenshotsPage} />
      <Route path="/reports/export-data" component={ExportDataPage} />

      {/* Legacy routes with placeholder components */}
      <Route path="/surveillance" component={() => <div className="container-responsive py-6"><div className="text-center py-20"><h1 className="text-2xl font-semibold mb-4">Surveillance & Monitoring</h1><p className="text-muted-foreground">Advanced surveillance features coming soon...</p></div></div>} />
      <Route path="/post-exploitation" component={() => <div className="container-responsive py-6"><div className="text-center py-20"><h1 className="text-2xl font-semibold mb-4">Post-Exploitation Tools</h1><p className="text-muted-foreground">Advanced exploitation tools coming soon...</p></div></div>} />
      <Route path="/automation" component={() => <div className="container-responsive py-6"><div className="text-center py-20"><h1 className="text-2xl font-semibold mb-4">Automation & Tasking</h1><p className="text-muted-foreground">Command automation features coming soon...</p></div></div>} />
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