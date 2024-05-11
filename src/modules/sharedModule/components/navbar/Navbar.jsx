/* eslint-disable no-unused-vars */
import avatar from "../../../../assets/imgs/avatar.png";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";

const Navbar = () => {
  const { loggedUserInfo, gettingUserData } = useContext(AuthContext);
  useEffect(() => {
    gettingUserData();
  }, [gettingUserData]);
  return (
    <nav className="navbar navbar-expand-lg bg-light w-100 ms-3 pe-2">
      <div className="container-fluid gap-3">
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
        <div
          className="row collapse navbar-collapse gap-3 gap-sm-0"
          id="navbarSupportedContent"
        >
          <div className="d-flex searchNav col-md-9">
            <input
              className="form-control me-2 w-100"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </div>
          <div className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex justify-content-end align-items-center col-md-3 flex-row">
            <div>
              <Popover>
                <PopoverTrigger>
                  <Button variant="" colorScheme="" className="border-0">
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
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="p-2 bg-white"
                  style={{ width: "150px" }}
                >
                  <PopoverArrow />
                  <PopoverCloseButton className="w-25 border-0 ms-auto my-2 bg-transparent" />
                  <PopoverBody className="px-4 my-1">
                    <Button variant="ghost" colorScheme="teal">
                      Profile
                    </Button>
                    <Button variant="ghost" colorScheme="red">
                      Logout
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </div>
            <div className="mx-3">
              <span className="notificationIcon">
                <i className="fa-solid fa-bell fa-2x"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
