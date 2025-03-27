import { Navigate, useLocation, useNavigate } from "react-router-dom";

function ProtectedRoute({ children }:any) {
  const navigate = useNavigate();
  const location = useLocation();
  const token: string = JSON.parse(localStorage.getItem("user") || ``)[0]["token"] as string;
  const user = JSON.parse(localStorage.getItem("user") || ``);
  if (!token || !user) {
    return <Navigate to="/signin" replace state={{from: location}}/>;
  } else {
    navigate('/');
    return children;
  }
}

export default ProtectedRoute;