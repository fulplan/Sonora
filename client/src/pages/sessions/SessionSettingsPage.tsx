import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Settings, Save, RotateCcw, AlertTriangle, Shield, Clock, Network } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SessionSettings {
  autoReconnect: boolean;
  timeout: number;
  maxRetries: number;
  logLevel: string;
  encryptionEnabled: boolean;
  compression: boolean;
  bufferSize: number;
  heartbeatInterval: number;
  sessionPersistence: boolean;
  cleanupOnDisconnect: boolean;
}

export default function SessionSettingsPage() {
  const [settings, setSettings] = useState<SessionSettings>({
    autoReconnect: true,
    timeout: 300,
    maxRetries: 3,
    logLevel: "info",
    encryptionEnabled: true,
    compression: true,
    bufferSize: 8192,
    heartbeatInterval: 30,
    sessionPersistence: true,
    cleanupOnDisconnect: false
  });

  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  const updateSetting = (key: keyof SessionSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings Saved",
        description: "Session settings have been updated successfully"
      });
      setHasChanges(false);
    }, 1000);
  };

  const handleReset = () => {
    setSettings({
      autoReconnect: true,
      timeout: 300,
      maxRetries: 3,
      logLevel: "info",
      encryptionEnabled: true,
      compression: true,
      bufferSize: 8192,
      heartbeatInterval: 30,
      sessionPersistence: true,
      cleanupOnDisconnect: false
    });
    setHasChanges(false);
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values"
    });
  };

  return (
    <div className="container-responsive py-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-green-400">Session Settings</h1>
          <p className="text-muted-foreground">Configure global session behavior and preferences</p>
        </div>
        {hasChanges && (
          <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            Unsaved Changes
          </Badge>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5 text-green-400" />
                Connection Settings
              </CardTitle>
              <CardDescription>Configure how sessions connect and reconnect</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Reconnect</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically attempt to reconnect lost sessions
                  </p>
                </div>
                <Switch
                  checked={settings.autoReconnect}
                  onCheckedChange={(checked) => updateSetting("autoReconnect", checked)}
                />
              </div>

              <Separator />

              <div className="grid gap-4">
                <div>
                  <Label htmlFor="timeout">Connection Timeout (seconds)</Label>
                  <Input
                    id="timeout"
                    type="number"
                    value={settings.timeout}
                    onChange={(e) => updateSetting("timeout", parseInt(e.target.value))}
                    min="30"
                    max="3600"
                  />
                </div>

                <div>
                  <Label htmlFor="maxRetries">Max Retry Attempts</Label>
                  <Input
                    id="maxRetries"
                    type="number"
                    value={settings.maxRetries}
                    onChange={(e) => updateSetting("maxRetries", parseInt(e.target.value))}
                    min="0"
                    max="10"
                  />
                </div>

                <div>
                  <Label htmlFor="heartbeat">Heartbeat Interval (seconds)</Label>
                  <Input
                    id="heartbeat"
                    type="number"
                    value={settings.heartbeatInterval}
                    onChange={(e) => updateSetting("heartbeatInterval", parseInt(e.target.value))}
                    min="10"
                    max="300"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-400" />
                Security Settings
              </CardTitle>
              <CardDescription>Configure security and encryption options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Encryption Enabled</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable end-to-end encryption for all sessions
                  </p>
                </div>
                <Switch
                  checked={settings.encryptionEnabled}
                  onCheckedChange={(checked) => updateSetting("encryptionEnabled", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Data Compression</Label>
                  <p className="text-sm text-muted-foreground">
                    Compress session data to reduce bandwidth
                  </p>
                </div>
                <Switch
                  checked={settings.compression}
                  onCheckedChange={(checked) => updateSetting("compression", checked)}
                />
              </div>

              <Separator />

              <div>
                <Label htmlFor="bufferSize">Buffer Size (bytes)</Label>
                <Select value={settings.bufferSize.toString()} onValueChange={(value) => updateSetting("bufferSize", parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1024">1 KB</SelectItem>
                    <SelectItem value="4096">4 KB</SelectItem>
                    <SelectItem value="8192">8 KB</SelectItem>
                    <SelectItem value="16384">16 KB</SelectItem>
                    <SelectItem value="32768">32 KB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-400" />
                Session Management
              </CardTitle>
              <CardDescription>Configure session lifecycle and persistence</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Session Persistence</Label>
                  <p className="text-sm text-muted-foreground">
                    Maintain session state across reconnections
                  </p>
                </div>
                <Switch
                  checked={settings.sessionPersistence}
                  onCheckedChange={(checked) => updateSetting("sessionPersistence", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Cleanup on Disconnect</Label>
                  <p className="text-sm text-muted-foreground">
                    Remove session data when connection is lost
                  </p>
                </div>
                <Switch
                  checked={settings.cleanupOnDisconnect}
                  onCheckedChange={(checked) => updateSetting("cleanupOnDisconnect", checked)}
                />
              </div>

              <Separator />

              <div>
                <Label htmlFor="logLevel">Log Level</Label>
                <Select value={settings.logLevel} onValueChange={(value) => updateSetting("logLevel", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debug">Debug</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warn">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Advanced Configuration
              </CardTitle>
              <CardDescription>Expert settings - modify with caution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-sm text-yellow-400">
                    <strong>Warning:</strong> Modifying these settings may affect system stability and security.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Current Configuration:</h4>
                  <div className="bg-muted/50 p-3 rounded-lg font-mono text-xs">
                    <pre>{JSON.stringify(settings, null, 2)}</pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button 
              className="flex-1 bg-green-600 hover:bg-green-700" 
              onClick={handleSave}
              disabled={!hasChanges}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}