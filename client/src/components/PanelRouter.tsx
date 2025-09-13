import { Suspense } from "react";
import { useLocation } from "wouter";
import { getPanelConfig } from "./PanelRegistry";

export function PanelRouter() {
  const [location] = useLocation();
  
  // Extract panel ID from URL search params or path
  const getPanelId = (): string => {
    // Check URL search params first: /?panel=sessions.all
    const urlParams = new URLSearchParams(location.includes('?') ? location.split('?')[1] : '');
    const panelParam = urlParams.get('panel');
    if (panelParam) {
      return panelParam;
    }
    
    // Map legacy paths to panel IDs
    const pathToPanelMap: Record<string, string> = {
      '/': 'dashboard',
      '/clients': 'clients', 
      '/remote-access': 'terminal',
      '/network': 'network',
      '/scenarios': 'scenarios',
      '/telemetry': 'telemetry',
      
      // Sessions
      '/sessions/all': 'sessions.all',
      '/sessions/active': 'sessions.active',
      '/sessions/history': 'sessions.history',
      '/sessions/new': 'sessions.new',
      '/sessions/settings': 'sessions.settings',
      
      // Payloads
      '/payloads/windows': 'payloads.windows',
      '/payloads/linux': 'payloads.linux',
      '/payloads/macos': 'payloads.macos',
      '/payloads/web': 'payloads.web',
      '/payloads/mobile': 'payloads.mobile',
      '/payloads/generator': 'payloads.generator',
      
      // Exploits
      '/exploits/local': 'exploits.local',
      '/exploits/remote': 'exploits.remote',
      '/exploits/web': 'exploits.web',
      '/exploits/search': 'exploits.search',
      '/exploits/history': 'exploits.history',
      
      // Modules
      '/modules/post-exploitation': 'modules.post-exploitation',
      '/modules/persistence': 'modules.persistence',
      '/modules/privilege-escalation': 'modules.privilege-escalation',
      '/modules/lateral-movement': 'modules.lateral-movement',
      '/modules/reconnaissance': 'modules.reconnaissance',
      '/modules/data-exfiltration': 'modules.data-exfiltration',
      '/modules/anti-forensics': 'modules.anti-forensics',
      
      // Listeners
      '/listeners/http': 'listeners.http',
      '/listeners/https': 'listeners.https',
      '/listeners/tcp': 'listeners.tcp',
      '/listeners/udp': 'listeners.udp',
      '/listeners/dns': 'listeners.dns',
      '/listeners/smb': 'listeners.smb',
      '/listeners/manager': 'listeners.manager',
      '/listeners/templates': 'listeners.templates',
      
      // Reports
      '/reports/executive-summary': 'reports.executive-summary',
      '/reports/technical-report': 'reports.technical-report',
      '/reports/attack-timeline': 'reports.attack-timeline',
      '/reports/evidence-collection': 'reports.evidence-collection',
      '/reports/screenshots': 'reports.screenshots',
      '/reports/export-data': 'reports.export-data'
    };
    
    return pathToPanelMap[location] || 'dashboard';
  };

  const panelId = getPanelId();
  const panelConfig = getPanelConfig(panelId);
  
  if (!panelConfig) {
    return (
      <div className="container-responsive py-6">
        <div className="text-center py-20">
          <h1 className="text-2xl font-semibold mb-4">Panel Not Found</h1>
          <p className="text-muted-foreground">
            The requested panel "{panelId}" could not be found.
          </p>
        </div>
      </div>
    );
  }

  const Component = panelConfig.component;

  return (
    <Suspense 
      fallback={
        <div className="container-responsive py-6">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading {panelConfig.title}...</p>
            </div>
          </div>
        </div>
      }
    >
      <Component />
    </Suspense>
  );
}