import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import homeImg from "../../../../assets/imgs/home-avatar.svg";
const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div>
      <Header
        title="Welcome Upskilling"
        description="This is a welcoming screen for the entry of the application , you can now see the options"
        imgSource={homeImg}
      />
      <button className="btn btn-danger" onClick={() => handleLogOut()}>
        logout
      </button>
    </div>
  );
};

export default Dashboard;
