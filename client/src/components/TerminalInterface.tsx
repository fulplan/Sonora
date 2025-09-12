import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Terminal, X, Minimize2, Maximize2, Wifi, Shield, Lock, 
  Activity, Clock, User, HardDrive, Cpu, Globe 
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface TerminalLog {
  id: number;
  timestamp: string;
  command?: string;
  output?: string;
  type: 'command' | 'output' | 'error' | 'success';
}

export function TerminalInterface() {
  const [logs, setLogs] = useState<TerminalLog[]>([
    { id: 1, timestamp: '14:32:01', output: '=== BYOB-LAB SECURE TERMINAL v3.2.1 ===', type: 'success' },
    { id: 2, timestamp: '14:32:01', output: 'CLASSIFICATION: SIMULATION ENVIRONMENT', type: 'output' },
    { id: 3, timestamp: '14:32:01', output: 'ENCRYPTION: AES-256 | SESSION: ESTABLISHED', type: 'output' },
    { id: 4, timestamp: '14:32:02', output: 'TARGET: WIN-SERVER2019 (192.168.1.10)', type: 'success' },
    { id: 5, timestamp: '14:32:02', output: 'ACCESS LEVEL: SYSTEM | PRIVILEGES: ELEVATED', type: 'success' },
    { id: 6, timestamp: '14:32:03', output: 'Ready for operations...', type: 'output' },
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('SECURE');
  const [sessionTime, setSessionTime] = useState('00:15:42');
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Simulation commands for educational purposes
  const mockCommands: { [key: string]: { output: string; type: 'output' | 'error' | 'success' } } = {
    'help': { output: '[SYSTEM] Available commands:\n├── whoami          - Display current user context\n├── sysinfo         - System information\n├── netstat         - Network connections\n├── dir / ls        - Directory listing\n├── ps              - Process listing\n├── ipconfig        - Network configuration\n├── cat <file>      - Display file contents\n└── exit            - Terminate session', type: 'output' },
    'sysinfo': { output: '[TARGET] System Information:\n├── Hostname: WIN-SERVER2019\n├── OS: Windows Server 2019 Standard\n├── Architecture: x64\n├── Domain: CORPORATE.local\n├── Last Boot: 2024-03-14 08:30:15\n└── Uptime: 6 days, 14 hours', type: 'output' },
    'whoami': { output: 'NT AUTHORITY\\SYSTEM', type: 'success' },
    'ps': { output: '[PROCESSES] Active processes:\n├── PID 1234 - explorer.exe (Administrator)\n├── PID 2156 - svchost.exe (SYSTEM)\n├── PID 3421 - winlogon.exe (SYSTEM)\n└── PID 4567 - services.exe (SYSTEM)', type: 'output' },
    'ipconfig': { output: '[NETWORK] Interface Configuration:\n├── Adapter: Ethernet0\n├── IPv4: 192.168.1.10/24\n├── Gateway: 192.168.1.1\n├── DNS1: 8.8.8.8\n└── Status: Connected', type: 'output' },
    'netstat': { output: '[NETWORK] Active Connections:\n├── TCP 192.168.1.10:135 → 0.0.0.0:0 [LISTENING]\n├── TCP 192.168.1.10:445 → 0.0.0.0:0 [LISTENING]\n├── TCP 192.168.1.10:3389 → 0.0.0.0:0 [LISTENING]\n└── TCP 192.168.1.10:5985 → 0.0.0.0:0 [LISTENING]', type: 'output' },
    'dir': { output: '[DIRECTORY] C:\\Users\\Administrator\n├── 📁 Documents\n├── 📁 Desktop\n├── 📁 Downloads\n├── 📄 flag.txt (2.1 KB)\n└── 📄 notes.txt (1.5 KB)', type: 'output' },
    'ls': { output: '[DIRECTORY] /home/admin\n├── 📁 documents/\n├── 📁 scripts/\n├── 📄 .bash_history\n└── 📄 credentials.txt', type: 'output' },
    'cat flag.txt': { output: '[FILE] flag.txt:\nBYOB{w3lc0m3_t0_th3_l4b_3nv1r0nm3nt}\n\n[SIMULATION] Educational flag captured!', type: 'success' },
    'exit': { output: '[SESSION] Connection terminated by user.\n[SECURITY] All activities logged for training analysis.', type: 'error' },
  };

  const executeCommand = () => {
    if (!currentCommand.trim()) return;

    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    const commandLog: TerminalLog = {
      id: logs.length + 1,
      timestamp,
      command: currentCommand,
      type: 'command'
    };

    const response = mockCommands[currentCommand.toLowerCase()] || { 
      output: `Command '${currentCommand}' not recognized. Type 'help' for available commands.`, 
      type: 'error' as const 
    };
    
    const outputLog: TerminalLog = {
      id: logs.length + 2,
      timestamp,
      output: response.output,
      type: response.type
    };

    setLogs(prev => [...prev, commandLog, outputLog]);
    setCurrentCommand('');
    console.log('Executed command:', currentCommand);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand();
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  // Update session time every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const start = new Date(now.getTime() - 942000); // 15:42 ago
      const diff = now.getTime() - start.getTime();
      const hours = Math.floor(diff / 3600000).toString().padStart(2, '0');
      const minutes = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
      const seconds = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
      setSessionTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`${isMaximized ? 'fixed inset-4 z-50' : 'h-full'} flex flex-col bg-black/95 border border-green-500/30 rounded-lg overflow-hidden`} data-testid="terminal-interface">
      {/* Terminal Header */}
      <div className="flex items-center justify-between bg-gray-900/90 border-b border-green-500/20 px-4 py-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-green-400" />
            <span className="font-mono text-xs text-green-400 font-semibold">SECURE SHELL</span>
          </div>
          
          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-green-400" />
              <span className="text-green-400">192.168.1.10</span>
            </div>
            <div className="w-px h-3 bg-green-500/20"></div>
            <div className="flex items-center gap-1">
              <User className="w-3 h-3 text-blue-400" />
              <span className="text-blue-400">SYSTEM</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-yellow-400" />
              <span className="text-yellow-400">{sessionTime}</span>
            </div>
            <Badge 
              variant="outline" 
              className={`text-xs font-mono ${
                connectionStatus === 'SECURE' ? 'border-green-500/30 text-green-400' : 'border-red-500/30 text-red-400'
              }`}
            >
              <Lock className="w-2 h-2 mr-1" />
              {connectionStatus}
            </Badge>
          </div>
          
          <div className="flex items-center gap-1 ml-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-gray-400 hover:text-white"
              data-testid="button-terminal-minimize"
            >
              <Minimize2 className="w-3 h-3" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-gray-400 hover:text-white"
              onClick={() => setIsMaximized(!isMaximized)}
              data-testid="button-terminal-maximize"
            >
              <Maximize2 className="w-3 h-3" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-gray-400 hover:text-red-400"
              data-testid="button-terminal-close"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Terminal Body */}
      <div className="flex-1 flex flex-col">
        <ScrollArea className={`flex-1 p-4 font-mono text-sm bg-black/95`} ref={scrollRef}>
          <div className="space-y-1">
            {logs.map((log) => (
              <div key={log.id} className="flex gap-2 text-xs leading-relaxed">
                <span className="text-gray-500 min-w-[60px] select-none">[{log.timestamp}]</span>
                {log.command ? (
                  <div className="flex gap-2 items-center">
                    <span className="text-green-400 font-bold">root@target:~#</span>
                    <span className="text-white">{log.command}</span>
                  </div>
                ) : (
                  <span 
                    className={`${
                      log.type === 'error' ? 'text-red-400' : 
                      log.type === 'success' ? 'text-green-400' : 
                      'text-cyan-400'
                    } whitespace-pre-wrap leading-relaxed`}
                  >
                    {log.output}
                  </span>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        
        {/* Command Input */}
        <div className="border-t border-green-500/20 bg-gray-900/50 p-3">
          <div className="flex items-center gap-3 font-mono text-sm">
            <div className="flex items-center gap-2 text-green-400 font-bold shrink-0">
              <span>root@target:~#</span>
            </div>
            <Input
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter command..."
              className="border-none bg-transparent focus-visible:ring-0 text-white font-mono placeholder:text-gray-500 p-0 h-auto"
              data-testid="input-terminal-command"
            />
          </div>
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="flex items-center justify-between bg-gray-900/90 border-t border-green-500/20 px-4 py-1 text-xs font-mono">
        <div className="flex items-center gap-4 text-gray-400">
          <div className="flex items-center gap-1">
            <Activity className="w-3 h-3" />
            <span>Session Active</span>
          </div>
          <div className="flex items-center gap-1">
            <HardDrive className="w-3 h-3" />
            <span>C:\\ (78% free)</span>
          </div>
          <div className="flex items-center gap-1">
            <Cpu className="w-3 h-3" />
            <span>CPU: 23%</span>
          </div>
        </div>
        
        <div className="text-orange-400 text-xs">
          SIMULATION ENVIRONMENT - EDUCATIONAL USE ONLY
        </div>
      </div>
    </div>
  );
}