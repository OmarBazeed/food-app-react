/* eslint-disable no-unused-vars */
import { NavLink } from "react-router-dom";
import avatar from "../../../../assets/imgs/avatar.png";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../../context/AuthContext";

/* eslint-disable react/prop-types */
const Navbar = () => {
  const { loggedUserInfo, gettingUserData } = useContext(AuthContext);
  useEffect(() => {
    gettingUserData();
  }, [gettingUserData]);
  return (
    <nav className="navbar navbar-expand-lg bg-light w-100 ms-3 pe-2">
      <div className="container-fluid column-gap-5">
        <button
          className="navbar-toggler ms-auto"
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
                  <img
                    src={
                      loggedUserInfo?.imagePath
                        ? `https://upskilling-egypt.com:3006/${loggedUserInfo.imagePath}`
                        : avatar
                    }
                    alt=""
                    className="avatarImg"
                  />
                  <span className="fw-bold text-capitalize">
                    {loggedUserInfo?.userName}
                  </span>
                  <spn>
                    <i className="fa-solid fa-angle-down"></i>
                  </spn>
                </div>
                <div className="notificationDiv">
                  <span className="notificationIcon">
                    <i className="fa-solid fa-bell fa-2x"></i>
                  </span>
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
