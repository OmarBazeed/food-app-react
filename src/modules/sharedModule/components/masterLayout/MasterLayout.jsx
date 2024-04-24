/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";

const MasterLayout = ({ loginData }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <Navbar loginData={loginData} />
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
