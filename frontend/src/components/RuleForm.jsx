import { useState } from "react";
import API from "../services/api";
import "../styles/RuleForm.css";

function RuleForm() {
  const [formData, setFormData] = useState({
    screenTimeLimit: "",
    blockedApps: "",
    blockedWebsites: "",
    locationTracking: false,

    dailyLimit: "",
    sleepStart: "",
    sleepEnd: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      await API.post("/rules", {
        screenTimeLimit: Number(formData.screenTimeLimit),

        blockedApps: formData.blockedApps
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        blockedWebsites: formData.blockedWebsites
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        locationTracking: formData.locationTracking,

        // ✅ NEW FIELDS ADDED HERE
        dailyLimit: Number(formData.dailyLimit),
        sleepStart: formData.sleepStart,
        sleepEnd: formData.sleepEnd,
      });

      setSuccess("Rules saved successfully!");
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="rule-card">
      <h3 className="rule-title">Set Parental Rules</h3>

      <form onSubmit={handleSubmit} className="rule-form">

        {/* Screen Time */}
        <div className="form-group">
          <label>Screen Time Limit (minutes)</label>
          <input
            type="number"
            name="screenTimeLimit"
            value={formData.screenTimeLimit}
            onChange={handleChange}
            required
          />
        </div>

        {/* Daily Limit */}
        <div className="form-group">
          <label>Daily Screen Time Limit (minutes)</label>
          <input
            type="number"
            name="dailyLimit"
            value={formData.dailyLimit}
            onChange={handleChange}
          />
        </div>

        {/* Sleep Schedule */}
        <div className="form-group">
          <label>Sleep Start Time</label>
          <input
            type="time"
            name="sleepStart"
            value={formData.sleepStart}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Sleep End Time</label>
          <input
            type="time"
            name="sleepEnd"
            value={formData.sleepEnd}
            onChange={handleChange}
          />
        </div>

        {/* Blocked Apps */}
        <div className="form-group">
          <label>Blocked Apps (comma separated)</label>
          <input
            type="text"
            name="blockedApps"
            value={formData.blockedApps}
            onChange={handleChange}
          />
        </div>

        {/* Blocked Websites */}
        <div className="form-group">
          <label>Blocked Websites (comma separated)</label>
          <input
            type="text"
            name="blockedWebsites"
            value={formData.blockedWebsites}
            onChange={handleChange}
          />
        </div>

        {/* Location Tracking */}
        <div className="checkbox-group">
          <input
            type="checkbox"
            name="locationTracking"
            checked={formData.locationTracking}
            onChange={handleChange}
          />
          <label>Enable Location Tracking</label>
        </div>

        <button className="rule-btn" disabled={loading}>
          {loading ? "Saving..." : "Save Settings"}
        </button>

        {success && <p className="success-msg">{success}</p>}
      </form>
    </div>
  );
}

export default RuleForm;