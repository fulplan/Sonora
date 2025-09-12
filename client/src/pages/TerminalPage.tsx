import { TerminalInterface } from "@/components/TerminalInterface";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Terminal, Shield, Globe, Activity, Users, HardDrive, 
  Wifi, Lock, AlertTriangle, Clock 
} from "lucide-react";

export default function TerminalPage() {
  return (
    <div className="p-6 h-full bg-gradient-to-br from-gray-950 to-black" data-testid="terminal-page">
      <div className="space-y-6 h-full">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-500/20 border border-green-500/30">
                <Terminal className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-white">Secure Terminal</h1>
                <p className="text-gray-400 font-mono text-sm">
                  Advanced Command & Control Interface
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-orange-500/30 text-orange-400 font-mono">
              <AlertTriangle className="w-3 h-3 mr-1" />
              TRAINING MODE
            </Badge>
            <Button variant="outline" size="sm" className="font-mono">
              <Shield className="w-4 h-4 mr-2" />
              SECURE SESSION
            </Button>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gray-900/50 border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Target Status</CardTitle>
              <Globe className="w-4 h-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400 font-mono">ONLINE</div>
              <p className="text-xs text-gray-500 font-mono">192.168.1.10</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-blue-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Access Level</CardTitle>
              <Users className="w-4 h-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400 font-mono">SYSTEM</div>
              <p className="text-xs text-gray-500 font-mono">Elevated privileges</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-yellow-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Session Time</CardTitle>
              <Clock className="w-4 h-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400 font-mono">00:15:42</div>
              <p className="text-xs text-gray-500 font-mono">Active session</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Encryption</CardTitle>
              <Lock className="w-4 h-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400 font-mono">AES-256</div>
              <p className="text-xs text-gray-500 font-mono">End-to-end secured</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Terminal Interface */}
        <div className="flex-1 min-h-0">
          <TerminalInterface />
        </div>
      </div>
    </div>
  );
}