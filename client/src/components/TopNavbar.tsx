import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import "../styles/c2-navbar.css";

// Navigation dropdown item types
type NavDropdownItem = {
  title: string;
  url: string;
  icon: string;
  badge?: string;
} | {
  divider: true;
};

type NavDropdown = {
  title: string;
  icon: string;
  badge?: string;
  items: NavDropdownItem[];
};

// Navigation dropdown configurations
const navDropdowns: NavDropdown[] = [
  {
    title: "Sessions",
    icon: "fas fa-desktop",
    badge: "24",
    items: [
      { title: "All Sessions", url: "/clients", icon: "fas fa-list" },
      { title: "Active Sessions", url: "/clients", icon: "fas fa-circle", badge: "2" },
      { title: "Session History", url: "/clients", icon: "fas fa-history" },
      { divider: true },
      { title: "New Session", url: "/clients", icon: "fas fa-plus" },
      { title: "Session Settings", url: "/settings", icon: "fas fa-cog" },
    ]
  },
  {
    title: "Payloads",
    icon: "fas fa-rocket",
    items: [
      { title: "Windows Payloads", url: "/automation", icon: "fab fa-windows" },
      { title: "Linux Payloads", url: "/automation", icon: "fab fa-linux" },
      { title: "macOS Payloads", url: "/automation", icon: "fab fa-apple" },
      { divider: true },
      { title: "Web Payloads", url: "/automation", icon: "fas fa-globe" },
      { title: "Mobile Payloads", url: "/automation", icon: "fas fa-mobile-alt" },
      { divider: true },
      { title: "Payload Generator", url: "/scenarios", icon: "fas fa-magic" },
    ]
  },
  {
    title: "Exploits",
    icon: "fas fa-bug",
    items: [
      { title: "Local Exploits", url: "/post-exploitation", icon: "fas fa-desktop" },
      { title: "Remote Exploits", url: "/remote-access", icon: "fas fa-network-wired" },
      { title: "Web Exploits", url: "/surveillance", icon: "fas fa-globe" },
      { divider: true },
      { title: "Search Exploits", url: "/analysis", icon: "fas fa-search" },
      { title: "Exploit History", url: "/telemetry", icon: "fas fa-history" },
    ]
  },
  {
    title: "Modules",
    icon: "fas fa-puzzle-piece",
    items: [
      { title: "Post-Exploit", url: "/post-exploitation", icon: "fas fa-terminal" },
      { title: "Persistence", url: "/surveillance", icon: "fas fa-anchor" },
      { title: "Privilege Escalation", url: "/post-exploitation", icon: "fas fa-arrow-up" },
      { title: "Lateral Movement", url: "/network", icon: "fas fa-arrows-alt" },
      { divider: true },
      { title: "Reconnaissance", url: "/network", icon: "fas fa-search" },
      { title: "Data Exfiltration", url: "/analysis", icon: "fas fa-download" },
      { title: "Anti-Forensics", url: "/surveillance", icon: "fas fa-user-secret" },
    ]
  },
  {
    title: "Listeners",
    icon: "fas fa-broadcast-tower",
    items: [
      { title: "HTTP Listener", url: "/remote-access", icon: "fas fa-globe" },
      { title: "HTTPS Listener", url: "/remote-access", icon: "fas fa-lock" },
      { title: "TCP Listener", url: "/remote-access", icon: "fas fa-network-wired" },
      { title: "UDP Listener", url: "/remote-access", icon: "fas fa-wifi" },
      { divider: true },
      { title: "Listener Manager", url: "/settings", icon: "fas fa-cogs" },
      { title: "Templates", url: "/scenarios", icon: "fas fa-file-alt" },
    ]
  },
  {
    title: "Reports",
    icon: "fas fa-chart-line",
    items: [
      { title: "Executive Summary", url: "/reports", icon: "fas fa-chart-pie" },
      { title: "Technical Report", url: "/reports", icon: "fas fa-file-code" },
      { title: "Attack Timeline", url: "/telemetry", icon: "fas fa-clock" },
      { divider: true },
      { title: "Evidence Collection", url: "/analysis", icon: "fas fa-folder" },
      { title: "Screenshots", url: "/surveillance", icon: "fas fa-camera" },
      { title: "Export Data", url: "/reports", icon: "fas fa-download" },
    ]
  },
];

export function TopNavbar() {
  const [location] = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Terminal Status Bar */}
      <div className="c2-status-bar">
        <div className="status-left">
          <span className="terminal-prompt">root@c2-server:~$</span>
          <span className="status-indicator">
            <i className="fas fa-circle"></i> CONNECTED
          </span>
        </div>
        <div className="status-right">
          <span className="session-info">Session: <span>C2-7A3F9B</span></span>
          <span className="timestamp">{formatTime(currentTime)}</span>
        </div>
      </div>

      {/* C2 Navigation Bar */}
      <nav className="c2-navbar">
        <div className="nav-container">
          {/* Left Section - Logo */}
          <div className="nav-left">
            <Link href="/" className="nav-logo">
              <div className="logo-icon">
                <i className="fas fa-terminal"></i>
              </div>
              <div className="logo-text">
                <span className="brand-name">C2-CORE</span>
                <span className="version">v2.1.4</span>
              </div>
            </Link>
          </div>
          
          {/* Center Section - Main Features */}
          <div className="nav-center">
            <div className="nav-menu">
              {navDropdowns.map((dropdown, index) => (
                <div key={index} className="nav-dropdown">
                  <Link href="#" className="nav-link dropdown-trigger">
                    <i className={dropdown.icon}></i>
                    <span>{dropdown.title}</span>
                    {dropdown.badge && <span className="badge">{dropdown.badge}</span>}
                    <i className="fas fa-chevron-down dropdown-arrow"></i>
                  </Link>
                  <div className="dropdown-menu">
                    {dropdown.items.map((item, itemIndex) => {
                      if ('divider' in item && item.divider) {
                        return <div key={itemIndex} className="dropdown-divider"></div>;
                      }
                      
                      const navItem = item as { title: string; url: string; icon: string; badge?: string };
                      return (
                        <Link key={itemIndex} href={navItem.url} className="dropdown-item">
                          <i className={navItem.icon}></i>
                          <span>{navItem.title}</span>
                          {navItem.badge && <span className="badge small">{navItem.badge}</span>}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Section - Logs, Settings & System Status */}
          <div className="nav-right">
            <div className="nav-actions">
              <Link href="/logs" className="nav-link">
                <i className="fas fa-file-alt"></i>
                <span>Logs</span>
              </Link>
              
              {/* Settings Dropdown */}
              <div className="nav-dropdown">
                <Link href="#" className="nav-link dropdown-trigger">
                  <i className="fas fa-cog"></i>
                  <span>Settings</span>
                  <i className="fas fa-chevron-down dropdown-arrow"></i>
                </Link>
                <div className="dropdown-menu">
                  <Link href="/settings" className="dropdown-item">
                    <i className="fas fa-sliders-h"></i>
                    <span>General</span>
                  </Link>
                  <Link href="/settings" className="dropdown-item">
                    <i className="fas fa-shield-alt"></i>
                    <span>Security</span>
                  </Link>
                  <Link href="/network" className="dropdown-item">
                    <i className="fas fa-network-wired"></i>
                    <span>Network</span>
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link href="/users" className="dropdown-item">
                    <i className="fas fa-users"></i>
                    <span>User Management</span>
                  </Link>
                  <Link href="/settings" className="dropdown-item">
                    <i className="fas fa-database"></i>
                    <span>Backup & Restore</span>
                  </Link>
                  <Link href="/settings" className="dropdown-item">
                    <i className="fas fa-info-circle"></i>
                    <span>About C2-CORE</span>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* System Status */}
            <div className="system-status">
              <div className="status-item">
                <i className="fas fa-server"></i>
                <span>CPU: {cpuUsage}</span>
              </div>
              <div className="status-item">
                <i className="fas fa-memory"></i>
                <span>RAM: {ramUsage}</span>
              </div>
              <div className="status-item">
                <i className="fas fa-network-wired"></i>
                <span>NET: {networkStatus}</span>
              </div>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className={`nav-toggle ${mobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>
    </>
  );
}