import { Shield, Terminal, Network, Target, BookOpen, Activity, Settings, Play } from "lucide-react";
import { Link, useLocation } from "wouter";
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
      </SidebarContent>
    </Sidebar>
  );
}