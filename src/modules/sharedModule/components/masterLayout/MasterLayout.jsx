/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import MySideBar from "../sidebaR/MySideBar";

const MasterLayout = ({ loginData }) => {
  return (
    <div className="container-fluid masterLayout">
      <div className="d-flex justify-content-start">
        <div className="">
          <MySideBar />
        </div>
        <div className="w-100">
          <Navbar loginData={loginData} />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
