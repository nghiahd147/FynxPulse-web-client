import useUserStore from "../../store/useUserStore";
import { useEffect } from "react";
import { Cake, ChevronRight, Settings, UserCheck, UserRoundPlus, Users } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import FriendSidebar from "../../components/FriendsSidebar/FriendSidebar";
import SuggestionSidebar from "../../components/SuggestionSidebar/SuggestionSidebar";

const Friends = () => {
  const {
    getFollowSuggestions,
    me,
  } = useUserStore();
  const location = useLocation();

  useEffect(() => {
    getFollowSuggestions(me._id as string);
  }, []);

  return (
    <div className="h-full flex">
      {/* Left */}
      <div className="w-[30%] px-2 py-1 shadow-[4px_0_8px_rgba(0,0,0,0.1)] m">
        {location.pathname == "/friends/list" ? (
          <FriendSidebar />
        ) : location.pathname == "/friends/suggestions" ? (
          <SuggestionSidebar />
        ) : (
          <>
            <div className="flex items-center justify-between mb-2 px-2">
              <h2 className="text-2xl font-bold">Người theo dõi</h2>
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 cursor-pointer hover:bg-gray-300 transition-all">
                <Settings className="w-5 h-5" />
              </div>
            </div>
            <Link
              to={"/friends"}
              className={`w-full font-semibold flex items-center justify-between cursor-pointer p-2 rounded-md transition-all ease-in ${location.pathname === "/friends" ? "bg-gray-100" : "hover:bg-gray-100"
                }`}
            >
              <div className="flex items-center">
                <div className={`w-9 h-9 flex items-center justify-center rounded-full ${location.pathname === "/friends" ? "bg-[#1877F2] text-white" : "bg-gray-200 text-black"
                  }`}>
                  <Users className="w-5 h-5" fill={location.pathname === "/friends" ? "currentColor" : "none"} />
                </div>
                <span className="ml-3 text-[15px]">Trang chủ</span>
              </div>
            </Link>
            <Link
              to={"/friends/list"}
              className="w-full font-semibold mt-1 flex items-center justify-between cursor-pointer p-2 rounded-md hover:bg-gray-100 transition-all ease-in"
            >
              <div className="flex items-center">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 text-black">
                  <UserCheck className="w-5 h-5" />
                </div>
                <span className="ml-3 text-[15px]">Tất cả người theo dõi</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            <Link
              to={"/friends/suggestions"}
              className="w-full font-semibold mt-1 flex items-center justify-between cursor-pointer p-2 rounded-md hover:bg-gray-100 transition-all ease-in"
            >
              <div className="flex items-center">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 text-black">
                  <UserRoundPlus className="w-5 h-5" />
                </div>
                <span className="ml-3 text-[15px]">Gợi ý</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            <Link
              to={"/friends/birthdays"}
              className={`w-full font-semibold mt-1 flex items-center justify-between cursor-pointer p-2 rounded-md transition-all ease-in ${location.pathname === "/friends/birthdays" ? "bg-gray-100" : "hover:bg-gray-100"
                }`}
            >
              <div className="flex items-center">
                <div className={`w-9 h-9 flex items-center justify-center rounded-full ${location.pathname === "/friends/birthdays" ? "bg-[#1877F2] text-white" : "bg-gray-200 text-black"
                  }`}>
                  <Cake className="w-5 h-5" fill={location.pathname === "/friends/birthdays" ? "currentColor" : "none"} />
                </div>
                <span className="ml-3 text-[15px]">Sinh nhật</span>
              </div>
            </Link>
          </>
        )}
      </div>
      {/* Right */}
      <div className="w-full overflow-y-auto hide-scrollbar bg-[#F0F2F5]">
        <Outlet />
      </div>
    </div>
  );
};

export default Friends;
