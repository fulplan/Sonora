import { useState, useEffect } from "react";
import { Server, HardDrive, Network, Circle } from "lucide-react";

export function GlobalStatusBar() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cpuUsage] = useState("23%");
  const [ramUsage] = useState("67%");
  const [networkStatus] = useState("UP");

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="flex items-center space-x-6 text-sm">
      {/* Session Info */}
      <div className="flex items-center space-x-2">
        <span className="terminal-prompt text-green-400 font-mono">root@c2-server:~$</span>
        <span className="status-indicator flex items-center space-x-1 text-green-400">
          <Circle className="w-2 h-2 fill-current" />
          <span>CONNECTED</span>
        </span>
      </div>

      {/* Session ID */}
      <div className="text-muted-foreground">
        <span>Session: <span className="text-cyan-400 font-mono">C2-7A3F9B</span></span>
      </div>

      {/* System Status */}
      <div className="flex items-center space-x-4 text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Server className="w-3 h-3" />
          <span>CPU: {cpuUsage}</span>
        </div>
        <div className="flex items-center space-x-1">
          <HardDrive className="w-3 h-3" />
          <span>RAM: {ramUsage}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Network className="w-3 h-3" />
          <span>NET: {networkStatus}</span>
        </div>
      </div>

      {/* Timestamp */}
      <div className="text-muted-foreground font-mono text-xs">
        {formatTime(currentTime)}
      </div>
    </div>
  );
}