import React from "react";

const HealthMetrics = ({ healthData }) => {
  if (!healthData) {
    return (
      <div className="health-metrics">
        <div className="metric-card">
          <div className="metric-value">--</div>
          <div className="metric-label">No health data available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="health-metrics">
      <div className="metric-card">
        <div className="metric-label">Status</div>
        <div className="metric-value">
          {healthData.alive ? (
            <span style={{ color: "#4caf50" }}>Online</span>
          ) : (
            <span style={{ color: "#f44336" }}>Offline</span>
          )}
        </div>
      </div>
      <div className="metric-card">
        <div className="metric-label">Latency</div>
        <div className="metric-value">
          {healthData.latency ? `${healthData.latency} ms` : "--"}
        </div>
      </div>
      <div className="metric-card">
        <div className="metric-label">Location</div>
        <div className="metric-value">
          {healthData.ip_info?.country || "--"}
        </div>
      </div>
    </div>
  );
};

export default HealthMetrics;
