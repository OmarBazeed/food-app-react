import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div>
      Dashboard
      <button className="btn btn-danger" onClick={() => handleLogOut()}>
        logout
      </button>
    </div>
  );
};

export default Dashboard;
