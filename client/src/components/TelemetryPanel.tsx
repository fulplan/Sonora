import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, BarChart3, Network, Shield, AlertTriangle, 
  TrendingUp, TrendingDown, Eye, Download, Zap, Clock, 
  Server, Database, Cpu, HardDrive, Wifi
} from "lucide-react";
import { useState } from "react";

interface TelemetryEvent {
  id: string;
  timestamp: string;
  source: string;
  event: string;
  details: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'network' | 'system' | 'security' | 'application';
}

export function TelemetryPanel() {
  // Professional government-style telemetry data with comprehensive events
  const [events] = useState<TelemetryEvent[]>([
    {
      id: '001',
      timestamp: '2024-03-14 14:32:15',
      source: 'WIN-DC-2019',
      event: 'Privilege Escalation Detected',
      details: 'SeDebugPrivilege enabled for process: cmd.exe (PID: 2847)',
      severity: 'high',
      category: 'security'
    },
    {
      id: '002',
      timestamp: '2024-03-14 14:32:42',
      source: 'UBUNTU-WEB', 
      event: 'Reverse Shell Connection',
      details: 'Outbound TCP connection established to 10.0.1.100:4444',
      severity: 'critical',
      category: 'network'
    },
    {
      id: '003',
      timestamp: '2024-03-14 14:33:01',
      source: 'CENTOS-DB',
      event: 'Authentication Failure',
      details: 'Multiple failed SSH login attempts from 10.0.1.20 (user: root)',
      severity: 'medium',
      category: 'security'
    },
    {
      id: '004',
      timestamp: '2024-03-14 14:33:15',
      source: 'MACOS-DEV',
      event: 'Suspicious Process Creation',
      details: '/bin/bash spawned by launchctl with elevated privileges',
      severity: 'high',
      category: 'system'
    },
    {
      id: '005',
      timestamp: '2024-03-14 14:33:28',
      source: 'WIN-DC-2019',
      event: 'Registry Persistence Mechanism',
      details: 'New autorun entry: HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\\SecurityUpdate',
      severity: 'critical',
      category: 'system'
    },
    {
      id: '006',
      timestamp: '2024-03-14 14:33:45',
      source: 'UBUNTU-WEB',
      event: 'Data Exfiltration Attempt',
      details: 'Large file transfer detected: /etc/passwd, /etc/shadow (2.3MB)',
      severity: 'critical',
      category: 'network'
    },
    {
      id: '007',
      timestamp: '2024-03-14 14:34:12',
      source: 'FIREWALL-01',
      event: 'Port Scan Detected',
      details: 'Nmap scan detected from 10.0.1.20 targeting DMZ network',
      severity: 'medium',
      category: 'network'
    },
    {
      id: '008',
      timestamp: '2024-03-14 14:34:28',
      source: 'CENTOS-DB',
      event: 'Database Query Injection',
      details: 'SQL injection attempt in login form: UNION SELECT * FROM users',
      severity: 'high',
      category: 'application'
    }
  ]);

  const networkTraffic = [
    { protocol: "HTTPS", requests: 2847, status: "normal", trend: "up" },
    { protocol: "SSH", connections: 156, status: "elevated", trend: "up" },
    { protocol: "RDP", attempts: 23, status: "suspicious", trend: "down" },
    { protocol: "SMB", transfers: 892, status: "normal", trend: "stable" }
  ];

  const systemMetrics = {
    cpuUsage: 34,
    memoryUsage: 68,
    networkLoad: 23,
    diskIO: 12,
    activeConnections: 892,
    blockedAttempts: 156,
    dataProcessed: "2.3 GB",
    uptime: "99.7%"
  };

  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900';
      case 'medium': return 'text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900';
      case 'high': return 'text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900';
      case 'critical': return 'text-red-100 bg-red-600 dark:bg-red-800';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'network': return Network;
      case 'security': return Shield;
      case 'system': return Server;
      case 'application': return Database;
      default: return Activity;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-600 dark:text-green-400" />;
      case 'down': return <TrendingDown className="w-3 h-3 text-red-600 dark:text-red-400" />;
      default: return <div className="w-3 h-3 rounded-full bg-muted-foreground" />;
    }
  };

  const filteredEvents = selectedSeverity 
    ? events.filter(event => event.severity === selectedSeverity)
    : events;

  const severityCounts = {
    low: events.filter(e => e.severity === 'low').length,
    medium: events.filter(e => e.severity === 'medium').length,
    high: events.filter(e => e.severity === 'high').length,
    critical: events.filter(e => e.severity === 'critical').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold gov-header flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Real-Time Intelligence & Monitoring
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Live Feed
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* System Performance */}
        <Card className="gov-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 gov-header">
              <Cpu className="w-4 h-4" />
              System Performance
            </CardTitle>
            <CardDescription className="gov-body">
              Real-time infrastructure monitoring
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="gov-body">CPU Usage</span>
                  <span className="font-mono">{systemMetrics.cpuUsage}%</span>
                </div>
                <Progress value={systemMetrics.cpuUsage} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="gov-body">Memory Usage</span>
                  <span className="font-mono">{systemMetrics.memoryUsage}%</span>
                </div>
                <Progress value={systemMetrics.memoryUsage} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="gov-body">Network Load</span>
                  <span className="font-mono">{systemMetrics.networkLoad}%</span>
                </div>
                <Progress value={systemMetrics.networkLoad} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="gov-body">Disk I/O</span>
                  <span className="font-mono">{systemMetrics.diskIO}%</span>
                </div>
                <Progress value={systemMetrics.diskIO} className="h-2" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <p className="text-lg font-semibold">{systemMetrics.activeConnections}</p>
                <p className="text-xs text-muted-foreground">Active Connections</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold">{systemMetrics.uptime}</p>
                <p className="text-xs text-muted-foreground">System Uptime</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Network Traffic */}
        <Card className="gov-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 gov-header">
              <Wifi className="w-4 h-4" />
              Network Traffic Analysis
            </CardTitle>
            <CardDescription className="gov-body">
              Protocol analysis and traffic patterns
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {networkTraffic.map((traffic, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border">
                <div className="flex items-center gap-3">
                  <div className="space-y-1">
                    <p className="font-medium text-sm gov-body">{traffic.protocol}</p>
                    <p className="text-xs text-muted-foreground gov-mono">
                      {traffic.protocol === 'HTTPS' ? 'Requests' : 
                       traffic.protocol === 'SSH' ? 'Connections' : 
                       traffic.protocol === 'RDP' ? 'Attempts' : 
                       'Transfers'}: {traffic.requests || traffic.connections || traffic.attempts || traffic.transfers}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={traffic.status === 'suspicious' ? 'destructive' : traffic.status === 'elevated' ? 'default' : 'secondary'}
                    className="text-xs font-mono"
                  >
                    {traffic.status.toUpperCase()}
                  </Badge>
                  {getTrendIcon(traffic.trend)}
                </div>
              </div>
            ))}

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <p className="text-lg font-semibold">{systemMetrics.dataProcessed}</p>
                <p className="text-xs text-muted-foreground">Data Processed</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold">{systemMetrics.blockedAttempts}</p>
                <p className="text-xs text-muted-foreground">Blocked Attempts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Events */}
        <Card className="gov-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 gov-header">
                  <Shield className="w-4 h-4" />
                  Security Events
                </CardTitle>
                <CardDescription className="gov-body">
                  Real-time security incident monitoring
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-xs">Live</span>
                </Button>
              </div>
            </div>

            {/* Severity Filters */}
            <div className="flex gap-2 flex-wrap pt-2">
              {Object.entries(severityCounts).map(([severity, count]) => (
                <Badge 
                  key={severity}
                  variant={selectedSeverity === severity ? "default" : "outline"}
                  className={`cursor-pointer hover-elevate text-xs transition-all ${
                    selectedSeverity === severity ? getSeverityColor(severity) : ''
                  }`}
                  onClick={() => setSelectedSeverity(selectedSeverity === severity ? null : severity)}
                  data-testid={`filter-${severity}`}
                >
                  {severity.toUpperCase()}: {count}
                </Badge>
              ))}
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <ScrollArea className="h-80">
              <div className="p-4 space-y-2">
                {filteredEvents.map((event) => {
                  const CategoryIcon = getCategoryIcon(event.category);
                  
                  return (
                    <div 
                      key={event.id} 
                      className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/20 transition-colors cursor-pointer"
                      data-testid={`telemetry-event-${event.id}`}
                    >
                      <div className="flex-shrink-0 p-1.5 rounded-full bg-muted/50 mt-0.5">
                        <CategoryIcon className="w-3 h-3 text-muted-foreground" />
                      </div>
                      
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-sm gov-body">{event.event}</span>
                          <Badge className={`${getSeverityColor(event.severity)} text-xs border-0`}>
                            {event.severity.toUpperCase()}
                          </Badge>
                        </div>
                        
                        <p className="text-xs text-muted-foreground gov-body">{event.details}</p>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="font-mono">{event.source}</span>
                          <span className="font-mono">
                            {event.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t border-border">
              <Button variant="ghost" size="sm" className="w-full" data-testid="button-view-all-events">
                <Zap className="w-4 h-4 mr-2" />
                View Complete Event Log ({events.length} total)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}