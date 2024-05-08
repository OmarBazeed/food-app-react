import { NavLink } from "react-router-dom";
import HomePic from "../assets/imgs/animatedPics/home.gif";
import UsresPic from "../assets/imgs/animatedPics/users.gif";
import RecipesPic from "../assets/imgs/animatedPics/recipes.gif";
import CategoriesPic from "../assets/imgs/animatedPics/categories.gif";
import ChangePic from "../assets/imgs/animatedPics/change.gif";
import LogPic from "../assets/imgs/animatedPics/logout.gif";
import FavPic from "../assets/imgs/animatedPics/favorite.gif";

export const mainURL = "https://upskilling-egypt.com:3006/api/v1";
export const sidebarContent = [
  {
    icon: <img src={HomePic} alt="..." className="loginIcons" />,
    path: <NavLink to="/dashboard" />,
    title: "Home",
    id: 1,
  },
  {
    icon: <img src={UsresPic} alt="..." className="loginIcons" />,
    path: <NavLink to="/dashboard/users" />,
    title: "Users",
    id: 2,
  },
  {
    icon: <img src={RecipesPic} alt="..." className="loginIcons" />,
    path: <NavLink to="/dashboard/recipes" />,
    title: "Recipes",
    id: 3,
  },
  {
    icon: <img src={CategoriesPic} alt="..." className="loginIcons" />,
    path: <NavLink to="/dashboard/categories" />,
    title: "Categories",
    id: 4,
  },
  {
    icon: <img src={ChangePic} alt="..." className="loginIcons" />,
    path: "",
    title: "Change Password",
    id: 5,
  },
  {
    icon: <img src={FavPic} alt="..." className="loginIcons" />,
    path: <NavLink to="/dashboard/favorites" />,
    title: "WishList",
    id: 7,
  },

  {
    icon: <img src={LogPic} alt="..." className="loginIcons" />,
    path: "",
    title: "Logout",
    id: 6,
  },
];
