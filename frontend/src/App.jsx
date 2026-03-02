import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ParentDashboard from "./pages/ParentDashboard";
import ChildDashboard from "./pages/ChildDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import DashboardLayout from "./layouts/Dashboardlayout";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

<Route
  path="/parent"
  element={
    <ProtectedRoute role="parent">
      <DashboardLayout>
        <ParentDashboard />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/child"
  element={
    <ProtectedRoute role="child">
      <DashboardLayout>
        <ChildDashboard />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;