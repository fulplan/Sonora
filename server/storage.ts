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
    // Seed sample sessions
    const sampleSessions = [
      {
        clientId: "client-1",
        sessionType: "shell",
        status: "active",
        metadata: { type: "reverse_shell", port: 4444 }
      },
      {
        clientId: "client-2", 
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
