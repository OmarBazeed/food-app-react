import { Navigate } from "react-router-dom";

export default function GuardedRoute({ loginData, children }) {
  if (localStorage.getItem("token") || loginData) return children;
  else return <Navigate to="/login" />;
}
