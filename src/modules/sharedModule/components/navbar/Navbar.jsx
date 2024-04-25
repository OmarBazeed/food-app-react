import { NavLink } from "react-router-dom";
import avatar from "../../../../assets/imgs/avatar.png";

/* eslint-disable react/prop-types */
const Navbar = ({ loginData }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-light w-100">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex searchNav" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link active d-flex gap-4 align-items-center justify-content-between"
                aria-current="page"
                to=""
              >
                <div className="d-flex align-items-center gap-2">
                  <img src={avatar} alt="" className="avatarImg" />
                  <span className="fw-bold text-capitalize">
                    {loginData?.userName}
                  </span>
                  <spn>
                    <i className="fa-solid fa-angle-down"></i>
                  </spn>
                </div>
                <span className="notificationIcon">
                  <i className="fa-solid fa-bell fa-2x"></i>
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
