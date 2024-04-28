import { NavLink } from "react-router-dom";

export const mainURL = "https://upskilling-egypt.com:3006/api/v1";
export const sidebarContent = [
  {
    icon: <i className="fa fa-home"></i>,
    path: <NavLink to="/dashboard" />,
    title: "Home",
    id: 1,
  },
  {
    icon: <i className="fa-solid fa-user-group"></i>,
    path: <NavLink to="/dashboard/users" />,
    title: "Users",
    id: 2,
  },
  {
    icon: <i className="fa-solid fa-cubes-stacked"></i>,
    path: <NavLink to="/dashboard/recipes" />,
    title: "Recipes",
    id: 3,
  },
  {
    icon: <i className="fa-solid fa-layer-group"></i>,
    path: <NavLink to="/dashboard/categories" />,
    title: "Categories",
    id: 4,
  },
  {
    icon: <i className="fa-solid fa-key"></i>,
    path: <NavLink to="/resetpass" />,
    title: "Change Password",
    id: 5,
  },
  {
    icon: <i className="fa-solid fa-arrow-right-from-bracket"></i>,
    path: "",
    title: "Logout",
    id: 6,
  },
];
