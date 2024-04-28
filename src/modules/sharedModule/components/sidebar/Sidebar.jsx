import { useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import sideLogo from "../../../../assets/imgs/sideLogo.png";
import { sidebarContent } from "../../../../utils";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
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
                  className="my-2"
                  onClick={() => {
                    ele.title === "Logout" && handleLogOut();
                  }}
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

export default SideBar;
