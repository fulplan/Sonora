import { Shield, Terminal, Network, Target, BookOpen, Activity, Settings, Play, Clock } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Shield,
  },
  {
    title: "Target Machines",
    url: "/targets",
    icon: Target,
  },
  {
    title: "Terminal",
    url: "/terminal",
    icon: Terminal,
  },
  {
    title: "Network Map",
    url: "/network",
    icon: Network,
  },
  {
    title: "Lab Scenarios",
    url: "/scenarios",
    icon: Play,
  },
  {
    title: "Resources",
    url: "/resources",
    icon: BookOpen,
  },
  {
    title: "Telemetry",
    url: "/telemetry",
    icon: Activity,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const [location] = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <Sidebar data-testid="sidebar-main" className="cyber-border">
      <SidebarContent className="hud-overlay">
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-mono text-sm tactical-font neon-glow tracking-wider">
            ◢ BYOB-LAB ◣<br />
            <span className="text-xs text-muted-foreground">TACTICAL OPS</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location === item.url}
                    className={`tactical-font hover:neon-glow transition-all duration-200 ${
                      location === item.url ? 'cyber-border neon-glow' : ''
                    }`}
                  >
                    <Link href={item.url} data-testid={`link-${item.title.toLowerCase().replace(' ', '-')}`}>
                      <item.icon className="w-4 h-4" />
                      <span className="tracking-wide">{item.title.toUpperCase()}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Digital Time Display */}
        <SidebarGroup>
          <div className="p-4 mx-2 bg-primary/5 border border-primary/20 rounded-lg backdrop-blur-sm">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-primary/70 text-xs font-mono tracking-wider">
                <Clock className="w-3 h-3" />
                <span>MISSION TIME</span>
              </div>
              <div className="font-mono text-lg font-bold text-primary neon-glow tracking-wider">
                {formatTime(currentTime)}
              </div>
              <div className="text-xs text-muted-foreground font-mono tracking-wide">
                {formatDate(currentTime)}
              </div>
            </div>
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}