import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // Removed unused useNavigate
import Dashboard from "./components/Dashboard";
import ProxyManagement from "./components/ProxyManagement";
import Settings from "./components/Settings";
import Logs from "./components/Logs";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [proxyStatus, setProxyStatus] = useState({
    enabled: false,
    mode: "single",
    activeProxy: null,
    autoSyncTime: false,
  });
  const [proxies, setProxies] = useState([]);
  const [logs, setLogs] = useState([]);
  const [settings, setSettings] = useState({
    rotationInterval: 300,
    apiKey: "",
    autoSyncTime: false,
  });

  // Fetch initial data
  useEffect(() => {
    if (authenticated) {
      fetchProxyStatus();
      fetchProxyList();
      fetchSettings();
      fetchLogs();

      // Set up periodic refresh
      const interval = setInterval(() => {
        fetchProxyStatus();
        fetchLogs();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [authenticated]);

  const fetchProxyStatus = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/proxy/status");
      const data = await response.json();
      setProxyStatus(data);
    } catch (error) {
      console.error("Error fetching proxy status:", error);
    }
  };

  // Fetch initial data
  // useEffect(() => {
  //   if (authenticated) {
  //     fetchProxyStatus();
  //     fetchProxyList();
  //     fetchSettings();
  //     fetchLogs();

  //     // Set up periodic refresh
  //     const interval = setInterval(() => {
  //       fetchProxyStatus();
  //       fetchLogs();
  //     }, 5000);

  //     return () => clearInterval(interval);
  //   }
  // }, [authenticated]);

  // Fetch initial data
  useEffect(() => {
    if (authenticated) {
      fetchProxyStatus();
      fetchProxyList();
      fetchSettings();
      fetchLogs();

      // Set up periodic refresh
      const interval = setInterval(() => {
        fetchProxyStatus();
        fetchLogs();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [authenticated]);

  const fetchProxyList = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/proxy/list");
      const data = await response.json();
      setProxies(data.proxies);
    } catch (error) {
      console.error("Error fetching proxy list:", error);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/settings");
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const fetchLogs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/logs");
      const data = await response.json();
      setLogs(data.logs);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  const toggleProxy = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/proxy/toggle", {
        method: "POST",
      });
      const data = await response.json();
      if (data.success) {
        fetchProxyStatus();
      }
    } catch (error) {
      console.error("Error toggling proxy:", error);
    }
  };

  const setProxyMode = async (mode) => {
    try {
      const response = await fetch("http://localhost:5000/api/proxy/set_mode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mode }),
      });
      const data = await response.json();
      if (data.success) {
        fetchProxyStatus();
      }
    } catch (error) {
      console.error("Error setting proxy mode:", error);
    }
  };

  const addProxy = async (proxy) => {
    try {
      const response = await fetch("http://localhost:5000/api/proxy/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ proxy }),
      });
      const data = await response.json();
      if (data.success) {
        fetchProxyList();
        fetchLogs();
      }
      return data;
    } catch (error) {
      console.error("Error adding proxy:", error);
      return { error: error.message };
    }
  };

  const removeProxy = async (proxy) => {
    try {
      const response = await fetch("http://localhost:5000/api/proxy/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ proxy }),
      });
      const data = await response.json();
      if (data.success) {
        fetchProxyList();
        fetchLogs();
      }
    } catch (error) {
      console.error("Error removing proxy:", error);
    }
  };

  const setActiveProxy = async (proxy) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/proxy/set_active",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ proxy }),
        }
      );
      const data = await response.json();
      if (data.success) {
        fetchProxyStatus();
        fetchLogs();
      }
    } catch (error) {
      console.error("Error setting active proxy:", error);
    }
  };

  const checkProxyHealth = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/proxy/health");
      const data = await response.json();
      fetchLogs();
      return data;
    } catch (error) {
      console.error("Error checking proxy health:", error);
      return { error: error.message };
    }
  };

  const checkAllProxiesHealth = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/proxy/health_all"
      );
      const data = await response.json();
      fetchLogs();
      return data;
    } catch (error) {
      console.error("Error checking all proxies health:", error);
      return { error: error.message };
    }
  };

  const updateSettings = async (newSettings) => {
    try {
      const response = await fetch("http://localhost:5000/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSettings),
      });
      const data = await response.json();
      if (data.success) {
        fetchSettings();
        fetchLogs();
      }
      return data;
    } catch (error) {
      console.error("Error updating settings:", error);
      return { error: error.message };
    }
  };

  const syncTime = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/time/sync", {
        method: "POST",
      });
      const data = await response.json();
      if (data.success) {
        fetchLogs();
      }
      return data;
    } catch (error) {
      console.error("Error syncing time:", error);
      return { error: error.message };
    }
  };

  // const handleLogin = (status) => {
  //   setAuthenticated(status);
  // };

  if (!authenticated) {
    return (
      <Router>
        <Login onLogin={setAuthenticated} />
      </Router>
    );
  }

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <div className="logo">
              <img src="/fbi-logo.png" alt="FBI Logo" />
              <h1>Proxy Management Toolkit</h1>
            </div>
            <div
              className={`status-badge ${
                proxyStatus.enabled ? "status-active" : "status-inactive"
              }`}
            >
              {proxyStatus.enabled ? "Proxy Enabled" : "Proxy Disabled"}
            </div>
          </div>
        </header>

        <div className="container">
          <div className="dashboard">
            <aside className="sidebar">
              <ul className="nav-menu">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    📊 Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/proxies" className="nav-link">
                    🔌 Proxy Management
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/settings" className="nav-link">
                    ⚙️ Settings
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/logs" className="nav-link">
                    📝 Activity Log
                  </Link>
                </li>
              </ul>
            </aside>

            <main className="main-content">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Dashboard
                      proxyStatus={proxyStatus}
                      toggleProxy={toggleProxy}
                      setProxyMode={setProxyMode}
                      checkProxyHealth={checkProxyHealth}
                    />
                  }
                />
                <Route
                  path="/proxies"
                  element={
                    <ProxyManagement
                      proxies={proxies}
                      activeProxy={proxyStatus.activeProxy}
                      addProxy={addProxy}
                      removeProxy={removeProxy}
                      setActiveProxy={setActiveProxy}
                      checkAllProxiesHealth={checkAllProxiesHealth}
                    />
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <Settings
                      settings={settings}
                      updateSettings={updateSettings}
                      syncTime={syncTime}
                    />
                  }
                />
                <Route path="/logs" element={<Logs logs={logs} />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;