/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

export default function GuardedRoute({ children }) {
  if (localStorage.getItem("token")) return children;
  else return <Navigate to="/" />;
}
