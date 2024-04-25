import { NavLink } from "react-router-dom";
import mainLogo from "../../../../assets/imgs/logo.png";
const NotFound = () => {
  return (
    <div className="container-fluid overflow-hidden">
      <div className="notFound-content vh-100">
        <p>
          <img src={mainLogo} alt="..." />
        </p>
        <div className="vh-100 d-flex align-items-start flex-column justify-content-center">
          <p className="fw-bold fs-3">OOPS.</p>
          <p className="text-success fs-4">Page not found</p>
          <p>
            This Page doesn’t exist or was removed! We suggest you back to home.
          </p>
          <NavLink className="btn btn-success w-25" to="/dashboard">
            <i className="fa-solid fa-arrow-left-long me-3"></i>
            <span>Back To Home</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
