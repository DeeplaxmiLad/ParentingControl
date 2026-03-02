import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser.user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        👨‍👩‍👧 Parenting Control
      </div>

      <div className="navbar-menu">
        {!user && (
          <>
            <NavLink to="/" className="nav-link">
              Login
            </NavLink>
            <NavLink to="/register" className="nav-link">
              Register
            </NavLink>
          </>
        )}

        {user?.role === "parent" && (
          <NavLink to="/parent" className="nav-link">
            Parent Dashboard
          </NavLink>
        )}

        {user?.role === "child" && (
          <NavLink to="/child" className="nav-link">
            Child Dashboard
          </NavLink>
        )}

        {user && (
          <>
            <span className="nav-username">
              👤 {user.name}
            </span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;