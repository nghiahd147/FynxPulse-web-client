import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import useUserStore from "../store/useUserStore";

const MainLayout = () => {
  const [isTabOpen, setTabOpen] = useState(false);
  const { getMe } = useUserStore();

  useEffect(() => {
    getMe();
  }, []);

  return (
    <div className="flex sm:block">
      {isTabOpen && (
        <div
          className={`relative z-10 h-screen w-[90%] bg-red-100 border-r-2 sm:hidden border-gray-100`}
        ></div>
      )}

      <div className="hide-scrollbar h-screen overflow-x-hidden overflow-y-auto relative">
        {isTabOpen && (
          <div
            className="absolute left-0 right-0 top-0 bottom-0 bg-gray-950/60 z-10"
            onClick={() => setTabOpen(false)}
          ></div>
        )}
        <header>
          <Header setTabOpen={setTabOpen} />
        </header>
        <Outlet />
        {/* {location.pathname.split("/")[1] !== "profile" && <Footer />} */}
      </div>
    </div>
  );
};

export default MainLayout;
