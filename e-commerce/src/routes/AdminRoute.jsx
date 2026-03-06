// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../Pages/Authantication/AuthContext";

// function AdminRoute({ children }) {
//   const { user, loading } = useContext(AuthContext);

//   if (loading) return null;

//   const isAdmin = user && user.role === "admin";

//   return isAdmin ? children : <Navigate to="/login" replace />;
// }

// export default AdminRoute;



import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminProtectedRoute;