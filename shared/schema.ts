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
