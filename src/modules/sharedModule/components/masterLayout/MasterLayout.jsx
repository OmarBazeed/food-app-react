/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import SideBar from "../sidebar/SideBar";

const MasterLayout = ({ loginData }) => {
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-start">
        <div className="">
          <SideBar />
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
