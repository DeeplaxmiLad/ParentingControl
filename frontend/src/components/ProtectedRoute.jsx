import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/ProtectedRoute.css";

function ProtectedRoute({ children, role }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedUser && storedUser.user.role === role) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
    } catch (error) {
      setAuthorized(false);
    }

    setLoading(false);
  }, [role]);

  if (loading) {
    return (
      <div className="protected-loading">
        Checking authentication...
      </div>
    );
  }

  if (!authorized) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;