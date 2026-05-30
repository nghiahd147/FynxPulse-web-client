import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Link } from "react-router-dom";
import useUserStore from "../../../store/useUserStore";
import { useEffect } from "react";

const Friends = () => {
  const { getMyFriends, myFriends, profileUser } = useUserStore();

  useEffect(() => {
    getMyFriends(profileUser._id as string);
  }, [profileUser.user_name]);

  return (
    <div className="w-full h-full flex flex-col shadow-md bg-white">
      <div className="w-full flex justify-between items-center p-3">
        <h3 className="text-xl font-bold">Bạn bè</h3>
        <div className="flex items-center gap-x-3">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Tìm kiếm"
            size="large"
            className="rounded-2xl! bg-gray-100! "
          />
          <Link
            to="/friends"
            className="w-36 text-blue-500 font-medium text-center py-1 rounded-md hover:bg-gray-100 transition-all ease-in px-2"
          >
            Tìm bạn bè
          </Link>
        </div>
      </div>
      <div className="w-full my-4 flex items-center justify-between gap-x-3 px-3 py-1">
        {/* Item Friend */}
        {myFriends.map((item) => {
          return (
            <div className="w-[50%] bg-white px-2 py-4 rounded-md border border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-x-3">
                <Link to={`/profile/${item.user_name}`}>
                  <img
                    src={item.avatar || "/avatar-mac-dinh.jpg"}
                    alt="avatar-user"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </Link>
                <div className="flex flex-col">
                  <Link
                    to={`/profile/${item.user_name}`}
                    className="font-medium text-lg hover:underline transition-all ease-in"
                  >{`${item.first_name + " " + item.last_name}`}</Link>
                  <span className="text-sm text-gray-500 font-medium">
                    10 bạn chung
                  </span>
                </div>
              </div>
              <div className="rounded-full p-3 flex items-center justify-center hover:bg-gray-100 transition-all ease-in cursor-pointer">
                <EllipsisOutlined />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Friends;
