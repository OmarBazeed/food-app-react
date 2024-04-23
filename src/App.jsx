import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthLayout from "./modules/sharedModule/components/authLayout/AuthLayout";
import MasterLayout from "./modules/sharedModule/components/masterLayout/MasterLayout";
import NotFound from "./modules/sharedModule/components/notFound/NotFound";
import Login from "./modules/authenticationModule/components/login/Login";
import Register from "./modules/authenticationModule/components/register/Register";
import Logout from "./modules/authenticationModule/components/logout/Logout";
import CategoriesList from "./modules/categories/components/categoriesList/CategoriesList";
import Userslist from "./modules/usersModule/components/usersList/Userslist";
import RecipesList from "./modules/recipesModule/components/recipesList/RecipesList";
import ForgetPass from "./modules/authenticationModule/components/forgetPass/ForgetPass";
import ResetPass from "./modules/authenticationModule/components/resetPass/ResetPass";
import Dashboard from "./modules/sharedModule/components/dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GuardedRoute from "./modules/sharedModule/components/guardedRoute/GuardedRoute";
import { jwtDecode } from "jwt-decode";

const loginData = jwtDecode(localStorage.getItem("token"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "forgetpass",
        element: <ForgetPass />,
      },
      {
        path: "resetpass",
        element: <ResetPass />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <GuardedRoute loginData={loginData}>
        <MasterLayout />
      </GuardedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: "categories",
        element: <CategoriesList />,
      },
      {
        path: "users",
        element: <Userslist />,
      },
      {
        path: "recipes",
        element: <RecipesList />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
