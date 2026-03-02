import Navbar from "../components/Navbar";
import "../styles/DashboardLayout.css";

function DashboardLayout({ children }) {
  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <div className="dashboard-content">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;