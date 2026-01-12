import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const isAuth = JSON.parse(localStorage.getItem("auth"));

  return isAuth ? children : <Navigate to="/" />;
}

export default PrivateRoute;
