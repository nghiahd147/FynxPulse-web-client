import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";

const MainLayout = () => {
  const naivgate = useNavigate();
  const isAuth = localStorage.getItem("token");

  useEffect(() => {
    if (!isAuth) {
      naivgate("/login");
    }
  }, [isAuth]);

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  );
};

export default MainLayout;
