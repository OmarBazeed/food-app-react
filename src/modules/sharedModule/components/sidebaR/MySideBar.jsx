import { useContext, useEffect, useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import sideLogo from "../../../../assets/imgs/sideLogo.png";
import { AuthContext } from "../../../../context/AuthContext";
import { sidebarContent } from "../../../../utils";
import ChangePass from "../../../authenticationModule/components/changePass/ChangePass";

const MySideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openChangeModal, setOpenChangeModal] = useState(false);
  const { loggedUserInfo } = useContext(AuthContext);
  const [activeItem, setActiveItem] = useState("");

  const showingSidebarElements = (ele) => {
    const allowedTitles =
      loggedUserInfo?.group?.name === "SystemUser"
        ? ["Home", "Recipes", "WishList"]
        : ["Home", "Recipes", "Users", "Categories", "Change Password"];

    return allowedTitles.includes(ele.title) ? "d-block" : "d-none";
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 575) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
              const isActive = activeItem === ele.title; // Check if item is active
              return (
                <MenuItem
                  key={ele.id}
                  component={ele.path}
                  icon={ele.icon}
                  className={`${showingSidebarElements(ele)} ${
                    isActive ? "activeMenuItem" : ""
                  }`}
                  onClick={() => setActiveItem(ele.title)}
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
