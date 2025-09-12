import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Monitor, Wifi, WifiOff, Shield, AlertTriangle, CheckCircle, 
  Server, Globe, Lock, Users, HardDrive, Activity, Eye, Terminal,
  MapPin, Clock, Cpu, MemoryStick, User, Crown, Database,
  Network, Zap, FileText, Settings, Play, Square, MoreVertical
} from "lucide-react";
import type { Client } from '@shared/schema';

interface ClientCardProps extends Client {
  onConnect?: (clientId: string, connectionType: string) => void;
  onViewDetails?: (clientId: string) => void;
  onSelect?: (clientId: string, selected: boolean) => void;
  isSelected?: boolean;
}

export function ClientCard({ 
  id, hostname, ipAddress, operatingSystem, osVersion, architecture,
  country, city, status, lastSeen, uptime, currentUser, isElevated,
  userAccounts, riskLevel, vulnerabilityCount, difficulty, tags,
  connectionQuality, totalMemory, processorType, notes,
  onConnect, onViewDetails, onSelect, isSelected = false
}: ClientCardProps) {
  const statusConfig = {
    online: { 
      color: 'text-green-600 dark:text-green-400', 
      icon: Wifi, 
      text: 'Online',
      bgColor: 'bg-green-50 dark:bg-green-950',
      borderColor: 'border-green-200 dark:border-green-800',
      dotColor: 'status-online'
    },
    offline: { 
      color: 'text-gray-500 dark:text-gray-400', 
      icon: WifiOff, 
      text: 'Offline',
      bgColor: 'bg-gray-50 dark:bg-gray-900',
      borderColor: 'border-gray-200 dark:border-gray-700',
      dotColor: 'status-offline'
    },
    compromised: { 
      color: 'text-amber-600 dark:text-amber-400', 
      icon: AlertTriangle, 
      text: 'Compromised',
      bgColor: 'bg-amber-50 dark:bg-amber-950',
      borderColor: 'border-amber-200 dark:border-amber-800',
      dotColor: 'status-compromised'
    },
    error: {
      color: 'text-red-600 dark:text-red-400', 
      icon: AlertTriangle, 
      text: 'Error',
      bgColor: 'bg-red-50 dark:bg-red-950',
      borderColor: 'border-red-200 dark:border-red-800',
      dotColor: 'status-critical'
    }
  };

  const riskConfig = {
    low: { color: 'text-green-700 dark:text-green-300', variant: 'outline' as const },
    medium: { color: 'text-amber-700 dark:text-amber-300', variant: 'secondary' as const },
    high: { color: 'text-red-700 dark:text-red-300', variant: 'default' as const },
    critical: { color: 'text-red-800 dark:text-red-200', variant: 'destructive' as const }
  };

  type ConnectionQuality = 'excellent' | 'good' | 'fair' | 'poor';
  
  const qualityConfig: Record<ConnectionQuality, { progress: number; color: string }> = {
    excellent: { progress: 95, color: 'text-green-600' },
    good: { progress: 75, color: 'text-blue-600' },
    fair: { progress: 50, color: 'text-amber-600' },
    poor: { progress: 25, color: 'text-red-600' }
  };

  const getOSIcon = (os: string) => {
    const osLower = os.toLowerCase();
    if (osLower.includes('windows')) return '🪟';
    if (osLower.includes('linux') || osLower.includes('ubuntu') || osLower.includes('debian')) return '🐧';
    if (osLower.includes('mac') || osLower.includes('darwin')) return '🍎';
    if (osLower.includes('android')) return '🤖';
    if (osLower.includes('ios')) return '📱';
    return '💻';
  };

  const formatUptime = (seconds: number) => {
    if (!seconds) return 'N/A';
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    return `${days}d ${hours}h`;
  };

  const formatLastSeen = (timestamp: Date) => {
    if (!timestamp) return 'Never';
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Now';
  };

  const handleConnect = (type: string) => {
    if (onConnect) onConnect(id, type);
  };

  const handleViewDetails = () => {
    if (onViewDetails) onViewDetails(id);
  };

  const handleSelect = () => {
    if (onSelect) onSelect(id, !isSelected);
  };

  const StatusIcon = statusConfig[status as keyof typeof statusConfig]?.icon || Monitor;
  const currentConfig = statusConfig[status as keyof typeof statusConfig] || statusConfig.offline;
  
  // Pre-calculate connection quality values for type safety
  const isValidConnectionQuality = connectionQuality && (connectionQuality in qualityConfig);
  const connectionQualityColor = isValidConnectionQuality 
    ? qualityConfig[connectionQuality as ConnectionQuality].color 
    : 'text-muted-foreground';
  const connectionQualityProgress = isValidConnectionQuality 
    ? qualityConfig[connectionQuality as ConnectionQuality].progress 
    : 0;
  const connectionQualityDisplayText = connectionQuality?.toUpperCase() || 'UNKNOWN';
  
  return (
    <Card 
      className={`gov-card transition-all duration-200 ${currentConfig.borderColor} hover:shadow-lg ${
        isSelected ? 'ring-2 ring-primary ring-offset-2' : ''
      }`} 
      data-testid={`card-client-${id}`}
    >
      <CardHeader className="pb-3">
        {/* Header with selection and status */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={handleSelect}
              className="mt-1 h-4 w-4 text-primary focus:ring-primary border-border rounded"
              data-testid={`checkbox-select-${id}`}
            />
            <div className={`p-2 rounded-lg ${currentConfig.bgColor}`}>
              <Server className={`w-5 h-5 ${currentConfig.color}`} />
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <CardTitle className="text-base font-semibold gov-header">{hostname}</CardTitle>
                <span className="text-lg" title={operatingSystem}>{getOSIcon(operatingSystem)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="w-3 h-3" />
                <span className="font-mono">{ipAddress}</span>
                {country && city && (
                  <>
                    <Separator orientation="vertical" className="h-3" />
                    <MapPin className="w-3 h-3" />
                    <span>{city}, {country}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${currentConfig.dotColor}`}></div>
            <StatusIcon className={`w-4 h-4 ${currentConfig.color}`} />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* System Information Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <span className="text-muted-foreground uppercase tracking-wide">OS & Arch</span>
            <p className="font-medium gov-body">{operatingSystem.split(' ').slice(0, 2).join(' ')}</p>
            <p className="text-muted-foreground font-mono">{architecture}</p>
          </div>
          <div className="space-y-1">
            <span className="text-muted-foreground uppercase tracking-wide">User Context</span>
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <p className="font-medium font-mono">{currentUser || 'N/A'}</p>
              {isElevated && <Crown className="w-3 h-3 text-amber-500" />}
            </div>
          </div>
        </div>

        {/* System Specs */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <span className="text-muted-foreground uppercase tracking-wide flex items-center gap-1">
              <Cpu className="w-3 h-3" />
              Processor
            </span>
            <p className="font-medium text-xs leading-tight">{processorType || 'Unknown'}</p>
          </div>
          <div className="space-y-1">
            <span className="text-muted-foreground uppercase tracking-wide flex items-center gap-1">
              <MemoryStick className="w-3 h-3" />
              Memory
            </span>
            <p className="font-medium">{totalMemory ? `${totalMemory} GB` : 'Unknown'}</p>
          </div>
        </div>

        {/* Connection Quality & Uptime */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground uppercase tracking-wide">Connection Quality</span>
            <span className={`font-medium ${connectionQualityColor}`}>
              {String(connectionQualityDisplayText)}
            </span>
          </div>
          <Progress 
            value={Number(connectionQualityProgress)} 
            className="h-1.5"
          />
        </div>

        {/* Risk Assessment */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">Risk Assessment</span>
            <div className="flex items-center gap-2">
              <Badge 
                variant={riskConfig[riskLevel as keyof typeof riskConfig]?.variant || 'outline'}
                className="text-xs font-mono"
              >
                {riskLevel?.toUpperCase() || 'UNKNOWN'}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {vulnerabilityCount || 0} CVE{vulnerabilityCount !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
          <div className="text-right">
            <Badge 
              variant="outline"
              className="text-xs capitalize"
            >
              {difficulty || 'Unknown'}
            </Badge>
          </div>
        </div>

        {/* User Accounts Summary */}
        {userAccounts && Array.isArray(userAccounts) && userAccounts.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-1">
              <Users className="w-3 h-3" />
              User Accounts ({userAccounts.length})
            </span>
            <div className="flex flex-wrap gap-1">
              {userAccounts.slice(0, 3).map((account: { username: string; isAdmin?: boolean }, index: number) => (
                <Badge key={index} variant="outline" className="text-xs font-mono px-2 py-1">
                  {account.username}
                  {account.isAdmin && <Crown className="w-2 h-2 ml-1 text-amber-500" />}
                </Badge>
              ))}
              {userAccounts.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-1">
                  +{userAccounts.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Tags */}
        {tags && Array.isArray(tags) && tags.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">Tags</span>
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 4).map((tag: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                  {tag}
                </Badge>
              ))}
              {tags.length > 4 && (
                <Badge variant="secondary" className="text-xs px-2 py-1">
                  +{tags.length - 4}
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
            onClick={() => handleConnect('shell')}
            disabled={status === 'offline'}
            data-testid={`button-shell-${id}`}
          >
            {status === 'compromised' ? (
              <>
                <Terminal className="w-3 h-3 mr-1" />
                Shell
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
            variant="outline"
            onClick={() => handleConnect('files')}
            disabled={status !== 'compromised'}
            data-testid={`button-files-${id}`}
          >
            <HardDrive className="w-3 h-3" />
          </Button>
          
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => handleConnect('surveillance')}
            disabled={status !== 'compromised'}
            data-testid={`button-surveillance-${id}`}
          >
            <Eye className="w-3 h-3" />
          </Button>
          
          <Button 
            size="sm" 
            variant="ghost"
            onClick={handleViewDetails}
            data-testid={`button-details-${id}`}
          >
            <MoreVertical className="w-3 h-3" />
          </Button>
        </div>

        {/* Status Footer */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Activity className="w-3 h-3" />
              {currentConfig.text}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatUptime(uptime || 0)}
            </span>
          </div>
          <span className="font-mono">
            Last: {formatLastSeen(lastSeen || new Date())}
          </span>
        </div>

        {/* Notes (if any) */}
        {notes && (
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground italic">{notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}