import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, Target, Terminal, Activity, Play, Server, 
  Globe, Users, Clock, AlertTriangle, CheckCircle2,
  Network, FileText, Settings, Eye, MapPin, Zap,
  Monitor, Wifi, WifiOff, Skull, Lock, Unlock,
  ArrowUp, ArrowDown, Minus, ChevronRight, 
  Command, Radio, Database, HardDrive, Cpu,
  Signal, AlertCircle, TrendingUp, BarChart3,
  Hash, Calendar, Download, Upload, Filter,
  RefreshCw, Search, MoreHorizontal, ExternalLink
} from "lucide-react";

export default function Dashboard() {
  // Global C2 Statistics
  const globalStats = [
    { 
      label: "Active Clients", 
      value: "247", 
      icon: Users, 
      color: "text-cyan-400",
      trend: "+12",
      trendDirection: "up"
    },
    { 
      label: "Compromised Systems", 
      value: "89", 
      icon: Skull, 
      color: "text-red-400",
      trend: "+7",
      trendDirection: "up"
    },
    { 
      label: "Active Sessions", 
      value: "34", 
      icon: Terminal, 
      color: "text-green-400",
      trend: "0",
      trendDirection: "stable"
    },
    { 
      label: "Success Rate", 
      value: "94.7%", 
      icon: Target, 
      color: "text-amber-400",
      trend: "+2.1%",
      trendDirection: "up"
    },
  ];

  // World Map Client Locations
  const clientLocations = [
    { id: "us-east", name: "US East Coast", lat: 40.7128, lng: -74.0060, clients: 45, status: "online", country: "United States" },
    { id: "us-west", name: "US West Coast", lat: 34.0522, lng: -118.2437, clients: 32, status: "compromised", country: "United States" },
    { id: "eu-central", name: "EU Central", lat: 50.1109, lng: 8.6821, clients: 28, status: "online", country: "Germany" },
    { id: "asia-pacific", name: "Asia Pacific", lat: 35.6762, lng: 139.6503, clients: 19, status: "offline", country: "Japan" },
    { id: "uk", name: "United Kingdom", lat: 51.5074, lng: -0.1278, clients: 23, status: "online", country: "United Kingdom" },
    { id: "canada", name: "Canada", lat: 45.4215, lng: -75.6972, clients: 15, status: "compromised", country: "Canada" },
    { id: "australia", name: "Australia", lat: -33.8688, lng: 151.2093, clients: 12, status: "online", country: "Australia" },
    { id: "brazil", name: "Brazil", lat: -23.5505, lng: -46.6333, clients: 8, status: "offline", country: "Brazil" }
  ];

  // Active Sessions Data
  const activeSessions = [
    {
      id: "sess-001",
      hostname: "DESKTOP-A7X9K2L",
      ip: "192.168.1.105",
      os: "Windows 11 Pro",
      user: "admin",
      uptime: "02:34:15",
      lastSeen: "2 min ago",
      status: "active",
      location: "New York, US",
      privileges: "SYSTEM"
    },
    {
      id: "sess-002", 
      hostname: "UBUNTU-SERVER-01",
      ip: "10.0.0.15",
      os: "Ubuntu 22.04 LTS",
      user: "root",
      uptime: "12:45:30",
      lastSeen: "5 min ago",
      status: "idle",
      location: "London, UK",
      privileges: "root"
    },
    {
      id: "sess-003",
      hostname: "MACOS-WORKSTATION",
      ip: "172.16.0.42",
      os: "macOS Ventura",
      user: "developer",
      uptime: "00:47:22",
      lastSeen: "1 min ago", 
      status: "active",
      location: "Tokyo, JP",
      privileges: "user"
    },
    {
      id: "sess-004",
      hostname: "WIN-SRV-DC01",
      ip: "10.0.1.10",
      os: "Windows Server 2019",
      user: "Administrator",
      uptime: "96:12:08",
      lastSeen: "30 sec ago",
      status: "active",
      location: "Frankfurt, DE",
      privileges: "Administrator"
    },
    {
      id: "sess-005",
      hostname: "CENTOS-WEB-01", 
      ip: "203.0.113.25",
      os: "CentOS 8",
      user: "apache",
      uptime: "08:15:45",
      lastSeen: "10 min ago",
      status: "disconnected",
      location: "Sydney, AU",
      privileges: "user"
    }
  ];

  // Recent Activity Feed
  const recentActivity = [
    {
      id: "act-001",
      type: "command",
      timestamp: "14:32:15",
      source: "DESKTOP-A7X9K2L",
      action: "Executed privilege escalation",
      details: "whoami /priv - SeDebugPrivilege enabled",
      severity: "high",
      icon: Terminal
    },
    {
      id: "act-002",
      type: "connection", 
      timestamp: "14:31:42",
      source: "185.199.108.153",
      action: "New client connected",
      details: "UBUNTU-SERVER-01 established reverse shell",
      severity: "info",
      icon: Wifi
    },
    {
      id: "act-003",
      type: "alert",
      timestamp: "14:30:18",
      source: "WIN-SRV-DC01",
      action: "Security alert triggered",
      details: "Multiple failed authentication attempts detected",
      severity: "warning",
      icon: AlertTriangle
    },
    {
      id: "act-004",
      type: "command",
      timestamp: "14:29:55",
      source: "MACOS-WORKSTATION",
      action: "File system enumeration",
      details: "find / -type f -perm -4000 2>/dev/null",
      severity: "medium",
      icon: FileText
    },
    {
      id: "act-005",
      type: "system",
      timestamp: "14:28:33",
      source: "C2-INFRASTRUCTURE",
      action: "Payload deployment successful",
      details: "Persistence mechanism installed on 3 targets",
      severity: "success",
      icon: CheckCircle2
    },
    {
      id: "act-006",
      type: "connection",
      timestamp: "14:27:12",
      source: "CENTOS-WEB-01",
      action: "Session timeout",
      details: "Client disconnected after 8h 15m",
      severity: "info",
      icon: WifiOff
    }
  ];

  // Quick Actions Data
  const quickActions = [
    { label: "Shell", icon: Terminal, action: "open-shell", color: "text-cyan-400" },
    { label: "File Manager", icon: FileText, action: "file-manager", color: "text-green-400" },
    { label: "Process List", icon: Activity, action: "process-list", color: "text-blue-400" },
    { label: "Network Scan", icon: Network, action: "network-scan", color: "text-purple-400" },
    { label: "Screenshots", icon: Monitor, action: "screenshot", color: "text-amber-400" },
    { label: "Keylogger", icon: Command, action: "keylogger", color: "text-red-400" },
    { label: "Webcam", icon: Eye, action: "webcam", color: "text-pink-400" },
    { label: "Audio Record", icon: Radio, action: "audio-record", color: "text-orange-400" }
  ];

  // Network Intelligence Data
  const networkSegments = [
    { 
      name: "Corporate LAN", 
      subnet: "192.168.1.0/24", 
      hosts: 156, 
      compromised: 23, 
      risk: "medium",
      coverage: 14.7
    },
    { 
      name: "DMZ", 
      subnet: "10.0.0.0/24", 
      hosts: 45, 
      compromised: 12, 
      risk: "high",
      coverage: 26.7
    },
    { 
      name: "Internal Servers", 
      subnet: "172.16.0.0/20", 
      hosts: 89, 
      compromised: 8, 
      risk: "low",
      coverage: 9.0
    },
    { 
      name: "Guest Network", 
      subnet: "10.1.0.0/24", 
      hosts: 234, 
      compromised: 67, 
      risk: "critical",
      coverage: 28.6
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'online': return 'text-green-400';
      case 'compromised': return 'text-red-400';
      case 'idle': return 'text-amber-400';
      case 'disconnected': case 'offline': return 'text-gray-400';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'active': case 'online': return 'bg-green-400';
      case 'compromised': return 'bg-red-400';
      case 'idle': return 'bg-amber-400';
      case 'disconnected': case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'success': return 'text-green-400';
      case 'info': return 'text-blue-400';
      case 'warning': return 'text-amber-400';
      case 'high': case 'critical': return 'text-red-400';
      case 'medium': return 'text-orange-400';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400 bg-green-400/10';
      case 'medium': return 'text-amber-400 bg-amber-400/10';
      case 'high': return 'text-orange-400 bg-orange-400/10';
      case 'critical': return 'text-red-400 bg-red-400/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up': return <ArrowUp className="w-3 h-3 text-green-400" />;
      case 'down': return <ArrowDown className="w-3 h-3 text-red-400" />;
      default: return <Minus className="w-3 h-3 text-muted-foreground" />;
    }
  };

  return (
    <div className="container-responsive py-6 space-y-6" data-testid="dashboard-page">

      {/* Global Statistics Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {globalStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card 
              key={index} 
              className="bg-card/50 border-border/50 backdrop-blur-sm" 
              data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide font-mono">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-foreground font-mono">
                      {stat.value}
                    </p>
                    <div className="flex items-center gap-1 text-xs">
                      {getTrendIcon(stat.trendDirection)}
                      <span className={stat.trendDirection === 'up' ? 'text-green-400' : stat.trendDirection === 'down' ? 'text-red-400' : 'text-muted-foreground'}>
                        {stat.trend}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/20">
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - World Map & Sessions */}
        <div className="xl:col-span-2 space-y-6">
          {/* Interactive World Map */}
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 font-mono">
                    <Globe className="w-5 h-5 text-cyan-400" />
                    Global Client Distribution
                  </CardTitle>
                  <CardDescription>
                    Real-time client locations and status overview
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" data-testid="button-refresh-map">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Mock World Map SVG */}
              <div className="relative bg-muted/10 rounded-lg p-4 h-64 overflow-hidden">
                <svg viewBox="0 0 800 400" className="w-full h-full">
                  {/* Simplified world map background */}
                  <rect width="800" height="400" fill="hsl(var(--muted))" opacity="0.1" />
                  
                  {/* Client location markers */}
                  {clientLocations.map((location, index) => {
                    const x = ((location.lng + 180) / 360) * 800;
                    const y = ((90 - location.lat) / 180) * 400;
                    
                    return (
                      <g key={location.id}>
                        {/* Connection lines */}
                        <line 
                          x1="400" y1="200" 
                          x2={x} y2={y} 
                          stroke="hsl(var(--muted-foreground))" 
                          strokeWidth="1" 
                          opacity="0.3"
                        />
                        {/* Location pin */}
                        <circle 
                          cx={x} 
                          cy={y} 
                          r="6" 
                          fill={location.status === 'online' ? '#22d3ee' : location.status === 'compromised' ? '#ef4444' : '#6b7280'}
                          className="cursor-pointer hover:opacity-80"
                          data-testid={`map-pin-${location.id}`}
                        />
                        {/* Client count */}
                        <text 
                          x={x} 
                          y={y - 12} 
                          textAnchor="middle" 
                          className="text-xs font-mono fill-foreground"
                        >
                          {location.clients}
                        </text>
                      </g>
                    );
                  })}
                  
                  {/* Central C2 server */}
                  <circle cx="400" cy="200" r="8" fill="hsl(var(--primary))" />
                  <text x="400" y="185" textAnchor="middle" className="text-sm font-mono fill-primary">C2</text>
                </svg>
                
                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg p-3">
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                      <span>Online</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <span>Compromised</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                      <span>Offline</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Location Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {clientLocations.slice(0, 4).map((location) => (
                  <div key={location.id} className="p-3 bg-muted/20 rounded-lg border border-border/50">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{location.country}</p>
                        <p className="text-xs text-muted-foreground font-mono">{location.clients} clients</p>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${getStatusDot(location.status)}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Sessions Overview */}
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 font-mono">
                    <Terminal className="w-5 h-5 text-green-400" />
                    Active Sessions ({activeSessions.length})
                  </CardTitle>
                  <CardDescription>
                    Real-time client session monitoring
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" data-testid="button-filter-sessions">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" data-testid="button-refresh-sessions">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-80">
                <div className="space-y-3">
                  {activeSessions.map((session) => (
                    <div 
                      key={session.id} 
                      className="flex items-center gap-4 p-4 bg-muted/20 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors cursor-pointer"
                      data-testid={`session-${session.id}`}
                    >
                      <div className={`w-3 h-3 rounded-full ${getStatusDot(session.status)} flex-shrink-0`}></div>
                      
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 min-w-0">
                        <div className="space-y-1">
                          <p className="text-sm font-medium font-mono truncate">{session.hostname}</p>
                          <p className="text-xs text-muted-foreground">{session.ip}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm">{session.os}</p>
                          <p className="text-xs text-muted-foreground">{session.user}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm font-mono">{session.uptime}</p>
                          <p className="text-xs text-muted-foreground">{session.lastSeen}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <Badge 
                            variant={session.status === 'active' ? 'default' : session.status === 'idle' ? 'secondary' : 'outline'}
                            className="text-xs font-mono"
                          >
                            {session.status.toUpperCase()}
                          </Badge>
                          <p className="text-xs text-muted-foreground">{session.privileges}</p>
                        </div>
                        
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" data-testid={`button-interact-${session.id}`}>
                            <Terminal className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" data-testid={`button-details-${session.id}`}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" data-testid={`button-more-${session.id}`}>
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Activity & Actions */}
        <div className="space-y-6">
          {/* Recent Activity Feed */}
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 font-mono">
                    <Activity className="w-5 h-5 text-amber-400" />
                    Activity Feed
                  </CardTitle>
                  <CardDescription>
                    Real-time operational events
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" data-testid="button-clear-feed">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-80">
                <div className="space-y-3">
                  {recentActivity.map((activity) => {
                    const IconComponent = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 border border-border/50">
                        <div className={`p-2 rounded-lg bg-muted/30 flex-shrink-0`}>
                          <IconComponent className={`w-4 h-4 ${getSeverityColor(activity.severity)}`} />
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium truncate">{activity.action}</p>
                            <span className="text-xs text-muted-foreground font-mono">{activity.timestamp}</span>
                          </div>
                          <p className="text-xs text-muted-foreground font-mono">{activity.source}</p>
                          <p className="text-xs text-muted-foreground">{activity.details}</p>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getSeverityColor(activity.severity)}`}
                          >
                            {activity.severity.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Quick Actions Dashboard */}
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-mono">
                <Zap className="w-5 h-5 text-purple-400" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Common C2 operations and tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <Button 
                      key={index}
                      variant="outline" 
                      className="h-16 flex-col gap-2 bg-muted/20 hover:bg-muted/30" 
                      data-testid={`button-${action.action}`}
                    >
                      <IconComponent className={`w-5 h-5 ${action.color}`} />
                      <span className="text-xs font-mono">{action.label}</span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-mono">
                <Settings className="w-5 h-5 text-blue-400" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">C2 Infrastructure</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-xs text-green-400 font-mono">ONLINE</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Payload Servers</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-xs text-green-400 font-mono">ACTIVE</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Exfiltration</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                    <span className="text-xs text-amber-400 font-mono">THROTTLED</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Stealth Mode</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-xs text-green-400 font-mono">ENABLED</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-lg font-semibold font-mono">99.8%</p>
                    <p className="text-xs text-muted-foreground">Success Rate</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold font-mono">2.3GB</p>
                    <p className="text-xs text-muted-foreground">Data Collected</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Network Intelligence Summary */}
      <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 font-mono">
                <Network className="w-5 h-5 text-cyan-400" />
                Network Intelligence Summary
              </CardTitle>
              <CardDescription>
                Network penetration overview and lateral movement analysis
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" data-testid="button-view-topology">
              <Eye className="w-4 h-4 mr-2" />
              View Topology
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {networkSegments.map((segment, index) => (
              <div key={index} className="p-4 bg-muted/20 rounded-lg border border-border/50">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium font-mono text-sm">{segment.name}</h3>
                    <Badge className={`text-xs font-mono ${getRiskColor(segment.risk)}`}>
                      {segment.risk.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Subnet:</span>
                      <span className="font-mono">{segment.subnet}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Total Hosts:</span>
                      <span className="font-mono">{segment.hosts}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Compromised:</span>
                      <span className="font-mono text-red-400">{segment.compromised}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Coverage:</span>
                      <span className="font-mono">{segment.coverage}%</span>
                    </div>
                    <Progress value={segment.coverage} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}