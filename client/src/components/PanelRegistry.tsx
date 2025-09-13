import { lazy } from "react";

// Lazy load panel components for code splitting
const DashboardPanel = lazy(() => import("@/pages/Dashboard"));
const ClientsPanel = lazy(() => import("@/pages/ClientsPage"));
const TerminalPanel = lazy(() => import("@/pages/TerminalPage"));
const NetworkPanel = lazy(() => import("@/pages/NetworkPage"));
const ScenariosPanel = lazy(() => import("@/pages/ScenariosPage"));
const TelemetryPanel = lazy(() => import("@/pages/TelemetryPage"));

// Sessions panels
const AllSessionsPanel = lazy(() => import("@/pages/sessions/AllSessionsPage"));
const ActiveSessionsPanel = lazy(() => import("@/pages/sessions/ActiveSessionsPage"));
const SessionHistoryPanel = lazy(() => import("@/pages/sessions/SessionHistoryPage"));
const NewSessionPanel = lazy(() => import("@/pages/sessions/NewSessionPage"));
const SessionSettingsPanel = lazy(() => import("@/pages/sessions/SessionSettingsPage"));

// Payloads panels
const WindowsPayloadsPanel = lazy(() => import("@/pages/payloads/WindowsPayloadsPage"));
const LinuxPayloadsPanel = lazy(() => import("@/pages/payloads/LinuxPayloadsPage"));
const MacOSPayloadsPanel = lazy(() => import("@/pages/payloads/MacOSPayloadsPage"));
const WebPayloadsPanel = lazy(() => import("@/pages/payloads/WebPayloadsPage"));
const MobilePayloadsPanel = lazy(() => import("@/pages/payloads/MobilePayloadsPage"));
const PayloadGeneratorPanel = lazy(() => import("@/pages/payloads/PayloadGeneratorPage"));

// Exploits panels
const LocalExploitsPanel = lazy(() => import("@/pages/exploits/LocalExploitsPage"));
const RemoteExploitsPanel = lazy(() => import("@/pages/exploits/RemoteExploitsPage"));
const WebExploitsPanel = lazy(() => import("@/pages/exploits/WebExploitsPage"));
const SearchExploitsPanel = lazy(() => import("@/pages/exploits/SearchExploitsPage"));
const ExploitHistoryPanel = lazy(() => import("@/pages/exploits/ExploitHistoryPage"));

// Modules panels
const PostExploitationPanel = lazy(() => import("@/pages/modules/PostExploitationPage"));
const PersistencePanel = lazy(() => import("@/pages/modules/PersistencePage"));
const PrivilegeEscalationPanel = lazy(() => import("@/pages/modules/PrivilegeEscalationPage"));
const LateralMovementPanel = lazy(() => import("@/pages/modules/LateralMovementPage"));
const ReconnaissancePanel = lazy(() => import("@/pages/modules/ReconnaissancePage"));
const DataExfiltrationPanel = lazy(() => import("@/pages/modules/DataExfiltrationPage"));
const AntiForensicsPanel = lazy(() => import("@/pages/modules/AntiForensicsPage"));

// Listeners panels
const HTTPListenersPanel = lazy(() => import("@/pages/listeners/HTTPListenersPage"));
const HTTPSListenersPanel = lazy(() => import("@/pages/listeners/HTTPSListenersPage"));
const TCPListenersPanel = lazy(() => import("@/pages/listeners/TCPListenersPage"));
const UDPListenersPanel = lazy(() => import("@/pages/listeners/UDPListenersPage"));
const DNSListenersPanel = lazy(() => import("@/pages/listeners/DNSListenersPage"));
const SMBListenersPanel = lazy(() => import("@/pages/listeners/SMBListenersPage"));
const ListenerManagerPanel = lazy(() => import("@/pages/listeners/ListenerManagerPage"));
const ListenerTemplatesPanel = lazy(() => import("@/pages/listeners/ListenerTemplatesPage"));

// Reports panels
const ExecutiveSummaryPanel = lazy(() => import("@/pages/reports/ExecutiveSummaryPage"));
const TechnicalReportPanel = lazy(() => import("@/pages/reports/TechnicalReportPage"));
const AttackTimelinePanel = lazy(() => import("@/pages/reports/AttackTimelinePage"));
const EvidenceCollectionPanel = lazy(() => import("@/pages/reports/EvidenceCollectionPage"));
const ScreenshotsPanel = lazy(() => import("@/pages/reports/ScreenshotsPage"));
const ExportDataPanel = lazy(() => import("@/pages/reports/ExportDataPage"));

import { 
  Home, Monitor, Terminal, Network, CheckSquare, Activity,
  List, Circle, History, Plus, Settings,
  Windows, Linux, Apple, Globe, Smartphone, Wand2,
  Monitor as Desktop, Wifi, Search, Clock,
  ArrowUp, ArrowsUpFromLine, Eye, Download, UserX,
  Shield, Lock, HardDrive, Server, Folder, Cog, FileText,
  PieChart, FileCode, Image, FileDown
} from "lucide-react";

export interface PanelConfig {
  id: string;
  title: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
  icon: React.ReactNode;
  category: string;
  description?: string;
}

export const PANEL_REGISTRY: Record<string, PanelConfig> = {
  // Main panels
  "dashboard": {
    id: "dashboard",
    title: "Dashboard",
    component: DashboardPanel,
    icon: "fas fa-home",
    category: "main"
  },
  "clients": {
    id: "clients",
    title: "Clients",
    component: ClientsPanel,
    icon: "fas fa-desktop",
    category: "main"
  },
  "terminal": {
    id: "terminal",
    title: "Terminal",
    component: TerminalPanel,
    icon: "fas fa-terminal",
    category: "main"
  },
  "network": {
    id: "network",
    title: "Network",
    component: NetworkPanel,
    icon: "fas fa-network-wired",
    category: "main"
  },
  "scenarios": {
    id: "scenarios",
    title: "Scenarios",
    component: ScenariosPanel,
    icon: "fas fa-tasks",
    category: "main"
  },
  "telemetry": {
    id: "telemetry",
    title: "Telemetry",
    component: TelemetryPanel,
    icon: "fas fa-chart-line",
    category: "main"
  },

  // Sessions
  "sessions.all": {
    id: "sessions.all",
    title: "All Sessions",
    component: AllSessionsPanel,
    icon: "fas fa-list",
    category: "sessions"
  },
  "sessions.active": {
    id: "sessions.active",
    title: "Active Sessions",
    component: ActiveSessionsPanel,
    icon: "fas fa-circle",
    category: "sessions"
  },
  "sessions.history": {
    id: "sessions.history",
    title: "Session History",
    component: SessionHistoryPanel,
    icon: "fas fa-history",
    category: "sessions"
  },
  "sessions.new": {
    id: "sessions.new",
    title: "New Session",
    component: NewSessionPanel,
    icon: "fas fa-plus",
    category: "sessions"
  },
  "sessions.settings": {
    id: "sessions.settings",
    title: "Session Settings",
    component: SessionSettingsPanel,
    icon: "fas fa-cog",
    category: "sessions"
  },

  // Payloads
  "payloads.windows": {
    id: "payloads.windows",
    title: "Windows Payloads",
    component: WindowsPayloadsPanel,
    icon: "fab fa-windows",
    category: "payloads"
  },
  "payloads.linux": {
    id: "payloads.linux",
    title: "Linux Payloads",
    component: LinuxPayloadsPanel,
    icon: "fab fa-linux",
    category: "payloads"
  },
  "payloads.macos": {
    id: "payloads.macos",
    title: "macOS Payloads",
    component: MacOSPayloadsPanel,
    icon: "fab fa-apple",
    category: "payloads"
  },
  "payloads.web": {
    id: "payloads.web",
    title: "Web Payloads",
    component: WebPayloadsPanel,
    icon: "fas fa-globe",
    category: "payloads"
  },
  "payloads.mobile": {
    id: "payloads.mobile",
    title: "Mobile Payloads",
    component: MobilePayloadsPanel,
    icon: "fas fa-mobile-alt",
    category: "payloads"
  },
  "payloads.generator": {
    id: "payloads.generator",
    title: "Payload Generator",
    component: PayloadGeneratorPanel,
    icon: "fas fa-magic",
    category: "payloads"
  },

  // Exploits
  "exploits.local": {
    id: "exploits.local",
    title: "Local Exploits",
    component: LocalExploitsPanel,
    icon: "fas fa-desktop",
    category: "exploits"
  },
  "exploits.remote": {
    id: "exploits.remote",
    title: "Remote Exploits",
    component: RemoteExploitsPanel,
    icon: "fas fa-network-wired",
    category: "exploits"
  },
  "exploits.web": {
    id: "exploits.web",
    title: "Web Exploits",
    component: WebExploitsPanel,
    icon: "fas fa-globe",
    category: "exploits"
  },
  "exploits.search": {
    id: "exploits.search",
    title: "Search Exploits",
    component: SearchExploitsPanel,
    icon: "fas fa-search",
    category: "exploits"
  },
  "exploits.history": {
    id: "exploits.history",
    title: "Exploit History",
    component: ExploitHistoryPanel,
    icon: "fas fa-history",
    category: "exploits"
  },

  // Modules
  "modules.post-exploitation": {
    id: "modules.post-exploitation",
    title: "Post-Exploitation",
    component: PostExploitationPanel,
    icon: "fas fa-terminal",
    category: "modules"
  },
  "modules.persistence": {
    id: "modules.persistence",
    title: "Persistence",
    component: PersistencePanel,
    icon: "fas fa-anchor",
    category: "modules"
  },
  "modules.privilege-escalation": {
    id: "modules.privilege-escalation",
    title: "Privilege Escalation",
    component: PrivilegeEscalationPanel,
    icon: "fas fa-arrow-up",
    category: "modules"
  },
  "modules.lateral-movement": {
    id: "modules.lateral-movement",
    title: "Lateral Movement",
    component: LateralMovementPanel,
    icon: "fas fa-arrows-alt",
    category: "modules"
  },
  "modules.reconnaissance": {
    id: "modules.reconnaissance",
    title: "Reconnaissance",
    component: ReconnaissancePanel,
    icon: "fas fa-search",
    category: "modules"
  },
  "modules.data-exfiltration": {
    id: "modules.data-exfiltration",
    title: "Data Exfiltration",
    component: DataExfiltrationPanel,
    icon: "fas fa-download",
    category: "modules"
  },
  "modules.anti-forensics": {
    id: "modules.anti-forensics",
    title: "Anti-Forensics",
    component: AntiForensicsPanel,
    icon: "fas fa-user-secret",
    category: "modules"
  },

  // Listeners
  "listeners.http": {
    id: "listeners.http",
    title: "HTTP Listener",
    component: HTTPListenersPanel,
    icon: "fas fa-globe",
    category: "listeners"
  },
  "listeners.https": {
    id: "listeners.https",
    title: "HTTPS Listener",
    component: HTTPSListenersPanel,
    icon: "fas fa-lock",
    category: "listeners"
  },
  "listeners.tcp": {
    id: "listeners.tcp",
    title: "TCP Listener",
    component: TCPListenersPanel,
    icon: "fas fa-network-wired",
    category: "listeners"
  },
  "listeners.udp": {
    id: "listeners.udp",
    title: "UDP Listener",
    component: UDPListenersPanel,
    icon: "fas fa-wifi",
    category: "listeners"
  },
  "listeners.dns": {
    id: "listeners.dns",
    title: "DNS Listener",
    component: DNSListenersPanel,
    icon: "fas fa-server",
    category: "listeners"
  },
  "listeners.smb": {
    id: "listeners.smb",
    title: "SMB Listener",
    component: SMBListenersPanel,
    icon: "fas fa-folder-open",
    category: "listeners"
  },
  "listeners.manager": {
    id: "listeners.manager",
    title: "Listener Manager",
    component: ListenerManagerPanel,
    icon: "fas fa-cogs",
    category: "listeners"
  },
  "listeners.templates": {
    id: "listeners.templates",
    title: "Listener Templates",
    component: ListenerTemplatesPanel,
    icon: "fas fa-file-alt",
    category: "listeners"
  },

  // Reports
  "reports.executive-summary": {
    id: "reports.executive-summary",
    title: "Executive Summary",
    component: ExecutiveSummaryPanel,
    icon: "fas fa-chart-pie",
    category: "reports"
  },
  "reports.technical-report": {
    id: "reports.technical-report",
    title: "Technical Report",
    component: TechnicalReportPanel,
    icon: "fas fa-file-code",
    category: "reports"
  },
  "reports.attack-timeline": {
    id: "reports.attack-timeline",
    title: "Attack Timeline",
    component: AttackTimelinePanel,
    icon: "fas fa-clock",
    category: "reports"
  },
  "reports.evidence-collection": {
    id: "reports.evidence-collection",
    title: "Evidence Collection",
    component: EvidenceCollectionPanel,
    icon: "fas fa-folder",
    category: "reports"
  },
  "reports.screenshots": {
    id: "reports.screenshots",
    title: "Screenshots",
    component: ScreenshotsPanel,
    icon: "fas fa-camera",
    category: "reports"
  },
  "reports.export-data": {
    id: "reports.export-data",
    title: "Export Data",
    component: ExportDataPanel,
    icon: "fas fa-download",
    category: "reports"
  }
};

export function getPanelConfig(panelId: string): PanelConfig | undefined {
  return PANEL_REGISTRY[panelId];
}

export function getAllPanels(): PanelConfig[] {
  return Object.values(PANEL_REGISTRY);
}

export function getPanelsByCategory(category: string): PanelConfig[] {
  return Object.values(PANEL_REGISTRY).filter(panel => panel.category === category);
}