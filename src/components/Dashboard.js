import React, { useState } from "react";
import HealthMetrics from "./HealthMetrics";

const Dashboard = ({
  proxyStatus,
  toggleProxy,
  setProxyMode,
  checkProxyHealth,
}) => {
  const [healthData, setHealthData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleHealthCheck = async () => {
    if (!proxyStatus.activeProxy) {
      setError("No active proxy selected");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const data = await checkProxyHealth();
      setHealthData(data);
    } catch (err) {
      setError("Failed to check proxy health");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="tab-content active">
      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Proxy Status</h2>
          <div className="card-actions">
            <button className="btn" onClick={toggleProxy}>
              {proxyStatus.enabled ? "Disable Proxy" : "Enable Proxy"}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Current Mode</label>
          <div className="btn-group">
            <button
              className={`btn btn-outline ${
                proxyStatus.mode === "single" ? "active" : ""
              }`}
              onClick={() => setProxyMode("single")}
            >
              Single Proxy
            </button>
            <button
              className={`btn btn-outline ${
                proxyStatus.mode === "rotation" ? "active" : ""
              }`}
              onClick={() => setProxyMode("rotation")}
            >
              Rotation Mode
            </button>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Active Proxy</label>
          <input
            type="text"
            className="form-control"
            value={proxyStatus.activeProxy || "No proxy active"}
            readOnly
          />
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Proxy Health</h2>
          <div className="card-actions">
            <button
              className="btn btn-secondary"
              onClick={handleHealthCheck}
              disabled={!proxyStatus.activeProxy || isLoading}
            >
              {isLoading ? "Checking..." : "Check Health"}
            </button>
          </div>
        </div>
        <HealthMetrics healthData={healthData} />
      </div>
    </div>
  );
};

export default Dashboard;
