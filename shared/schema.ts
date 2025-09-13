import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Existing users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Comprehensive client data schema for C2 management
export const clients = pgTable("clients", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  hostname: text("hostname").notNull(),
  ipAddress: text("ip_address").notNull(),
  macAddress: text("mac_address"),
  
  // Operating System & Hardware
  operatingSystem: text("operating_system").notNull(),
  osVersion: text("os_version"),
  architecture: text("architecture"),
  processorType: text("processor_type"),
  totalMemory: integer("total_memory"), // in GB
  
  // Geographic & Network Location
  country: text("country"),
  city: text("city"),
  region: text("region"),
  latitude: text("latitude"),
  longitude: text("longitude"),
  timezone: text("timezone"),
  
  // Connection & Status
  status: text("status").notNull(), // online, offline, compromised, error
  lastSeen: timestamp("last_seen", { withTimezone: true }).defaultNow(),
  firstSeen: timestamp("first_seen", { withTimezone: true }).defaultNow(),
  uptime: integer("uptime"), // in seconds
  connectionQuality: text("connection_quality"), // excellent, good, fair, poor
  
  // Security & Privileges
  currentUser: text("current_user"),
  isElevated: boolean("is_elevated").default(false),
  availablePrivileges: json("available_privileges"), // array of privilege types
  userAccounts: json("user_accounts"), // array of user account objects
  
  // System Information
  installedSoftware: json("installed_software"), // array of software objects
  runningProcesses: json("running_processes"), // array of process objects
  openPorts: json("open_ports"), // array of port objects
  networkInterfaces: json("network_interfaces"), // array of network interface objects
  
  // Assessment & Classification
  riskLevel: text("risk_level"), // low, medium, high, critical
  vulnerabilityCount: integer("vulnerability_count").default(0),
  difficulty: text("difficulty"), // beginner, intermediate, advanced
  
  // Metadata
  tags: json("tags"), // array of strings
  notes: text("notes"),
  isActive: boolean("is_active").default(true),
  
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const insertClientSchema = createInsertSchema(clients).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertClient = z.infer<typeof insertClientSchema>;
export type Client = typeof clients.$inferSelect;

// Session management schema
export const sessions = pgTable("sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull(),
  sessionType: text("session_type").notNull(), // shell, file_manager, remote_desktop, surveillance
  status: text("status").notNull(), // active, inactive, terminated
  
  startedAt: timestamp("started_at", { withTimezone: true }).defaultNow(),
  lastActivity: timestamp("last_activity", { withTimezone: true }).defaultNow(),
  endedAt: timestamp("ended_at", { withTimezone: true }),
  
  metadata: json("metadata"), // session-specific data
});

export const insertSessionSchema = createInsertSchema(sessions).omit({
  id: true,
  startedAt: true,
  lastActivity: true,
});

export type InsertSession = z.infer<typeof insertSessionSchema>;
export type Session = typeof sessions.$inferSelect;

// Enhanced type definitions for frontend use
export interface ClientSystemInfo {
  os: string;
  version: string;
  architecture: string;
  processor: string;
  memory: number;
  uptime: number;
}

export interface ClientLocation {
  country: string;
  city: string;
  region: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface ClientUserAccount {
  username: string;
  isAdmin: boolean;
  isActive: boolean;
  lastLogin?: Date;
  groups: string[];
}

export interface ClientSoftware {
  name: string;
  version: string;
  vendor: string;
  installDate?: Date;
  isSystemCritical: boolean;
}

export interface ClientProcess {
  pid: number;
  name: string;
  cpu: number;
  memory: number;
  user: string;
  startTime: Date;
}

export interface ClientNetworkInterface {
  name: string;
  type: string; // ethernet, wifi, vpn
  ipAddress: string;
  macAddress: string;
  isActive: boolean;
  speed?: number;
}

export interface ClientPort {
  port: number;
  protocol: string; // TCP, UDP
  state: string; // LISTENING, ESTABLISHED
  service?: string;
  processName?: string;
}

// ========================================
// C2-CORE Platform Extensions
// ========================================

// Payloads Table
export const payloads = pgTable("payloads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  platform: text("platform").notNull(), // windows, linux, macos, web, mobile, multi
  type: text("type").notNull(), // executable, shellcode, dll, script, webshell, apk, ipa
  name: text("name").notNull(),
  description: text("description"),
  config: json("config"), // payload configuration options
  size: integer("size"), // file size in bytes
  filePath: text("file_path"),
  isGenerated: boolean("is_generated").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const insertPayloadSchema = createInsertSchema(payloads).omit({
  id: true,
  createdAt: true,
});

export type InsertPayload = z.infer<typeof insertPayloadSchema>;
export type Payload = typeof payloads.$inferSelect;

// Exploits Table
export const exploits = pgTable("exploits", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  scope: text("scope").notNull(), // local, remote, web
  cve: text("cve"),
  name: text("name").notNull(),
  description: text("description"),
  moduleRef: text("module_ref"),
  platform: json("platform"), // array of supported platforms
  severity: text("severity").notNull(), // low, medium, high, critical
  published: timestamp("published", { withTimezone: true }),
  verified: boolean("verified").default(false),
  tags: json("tags"), // array of tags
});

export const insertExploitSchema = createInsertSchema(exploits).omit({
  id: true,
});

export type InsertExploit = z.infer<typeof insertExploitSchema>;
export type Exploit = typeof exploits.$inferSelect;

// Modules Table
export const modules = pgTable("modules", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  category: text("category").notNull(), // post, persistence, priv-esc, lateral, recon, exfil, anti-forensics
  name: text("name").notNull(),
  description: text("description").notNull(),
  platform: json("platform"), // array of supported platforms
  requirements: json("requirements"), // array of requirements
  options: json("options"), // module options
  references: json("references"), // array of references
  author: text("author"),
  reliable: boolean("reliable").default(true),
});

export const insertModuleSchema = createInsertSchema(modules).omit({
  id: true,
});

export type InsertModule = z.infer<typeof insertModuleSchema>;
export type Module = typeof modules.$inferSelect;

// Listeners Table
export const listeners = pgTable("listeners", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  protocol: text("protocol").notNull(), // http, https, tcp, udp, dns, smb
  host: text("host").notNull(),
  port: integer("port").notNull(),
  status: text("status").notNull(), // running, stopped, error
  templateId: varchar("template_id"),
  name: text("name").notNull(),
  description: text("description"),
  config: json("config"), // listener configuration
  connectionCount: integer("connection_count").default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  startedAt: timestamp("started_at", { withTimezone: true }),
  stoppedAt: timestamp("stopped_at", { withTimezone: true }),
});

export const insertListenerSchema = createInsertSchema(listeners).omit({
  id: true,
  createdAt: true,
});

export type InsertListener = z.infer<typeof insertListenerSchema>;
export type Listener = typeof listeners.$inferSelect;

// Listener Templates Table
export const listenerTemplates = pgTable("listener_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  protocol: text("protocol").notNull(),
  defaultConfig: json("default_config"),
  description: text("description"),
});

export const insertListenerTemplateSchema = createInsertSchema(listenerTemplates).omit({
  id: true,
});

export type InsertListenerTemplate = z.infer<typeof insertListenerTemplateSchema>;
export type ListenerTemplate = typeof listenerTemplates.$inferSelect;

// Reports Table
export const reports = pgTable("reports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  kind: text("kind").notNull(), // executive, technical, timeline, evidence, screenshots, export
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").notNull(), // draft, review, finalized, archived
  content: text("content"),
  metadata: json("metadata"),
  author: text("author"),
  tags: json("tags"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  finalizedAt: timestamp("finalized_at", { withTimezone: true }),
});

export const insertReportSchema = createInsertSchema(reports).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertReport = z.infer<typeof insertReportSchema>;
export type Report = typeof reports.$inferSelect;

// Evidence Table
export const evidence = pgTable("evidence", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  reportId: varchar("report_id").notNull(),
  type: text("type").notNull(), // file, screenshot, log, network, memory, disk
  name: text("name").notNull(),
  path: text("path"),
  blobRef: text("blob_ref"),
  note: text("note"),
  size: integer("size"),
  hash: text("hash"),
  metadata: json("metadata"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const insertEvidenceSchema = createInsertSchema(evidence).omit({
  id: true,
  createdAt: true,
});

export type InsertEvidence = z.infer<typeof insertEvidenceSchema>;
export type Evidence = typeof evidence.$inferSelect;

// Commands Table
export const commands = pgTable("commands", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: varchar("session_id").notNull(),
  command: text("command").notNull(),
  status: text("status").notNull(), // pending, running, completed, failed, cancelled
  output: text("output"),
  error: text("error"),
  duration: integer("duration"), // in milliseconds
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  startedAt: timestamp("started_at", { withTimezone: true }),
  completedAt: timestamp("completed_at", { withTimezone: true }),
});

export const insertCommandSchema = createInsertSchema(commands).omit({
  id: true,
  createdAt: true,
});

export type InsertCommand = z.infer<typeof insertCommandSchema>;
export type Command = typeof commands.$inferSelect;

// Settings Table
export const settings = pgTable("settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  description: text("description"),
  category: text("category").default("general"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const insertSettingSchema = createInsertSchema(settings).omit({
  id: true,
  updatedAt: true,
});

export type InsertSetting = z.infer<typeof insertSettingSchema>;
export type Setting = typeof settings.$inferSelect;

// ========================================
// Zod Validation Schemas
// ========================================

// Status enums
export const SessionStatus = z.enum(["active", "inactive", "reconnecting", "terminated"]);
export const ListenerStatus = z.enum(["running", "stopped", "error"]);
export const CommandStatus = z.enum(["pending", "running", "completed", "failed", "cancelled"]);
export const ReportStatus = z.enum(["draft", "review", "finalized", "archived"]);

// Platform enums
export const PayloadPlatform = z.enum(["windows", "linux", "macos", "web", "mobile", "multi"]);
export const ExploitScope = z.enum(["local", "remote", "web"]);
export const ModuleCategory = z.enum(["post", "persistence", "priv-esc", "lateral", "recon", "exfil", "anti-forensics"]);
export const ListenerProtocol = z.enum(["http", "https", "tcp", "udp", "dns", "smb"]);

// ========================================
// API Response Types
// ========================================
export const ApiResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    error: z.string().optional(),
    message: z.string().optional(),
  });

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

// Pagination
export const PaginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  total: z.number().optional(),
  totalPages: z.number().optional(),
});

export type Pagination = z.infer<typeof PaginationSchema>;

export const PaginatedResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: z.array(dataSchema).optional(),
    pagination: PaginationSchema.optional(),
    error: z.string().optional(),
    message: z.string().optional(),
  });

export type PaginatedResponse<T> = {
  success: boolean;
  data?: T[];
  pagination?: Pagination;
  error?: string;
  message?: string;
};

// ========================================
// Cyberpunk World Widget Types
// ========================================

// Geographic point for world map visualization
export interface GeoPoint {
  latitude: number;
  longitude: number;
}

// Machine status for cyberpunk visualization
export const MachineStatus = z.enum([
  "online",           // Active and responding
  "compromised",      // Successfully compromised
  "infiltrating",     // In process of compromise
  "offline",          // Not responding
  "error",           // Error state
  "reconnecting",    // Attempting reconnection
  "dormant"          // Sleeping/inactive
]);

export type MachineStatusType = z.infer<typeof MachineStatus>;

// Threat level for visual intensity
export const ThreatLevel = z.enum([
  "minimal",    // Low priority target
  "moderate",   // Standard target
  "high",       // High value target
  "critical",   // Mission critical target
  "classified"  // Top secret operations
]);

export type ThreatLevelType = z.infer<typeof ThreatLevel>;

// Extended machine info for world widget
export interface AffectedMachine {
  id: string;
  hostname: string;
  ipAddress: string;
  location: GeoPoint;
  status: MachineStatusType;
  threatLevel: ThreatLevelType;
  country: string;
  city: string;
  lastSeen: Date;
  connectionQuality: "excellent" | "good" | "fair" | "poor";
  operatingSystem: string;
  userCount?: number;
  activeSessionsCount?: number;
  vulnerabilityCount?: number;
  isElevated?: boolean;
  tags?: string[];
}

// Schema for API responses
export const AffectedMachineSchema = z.object({
  id: z.string(),
  hostname: z.string(),
  ipAddress: z.string(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  status: MachineStatus,
  threatLevel: ThreatLevel,
  country: z.string(),
  city: z.string(),
  lastSeen: z.coerce.date(),
  connectionQuality: z.enum(["excellent", "good", "fair", "poor"]),
  operatingSystem: z.string(),
  userCount: z.number().optional(),
  activeSessionsCount: z.number().optional(),
  vulnerabilityCount: z.number().optional(),
  isElevated: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

// Network activity for real-time visualization
export interface NetworkActivity {
  id: string;
  sourceIp: string;
  targetIp: string;
  sourceLocation: GeoPoint;
  targetLocation: GeoPoint;
  activityType: "data_exfil" | "command" | "surveillance" | "lateral_movement" | "reconnaissance";
  intensity: "low" | "medium" | "high";
  timestamp: Date;
}

export const NetworkActivitySchema = z.object({
  id: z.string(),
  sourceIp: z.string(),
  targetIp: z.string(),
  sourceLocation: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  targetLocation: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  activityType: z.enum(["data_exfil", "command", "surveillance", "lateral_movement", "reconnaissance"]),
  intensity: z.enum(["low", "medium", "high"]),
  timestamp: z.coerce.date(),
});

// World stats for global overview
export interface WorldStats {
  totalMachines: number;
  onlineMachines: number;
  compromisedMachines: number;
  activeSessions: number;
  countriesAffected: number;
  dataExfiltratedGB: number;
  threatsCritical: number;
  lastUpdated: Date;
}

export const WorldStatsSchema = z.object({
  totalMachines: z.number(),
  onlineMachines: z.number(),
  compromisedMachines: z.number(),
  activeSessions: z.number(),
  countriesAffected: z.number(),
  dataExfiltratedGB: z.number(),
  threatsCritical: z.number(),
  lastUpdated: z.coerce.date(),
});
