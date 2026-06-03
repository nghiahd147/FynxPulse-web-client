import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import ForgotPass from "../pages/Auth/ForgotPass/ForgotPass";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import Profile from "../pages/Profile/Profile";
import ProfileFriends from "../pages/Profile/components/ProfileFriends";
import Reels from "../pages/Reels/Reels";
import Friends from "../pages/Friends/Friends";
import ProfileImage from "../pages/Profile/components/ProfileImage";
import ProfilePost from "../pages/Profile/components/ProfilePost";

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
            path: "images",
            element: <ProfileImage />,
          },
          {
            path: "friends",
            element: <ProfileFriends />,
          },
          {
            path: "posts",
            element: <ProfilePost />,
          },
        ],
      },
      {
        path: "/reels",
        element: <Reels />,
      },
      {
        path: "/friends",
        element: <Friends />,
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
