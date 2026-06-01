import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import useUserStore from "../store/useUserStore";

const MainLayout = () => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("access_token");
  const [isTabOpen, setTabOpen] = useState(false);
  const location = useLocation();
  const { getMe } = useUserStore();

  useEffect(() => {
    getMe();
  }, []);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);

  return (
    <div className="flex sm:block">
      {isTabOpen && (
        <div
          className={`relative z-10 h-screen w-[90%] bg-red-100 border-r-2 sm:hidden border-gray-100`}
        ></div>
      )}

      <div className="h-screen overflow-y-auto relative">
        {isTabOpen && (
          <div
            className="absolute left-0 right-0 top-0 bottom-0 bg-gray-950/60 z-10"
            onClick={() => setTabOpen(false)}
          ></div>
        )}
        <header>
          <Header setTabOpen={setTabOpen} />
        </header>
        <main>
          <Outlet />
        </main>
        {location.pathname.split("/")[1] !== "profile" && <Footer />}
      </div>
    </div>
  );
};

export default MainLayout;
