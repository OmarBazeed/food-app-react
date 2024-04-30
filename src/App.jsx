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
import VerifyAccount from "./modules/authenticationModule/components/verifyAccount/VerifyAccount";
import Dashboard from "./modules/sharedModule/components/dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GuardedRoute from "./modules/sharedModule/components/guardedRoute/GuardedRoute";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

function App() {
  const [loginData, setLoginData] = useState(null);

  const savingLoggedData = () => {
    const token = localStorage.getItem("token");
    const decodeToken = token && jwtDecode(token);
    setLoginData(decodeToken);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      savingLoggedData();
    }
  }, []);

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
        {
          path: "verifyAccount",
          element: <VerifyAccount />,
        },
      ],
    },
    {
      path: "dashboard",
      element: (
        <GuardedRoute loginData={loginData}>
          <MasterLayout loginData={loginData} />
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

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
