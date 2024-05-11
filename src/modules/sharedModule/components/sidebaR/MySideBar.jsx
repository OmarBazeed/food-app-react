/* eslint-disable no-const-assign */
import { useContext, useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import sideLogo from "../../../../assets/imgs/sideLogo.png";
import { AuthContext } from "../../../../context/AuthContext";
import { sidebarContent } from "../../../../utils";
import ChangePass from "../../../authenticationModule/components/changePass/ChangePass";

const MySideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openChangeModal, setOpenChangeModal] = useState(false);
  const navigate = useNavigate();
  const { loggedUserInfo } = useContext(AuthContext);

  const showingSidebarElements = (ele) => {
    const allowedTitles =
      loggedUserInfo?.group?.name === "SystemUser"
        ? ["Home", "Recipes", "Logout", "WishList"]
        : [
            "Home",
            "Recipes",
            "Logout",
            "Users",
            "Categories",
            "Change Password",
          ];

    return allowedTitles.includes(ele.title) ? "d-block" : "d-none";
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const clickingOnSidebarElements = (ele) => {
    if (ele.title == "Logout") {
      handleLogOut();
    } else if (ele.title == "Change Password") {
      setOpenChangeModal(true);
    }
  };

  return (
    <>
      {openChangeModal && (
        <ChangePass
          openChangeModal={openChangeModal}
          setOpenChangeModal={setOpenChangeModal}
        />
      )}

      <div className="sidebar-content">
        <Sidebar collapsed={collapsed}>
          <Menu>
            <MenuItem
              icon={<img src={sideLogo} alt="..." />}
              onClick={() => setCollapsed(!collapsed)}
              className="d-flex justify-content-center p-3 m-1"
            />

            {sidebarContent?.map((ele) => {
              return (
                <MenuItem
                  key={ele.id}
                  component={ele.path}
                  icon={ele.icon}
                  className={showingSidebarElements(ele)}
                  onClick={() => clickingOnSidebarElements(ele)}
                >
                  {ele.title}
                </MenuItem>
              );
            })}
          </Menu>
        </Sidebar>
      </div>
    </>
  );
};

export default MySideBar;