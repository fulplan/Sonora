import React, { useState, useEffect } from "react";

const Settings = ({ settings, updateSettings, syncTime }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLocalSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateSettings(localSettings);
  };

  return (
    <div className="tab-content" id="settings-tab">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Configuration</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="rotation-interval">
              Rotation Interval (seconds)
            </label>
            <input
              type="number"
              className="form-control"
              id="rotation-interval"
              name="rotation_interval"
              value={localSettings.rotation_interval}
              onChange={handleChange}
              min="30"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="api-key">
              IPinfo.io API Key
            </label>
            <input
              type="text"
              className="form-control"
              id="api-key"
              name="api_key"
              value={localSettings.api_key || ""}
              onChange={handleChange}
              placeholder="Enter your API key"
            />
          </div>
          <div className="form-group">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="auto-sync"
                name="auto_sync_time"
                checked={localSettings.auto_sync_time || false}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="auto-sync">
                Automatically sync time with proxy location
              </label>
            </div>
          </div>
          <button type="submit" className="btn">
            Save Settings
          </button>
        </form>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Time Synchronization</h2>
        </div>
        <div className="form-group">
          <label className="form-label">Current System Time</label>
          <input
            type="text"
            className="form-control"
            value={currentTime.toLocaleString()}
            readOnly
          />
        </div>
        <div className="form-group">
          <label className="form-label">Proxy Location Time</label>
          <input
            type="text"
            className="form-control"
            value={currentTime.toLocaleString()}
            readOnly
          />
        </div>
        <button className="btn" onClick={syncTime}>
          Sync Time Now
        </button>
      </div>
    </div>
  );
};

export default Settings;
