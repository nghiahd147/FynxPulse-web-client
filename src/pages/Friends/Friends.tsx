import { Button, Col, Row, Spin } from "antd";
import useUserStore from "../../store/useUserStore";
import { useEffect } from "react";
import { Cake, UserCheck, Users } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import FriendSidebar from "../../components/FriendsSidebar/FriendSidebar";

const Friends = () => {
  const {
    getFollowSuggestions,
    me,
    listFriends,
    loading: { getFollowSuggestions: loadingFollowSuggestions },
  } = useUserStore();
  const location = useLocation();

  console.log(location.pathname);

  useEffect(() => {
    getFollowSuggestions(me._id as string);
  }, []);

  return (
    <div className="h-full flex">
      {/* Left */}
      <div className="w-[30%] px-2 py-1 shadow-[4px_0_8px_rgba(0,0,0,0.1)] m">
        {location.pathname == "/friends/list" ? (
          <FriendSidebar />
        ) : (
          <>
            <h3 className="text-xl font-bold ml-2">Người theo dõi</h3>
            <Link
              to={"/friends"}
              className="w-full font-bold mt-2 flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-200 transition-all ease-in"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
                <Users className="p-1" />
              </div>
              <span className="ml-2">Trang chủ</span>
            </Link>
            <Link
              to={"/friends/list"}
              className="w-full font-bold mt-2 flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-200 transition-all ease-in"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
                <UserCheck className="p-1" />
              </div>
              <span className="ml-2">Tất cả bạn bè</span>
            </Link>
            <Link
              to={"/friends/birthdays"}
              className="w-full font-bold mt-2 flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-200 transition-all ease-in"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
                <Cake className="p-1" />
              </div>
              <span className="p-1">Sinh nhật</span>
            </Link>
          </>
        )}
      </div>
      {/* Right */}
      <div className="w-full overflow-y-auto hide-scrollbar py-4 px-10">
        {location.pathname == "/friends" && (
          <>
            <h3 className="text-xl font-bold">Những người bạn có thể biết</h3>
            <Row gutter={[12, 12]} className="mt-4">
              {/* Friend */}
              {loadingFollowSuggestions ? (
                <Spin className="m-auto" />
              ) : (
                listFriends.map((item) => {
                  return (
                    <Col span={4}>
                      <div className="flex flex-col border border-[#DADCDF] rounded-lg overflow-hidden">
                        <img
                          className="w-full h-50 object-cover"
                          src=""
                          alt=""
                        />
                        <div className="flex flex-col gap-y-2 px-2 pb-2">
                          <span className="font-bold mt-1">
                            {item.first_name + " " + item.last_name}
                          </span>
                          <Button type="primary">Thêm bạn bè</Button>
                          <Button>Gỡ</Button>
                        </div>
                      </div>
                    </Col>
                  );
                })
              )}
            </Row>
          </>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default Friends;
