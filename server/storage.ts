import { 
  type User, type InsertUser,
  type Client, type InsertClient,
  type Session, type InsertSession,
  type Payload, type InsertPayload,
  type Exploit, type InsertExploit,
  type Module, type InsertModule,
  type Listener, type InsertListener,
  type ListenerTemplate, type InsertListenerTemplate,
  type Report, type InsertReport,
  type Evidence, type InsertEvidence,
  type Command, type InsertCommand,
  type Setting, type InsertSetting,
  type Pagination, type PaginatedResponse
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Clients
  getClient(id: string): Promise<Client | undefined>;
  getClients(pagination?: Pagination): Promise<PaginatedResponse<Client>>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: string, client: Partial<InsertClient>): Promise<Client | undefined>;
  deleteClient(id: string): Promise<boolean>;
  
  // Sessions
  getSession(id: string): Promise<Session | undefined>;
  getSessions(pagination?: Pagination): Promise<PaginatedResponse<Session>>;
  getSessionsByStatus(status: string, pagination?: Pagination): Promise<PaginatedResponse<Session>>;
  createSession(session: InsertSession): Promise<Session>;
  updateSession(id: string, session: Partial<InsertSession>): Promise<Session | undefined>;
  deleteSession(id: string): Promise<boolean>;
  
  // Payloads
  getPayload(id: string): Promise<Payload | undefined>;
  getPayloads(pagination?: Pagination): Promise<PaginatedResponse<Payload>>;
  getPayloadsByPlatform(platform: string, pagination?: Pagination): Promise<PaginatedResponse<Payload>>;
  createPayload(payload: InsertPayload): Promise<Payload>;
  updatePayload(id: string, payload: Partial<InsertPayload>): Promise<Payload | undefined>;
  deletePayload(id: string): Promise<boolean>;
  
  // Exploits
  getExploit(id: string): Promise<Exploit | undefined>;
  getExploits(pagination?: Pagination): Promise<PaginatedResponse<Exploit>>;
  getExploitsByScope(scope: string, pagination?: Pagination): Promise<PaginatedResponse<Exploit>>;
  searchExploits(query: string, pagination?: Pagination): Promise<PaginatedResponse<Exploit>>;
  createExploit(exploit: InsertExploit): Promise<Exploit>;
  updateExploit(id: string, exploit: Partial<InsertExploit>): Promise<Exploit | undefined>;
  deleteExploit(id: string): Promise<boolean>;
  
  // Modules
  getModule(id: string): Promise<Module | undefined>;
  getModules(pagination?: Pagination): Promise<PaginatedResponse<Module>>;
  getModulesByCategory(category: string, pagination?: Pagination): Promise<PaginatedResponse<Module>>;
  createModule(module: InsertModule): Promise<Module>;
  updateModule(id: string, module: Partial<InsertModule>): Promise<Module | undefined>;
  deleteModule(id: string): Promise<boolean>;
  
  // Listeners
  getListener(id: string): Promise<Listener | undefined>;
  getListeners(pagination?: Pagination): Promise<PaginatedResponse<Listener>>;
  getListenersByProtocol(protocol: string, pagination?: Pagination): Promise<PaginatedResponse<Listener>>;
  createListener(listener: InsertListener): Promise<Listener>;
  updateListener(id: string, listener: Partial<InsertListener>): Promise<Listener | undefined>;
  deleteListener(id: string): Promise<boolean>;
  
  // Listener Templates
  getListenerTemplate(id: string): Promise<ListenerTemplate | undefined>;
  getListenerTemplates(pagination?: Pagination): Promise<PaginatedResponse<ListenerTemplate>>;
  createListenerTemplate(template: InsertListenerTemplate): Promise<ListenerTemplate>;
  updateListenerTemplate(id: string, template: Partial<InsertListenerTemplate>): Promise<ListenerTemplate | undefined>;
  deleteListenerTemplate(id: string): Promise<boolean>;
  
  // Reports
  getReport(id: string): Promise<Report | undefined>;
  getReports(pagination?: Pagination): Promise<PaginatedResponse<Report>>;
  getReportsByKind(kind: string, pagination?: Pagination): Promise<PaginatedResponse<Report>>;
  createReport(report: InsertReport): Promise<Report>;
  updateReport(id: string, report: Partial<InsertReport>): Promise<Report | undefined>;
  deleteReport(id: string): Promise<boolean>;
  
  // Evidence
  getEvidence(id: string): Promise<Evidence | undefined>;
  getEvidenceByReportId(reportId: string, pagination?: Pagination): Promise<PaginatedResponse<Evidence>>;
  createEvidence(evidence: InsertEvidence): Promise<Evidence>;
  updateEvidence(id: string, evidence: Partial<InsertEvidence>): Promise<Evidence | undefined>;
  deleteEvidence(id: string): Promise<boolean>;
  
  // Commands
  getCommand(id: string): Promise<Command | undefined>;
  getCommands(pagination?: Pagination): Promise<PaginatedResponse<Command>>;
  getCommandsBySessionId(sessionId: string, pagination?: Pagination): Promise<PaginatedResponse<Command>>;
  createCommand(command: InsertCommand): Promise<Command>;
  updateCommand(id: string, command: Partial<InsertCommand>): Promise<Command | undefined>;
  deleteCommand(id: string): Promise<boolean>;
  
  // Settings
  getSetting(key: string): Promise<Setting | undefined>;
  getSettings(pagination?: Pagination): Promise<PaginatedResponse<Setting>>;
  getSettingsByCategory(category: string, pagination?: Pagination): Promise<PaginatedResponse<Setting>>;
  createSetting(setting: InsertSetting): Promise<Setting>;
  updateSetting(key: string, setting: Partial<InsertSetting>): Promise<Setting | undefined>;
  deleteSetting(key: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private clients: Map<string, Client>;
  private sessions: Map<string, Session>;
  private payloads: Map<string, Payload>;
  private exploits: Map<string, Exploit>;
  private modules: Map<string, Module>;
  private listeners: Map<string, Listener>;
  private listenerTemplates: Map<string, ListenerTemplate>;
  private reports: Map<string, Report>;
  private evidence: Map<string, Evidence>;
  private commands: Map<string, Command>;
  private settings: Map<string, Setting>;

  constructor() {
    this.users = new Map();
    this.clients = new Map();
    this.sessions = new Map();
    this.payloads = new Map();
    this.exploits = new Map();
    this.modules = new Map();
    this.listeners = new Map();
    this.listenerTemplates = new Map();
    this.reports = new Map();
    this.evidence = new Map();
    this.commands = new Map();
    this.settings = new Map();
    
    // Seed with initial data
    this.seedData();
  }

  private async seedData() {
    // Seed sample clients first
    const sampleClients = [
      {
        hostname: "WIN-DESKTOP-01",
        ipAddress: "192.168.1.100",
        macAddress: "00:1B:44:11:3A:B7",
        operatingSystem: "Windows 11 Pro",
        osVersion: "22H2",
        architecture: "x64",
        processorType: "Intel Core i7-9700K",
        totalMemory: 16,
        country: "United States",
        city: "New York",
        region: "NY",
        latitude: "40.7128",
        longitude: "-74.0060",
        timezone: "America/New_York",
        status: "online",
        uptime: 86400,
        connectionQuality: "excellent",
        currentUser: "admin",
        isElevated: true,
        availablePrivileges: ["SeDebugPrivilege", "SeBackupPrivilege"],
        userAccounts: [
          { username: "admin", isAdmin: true, isActive: true, groups: ["Administrators", "Users"] },
          { username: "guest", isAdmin: false, isActive: false, groups: ["Guests"] }
        ],
        installedSoftware: [
          { name: "Microsoft Office", version: "365", vendor: "Microsoft", isSystemCritical: false },
          { name: "Windows Defender", version: "4.18", vendor: "Microsoft", isSystemCritical: true }
        ],
        runningProcesses: [
          { pid: 1234, name: "explorer.exe", cpu: 2.5, memory: 45.2, user: "admin", startTime: new Date(Date.now() - 3600000) },
          { pid: 5678, name: "chrome.exe", cpu: 15.3, memory: 256.8, user: "admin", startTime: new Date(Date.now() - 1800000) }
        ],
        openPorts: [
          { port: 80, protocol: "TCP", state: "LISTENING", service: "HTTP", processName: "httpd.exe" },
          { port: 443, protocol: "TCP", state: "LISTENING", service: "HTTPS", processName: "httpd.exe" },
          { port: 22, protocol: "TCP", state: "LISTENING", service: "SSH", processName: "sshd.exe" }
        ],
        networkInterfaces: [
          { name: "Ethernet0", type: "ethernet", ipAddress: "192.168.1.100", macAddress: "00:1B:44:11:3A:B7", isActive: true, speed: 1000 },
          { name: "WiFi0", type: "wifi", ipAddress: "192.168.1.101", macAddress: "00:1B:44:11:3A:B8", isActive: false }
        ],
        riskLevel: "medium",
        vulnerabilityCount: 3,
        difficulty: "intermediate",
        tags: ["workstation", "windows", "corporate"],
        notes: "Corporate workstation with elevated privileges",
        isActive: true
      },
      {
        hostname: "UBUNTU-SERVER-01",
        ipAddress: "192.168.1.101",
        macAddress: "00:1B:44:22:4C:D8",
        operatingSystem: "Ubuntu Server",
        osVersion: "22.04 LTS",
        architecture: "x64",
        processorType: "AMD Ryzen 7 3700X",
        totalMemory: 32,
        country: "United States",
        city: "San Francisco",
        region: "CA",
        latitude: "37.7749",
        longitude: "-122.4194",
        timezone: "America/Los_Angeles",
        status: "online",
        uptime: 172800,
        connectionQuality: "excellent",
        currentUser: "root",
        isElevated: true,
        availablePrivileges: ["sudo"],
        userAccounts: [
          { username: "root", isAdmin: true, isActive: true, groups: ["root", "sudo"] },
          { username: "ubuntu", isAdmin: false, isActive: true, groups: ["ubuntu", "sudo"] },
          { username: "www-data", isAdmin: false, isActive: true, groups: ["www-data"] }
        ],
        installedSoftware: [
          { name: "Apache", version: "2.4.52", vendor: "Apache Foundation", isSystemCritical: true },
          { name: "MySQL", version: "8.0.28", vendor: "Oracle", isSystemCritical: true },
          { name: "PHP", version: "8.1.2", vendor: "PHP Group", isSystemCritical: false }
        ],
        runningProcesses: [
          { pid: 1001, name: "systemd", cpu: 0.1, memory: 12.5, user: "root", startTime: new Date(Date.now() - 172800000) },
          { pid: 1234, name: "apache2", cpu: 5.2, memory: 89.4, user: "www-data", startTime: new Date(Date.now() - 86400000) },
          { pid: 2345, name: "mysqld", cpu: 8.7, memory: 512.1, user: "mysql", startTime: new Date(Date.now() - 86400000) }
        ],
        openPorts: [
          { port: 22, protocol: "TCP", state: "LISTENING", service: "SSH", processName: "sshd" },
          { port: 80, protocol: "TCP", state: "LISTENING", service: "HTTP", processName: "apache2" },
          { port: 443, protocol: "TCP", state: "LISTENING", service: "HTTPS", processName: "apache2" },
          { port: 3306, protocol: "TCP", state: "LISTENING", service: "MySQL", processName: "mysqld" }
        ],
        networkInterfaces: [
          { name: "eth0", type: "ethernet", ipAddress: "192.168.1.101", macAddress: "00:1B:44:22:4C:D8", isActive: true, speed: 1000 }
        ],
        riskLevel: "high",
        vulnerabilityCount: 7,
        difficulty: "advanced",
        tags: ["server", "linux", "web-server", "database"],
        notes: "Web server with database backend - high value target",
        isActive: true
      },
      {
        hostname: "MacBook-Pro-15",
        ipAddress: "192.168.1.102",
        macAddress: "00:1B:44:33:5D:E9",
        operatingSystem: "macOS Ventura",
        osVersion: "13.2.1",
        architecture: "arm64",
        processorType: "Apple M2 Pro",
        totalMemory: 16,
        country: "Canada",
        city: "Toronto",
        region: "ON",
        latitude: "43.6532",
        longitude: "-79.3832",
        timezone: "America/Toronto",
        status: "online",
        uptime: 43200,
        connectionQuality: "good",
        currentUser: "developer",
        isElevated: false,
        availablePrivileges: [],
        userAccounts: [
          { username: "developer", isAdmin: true, isActive: true, groups: ["admin", "staff", "wheel"] },
          { username: "guest", isAdmin: false, isActive: false, groups: ["everyone"] }
        ],
        installedSoftware: [
          { name: "Xcode", version: "14.2", vendor: "Apple", isSystemCritical: false },
          { name: "Docker Desktop", version: "4.16.2", vendor: "Docker", isSystemCritical: false },
          { name: "VS Code", version: "1.75.1", vendor: "Microsoft", isSystemCritical: false }
        ],
        runningProcesses: [
          { pid: 1, name: "launchd", cpu: 0.1, memory: 8.2, user: "root", startTime: new Date(Date.now() - 43200000) },
          { pid: 567, name: "Finder", cpu: 1.2, memory: 65.8, user: "developer", startTime: new Date(Date.now() - 43200000) },
          { pid: 1234, name: "Code", cpu: 12.5, memory: 245.6, user: "developer", startTime: new Date(Date.now() - 7200000) }
        ],
        openPorts: [
          { port: 22, protocol: "TCP", state: "LISTENING", service: "SSH", processName: "sshd" },
          { port: 5000, protocol: "TCP", state: "LISTENING", service: "Node.js", processName: "node" }
        ],
        networkInterfaces: [
          { name: "en0", type: "wifi", ipAddress: "192.168.1.102", macAddress: "00:1B:44:33:5D:E9", isActive: true, speed: 867 }
        ],
        riskLevel: "low",
        vulnerabilityCount: 1,
        difficulty: "beginner",
        tags: ["laptop", "macos", "developer"],
        notes: "Developer workstation with development tools",
        isActive: true
      }
    ];

    // Create clients with specific IDs directly
    const clientIds = ["client-win-desktop", "client-ubuntu-server", "client-macbook"];
    for (let i = 0; i < sampleClients.length; i++) {
      const now = new Date();
      const client: Client = { 
        ...sampleClients[i] as any,
        id: clientIds[i],
        createdAt: now,
        updatedAt: now,
        lastSeen: now,
        firstSeen: now,
        // Ensure all required fields have values
        tags: sampleClients[i].tags || null,
        macAddress: sampleClients[i].macAddress || null,
        osVersion: sampleClients[i].osVersion || null,
        architecture: sampleClients[i].architecture || null,
        processorType: sampleClients[i].processorType || null,
        totalMemory: sampleClients[i].totalMemory || null,
        country: sampleClients[i].country || null,
        city: sampleClients[i].city || null,
        region: sampleClients[i].region || null,
        latitude: sampleClients[i].latitude || null,
        longitude: sampleClients[i].longitude || null,
        timezone: sampleClients[i].timezone || null,
        uptime: sampleClients[i].uptime || null,
        connectionQuality: sampleClients[i].connectionQuality || null,
        currentUser: sampleClients[i].currentUser || null,
        isElevated: sampleClients[i].isElevated || false,
        availablePrivileges: sampleClients[i].availablePrivileges || null,
        userAccounts: sampleClients[i].userAccounts || null,
        installedSoftware: sampleClients[i].installedSoftware || null,
        runningProcesses: sampleClients[i].runningProcesses || null,
        openPorts: sampleClients[i].openPorts || null,
        networkInterfaces: sampleClients[i].networkInterfaces || null,
        riskLevel: sampleClients[i].riskLevel || null,
        vulnerabilityCount: sampleClients[i].vulnerabilityCount || 0,
        difficulty: sampleClients[i].difficulty || null,
        notes: sampleClients[i].notes || null,
        isActive: sampleClients[i].isActive !== undefined ? sampleClients[i].isActive : true
      };
      this.clients.set(clientIds[i], client);
    }

    // Seed sample sessions
    const sampleSessions = [
      {
        clientId: "client-win-desktop",
        sessionType: "shell",
        status: "active",
        metadata: { type: "reverse_shell", port: 4444 }
      },
      {
        clientId: "client-ubuntu-server", 
        sessionType: "file_manager",
        status: "inactive",
        metadata: { type: "file_browser", lastPath: "/home/user" }
      }
    ];

    for (const session of sampleSessions) {
      await this.createSession(session as InsertSession);
    }

    // Seed sample payloads
    const samplePayloads = [
      {
        platform: "windows",
        type: "executable",
        name: "Windows Reverse Shell",
        description: "Standard Windows reverse shell payload",
        config: { lhost: "192.168.1.100", lport: 4444, architecture: "x64" },
        isGenerated: true,
        createdAt: new Date()
      },
      {
        platform: "linux",
        type: "script",
        name: "Linux Persistence Script",
        description: "Bash script for maintaining persistence",
        config: { method: "crontab", interval: "5m" },
        isGenerated: false,
        createdAt: new Date()
      }
    ];

    for (const payload of samplePayloads) {
      await this.createPayload(payload as InsertPayload);
    }

    // Seed sample listeners
    const sampleListeners = [
      {
        protocol: "https",
        host: "0.0.0.0",
        port: 443,
        status: "running",
        name: "HTTPS Listener",
        description: "Main HTTPS C2 listener",
        config: { ssl: true, cert_path: "/etc/ssl/c2.pem" },
        connectionCount: 5,
        createdAt: new Date(),
        startedAt: new Date()
      }
    ];

    for (const listener of sampleListeners) {
      await this.createListener(listener as InsertListener);
    }

    // Seed sample modules
    const sampleModules = [
      // Reconnaissance modules
      {
        category: "recon",
        name: "Network Scanner",
        description: "Advanced network discovery and port scanning module with stealth capabilities",
        platform: ["windows", "linux", "macos"],
        requirements: ["network_access", "admin_privileges"],
        options: [
          { name: "target", type: "string", required: true, description: "Target IP or CIDR range" },
          { name: "ports", type: "string", default: "1-1000", description: "Port range to scan" },
          { name: "stealth", type: "boolean", default: true, description: "Enable stealth scanning" }
        ],
        references: ["CVE-2019-0708", "NIST-800-115"],
        author: "RedTeam Ops",
        reliable: true
      },
      {
        category: "recon",
        name: "AD Enumeration",
        description: "Active Directory reconnaissance and user enumeration module",
        platform: ["windows"],
        requirements: ["domain_access", "authenticated_user"],
        options: [
          { name: "domain", type: "string", required: true, description: "Target domain name" },
          { name: "enumerate_users", type: "boolean", default: true, description: "Enumerate domain users" },
          { name: "enumerate_groups", type: "boolean", default: true, description: "Enumerate domain groups" }
        ],
        references: ["MITRE-T1087.002"],
        author: "AD Security Team",
        reliable: true
      },
      // Privilege Escalation modules
      {
        category: "priv-esc",
        name: "Windows Token Manipulation",
        description: "Advanced Windows token duplication and privilege escalation techniques",
        platform: ["windows"],
        requirements: ["SeDebugPrivilege", "local_access"],
        options: [
          { name: "target_process", type: "string", required: true, description: "Target process for token theft" },
          { name: "technique", type: "select", options: ["duplicate", "impersonate"], default: "duplicate" }
        ],
        references: ["MITRE-T1134", "CVE-2021-1732"],
        author: "Windows Exploit Team",
        reliable: true
      },
      {
        category: "priv-esc",
        name: "Linux Kernel Exploit",
        description: "Local privilege escalation using known kernel vulnerabilities",
        platform: ["linux"],
        requirements: ["local_shell", "gcc_compiler"],
        options: [
          { name: "exploit_type", type: "select", options: ["dirty_cow", "overlayfs", "userfaultfd"], required: true },
          { name: "kernel_version", type: "string", description: "Target kernel version" }
        ],
        references: ["CVE-2016-5195", "CVE-2021-3493"],
        author: "Linux Exploit Research",
        reliable: false
      },
      // Lateral Movement modules
      {
        category: "lateral",
        name: "PSExec Remote Execution",
        description: "Remote command execution using PsExec-style techniques",
        platform: ["windows"],
        requirements: ["admin_credentials", "smb_access"],
        options: [
          { name: "target_host", type: "string", required: true, description: "Target hostname or IP" },
          { name: "username", type: "string", required: true, description: "Administrator username" },
          { name: "password", type: "password", required: true, description: "Administrator password" },
          { name: "command", type: "string", required: true, description: "Command to execute" }
        ],
        references: ["MITRE-T1569.002"],
        author: "Lateral Movement Team",
        reliable: true
      },
      {
        category: "lateral",
        name: "SSH Key Harvesting",
        description: "Collect and utilize SSH keys for lateral movement across Unix systems",
        platform: ["linux", "macos"],
        requirements: ["file_system_access"],
        options: [
          { name: "search_paths", type: "array", default: ["/home/*/.ssh", "/root/.ssh"], description: "Paths to search for SSH keys" },
          { name: "auto_connect", type: "boolean", default: false, description: "Automatically attempt connections" }
        ],
        references: ["MITRE-T1552.004"],
        author: "Unix Security Team",
        reliable: true
      },
      // Persistence modules
      {
        category: "persistence",
        name: "Registry Persistence",
        description: "Establish persistence through Windows registry modifications",
        platform: ["windows"],
        requirements: ["registry_write", "user_context"],
        options: [
          { name: "registry_key", type: "select", options: ["HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run", "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run"], required: true },
          { name: "payload_path", type: "string", required: true, description: "Path to payload executable" },
          { name: "entry_name", type: "string", default: "SecurityUpdate", description: "Registry entry name" }
        ],
        references: ["MITRE-T1547.001"],
        author: "Persistence Team",
        reliable: true
      },
      {
        category: "persistence",
        name: "Cron Job Persistence",
        description: "Establish persistence using scheduled cron jobs on Unix systems",
        platform: ["linux", "macos"],
        requirements: ["shell_access", "crontab_access"],
        options: [
          { name: "schedule", type: "string", default: "*/5 * * * *", description: "Cron schedule expression" },
          { name: "command", type: "string", required: true, description: "Command to execute" },
          { name: "user_crontab", type: "boolean", default: true, description: "Use user crontab vs system" }
        ],
        references: ["MITRE-T1053.003"],
        author: "Unix Persistence Team",
        reliable: true
      },
      // Post-Exploitation modules
      {
        category: "post",
        name: "Credential Harvester",
        description: "Extract stored credentials from various Windows applications and services",
        platform: ["windows"],
        requirements: ["admin_privileges", "memory_access"],
        options: [
          { name: "target_apps", type: "array", default: ["chrome", "firefox", "outlook"], description: "Applications to target" },
          { name: "include_lsass", type: "boolean", default: true, description: "Include LSASS memory dump" },
          { name: "export_format", type: "select", options: ["json", "csv", "txt"], default: "json" }
        ],
        references: ["MITRE-T1555", "MITRE-T1003.001"],
        author: "Credential Research Team",
        reliable: true
      },
      {
        category: "post",
        name: "System Information Collector",
        description: "Comprehensive system profiling and information gathering module",
        platform: ["windows", "linux", "macos"],
        requirements: ["system_access"],
        options: [
          { name: "collect_hardware", type: "boolean", default: true, description: "Collect hardware information" },
          { name: "collect_software", type: "boolean", default: true, description: "Collect installed software" },
          { name: "collect_network", type: "boolean", default: true, description: "Collect network configuration" },
          { name: "collect_users", type: "boolean", default: true, description: "Collect user accounts" }
        ],
        references: ["MITRE-T1082", "MITRE-T1033"],
        author: "Information Gathering Team",
        reliable: true
      },
      // Data Exfiltration modules
      {
        category: "exfil",
        name: "Encrypted File Exfiltration",
        description: "Secure data exfiltration with encryption and steganography capabilities",
        platform: ["windows", "linux", "macos"],
        requirements: ["network_access", "file_access"],
        options: [
          { name: "target_files", type: "array", required: true, description: "Files or directories to exfiltrate" },
          { name: "encryption", type: "boolean", default: true, description: "Encrypt data before transmission" },
          { name: "steganography", type: "boolean", default: false, description: "Hide data in images" },
          { name: "chunk_size", type: "number", default: 1024, description: "Data chunk size in KB" }
        ],
        references: ["MITRE-T1041", "MITRE-T1022"],
        author: "Data Exfiltration Team",
        reliable: true
      },
      {
        category: "exfil",
        name: "DNS Tunneling",
        description: "Covert data exfiltration through DNS queries and responses",
        platform: ["windows", "linux", "macos"],
        requirements: ["dns_access", "network_access"],
        options: [
          { name: "domain", type: "string", required: true, description: "Controlled domain for tunneling" },
          { name: "record_type", type: "select", options: ["TXT", "A", "CNAME"], default: "TXT" },
          { name: "encoding", type: "select", options: ["base64", "hex"], default: "base64" }
        ],
        references: ["MITRE-T1048.003"],
        author: "Covert Channel Team",
        reliable: false
      },
      // Anti-Forensics modules
      {
        category: "anti-forensics",
        name: "Log Cleaner",
        description: "Comprehensive log cleaning and evidence removal tool",
        platform: ["windows", "linux", "macos"],
        requirements: ["admin_privileges", "log_access"],
        options: [
          { name: "target_logs", type: "array", default: ["system", "security", "application"], description: "Log types to clean" },
          { name: "time_range", type: "string", description: "Time range to clean (e.g., '2h', '1d')" },
          { name: "selective_clean", type: "boolean", default: true, description: "Only remove suspicious entries" }
        ],
        references: ["MITRE-T1070.001"],
        author: "Anti-Forensics Team",
        reliable: true
      },
      {
        category: "anti-forensics",
        name: "Timestamp Manipulation",
        description: "Modify file timestamps to avoid detection and timeline analysis",
        platform: ["windows", "linux", "macos"],
        requirements: ["file_system_access"],
        options: [
          { name: "target_files", type: "array", required: true, description: "Files to modify timestamps" },
          { name: "reference_file", type: "string", description: "Use timestamps from this file" },
          { name: "random_variance", type: "number", default: 0, description: "Random variance in seconds" }
        ],
        references: ["MITRE-T1070.006"],
        author: "Timestamp Research Team",
        reliable: true
      }
    ];

    for (const module of sampleModules) {
      await this.createModule(module as InsertModule);
    }
  }

  // Helper method for safe date handling
  private safeDate(date: Date | null | undefined): Date {
    return date ? new Date(date) : new Date();
  }

  // Helper method for pagination
  private paginate<T>(items: T[], pagination?: Pagination): PaginatedResponse<T> {
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 20;
    const total = items.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const data = items.slice(startIndex, endIndex);

    return {
      success: true,
      data,
      pagination: { page, limit, total, totalPages }
    };
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Clients
  async getClient(id: string): Promise<Client | undefined> {
    return this.clients.get(id);
  }

  async getClients(pagination?: Pagination): Promise<PaginatedResponse<Client>> {
    const clients = Array.from(this.clients.values());
    return this.paginate(clients, pagination);
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
    const id = randomUUID();
    const now = new Date();
    const client: Client = { 
      ...insertClient,
      id,
      createdAt: now,
      updatedAt: now,
      lastSeen: insertClient.lastSeen || now,
      firstSeen: insertClient.firstSeen || now,
      // Ensure required properties have default values
      tags: insertClient.tags || null,
      macAddress: insertClient.macAddress || null,
      osVersion: insertClient.osVersion || null,
      architecture: insertClient.architecture || null,
      processorType: insertClient.processorType || null,
      totalMemory: insertClient.totalMemory || null,
      country: insertClient.country || null,
      city: insertClient.city || null,
      region: insertClient.region || null,
      latitude: insertClient.latitude || null,
      longitude: insertClient.longitude || null,
      timezone: insertClient.timezone || null,
      uptime: insertClient.uptime || null,
      connectionQuality: insertClient.connectionQuality || null,
      currentUser: insertClient.currentUser || null,
      isElevated: insertClient.isElevated || false,
      availablePrivileges: insertClient.availablePrivileges || null,
      userAccounts: insertClient.userAccounts || null,
      installedSoftware: insertClient.installedSoftware || null,
      runningProcesses: insertClient.runningProcesses || null,
      openPorts: insertClient.openPorts || null,
      networkInterfaces: insertClient.networkInterfaces || null,
      riskLevel: insertClient.riskLevel || null,
      vulnerabilityCount: insertClient.vulnerabilityCount || 0,
      difficulty: insertClient.difficulty || null,
      notes: insertClient.notes || null,
      isActive: insertClient.isActive !== undefined ? insertClient.isActive : true
    };
    this.clients.set(id, client);
    return client;
  }

  async updateClient(id: string, update: Partial<InsertClient>): Promise<Client | undefined> {
    const client = this.clients.get(id);
    if (!client) return undefined;
    
    const updatedClient: Client = { 
      ...client, 
      ...update, 
      updatedAt: new Date() 
    };
    this.clients.set(id, updatedClient);
    return updatedClient;
  }

  async deleteClient(id: string): Promise<boolean> {
    return this.clients.delete(id);
  }

  // Sessions
  async getSession(id: string): Promise<Session | undefined> {
    return this.sessions.get(id);
  }

  async getSessions(pagination?: Pagination): Promise<PaginatedResponse<Session>> {
    const sessions = Array.from(this.sessions.values()).sort((a, b) => 
      this.safeDate(b.startedAt).getTime() - this.safeDate(a.startedAt).getTime()
    );
    return this.paginate(sessions, pagination);
  }

  async getSessionsByStatus(status: string, pagination?: Pagination): Promise<PaginatedResponse<Session>> {
    const sessions = Array.from(this.sessions.values())
      .filter(s => s.status === status)
      .sort((a, b) => this.safeDate(b.startedAt).getTime() - this.safeDate(a.startedAt).getTime());
    return this.paginate(sessions, pagination);
  }

  async createSession(insertSession: InsertSession): Promise<Session> {
    const id = randomUUID();
    const now = new Date();
    const session: Session = { 
      ...insertSession,
      id,
      startedAt: now,
      lastActivity: now,
      endedAt: insertSession.endedAt || null,
      metadata: insertSession.metadata || null
    };
    this.sessions.set(id, session);
    return session;
  }

  async updateSession(id: string, update: Partial<InsertSession>): Promise<Session | undefined> {
    const session = this.sessions.get(id);
    if (!session) return undefined;
    
    const updatedSession: Session = { 
      ...session, 
      ...update, 
      lastActivity: new Date() 
    };
    this.sessions.set(id, updatedSession);
    return updatedSession;
  }

  async deleteSession(id: string): Promise<boolean> {
    return this.sessions.delete(id);
  }

  // Payloads
  async getPayload(id: string): Promise<Payload | undefined> {
    return this.payloads.get(id);
  }

  async getPayloads(pagination?: Pagination): Promise<PaginatedResponse<Payload>> {
    const payloads = Array.from(this.payloads.values()).sort((a, b) => 
      this.safeDate(b.createdAt).getTime() - this.safeDate(a.createdAt).getTime()
    );
    return this.paginate(payloads, pagination);
  }

  async getPayloadsByPlatform(platform: string, pagination?: Pagination): Promise<PaginatedResponse<Payload>> {
    const payloads = Array.from(this.payloads.values())
      .filter(p => p.platform === platform)
      .sort((a, b) => this.safeDate(b.createdAt).getTime() - this.safeDate(a.createdAt).getTime());
    return this.paginate(payloads, pagination);
  }

  async createPayload(insertPayload: InsertPayload): Promise<Payload> {
    const id = randomUUID();
    const payload: Payload = { 
      ...insertPayload,
      id,
      createdAt: new Date(),
      description: insertPayload.description || null,
      config: insertPayload.config || null,
      size: insertPayload.size || null,
      filePath: insertPayload.filePath || null,
      isGenerated: insertPayload.isGenerated !== undefined ? insertPayload.isGenerated : false
    };
    this.payloads.set(id, payload);
    return payload;
  }

  async updatePayload(id: string, update: Partial<InsertPayload>): Promise<Payload | undefined> {
    const payload = this.payloads.get(id);
    if (!payload) return undefined;
    
    const updatedPayload: Payload = { ...payload, ...update };
    this.payloads.set(id, updatedPayload);
    return updatedPayload;
  }

  async deletePayload(id: string): Promise<boolean> {
    return this.payloads.delete(id);
  }

  // Exploits
  async getExploit(id: string): Promise<Exploit | undefined> {
    return this.exploits.get(id);
  }

  async getExploits(pagination?: Pagination): Promise<PaginatedResponse<Exploit>> {
    const exploits = Array.from(this.exploits.values());
    return this.paginate(exploits, pagination);
  }

  async getExploitsByScope(scope: string, pagination?: Pagination): Promise<PaginatedResponse<Exploit>> {
    const exploits = Array.from(this.exploits.values()).filter(e => e.scope === scope);
    return this.paginate(exploits, pagination);
  }

  async searchExploits(query: string, pagination?: Pagination): Promise<PaginatedResponse<Exploit>> {
    const exploits = Array.from(this.exploits.values()).filter(e => 
      e.name.toLowerCase().includes(query.toLowerCase()) ||
      e.description?.toLowerCase().includes(query.toLowerCase()) ||
      e.cve?.toLowerCase().includes(query.toLowerCase())
    );
    return this.paginate(exploits, pagination);
  }

  async createExploit(insertExploit: InsertExploit): Promise<Exploit> {
    const id = randomUUID();
    const exploit: Exploit = { 
      ...insertExploit,
      id,
      platform: insertExploit.platform || null,
      description: insertExploit.description || null,
      cve: insertExploit.cve || null,
      moduleRef: insertExploit.moduleRef || null,
      published: insertExploit.published || null,
      verified: insertExploit.verified !== undefined ? insertExploit.verified : false,
      tags: insertExploit.tags || null
    };
    this.exploits.set(id, exploit);
    return exploit;
  }

  async updateExploit(id: string, update: Partial<InsertExploit>): Promise<Exploit | undefined> {
    const exploit = this.exploits.get(id);
    if (!exploit) return undefined;
    
    const updatedExploit: Exploit = { ...exploit, ...update };
    this.exploits.set(id, updatedExploit);
    return updatedExploit;
  }

  async deleteExploit(id: string): Promise<boolean> {
    return this.exploits.delete(id);
  }

  // Modules
  async getModule(id: string): Promise<Module | undefined> {
    return this.modules.get(id);
  }

  async getModules(pagination?: Pagination): Promise<PaginatedResponse<Module>> {
    const modules = Array.from(this.modules.values());
    return this.paginate(modules, pagination);
  }

  async getModulesByCategory(category: string, pagination?: Pagination): Promise<PaginatedResponse<Module>> {
    const modules = Array.from(this.modules.values()).filter(m => m.category === category);
    return this.paginate(modules, pagination);
  }

  async createModule(insertModule: InsertModule): Promise<Module> {
    const id = randomUUID();
    const module: Module = { 
      ...insertModule,
      id,
      platform: insertModule.platform || null,
      requirements: insertModule.requirements || null,
      options: insertModule.options || null,
      references: insertModule.references || null,
      author: insertModule.author || null,
      reliable: insertModule.reliable !== undefined ? insertModule.reliable : true
    };
    this.modules.set(id, module);
    return module;
  }

  async updateModule(id: string, update: Partial<InsertModule>): Promise<Module | undefined> {
    const module = this.modules.get(id);
    if (!module) return undefined;
    
    const updatedModule: Module = { ...module, ...update };
    this.modules.set(id, updatedModule);
    return updatedModule;
  }

  async deleteModule(id: string): Promise<boolean> {
    return this.modules.delete(id);
  }

  // Listeners
  async getListener(id: string): Promise<Listener | undefined> {
    return this.listeners.get(id);
  }

  async getListeners(pagination?: Pagination): Promise<PaginatedResponse<Listener>> {
    const listeners = Array.from(this.listeners.values()).sort((a, b) => 
      this.safeDate(b.createdAt).getTime() - this.safeDate(a.createdAt).getTime()
    );
    return this.paginate(listeners, pagination);
  }

  async getListenersByProtocol(protocol: string, pagination?: Pagination): Promise<PaginatedResponse<Listener>> {
    const listeners = Array.from(this.listeners.values())
      .filter(l => l.protocol === protocol)
      .sort((a, b) => this.safeDate(b.createdAt).getTime() - this.safeDate(a.createdAt).getTime());
    return this.paginate(listeners, pagination);
  }

  async createListener(insertListener: InsertListener): Promise<Listener> {
    const id = randomUUID();
    const listener: Listener = { 
      ...insertListener,
      id,
      createdAt: new Date(),
      templateId: insertListener.templateId || null,
      description: insertListener.description || null,
      config: insertListener.config || null,
      connectionCount: insertListener.connectionCount !== undefined ? insertListener.connectionCount : 0,
      startedAt: insertListener.startedAt || null,
      stoppedAt: insertListener.stoppedAt || null
    };
    this.listeners.set(id, listener);
    return listener;
  }

  async updateListener(id: string, update: Partial<InsertListener>): Promise<Listener | undefined> {
    const listener = this.listeners.get(id);
    if (!listener) return undefined;
    
    const updatedListener: Listener = { ...listener, ...update };
    this.listeners.set(id, updatedListener);
    return updatedListener;
  }

  async deleteListener(id: string): Promise<boolean> {
    return this.listeners.delete(id);
  }

  // Listener Templates
  async getListenerTemplate(id: string): Promise<ListenerTemplate | undefined> {
    return this.listenerTemplates.get(id);
  }

  async getListenerTemplates(pagination?: Pagination): Promise<PaginatedResponse<ListenerTemplate>> {
    const templates = Array.from(this.listenerTemplates.values());
    return this.paginate(templates, pagination);
  }

  async createListenerTemplate(insertTemplate: InsertListenerTemplate): Promise<ListenerTemplate> {
    const id = randomUUID();
    const template: ListenerTemplate = { 
      ...insertTemplate,
      id,
      description: insertTemplate.description || null,
      defaultConfig: insertTemplate.defaultConfig || null
    };
    this.listenerTemplates.set(id, template);
    return template;
  }

  async updateListenerTemplate(id: string, update: Partial<InsertListenerTemplate>): Promise<ListenerTemplate | undefined> {
    const template = this.listenerTemplates.get(id);
    if (!template) return undefined;
    
    const updatedTemplate: ListenerTemplate = { ...template, ...update };
    this.listenerTemplates.set(id, updatedTemplate);
    return updatedTemplate;
  }

  async deleteListenerTemplate(id: string): Promise<boolean> {
    return this.listenerTemplates.delete(id);
  }

  // Reports
  async getReport(id: string): Promise<Report | undefined> {
    return this.reports.get(id);
  }

  async getReports(pagination?: Pagination): Promise<PaginatedResponse<Report>> {
    const reports = Array.from(this.reports.values()).sort((a, b) => 
      this.safeDate(b.createdAt).getTime() - this.safeDate(a.createdAt).getTime()
    );
    return this.paginate(reports, pagination);
  }

  async getReportsByKind(kind: string, pagination?: Pagination): Promise<PaginatedResponse<Report>> {
    const reports = Array.from(this.reports.values())
      .filter(r => r.kind === kind)
      .sort((a, b) => this.safeDate(b.createdAt).getTime() - this.safeDate(a.createdAt).getTime());
    return this.paginate(reports, pagination);
  }

  async createReport(insertReport: InsertReport): Promise<Report> {
    const id = randomUUID();
    const now = new Date();
    const report: Report = { 
      ...insertReport,
      id,
      createdAt: now,
      updatedAt: now,
      description: insertReport.description || null,
      content: insertReport.content || null,
      metadata: insertReport.metadata || null,
      author: insertReport.author || null,
      tags: insertReport.tags || null,
      finalizedAt: insertReport.finalizedAt || null
    };
    this.reports.set(id, report);
    return report;
  }

  async updateReport(id: string, update: Partial<InsertReport>): Promise<Report | undefined> {
    const report = this.reports.get(id);
    if (!report) return undefined;
    
    const updatedReport: Report = { 
      ...report, 
      ...update, 
      updatedAt: new Date() 
    };
    this.reports.set(id, updatedReport);
    return updatedReport;
  }

  async deleteReport(id: string): Promise<boolean> {
    return this.reports.delete(id);
  }

  // Evidence
  async getEvidence(id: string): Promise<Evidence | undefined> {
    return this.evidence.get(id);
  }

  async getEvidenceByReportId(reportId: string, pagination?: Pagination): Promise<PaginatedResponse<Evidence>> {
    const evidenceList = Array.from(this.evidence.values())
      .filter(e => e.reportId === reportId)
      .sort((a, b) => this.safeDate(b.createdAt).getTime() - this.safeDate(a.createdAt).getTime());
    return this.paginate(evidenceList, pagination);
  }

  async createEvidence(insertEvidence: InsertEvidence): Promise<Evidence> {
    const id = randomUUID();
    const evidence: Evidence = { 
      ...insertEvidence,
      id,
      createdAt: new Date(),
      path: insertEvidence.path || null,
      blobRef: insertEvidence.blobRef || null,
      note: insertEvidence.note || null,
      size: insertEvidence.size || null,
      hash: insertEvidence.hash || null,
      metadata: insertEvidence.metadata || null
    };
    this.evidence.set(id, evidence);
    return evidence;
  }

  async updateEvidence(id: string, update: Partial<InsertEvidence>): Promise<Evidence | undefined> {
    const evidence = this.evidence.get(id);
    if (!evidence) return undefined;
    
    const updatedEvidence: Evidence = { ...evidence, ...update };
    this.evidence.set(id, updatedEvidence);
    return updatedEvidence;
  }

  async deleteEvidence(id: string): Promise<boolean> {
    return this.evidence.delete(id);
  }

  // Commands
  async getCommand(id: string): Promise<Command | undefined> {
    return this.commands.get(id);
  }

  async getCommands(pagination?: Pagination): Promise<PaginatedResponse<Command>> {
    const commands = Array.from(this.commands.values()).sort((a, b) => 
      this.safeDate(b.createdAt).getTime() - this.safeDate(a.createdAt).getTime()
    );
    return this.paginate(commands, pagination);
  }

  async getCommandsBySessionId(sessionId: string, pagination?: Pagination): Promise<PaginatedResponse<Command>> {
    const commands = Array.from(this.commands.values())
      .filter(c => c.sessionId === sessionId)
      .sort((a, b) => this.safeDate(b.createdAt).getTime() - this.safeDate(a.createdAt).getTime());
    return this.paginate(commands, pagination);
  }

  async createCommand(insertCommand: InsertCommand): Promise<Command> {
    const id = randomUUID();
    const command: Command = { 
      ...insertCommand,
      id,
      createdAt: new Date(),
      output: insertCommand.output || null,
      error: insertCommand.error || null,
      duration: insertCommand.duration || null,
      startedAt: insertCommand.startedAt || null,
      completedAt: insertCommand.completedAt || null
    };
    this.commands.set(id, command);
    return command;
  }

  async updateCommand(id: string, update: Partial<InsertCommand>): Promise<Command | undefined> {
    const command = this.commands.get(id);
    if (!command) return undefined;
    
    const updatedCommand: Command = { ...command, ...update };
    this.commands.set(id, updatedCommand);
    return updatedCommand;
  }

  async deleteCommand(id: string): Promise<boolean> {
    return this.commands.delete(id);
  }

  // Settings
  async getSetting(key: string): Promise<Setting | undefined> {
    return Array.from(this.settings.values()).find(s => s.key === key);
  }

  async getSettings(pagination?: Pagination): Promise<PaginatedResponse<Setting>> {
    const settings = Array.from(this.settings.values()).sort((a, b) => a.key.localeCompare(b.key));
    return this.paginate(settings, pagination);
  }

  async getSettingsByCategory(category: string, pagination?: Pagination): Promise<PaginatedResponse<Setting>> {
    const settings = Array.from(this.settings.values())
      .filter(s => s.category === category)
      .sort((a, b) => a.key.localeCompare(b.key));
    return this.paginate(settings, pagination);
  }

  async createSetting(insertSetting: InsertSetting): Promise<Setting> {
    const id = randomUUID();
    const setting: Setting = { 
      ...insertSetting,
      id,
      updatedAt: new Date(),
      description: insertSetting.description || null,
      category: insertSetting.category || "general"
    };
    this.settings.set(id, setting);
    return setting;
  }

  async updateSetting(key: string, update: Partial<InsertSetting>): Promise<Setting | undefined> {
    const setting = await this.getSetting(key);
    if (!setting) return undefined;
    
    const updatedSetting: Setting = { 
      ...setting, 
      ...update, 
      updatedAt: new Date() 
    };
    this.settings.set(setting.id, updatedSetting);
    return updatedSetting;
  }

  async deleteSetting(key: string): Promise<boolean> {
    const setting = await this.getSetting(key);
    if (!setting) return false;
    return this.settings.delete(setting.id);
  }
}

export const storage = new MemStorage();
