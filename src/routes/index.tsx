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
import Birthdays from "../pages/Friends/components/Birthdays";
import Suggestions from "../pages/Friends/components/Suggestions";
import PeopleYouMayKnow from "../pages/Friends/components/PeopleYouMayKnow";
import List from "../pages/Friends/components/List";
import ProfileInfo from "../pages/Profile/components/ProfileInfo";

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
            index: true,
            element: <ProfileInfo />
          },
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
        children: [
          {
            index: true,
            element: <PeopleYouMayKnow />
          },
          {
            path: "list",
            element: <List />,
            children: [
              {
                path: ":user_name",
                element: <Profile />,
                children: [
                  {
                    index: true,
                    element: <ProfileInfo />
                  },
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
              }
            ]
          },
          {
            path: "birthdays",
            element: <Birthdays />,
          },
          {
            path: "suggestions",
            element: <Suggestions />
          }
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
