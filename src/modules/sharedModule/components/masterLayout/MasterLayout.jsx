/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import MySideBar from "../sidebaR/MySideBar";

const MasterLayout = ({ loginData }) => {
  return (
    <div className="container-fluid masterLayout">
      <div className="d-flex justify-content-start">
        <div className="vh-100">
          <MySideBar />
        </div>
        <div className="w-100 vh-100 overflow-y-auto">
          <Navbar loginData={loginData} />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
