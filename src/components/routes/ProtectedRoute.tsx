import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }:any) {
  const location = useLocation();
  const token = localStorage.getItem("authToken");
  if (!token) {
    return <Navigate to="/signin" replace state={{from: location}}/>;
  } else {
    return children;
  }
}

export default ProtectedRoute;