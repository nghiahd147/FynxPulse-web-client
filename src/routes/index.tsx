import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import ForgotPass from "../pages/Auth/ForgotPass/ForgotPass";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import Profile from "../pages/Profile/Profile";
import Friends from "../pages/Profile/components/Friends";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/profile/:user_name?",
        element: <Profile />,
        children: [
          {
            path: "friends",
            element: <Friends />,
          },
        ],
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot",
        element: <ForgotPass />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
