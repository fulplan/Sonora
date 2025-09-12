import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Monitor, Wifi, WifiOff, Shield, AlertTriangle, CheckCircle, 
  Server, Globe, Lock, Users, HardDrive, Activity, Eye, Terminal
} from "lucide-react";

interface TargetMachineCardProps {
  id: string;
  name: string;
  os: string;
  ip: string;
  status: 'online' | 'offline' | 'compromised';
  vulnerabilities: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  domain?: string;
  services?: string[];
}

export function TargetMachineCard({ 
  id, name, os, ip, status, vulnerabilities, difficulty, domain = "N/A", services = []
}: TargetMachineCardProps) {
  const statusConfig = {
    online: { 
      color: 'text-green-600 dark:text-green-400', 
      icon: Wifi, 
      text: 'Online',
      bgColor: 'bg-green-50 dark:bg-green-950',
      borderColor: 'border-green-200 dark:border-green-800'
    },
    offline: { 
      color: 'text-gray-500 dark:text-gray-400', 
      icon: WifiOff, 
      text: 'Offline',
      bgColor: 'bg-gray-50 dark:bg-gray-900',
      borderColor: 'border-gray-200 dark:border-gray-700'
    },
    compromised: { 
      color: 'text-amber-600 dark:text-amber-400', 
      icon: AlertTriangle, 
      text: 'Compromised',
      bgColor: 'bg-amber-50 dark:bg-amber-950',
      borderColor: 'border-amber-200 dark:border-amber-800'
    }
  };

  const difficultyConfig = {
    beginner: { 
      color: 'text-green-700 dark:text-green-300', 
      text: 'Beginner',
      bgColor: 'bg-green-100 dark:bg-green-900'
    },
    intermediate: { 
      color: 'text-amber-700 dark:text-amber-300', 
      text: 'Intermediate',
      bgColor: 'bg-amber-100 dark:bg-amber-900'
    },
    advanced: { 
      color: 'text-red-700 dark:text-red-300', 
      text: 'Advanced',
      bgColor: 'bg-red-100 dark:bg-red-900'
    }
  };

  const getRiskLevel = () => {
    if (status === 'compromised') return 'HIGH';
    if (vulnerabilities > 10) return 'CRITICAL';
    if (vulnerabilities > 5) return 'HIGH';
    if (vulnerabilities > 2) return 'MEDIUM';
    return 'LOW';
  };

  const handleConnect = () => {
    console.log(`Connecting to target machine: ${name} (${ip})`);
  };

  const handleViewDetails = () => {
    console.log(`Viewing details for target machine: ${name}`);
  };

  const StatusIcon = statusConfig[status].icon;
  const riskLevel = getRiskLevel();

  return (
    <Card 
      className={`gov-card transition-all duration-200 ${statusConfig[status].borderColor} hover:shadow-lg`} 
      data-testid={`card-target-${id}`}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${statusConfig[status].bgColor}`}>
              <Server className={`w-5 h-5 ${statusConfig[status].color}`} />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-base font-semibold gov-header">{name}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="w-3 h-3" />
                <span className="font-mono">{ip}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              status === 'online' ? 'status-online' : 
              status === 'compromised' ? 'status-compromised' : 
              'status-offline'
            }`}></div>
            <StatusIcon className={`w-4 h-4 ${statusConfig[status].color}`} />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* System Information */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <span className="text-muted-foreground uppercase tracking-wide">OS</span>
            <p className="font-medium gov-body">{os}</p>
          </div>
          <div className="space-y-1">
            <span className="text-muted-foreground uppercase tracking-wide">Domain</span>
            <p className="font-medium font-mono">{domain}</p>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">Risk Level</span>
            <div className="flex items-center gap-2">
              <Badge 
                variant={
                  riskLevel === 'CRITICAL' ? 'destructive' : 
                  riskLevel === 'HIGH' ? 'default' : 
                  riskLevel === 'MEDIUM' ? 'secondary' : 
                  'outline'
                }
                className="text-xs font-mono"
              >
                {riskLevel}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {vulnerabilities} CVE{vulnerabilities !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
          <div className="text-right">
            <Badge 
              className={`${difficultyConfig[difficulty].bgColor} ${difficultyConfig[difficulty].color} border-0 text-xs`}
            >
              {difficultyConfig[difficulty].text}
            </Badge>
          </div>
        </div>

        {/* Services */}
        {services.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">Services</span>
            <div className="flex flex-wrap gap-1">
              {services.slice(0, 4).map((service, index) => (
                <Badge key={index} variant="outline" className="text-xs font-mono px-2 py-1">
                  {service}
                </Badge>
              ))}
              {services.length > 4 && (
                <Badge variant="outline" className="text-xs px-2 py-1">
                  +{services.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2">
          <Button 
            size="sm" 
            variant={status === 'compromised' ? 'default' : 'outline'}
            className="flex-1" 
            onClick={handleConnect}
            disabled={status === 'offline'}
            data-testid={`button-connect-${id}`}
          >
            {status === 'compromised' ? (
              <>
                <Terminal className="w-3 h-3 mr-1" />
                Access Shell
              </>
            ) : status === 'online' ? (
              <>
                <Lock className="w-3 h-3 mr-1" />
                Exploit
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3 mr-1" />
                Offline
              </>
            )}
          </Button>
          <Button 
            size="sm" 
            variant="ghost"
            onClick={handleViewDetails}
            data-testid={`button-details-${id}`}
          >
            <Eye className="w-3 h-3" />
          </Button>
        </div>

        {/* Status Footer */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
          <span className="flex items-center gap-1">
            <Activity className="w-3 h-3" />
            {statusConfig[status].text}
          </span>
          <span className="font-mono">
            Last seen: {status === 'offline' ? '2h ago' : 'Now'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}