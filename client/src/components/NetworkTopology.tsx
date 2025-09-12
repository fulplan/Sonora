import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Network, Router, Monitor, Server, Smartphone, Shield } from "lucide-react";
import { useState } from "react";

interface NetworkNode {
  id: string;
  name: string;
  type: 'router' | 'server' | 'workstation' | 'mobile' | 'firewall';
  status: 'online' | 'offline' | 'compromised';
  ip: string;
  x: number;
  y: number;
}

export function NetworkTopology() {
  //todo: remove mock functionality
  const [nodes] = useState<NetworkNode[]>([
    { id: 'router', name: 'Gateway Router', type: 'router', status: 'online', ip: '192.168.1.1', x: 50, y: 20 },
    { id: 'firewall', name: 'Firewall', type: 'firewall', status: 'online', ip: '192.168.1.2', x: 50, y: 45 },
    { id: 'server1', name: 'Web Server', type: 'server', status: 'compromised', ip: '192.168.1.10', x: 20, y: 70 },
    { id: 'server2', name: 'DB Server', type: 'server', status: 'online', ip: '192.168.1.11', x: 50, y: 70 },
    { id: 'workstation1', name: 'Admin PC', type: 'workstation', status: 'online', ip: '192.168.1.20', x: 80, y: 70 },
    { id: 'workstation2', name: 'User PC', type: 'workstation', status: 'offline', ip: '192.168.1.21', x: 20, y: 90 },
    { id: 'mobile1', name: 'Mobile Device', type: 'mobile', status: 'online', ip: '192.168.1.30', x: 80, y: 90 },
  ]);

  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const getIcon = (type: NetworkNode['type']) => {
    switch (type) {
      case 'router': return Router;
      case 'server': return Server;
      case 'workstation': return Monitor;
      case 'mobile': return Smartphone;
      case 'firewall': return Shield;
      default: return Monitor;
    }
  };

  const getStatusColor = (status: NetworkNode['status']) => {
    switch (status) {
      case 'online': return 'text-success';
      case 'offline': return 'text-muted-foreground';
      case 'compromised': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const connections = [
    { from: 'router', to: 'firewall' },
    { from: 'firewall', to: 'server1' },
    { from: 'firewall', to: 'server2' },
    { from: 'firewall', to: 'workstation1' },
    { from: 'firewall', to: 'workstation2' },
    { from: 'firewall', to: 'mobile1' },
  ];

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId);
    console.log('Selected network node:', nodeId);
  };

  return (
    <Card data-testid="network-topology">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-primary" />
            <div>
              <CardTitle>Network Topology</CardTitle>
              <CardDescription>Lab network layout and device status</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            7 devices
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="relative bg-muted/20 rounded-lg p-4 min-h-[400px]">
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {connections.map((connection, index) => {
              const fromNode = nodes.find(n => n.id === connection.from);
              const toNode = nodes.find(n => n.id === connection.to);
              if (!fromNode || !toNode) return null;
              
              return (
                <line
                  key={index}
                  x1={`${fromNode.x}%`}
                  y1={`${fromNode.y}%`}
                  x2={`${toNode.x}%`}
                  y2={`${toNode.y}%`}
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
              );
            })}
          </svg>

          {/* Network nodes */}
          {nodes.map((node) => {
            const IconComponent = getIcon(node.type);
            const isSelected = selectedNode === node.id;
            
            return (
              <div
                key={node.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                onClick={() => handleNodeClick(node.id)}
                data-testid={`node-${node.id}`}
              >
                <div className={`
                  flex flex-col items-center gap-1 p-2 rounded-lg border
                  ${isSelected ? 'bg-primary/20 border-primary' : 'bg-card border-border'}
                  hover-elevate
                `}>
                  <IconComponent className={`w-6 h-6 ${getStatusColor(node.status)}`} />
                  <div className="text-center">
                    <div className="text-xs font-medium">{node.name}</div>
                    <div className="text-xs text-muted-foreground font-mono">{node.ip}</div>
                    <Badge 
                      variant={node.status === 'compromised' ? 'destructive' : 'secondary'} 
                      className="text-xs mt-1"
                    >
                      {node.status}
                    </Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedNode && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">
                  {nodes.find(n => n.id === selectedNode)?.name}
                </h4>
                <p className="text-xs text-muted-foreground font-mono">
                  {nodes.find(n => n.id === selectedNode)?.ip}
                </p>
              </div>
              <Button size="sm" variant="outline" data-testid={`button-scan-${selectedNode}`}>
                Scan Device
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}