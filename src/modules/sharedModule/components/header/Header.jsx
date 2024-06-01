import { useContext, useEffect } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import UserImage from "../../../../assets/imgs/User-removebg-preview.png";

/* eslint-disable react/prop-types */
const Header = ({ title, description }) => {
  const { loggedUserInfo, gettingUserData } = useContext(AuthContext);
  useEffect(() => {
    gettingUserData();
  }, [gettingUserData]);
  return (
    <div className="header-content w-100 m-auto d-flex justify-content-center align-items-center ms-1 ms-md-0">
      <div className="d-flex align-items-center justify-content-md-around flex-wrap flex-md-nowrap p-2 w-100">
        <div className="col-md-5 text-center text-sm-start">
          <h2>
            Welcome
            <sapan className="fw-bold text-light mx-3 text-capitalize">
              {title}
            </sapan>
          </h2>
          <p className="text-white">{description}</p>
        </div>
        <div className="col-md-5 m-auto m-md-0 text-md-center">
          <img
            src={
              loggedUserInfo?.imagePath
                ? `https://upskilling-egypt.com:3006/${loggedUserInfo.imagePath}`
                : UserImage
            }
            alt="..."
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
