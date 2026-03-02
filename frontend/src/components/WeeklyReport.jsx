import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/WeeklyReport.css";

function WeeklyReport() {
  const [report, setReport] = useState([]);

  useEffect(() => {
    const fetchReport = async () => {
      const { data } = await API.get("/activity/weekly-report");
      setReport(data);
    };
    fetchReport();
  }, []);

  return (
    <div className="report-card">
      <h3>📊 Weekly Usage Report</h3>

      {report.length === 0 ? (
        <p>No activity this week</p>
      ) : (
        report.map((item, index) => (
          <div key={index} className="report-item">
            <span>{item._id}</span>
            <span>{item.totalUsage} times</span>
          </div>
        ))
      )}
    </div>
  );
}

export default WeeklyReport;