import React, { useState } from "react";

const ProxyManagement = ({
  proxies,
  activeProxy,
  addProxy,
  removeProxy,
  setActiveProxy,
  checkAllProxiesHealth,
}) => {
  const [newProxy, setNewProxy] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [healthResults, setHealthResults] = useState(null);
  const [error, setError] = useState("");

  const handleAddProxy = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!newProxy.includes(":")) {
      setError("Proxy must be in format host:port");
      return;
    }

    try {
      const result = await addProxy(newProxy);
      if (result && result.error) {
        setError(result.error);
      } else {
        setNewProxy("");
        setUsername("");
        setPassword("");
      }
    } catch (err) {
      setError("Failed to add proxy");
    }
  };

  const handleBulkHealthCheck = async () => {
    try {
      const result = await checkAllProxiesHealth();
      setHealthResults(result);
    } catch (err) {
      setError("Failed to check proxy health");
    }
  };

  return (
    <div className="proxy-management">
      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* Add Proxy Form */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Add New Proxy</h2>
        </div>
        <form onSubmit={handleAddProxy}>
          <div className="form-group">
            <label className="form-label">Proxy Address (host:port)</label>
            <input
              type="text"
              className="form-control"
              value={newProxy}
              onChange={(e) => setNewProxy(e.target.value)}
              placeholder="192.168.1.1:8080"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Username (optional)</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password (optional)</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn">
            Add Proxy
          </button>
        </form>
      </div>

      {/* Proxy List */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Proxy Pool</h2>
          <div className="card-actions">
            <button
              className="btn btn-secondary"
              onClick={handleBulkHealthCheck}
              disabled={proxies.length === 0}
            >
              Check All Proxies
            </button>
          </div>
        </div>

        {proxies.length === 0 ? (
          <div className="empty-state">No proxies configured</div>
        ) : (
          <ul className="proxy-list">
            {proxies.map((proxy) => (
              <li
                key={proxy}
                className={`proxy-item ${
                  proxy === activeProxy ? "active" : ""
                }`}
              >
                <div className="proxy-info">
                  <span
                    className={`proxy-status ${
                      healthResults?.proxies?.find((p) => p.proxy === proxy)
                        ?.alive
                        ? "healthy"
                        : "unknown"
                    }`}
                  ></span>
                  <span>{proxy}</span>
                </div>
                <div className="proxy-actions">
                  <button
                    onClick={() => setActiveProxy(proxy)}
                    disabled={proxy === activeProxy}
                  >
                    {proxy === activeProxy ? "Active" : "Set Active"}
                  </button>
                  <button
                    onClick={() => removeProxy(proxy)}
                    className="btn-danger"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProxyManagement;
