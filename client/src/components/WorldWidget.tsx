import { useState, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Globe, RefreshCw, ZoomIn, ZoomOut, RotateCcw, Filter,
  MapPin, Activity, AlertTriangle, Shield, Eye, MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AffectedMachine {
  id: string;
  hostname: string;
  ip: string;
  location: {
    country: string;
    city: string;
    lat: number;
    lng: number;
  };
  status: 'compromised' | 'monitored' | 'lost' | 'active';
  severity: 'low' | 'medium' | 'high' | 'critical';
  lastSeen: string;
  os: string;
  privileges: string;
}

interface WorldStats {
  totalMachines: number;
  onlineMachines: number;
  compromisedMachines: number;
  highValueTargets: number;
}

interface NetworkActivity {
  timestamp: string;
  type: 'connection' | 'breach' | 'data_exfil' | 'lateral_move';
  source: string;
  target: string;
  severity: string;
}

export function WorldWidget() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [selectedMachine, setSelectedMachine] = useState<AffectedMachine | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  // Fetch affected machines data
  const { data: machinesResponse, isLoading: machinesLoading } = useQuery({
    queryKey: ['/api/machines/affected'],
    refetchInterval: 5000 // Refresh every 5 seconds
  });

  // Fetch world statistics
  const { data: statsResponse, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/world/stats'],
    refetchInterval: 10000 // Refresh every 10 seconds
  });

  // Fetch network activity
  const { data: activityResponse, isLoading: activityLoading } = useQuery({
    queryKey: ['/api/world/activity'],
    refetchInterval: 3000 // Refresh every 3 seconds
  });

  // Extract data from API responses
  const machines: AffectedMachine[] = Array.isArray(machinesResponse?.data) ? machinesResponse.data : [];
  const stats: WorldStats | undefined = statsResponse?.data;
  const activity: NetworkActivity[] = Array.isArray(activityResponse?.data) ? activityResponse.data : [];

  const handleZoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev * 1.5, 4));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev / 1.5, 0.5));
  }, []);

  const handleReset = useCallback(() => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setSelectedMachine(null);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  }, [panOffset]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Convert lat/lng to SVG coordinates
  const getCoordinates = (lat: number, lng: number) => {
    // Validate coordinates and provide fallbacks
    const validLat = typeof lat === 'number' && !isNaN(lat) ? lat : 0;
    const validLng = typeof lng === 'number' && !isNaN(lng) ? lng : 0;
    
    const x = ((validLng + 180) / 360) * 800;
    const y = ((90 - validLat) / 180) * 400;
    return { x, y };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compromised': return '#ef4444'; // red
      case 'active': return '#22c55e'; // green
      case 'monitored': return '#f59e0b'; // amber
      case 'lost': return '#6b7280'; // gray
      default: return '#6b7280';
    }
  };

  const getSeveritySize = (severity: string) => {
    switch (severity) {
      case 'critical': return 8;
      case 'high': return 6;
      case 'medium': return 5;
      case 'low': return 4;
      default: return 4;
    }
  };

  const groupedMachines = machines.reduce((acc, machine) => {
    const key = `${machine.location.lat}-${machine.location.lng}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(machine);
    return acc;
  }, {} as Record<string, AffectedMachine[]>);

  if (machinesLoading || statsLoading) {
    return (
      <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading global threat map...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 font-mono">
              <Globe className="w-5 h-5 text-cyan-400" />
              Global Threat Map
            </CardTitle>
            <CardDescription>
              Real-time compromised systems and network activity worldwide
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleZoomIn} data-testid="button-zoom-in">
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleZoomOut} data-testid="button-zoom-out">
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset} data-testid="button-reset-view">
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" data-testid="button-filter-threats">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Statistics Bar */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-3 bg-muted/20 rounded-lg border border-border/50 text-center">
              <p className="text-2xl font-bold text-foreground font-mono">{stats.totalMachines}</p>
              <p className="text-xs text-muted-foreground">Total Assets</p>
            </div>
            <div className="p-3 bg-muted/20 rounded-lg border border-border/50 text-center">
              <p className="text-2xl font-bold text-green-400 font-mono">{stats.onlineMachines}</p>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
            <div className="p-3 bg-muted/20 rounded-lg border border-border/50 text-center">
              <p className="text-2xl font-bold text-red-400 font-mono">{stats.compromisedMachines}</p>
              <p className="text-xs text-muted-foreground">Compromised</p>
            </div>
            <div className="p-3 bg-muted/20 rounded-lg border border-border/50 text-center">
              <p className="text-2xl font-bold text-amber-400 font-mono">{stats.highValueTargets}</p>
              <p className="text-xs text-muted-foreground">High Value</p>
            </div>
          </div>
        )}

        {/* Interactive World Map */}
        <div className="relative bg-muted/10 rounded-lg overflow-hidden h-96 border border-border/50">
          <svg
            ref={svgRef}
            viewBox={`${-panOffset.x / zoomLevel} ${-panOffset.y / zoomLevel} ${800 / zoomLevel} ${400 / zoomLevel}`}
            className="w-full h-full cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            data-testid="world-map-svg"
          >
            {/* World Map Background */}
            <rect width="800" height="400" fill="hsl(var(--muted))" opacity="0.1" />
            
            {/* Continents (simplified outlines) */}
            <g stroke="hsl(var(--border))" strokeWidth="1" fill="none" opacity="0.3">
              {/* North America */}
              <path d="M 100 80 Q 200 60 280 100 L 300 180 Q 250 200 150 180 Z" />
              {/* South America */}
              <path d="M 200 220 Q 250 200 280 280 L 260 350 Q 200 360 180 300 Z" />
              {/* Europe */}
              <path d="M 380 80 Q 450 70 480 120 L 470 160 Q 400 150 380 120 Z" />
              {/* Africa */}
              <path d="M 400 140 Q 480 130 520 200 L 500 320 Q 420 340 400 260 Z" />
              {/* Asia */}
              <path d="M 500 60 Q 650 50 720 140 L 700 200 Q 520 180 500 120 Z" />
              {/* Australia */}
              <path d="M 600 280 Q 680 270 720 310 L 700 340 Q 620 345 600 320 Z" />
            </g>

            {/* Connection lines between machines */}
            {activity.slice(0, 10).map((act, index) => {
              const source = machines.find(m => m.hostname === act.source);
              const target = machines.find(m => m.hostname === act.target);
              if (!source || !target) return null;
              
              const sourceCoords = getCoordinates(source.location.lat, source.location.lng);
              const targetCoords = getCoordinates(target.location.lat, target.location.lng);
              
              return (
                <line
                  key={`connection-${index}`}
                  x1={sourceCoords.x}
                  y1={sourceCoords.y}
                  x2={targetCoords.x}
                  y2={targetCoords.y}
                  stroke={act.type === 'breach' ? '#ef4444' : '#f59e0b'}
                  strokeWidth="2"
                  opacity="0.6"
                  strokeDasharray={act.type === 'data_exfil' ? "5,5" : "none"}
                >
                  <animate
                    attributeName="opacity"
                    values="0.6;0.2;0.6"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </line>
              );
            })}

            {/* Machine location markers */}
            {Object.entries(groupedMachines).map(([key, machineGroup]) => {
              const firstMachine = machineGroup[0];
              const coords = getCoordinates(firstMachine.location.lat, firstMachine.location.lng);
              const criticalCount = machineGroup.filter(m => m.severity === 'critical').length;
              const compromisedCount = machineGroup.filter(m => m.status === 'compromised').length;
              
              return (
                <g key={key}>
                  {/* Outer ring for multiple machines */}
                  {machineGroup.length > 1 && (
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r={12}
                      fill="none"
                      stroke={getStatusColor(firstMachine.status)}
                      strokeWidth="2"
                      opacity="0.5"
                    />
                  )}
                  
                  {/* Main marker */}
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r={getSeveritySize(firstMachine.severity)}
                    fill={getStatusColor(firstMachine.status)}
                    className="cursor-pointer hover:opacity-80"
                    onClick={() => setSelectedMachine(firstMachine)}
                    data-testid={`machine-marker-${firstMachine.id}`}
                  >
                    {firstMachine.status === 'compromised' && (
                      <animate
                        attributeName="r"
                        values={`${getSeveritySize(firstMachine.severity)};${getSeveritySize(firstMachine.severity) + 2};${getSeveritySize(firstMachine.severity)}`}
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    )}
                  </circle>
                  
                  {/* Machine count indicator */}
                  {machineGroup.length > 1 && (
                    <text
                      x={coords.x}
                      y={coords.y - 18}
                      textAnchor="middle"
                      className="text-xs font-mono fill-foreground"
                      fontSize="10"
                    >
                      {machineGroup.length}
                    </text>
                  )}
                  
                  {/* Critical alert indicator */}
                  {criticalCount > 0 && (
                    <circle
                      cx={coords.x + 8}
                      cy={coords.y - 8}
                      r="3"
                      fill="#dc2626"
                      className="animate-pulse"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Map Controls */}
          <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm border border-border/50 rounded-lg p-2">
            <div className="text-xs font-mono space-y-1">
              <div>Zoom: {Math.round(zoomLevel * 100)}%</div>
              <div>Assets: {machines.length}</div>
              <div>Activities: {activity.length}</div>
            </div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border/50 rounded-lg p-3">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <span>Compromised</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span>Active</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <span>Monitored</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                  <span>Lost</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Machine Details */}
        {selectedMachine && (
          <div className="mt-4 p-4 bg-muted/20 rounded-lg border border-border/50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold font-mono">{selectedMachine.hostname}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedMachine(null)}
                data-testid="button-close-details"
              >
                ×
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">IP Address</p>
                <p className="font-mono">{selectedMachine.ip}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Location</p>
                <p>{selectedMachine.location.city}, {selectedMachine.location.country}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <Badge variant={selectedMachine.status === 'compromised' ? 'destructive' : 'default'}>
                  {selectedMachine.status.toUpperCase()}
                </Badge>
              </div>
              <div>
                <p className="text-muted-foreground">Last Seen</p>
                <p className="font-mono">{selectedMachine.lastSeen}</p>
              </div>
            </div>
          </div>
        )}

        {/* Recent Activity Feed */}
        {activity.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              Recent Network Activity
            </h3>
            <ScrollArea className="h-32">
              <div className="space-y-2">
                {activity.slice(0, 5).map((act, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded border border-border/50">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        act.type === 'breach' ? 'bg-red-400' : 
                        act.type === 'data_exfil' ? 'bg-orange-400' : 
                        'bg-blue-400'
                      )}></div>
                      <span className="text-sm font-mono">{act.source} → {act.target}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{act.timestamp}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  );
}