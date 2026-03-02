import { useState } from "react";
import API from "../services/api";
import "../styles/TaskRequest.css";

function TaskRequest() {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/tasks", {
      childId: storedUser.user._id,
      message,
    });

    setSuccess("Request sent to parent!");
    setMessage("");
  };

  return (
    <div className="task-card">
      <h3>🎯 Request Extra Screen Time</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="I completed my homework"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button>Send Request</button>
      </form>

      {success && <p className="success">{success}</p>}
    </div>
  );
}

export default TaskRequest;