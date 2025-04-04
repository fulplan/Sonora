import React, { useState } from "react";

const Logs = ({ logs }) => {
  const [logType, setLogType] = useState("all");

  const filteredLogs =
    logType === "all" ? logs : logs.filter((log) => log.type === logType);

  return (
    <div className="tab-content" id="logs-tab">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Activity Log</h2>
          <div className="card-actions">
            <button className="btn btn-outline">Clear Logs</button>
          </div>
        </div>
        <div className="tab-container">
          <div className="tabs">
            <div
              className={`tab ${logType === "all" ? "active" : ""}`}
              onClick={() => setLogType("all")}
            >
              All
            </div>
            <div
              className={`tab ${logType === "info" ? "active" : ""}`}
              onClick={() => setLogType("info")}
            >
              Info
            </div>
            <div
              className={`tab ${logType === "success" ? "active" : ""}`}
              onClick={() => setLogType("success")}
            >
              Success
            </div>
            <div
              className={`tab ${logType === "warning" ? "active" : ""}`}
              onClick={() => setLogType("warning")}
            >
              Warning
            </div>
            <div
              className={`tab ${logType === "error" ? "active" : ""}`}
              onClick={() => setLogType("error")}
            >
              Error
            </div>
          </div>
        </div>
        <div className="log-container">
          {filteredLogs.length === 0 ? (
            <div className="log-entry">No logs available</div>
          ) : (
            filteredLogs.map((log, index) => (
              <div key={index} className={`log-entry log-${log.type}`}>
                [{log.timestamp}] [{log.type.toUpperCase()}] {log.message}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Logs;
