import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";

const MasterLayout = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <Navbar />
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
