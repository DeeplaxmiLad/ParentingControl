import { useEffect, useState } from "react";
import RuleForm from "../components/RuleForm";
import ActivityList from "../components/ActivityList";
import API from "../services/api";
import "../styles/ParentDashboard.css";
import WeeklyReport from "../components/WeeklyReport";
import LocationMap from "../components/LocationMap";
import TaskApproval from "../components/TaskApproval";

function ParentDashboard() {
  const [activeCard, setActiveCard] = useState(null);
  const [rule, setRule] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const parentName = storedUser?.user?.name || "Parent";

  /* FETCH RULE */
  useEffect(() => {
    const fetchRule = async () => {
      try {
        const { data } = await API.get("/rules");
        setRule(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRule();
  }, []);

  /* REWARD FUNCTION */
  const giveReward = async () => {
    try {
      const { data } = await API.put(`/rules/reward/${rule._id}`);
      setRule(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="parent-wrapper">
      <div className="parent-container">

        <div className="parent-header">
          <h2>Welcome, {parentName} 👋</h2>
          <p>Manage your child’s activity and parental controls</p>
        </div>

        {/* SUMMARY */}
        <div className="parent-summary-grid">
          <div className="summary-card">
            <h4>Daily Limit</h4>
            <p>{rule?.dailyLimit || 0} min</p>
          </div>

          <div className="summary-card">
            <h4>Sleep Time</h4>
            <p>
              {rule?.sleepStart || "--:--"} - {rule?.sleepEnd || "--:--"}
            </p>
          </div>

          <div className="summary-card">
            <h4>Reward Time</h4>
            <p>{rule?.rewardMinutes || 0} min</p>
            <button className="reward-btn" onClick={giveReward}>
              +30 min
            </button>
          </div>
        </div>

        {/* ACTION CARDS */}
        <div className="parent-grid">
          <div
            className={`parent-card ${
              activeCard === "rules" ? "active" : ""
            }`}
            onClick={() => setActiveCard("rules")}
          >
            <h3>⚙ Set Rules</h3>
            <p>Control screen time and block apps/websites</p>
          </div>

          <div
            className={`parent-card ${
              activeCard === "activity" ? "active" : ""
            }`}
            onClick={() => setActiveCard("activity")}
          >
            <h3>📊 Monitor Activity</h3>
            <p>View child’s recent activity logs</p>
          </div>
        </div>

        {activeCard === "rules" && (
          <div className="parent-details">
            <RuleForm />
          </div>
        )}

        {activeCard === "activity" && (
          <div className="parent-details">
            <TaskApproval />
            <WeeklyReport />
            <LocationMap />
            <ActivityList />
          </div>
        )}
      </div>
    </div>
  );
}

export default ParentDashboard;