import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/ActivityList.css";

function ActivityList() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const { data } = await API.get("/activity");
        setActivities(data);
      } catch (error) {
        console.error("Error fetching activity", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  if (loading) {
    return <div className="activity-loading">Loading activities...</div>;
  }

  if (activities.length === 0) {
    return <div className="activity-empty">No activity found.</div>;
  }

  return (
    <div className="activity-container">
      {activities.map((activity, index) => (
        <div key={index} className="activity-card">
          <div className="activity-header">
            <span className="activity-app">{activity.appUsed}</span>
            <span className="activity-time">
              {new Date(activity.timeStamp).toLocaleString()}
            </span>
          </div>

          <div className="activity-body">
            <p><strong>Website:</strong> {activity.websiteVisited}</p>
            <p>
              <strong>Location:</strong>{" "}
              {activity.location?.lat}, {activity.location?.lng}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ActivityList;