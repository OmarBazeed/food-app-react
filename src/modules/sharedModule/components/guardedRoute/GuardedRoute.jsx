/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

export default function GuardedRoute({ children, loginData }) {
  if (localStorage.getItem("token") || loginData) return children;
  else return <Navigate to="/" />;
}
