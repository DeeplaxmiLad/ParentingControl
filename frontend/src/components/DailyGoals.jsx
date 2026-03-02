import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/DailyGoals.css";

function DailyGoals() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const childId = storedUser.user._id;

  const fetchGoals = async () => {
    const { data } = await API.get(`/goals/${childId}`);
    setGoals(data);
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const addGoal = async () => {
    await API.post("/goals", { childId, title: newGoal });
    setNewGoal("");
    fetchGoals();
  };

  const toggleGoal = async (id) => {
    await API.put(`/goals/${id}`);
    fetchGoals();
  };

  return (
    <div className="goal-card">
      <h3>📅 Daily Goals</h3>

      <div className="goal-input">
        <input
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="Read 20 minutes"
        />
        <button onClick={addGoal}>Add</button>
      </div>

      {goals.map((goal) => (
        <div
          key={goal._id}
          className={`goal-item ${goal.completed ? "done" : ""}`}
          onClick={() => toggleGoal(goal._id)}
        >
          {goal.title}
        </div>
      ))}
    </div>
  );
}

export default DailyGoals;