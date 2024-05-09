import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgetPass from "./modules/authenticationModule/components/forgetPass/ForgetPass";
import Login from "./modules/authenticationModule/components/login/Login";
import Logout from "./modules/authenticationModule/components/logout/Logout";
import Register from "./modules/authenticationModule/components/register/Register";
import ResetPass from "./modules/authenticationModule/components/resetPass/ResetPass";
import VerifyAccount from "./modules/authenticationModule/components/verifyAccount/VerifyAccount";
import CategoriesList from "./modules/categories/components/categoriesList/CategoriesList";
import RecipesList from "./modules/recipesModule/components/recipesList/RecipesList";
import AuthLayout from "./modules/sharedModule/components/authLayout/AuthLayout";
import Dashboard from "./modules/sharedModule/components/dashboard/Dashboard";
import GuardedRoute from "./modules/sharedModule/components/guardedRoute/GuardedRoute";
import MasterLayout from "./modules/sharedModule/components/masterLayout/MasterLayout";
import NotFound from "./modules/sharedModule/components/notFound/NotFound";
import Userslist from "./modules/usersModule/components/usersList/Userslist";
import Favorites from "./modules/userPortal/components/favorites/Favorites";

function App() {
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
        <GuardedRoute>
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
        {
          path: "favorites",
          element: <Favorites />,
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
