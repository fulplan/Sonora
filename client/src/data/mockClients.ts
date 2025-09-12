import type { Client } from '@/../../shared/schema';

// Comprehensive mock data for C2 client management
export const mockClients: Client[] = [
  // Corporate Windows workstations
  {
    id: "client-001",
    hostname: "CORP-WIN-001",
    ipAddress: "192.168.1.45",
    macAddress: "00:1A:2B:3C:4D:5E",
    
    operatingSystem: "Windows 11 Pro",
    osVersion: "22H2 (Build 22621.2428)",
    architecture: "x64",
    processorType: "Intel Core i7-12700K",
    totalMemory: 32,
    
    country: "United States",
    city: "New York",
    region: "NY",
    latitude: "40.7128",
    longitude: "-74.0060",
    timezone: "America/New_York",
    
    status: "online",
    lastSeen: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    firstSeen: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    uptime: 345600, // 4 days in seconds
    connectionQuality: "excellent",
    
    currentUser: "j.smith",
    isElevated: true,
    availablePrivileges: ["admin", "debug", "backup"],
    userAccounts: [
      { username: "j.smith", isAdmin: true, isActive: true, groups: ["Administrators", "Domain Admins"] },
      { username: "backup_svc", isAdmin: false, isActive: true, groups: ["Backup Operators"] }
    ],
    
    installedSoftware: [
      { name: "Microsoft Office 365", version: "16.0.16827", vendor: "Microsoft", isSystemCritical: false },
      { name: "Google Chrome", version: "119.0.6045.199", vendor: "Google", isSystemCritical: false },
      { name: "Windows Defender", version: "4.18.23110.3", vendor: "Microsoft", isSystemCritical: true }
    ],
    
    runningProcesses: [
      { pid: 1234, name: "chrome.exe", cpu: 15.2, memory: 512, user: "j.smith", startTime: new Date() },
      { pid: 5678, name: "outlook.exe", cpu: 3.1, memory: 256, user: "j.smith", startTime: new Date() }
    ],
    
    openPorts: [
      { port: 445, protocol: "TCP", state: "LISTENING", service: "SMB", processName: "System" },
      { port: 3389, protocol: "TCP", state: "LISTENING", service: "RDP", processName: "svchost.exe" }
    ],
    
    networkInterfaces: [
      { name: "Ethernet", type: "ethernet", ipAddress: "192.168.1.45", macAddress: "00:1A:2B:3C:4D:5E", isActive: true, speed: 1000 }
    ],
    
    riskLevel: "high",
    vulnerabilityCount: 8,
    difficulty: "intermediate",
    
    tags: ["corporate", "finance", "critical"],
    notes: "Domain controller with elevated privileges. High-value target for lateral movement.",
    isActive: true,
    
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 60 * 1000)
  },

  // Linux server - compromised
  {
    id: "client-002",
    hostname: "web-server-01",
    ipAddress: "10.0.0.25",
    macAddress: "02:42:AC:11:00:02",
    
    operatingSystem: "Ubuntu Server",
    osVersion: "22.04.3 LTS",
    architecture: "x64",
    processorType: "AMD EPYC 7502P",
    totalMemory: 64,
    
    country: "Germany",
    city: "Frankfurt",
    region: "Hesse",
    latitude: "50.1109",
    longitude: "8.6821",
    timezone: "Europe/Berlin",
    
    status: "compromised",
    lastSeen: new Date(Date.now() - 30 * 1000), // 30 seconds ago
    firstSeen: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    uptime: 1209600, // 14 days in seconds
    connectionQuality: "good",
    
    currentUser: "www-data",
    isElevated: false,
    availablePrivileges: ["read", "execute"],
    userAccounts: [
      { username: "root", isAdmin: true, isActive: true, groups: ["root"] },
      { username: "www-data", isAdmin: false, isActive: true, groups: ["www-data"] },
      { username: "ubuntu", isAdmin: true, isActive: true, groups: ["sudo", "admin"] }
    ],
    
    installedSoftware: [
      { name: "Apache HTTP Server", version: "2.4.52", vendor: "Apache Software Foundation", isSystemCritical: true },
      { name: "PHP", version: "8.1.2", vendor: "The PHP Group", isSystemCritical: true },
      { name: "MySQL Server", version: "8.0.35", vendor: "Oracle Corporation", isSystemCritical: true }
    ],
    
    runningProcesses: [
      { pid: 1001, name: "apache2", cpu: 8.5, memory: 128, user: "www-data", startTime: new Date() },
      { pid: 1002, name: "mysqld", cpu: 12.3, memory: 1024, user: "mysql", startTime: new Date() }
    ],
    
    openPorts: [
      { port: 80, protocol: "TCP", state: "LISTENING", service: "HTTP", processName: "apache2" },
      { port: 443, protocol: "TCP", state: "LISTENING", service: "HTTPS", processName: "apache2" },
      { port: 22, protocol: "TCP", state: "LISTENING", service: "SSH", processName: "sshd" }
    ],
    
    networkInterfaces: [
      { name: "eth0", type: "ethernet", ipAddress: "10.0.0.25", macAddress: "02:42:AC:11:00:02", isActive: true, speed: 10000 }
    ],
    
    riskLevel: "critical",
    vulnerabilityCount: 15,
    difficulty: "advanced",
    
    tags: ["web-server", "php", "database", "production"],
    notes: "Web server with shell access obtained. Contains customer database and sensitive information.",
    isActive: true,
    
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 30 * 1000)
  },

  // MacOS developer workstation
  {
    id: "client-003",
    hostname: "MacBook-Pro-Dev",
    ipAddress: "172.16.0.100",
    macAddress: "88:66:5A:10:3B:2C",
    
    operatingSystem: "macOS Sonoma",
    osVersion: "14.1.2 (23B92)",
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
    lastSeen: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    firstSeen: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    uptime: 259200, // 3 days in seconds
    connectionQuality: "fair",
    
    currentUser: "dev.user",
    isElevated: false,
    availablePrivileges: ["read", "execute", "write"],
    userAccounts: [
      { username: "root", isAdmin: true, isActive: true, groups: ["wheel"] },
      { username: "dev.user", isAdmin: false, isActive: true, groups: ["staff", "admin"] }
    ],
    
    installedSoftware: [
      { name: "Xcode", version: "15.1", vendor: "Apple Inc.", isSystemCritical: false },
      { name: "Visual Studio Code", version: "1.84.2", vendor: "Microsoft", isSystemCritical: false },
      { name: "Docker Desktop", version: "4.25.2", vendor: "Docker Inc.", isSystemCritical: false }
    ],
    
    runningProcesses: [
      { pid: 2001, name: "Xcode", cpu: 25.8, memory: 2048, user: "dev.user", startTime: new Date() },
      { pid: 2002, name: "Code", cpu: 5.2, memory: 512, user: "dev.user", startTime: new Date() }
    ],
    
    openPorts: [
      { port: 22, protocol: "TCP", state: "LISTENING", service: "SSH", processName: "sshd" },
      { port: 8080, protocol: "TCP", state: "LISTENING", service: "HTTP-Alt", processName: "node" }
    ],
    
    networkInterfaces: [
      { name: "en0", type: "wifi", ipAddress: "172.16.0.100", macAddress: "88:66:5A:10:3B:2C", isActive: true, speed: 867 }
    ],
    
    riskLevel: "medium",
    vulnerabilityCount: 3,
    difficulty: "beginner",
    
    tags: ["developer", "mac", "mobile-dev"],
    notes: "Developer workstation with source code access. Potential intellectual property target.",
    isActive: true,
    
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 1000)
  },

  // Windows domain controller - offline
  {
    id: "client-004",
    hostname: "DC-PRIMARY",
    ipAddress: "192.168.1.10",
    macAddress: "00:50:56:A1:B2:C3",
    
    operatingSystem: "Windows Server 2022",
    osVersion: "21H2 (Build 20348.2113)",
    architecture: "x64",
    processorType: "Intel Xeon E5-2680 v4",
    totalMemory: 128,
    
    country: "United Kingdom",
    city: "London",
    region: "England",
    latitude: "51.5074",
    longitude: "-0.1278",
    timezone: "Europe/London",
    
    status: "offline",
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    firstSeen: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    uptime: 0, // currently offline
    connectionQuality: "poor",
    
    currentUser: "SYSTEM",
    isElevated: true,
    availablePrivileges: ["admin", "system", "debug", "backup"],
    userAccounts: [
      { username: "Administrator", isAdmin: true, isActive: true, groups: ["Domain Admins", "Enterprise Admins"] },
      { username: "krbtgt", isAdmin: false, isActive: false, groups: ["Domain Users"] }
    ],
    
    installedSoftware: [
      { name: "Active Directory Domain Services", version: "10.0.20348", vendor: "Microsoft", isSystemCritical: true },
      { name: "DNS Server", version: "10.0.20348", vendor: "Microsoft", isSystemCritical: true },
      { name: "DHCP Server", version: "10.0.20348", vendor: "Microsoft", isSystemCritical: true }
    ],
    
    runningProcesses: [], // offline, no processes
    
    openPorts: [
      { port: 389, protocol: "TCP", state: "LISTENING", service: "LDAP", processName: "lsass.exe" },
      { port: 53, protocol: "UDP", state: "LISTENING", service: "DNS", processName: "dns.exe" }
    ],
    
    networkInterfaces: [
      { name: "Ethernet", type: "ethernet", ipAddress: "192.168.1.10", macAddress: "00:50:56:A1:B2:C3", isActive: false, speed: 1000 }
    ],
    
    riskLevel: "critical",
    vulnerabilityCount: 12,
    difficulty: "advanced",
    
    tags: ["domain-controller", "critical", "ad", "dns", "dhcp"],
    notes: "Primary domain controller. CRITICAL TARGET - Controls entire domain infrastructure.",
    isActive: true,
    
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },

  // Android mobile device
  {
    id: "client-005",
    hostname: "Galaxy-S23-Ultra",
    ipAddress: "192.168.43.157",
    macAddress: "A4:C3:F0:85:AC:2D",
    
    operatingSystem: "Android",
    osVersion: "14 (API 34)",
    architecture: "arm64-v8a",
    processorType: "Snapdragon 8 Gen 2",
    totalMemory: 8,
    
    country: "Japan",
    city: "Tokyo",
    region: "Tokyo",
    latitude: "35.6762",
    longitude: "139.6503",
    timezone: "Asia/Tokyo",
    
    status: "online",
    lastSeen: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
    firstSeen: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    uptime: 86400, // 1 day in seconds
    connectionQuality: "good",
    
    currentUser: "android_user",
    isElevated: true, // rooted device
    availablePrivileges: ["root", "system"],
    userAccounts: [
      { username: "root", isAdmin: true, isActive: true, groups: ["root"] },
      { username: "system", isAdmin: false, isActive: true, groups: ["system"] }
    ],
    
    installedSoftware: [
      { name: "Chrome", version: "119.0.6045.193", vendor: "Google", isSystemCritical: false },
      { name: "WhatsApp", version: "2.23.24.21", vendor: "Meta", isSystemCritical: false },
      { name: "Banking App", version: "12.4.1", vendor: "MUFG Bank", isSystemCritical: false }
    ],
    
    runningProcesses: [
      { pid: 3001, name: "com.android.chrome", cpu: 8.2, memory: 256, user: "u0_a123", startTime: new Date() },
      { pid: 3002, name: "com.whatsapp", cpu: 2.1, memory: 128, user: "u0_a456", startTime: new Date() }
    ],
    
    openPorts: [
      { port: 5555, protocol: "TCP", state: "LISTENING", service: "ADB", processName: "adbd" }
    ],
    
    networkInterfaces: [
      { name: "wlan0", type: "wifi", ipAddress: "192.168.43.157", macAddress: "A4:C3:F0:85:AC:2D", isActive: true, speed: 300 }
    ],
    
    riskLevel: "high",
    vulnerabilityCount: 6,
    difficulty: "intermediate",
    
    tags: ["mobile", "android", "rooted", "banking"],
    notes: "Rooted Android device with banking apps. High-value target for financial fraud.",
    isActive: true,
    
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 60 * 1000)
  },

  // Linux IoT device
  {
    id: "client-006",
    hostname: "rpi-security-cam-01",
    ipAddress: "192.168.1.200",
    macAddress: "B8:27:EB:12:34:56",
    
    operatingSystem: "Raspberry Pi OS",
    osVersion: "Debian GNU/Linux 12 (bookworm)",
    architecture: "armv7l",
    processorType: "ARM Cortex-A72",
    totalMemory: 4,
    
    country: "Australia",
    city: "Sydney",
    region: "NSW",
    latitude: "-33.8688",
    longitude: "151.2093",
    timezone: "Australia/Sydney",
    
    status: "compromised",
    lastSeen: new Date(Date.now() - 10 * 1000), // 10 seconds ago
    firstSeen: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
    uptime: 2592000, // 30 days in seconds
    connectionQuality: "excellent",
    
    currentUser: "pi",
    isElevated: false,
    availablePrivileges: ["read", "execute"],
    userAccounts: [
      { username: "root", isAdmin: true, isActive: true, groups: ["root"] },
      { username: "pi", isAdmin: true, isActive: true, groups: ["sudo", "adm", "dialout"] }
    ],
    
    installedSoftware: [
      { name: "Motion", version: "4.5.1", vendor: "Motion Project", isSystemCritical: true },
      { name: "OpenSSH Server", version: "9.2p1", vendor: "OpenBSD", isSystemCritical: true },
      { name: "Python", version: "3.11.2", vendor: "Python Software Foundation", isSystemCritical: false }
    ],
    
    runningProcesses: [
      { pid: 1500, name: "motion", cpu: 15.6, memory: 64, user: "pi", startTime: new Date() },
      { pid: 1501, name: "sshd", cpu: 0.1, memory: 8, user: "root", startTime: new Date() }
    ],
    
    openPorts: [
      { port: 22, protocol: "TCP", state: "LISTENING", service: "SSH", processName: "sshd" },
      { port: 8081, protocol: "TCP", state: "LISTENING", service: "Motion-HTTP", processName: "motion" }
    ],
    
    networkInterfaces: [
      { name: "eth0", type: "ethernet", ipAddress: "192.168.1.200", macAddress: "B8:27:EB:12:34:56", isActive: true, speed: 100 }
    ],
    
    riskLevel: "medium",
    vulnerabilityCount: 4,
    difficulty: "beginner",
    
    tags: ["iot", "raspberry-pi", "camera", "surveillance"],
    notes: "IoT security camera with weak credentials. Provides network surveillance capabilities.",
    isActive: true,
    
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 10 * 1000)
  }
];

// Helper functions for data analysis
export const getClientsByStatus = (clients: Client[]) => {
  return clients.reduce((acc, client) => {
    acc[client.status] = (acc[client.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

export const getClientsByOS = (clients: Client[]) => {
  return clients.reduce((acc, client) => {
    const os = client.operatingSystem.split(' ')[0]; // Get base OS name
    acc[os] = (acc[os] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

export const getClientsByCountry = (clients: Client[]) => {
  return clients.reduce((acc, client) => {
    if (client.country) {
      acc[client.country] = (acc[client.country] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
};

export const getClientsByRiskLevel = (clients: Client[]) => {
  return clients.reduce((acc, client) => {
    if (client.riskLevel) {
      acc[client.riskLevel] = (acc[client.riskLevel] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
};

export const getRecentActivity = (clients: Client[], hours: number = 24) => {
  const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
  return clients.filter(client => 
    client.lastSeen && new Date(client.lastSeen) > cutoff
  );
};