import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Sun, Moon, Shield, AlertTriangle } from "lucide-react";
import { useState } from "react";

export function DashboardHeader() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    console.log('Theme toggled:', isDarkMode ? 'light' : 'dark');
  };

  return (
    <header className="flex items-center justify-between p-4 border-b bg-card hud-overlay cyber-border" data-testid="header-dashboard">
      <div className="flex items-center gap-4">
        <SidebarTrigger data-testid="button-sidebar-toggle" />
        <div className="classification-bar simulation tactical-font">
          <Shield className="w-3 h-3 inline mr-1" />
          SIMULATION MODE - TRAINING ENVIRONMENT
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="font-mono text-xs cyber-border" data-testid="badge-connection-status">
          <div className="w-2 h-2 rounded-full status-online mr-2"></div>
          LAB NETWORK: SECURE
        </Badge>
        <div className="text-xs font-mono text-muted-foreground terminal-cursor">
          OPSEC STATUS: ACTIVE
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme}
          data-testid="button-theme-toggle"
          className="cyber-border neon-glow"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
      </div>
    </header>
  );
}