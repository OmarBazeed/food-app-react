/* eslint-disable react/prop-types */
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import MySideBar from "../sidebaR/MySideBar";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../../context/AuthContext";

const MasterLayout = ({ loginData }) => {
  const { loggedUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(loggedUserInfo);

  useEffect(() => {
    !loggedUserInfo && navigate("/");
  }, [loggedUserInfo, navigate]);
  return (
    <div className="container-fluid masterLayout">
      <div className="d-flex justify-content-start">
        <div className="vh-100">
          <MySideBar />
        </div>
        <div className="w-100 vh-100 overflow-y-auto masterOutlet">
          <Navbar loginData={loginData} />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
