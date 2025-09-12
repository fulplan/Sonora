import { 
  Shield, Terminal, Network, Target, BookOpen, Activity, Settings, Play, 
  Sun, Moon, ChevronDown, Menu, X, Users, Lock, Zap, Database, FileText,
  BarChart3, Cpu, Globe, Search, Eye, Cog, Bot, Command
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const navigationGroups = {
  command: {
    title: "Command Center",
    icon: BarChart3,
    items: [
      { title: "Dashboard", url: "/", icon: BarChart3 },
      { title: "Client Management", url: "/clients", icon: Bot },
      { title: "Network Map", url: "/network", icon: Network },
    ]
  },
  operations: {
    title: "Operations", 
    icon: Terminal,
    items: [
      { title: "Remote Access", url: "/remote-access", icon: Terminal },
      { title: "Surveillance", url: "/surveillance", icon: Eye },
      { title: "Post-Exploitation", url: "/post-exploitation", icon: Lock },
    ]
  },
  automation: {
    title: "Automation",
    icon: Command,
    items: [
      { title: "Task Management", url: "/automation", icon: Command },
      { title: "Script Execution", url: "/scenarios", icon: Play },
      { title: "Batch Operations", url: "/batch", icon: Users },
    ]
  },
  intelligence: {
    title: "Intelligence",
    icon: Activity,
    items: [
      { title: "Telemetry", url: "/telemetry", icon: Activity },
      { title: "Threat Analysis", url: "/analysis", icon: Search },
      { title: "Reports", url: "/reports", icon: FileText },
    ]
  },
  system: {
    title: "System",
    icon: Settings,
    items: [
      { title: "Configuration", url: "/settings", icon: Settings },
      { title: "User Management", url: "/users", icon: Users },
      { title: "Security Logs", url: "/logs", icon: Database },
    ]
  }
};

export function TopNavbar() {
  const [location] = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    console.log('Theme toggled:', isDarkMode ? 'light' : 'dark');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActiveInGroup = (groupItems: any[]) => {
    return groupItems.some(item => location === item.url);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" data-testid="navbar-top">
      <div className="container-responsive">
        <div className="flex items-center justify-between h-16">
          {/* Clean Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 border border-primary/20">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold gov-header text-foreground">BYOB-Lab</h1>
              </div>
            </Link>
          </div>

          {/* Center Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-1 flex-1 justify-center">
            {Object.entries(navigationGroups).map(([key, group]) => {
              const GroupIcon = group.icon;
              const hasActiveItem = isActiveInGroup(group.items);
              
              return (
                <DropdownMenu key={key}>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`flex items-center gap-2 font-medium transition-colors ${
                        hasActiveItem ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                      data-testid={`dropdown-${key}`}
                    >
                      <GroupIcon className="w-4 h-4" />
                      <span className="gov-body">{group.title}</span>
                      <ChevronDown className="w-3 h-3 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-56 gov-card">
                    <DropdownMenuLabel className="gov-mono text-xs text-primary font-semibold">
                      {group.title.toUpperCase()}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      {group.items.map((item) => {
                        const ItemIcon = item.icon;
                        const isActive = location === item.url;
                        
                        return (
                          <Link key={item.url} href={item.url}>
                            <DropdownMenuItem className={`cursor-pointer transition-colors ${
                              isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted/50'
                            }`}>
                              <ItemIcon className="w-4 h-4 mr-3" />
                              <span className="gov-body">{item.title}</span>
                            </DropdownMenuItem>
                          </Link>
                        );
                      })}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            })}
          </div>

          {/* Status and Controls */}
          <div className="flex items-center gap-3">
            {/* Active Sessions Count */}
            <div className="hidden lg:flex items-center gap-3 px-3 py-1 rounded-md bg-muted/20 border border-border">
              <div className="flex items-center gap-2 text-xs gov-mono">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full status-online"></div>
                  <span className="text-green-600 dark:text-green-400">24 ACTIVE</span>
                </div>
                <div className="w-px h-3 bg-border"></div>
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-blue-400" />
                  <span className="text-blue-400">SECURE</span>
                </div>
              </div>
            </div>

            {/* Quick Status - Mobile */}
            <div className="lg:hidden flex items-center gap-2 px-2 py-1 rounded bg-muted/20">
              <div className="w-2 h-2 rounded-full status-online"></div>
              <span className="text-xs text-green-600 dark:text-green-400 gov-mono">24</span>
            </div>

            {/* Theme Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
              className="w-9 h-9 hover-elevate"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden w-9 h-9 hover-elevate"
              onClick={toggleMobileMenu}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Professional Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="container-responsive py-4">
            <div className="space-y-4">
              {Object.entries(navigationGroups).map(([key, group]) => (
                <div key={key} className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider gov-mono border-l-2 border-primary/20 pl-3">
                    <group.icon className="w-3 h-3" />
                    {group.title}
                  </div>
                  <div className="pl-5 space-y-1">
                    {group.items.map((item) => {
                      const ItemIcon = item.icon;
                      const isActive = location === item.url;
                      
                      return (
                        <Link 
                          key={item.url} 
                          href={item.url}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors hover-elevate ${
                            isActive ? 'bg-primary/10 text-primary border border-primary/20' : 'hover:bg-muted/50 border border-transparent'
                          }`}>
                            <ItemIcon className="w-4 h-4" />
                            <span className="gov-body">{item.title}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
              
              {/* Mobile System Status */}
              <div className="pt-4 border-t border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider gov-mono mb-3">
                  System Status
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 bg-muted/20 border border-border rounded-md">
                    <div className="w-2 h-2 rounded-full status-online"></div>
                    <span className="text-xs text-green-600 dark:text-green-400 gov-mono">Active: 24</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-muted/20 border border-border rounded-md">
                    <div className="w-2 h-2 rounded-full status-online"></div>
                    <span className="text-xs text-green-600 dark:text-green-400 gov-mono">Secure</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}