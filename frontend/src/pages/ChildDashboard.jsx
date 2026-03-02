import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/ChildDashboard.css";
import TaskRequest from "../components/TaskRequest";
import DailyGoals from "../components/DailyGoals";

function ChildDashboard() {
  const [rule, setRule] = useState(null);
  const [screenTime, setScreenTime] = useState(0);
  const [locked, setLocked] = useState(false);
  const [lockReason, setLockReason] = useState("");

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const childName = storedUser?.user?.name || "Child";

  /* FETCH RULE */
  const fetchRule = async () => {
    try {
      const { data } = await API.get("/rules");
      setRule(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRule();
  }, []);

  /* SCREEN TIME COUNTER */
  useEffect(() => {
    const interval = setInterval(() => {
      setScreenTime((prev) => prev + 1);
    }, 60000); // 1 min

    return () => clearInterval(interval);
  }, []);

  /* DAILY LIMIT CHECK */
  useEffect(() => {
    if (!rule) return;

    const totalAllowed =
      (rule.dailyLimit || 0) + (rule.rewardMinutes || 0);

    if (totalAllowed > 0 && screenTime >= totalAllowed) {
      setLocked(true);
      setLockReason("Daily screen time limit exceeded");
    }
  }, [screenTime, rule]);

  const totalAllowed =
  (rule?.dailyLimit || 0) + (rule?.rewardMinutes || 0);

const progress =
  totalAllowed > 0
    ? Math.min((screenTime / totalAllowed) * 100, 100)
    : 0;

  /* SLEEP TIME CHECK */
  useEffect(() => {
    if (!rule?.sleepStart || !rule?.sleepEnd) return;

    const now = new Date();
    const current = now.getHours() * 60 + now.getMinutes();

    const [startHour, startMin] = rule.sleepStart.split(":").map(Number);
    const [endHour, endMin] = rule.sleepEnd.split(":").map(Number);

    const start = startHour * 60 + startMin;
    const end = endHour * 60 + endMin;

    if (current >= start && current <= end) {
      setLocked(true);
      setLockReason("Sleep time restriction active");
    }
  }, [rule]);

  /* LOCK SCREEN */
  if (locked) {
    return (
      <div className="lock-screen">
        <h2>⛔ Access Restricted</h2>
        <p>{lockReason}</p>
      </div>
    );
  }

  return (
    <div className="child-wrapper">
      <div className="child-container">
        <div className="child-header">
          <h2>Hello, {childName} 👋</h2>
          <p>Screen Time Used: {screenTime} min</p>
          <p>
            Allowed Time:{" "}
            {(rule?.dailyLimit || 0) + (rule?.rewardMinutes || 0)} min
          </p>
        </div>
        <div className="progress-section">
  <h4>Screen Time Usage</h4>
  <div className="progress-bar">
    <div
      className="progress-fill"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
  <p>{Math.round(progress)}% used</p>
</div>

        <div className="child-grid">
          <div className="child-card">
            <h3>Daily Limit</h3>
            <p>{rule?.dailyLimit || 0} min</p>
          </div>

          <div className="child-card">
            <h3>Sleep Time</h3>
            <p>
              {rule?.sleepStart || "--:--"} -{" "}
              {rule?.sleepEnd || "--:--"}
            </p>
          </div>

          <div className="child-card">
            <h3>Reward Time</h3>
            <p>{rule?.rewardMinutes || 0} min</p>
          </div>
          <DailyGoals />
          <TaskRequest />
        </div>
      </div>
    </div>
  );
}

export default ChildDashboard;