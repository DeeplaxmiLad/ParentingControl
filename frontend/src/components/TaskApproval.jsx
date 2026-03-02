import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/TaskApproval.css";

function TaskApproval() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const { data } = await API.get("/tasks");
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const approve = async (id) => {
    await API.put(`/tasks/approve/${id}`);
    fetchTasks();
  };

  const reject = async (id) => {
    await API.put(`/tasks/reject/${id}`);
    fetchTasks();
  };

  return (
    <div className="approval-card">
      <h3>📩 Task Requests</h3>

      {tasks.length === 0 ? (
        <p>No requests</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className="task-row">
            <div>
              <strong>{task.message}</strong>
              <p>Status: {task.status}</p>
            </div>

            {task.status === "pending" && (
              <div className="btn-group">
                <button onClick={() => approve(task._id)}>Approve</button>
                <button className="reject" onClick={() => reject(task._id)}>
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default TaskApproval;