import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Link } from "react-router-dom";
import useUserStore from "../../../store/useUserStore";
import { useEffect, useState } from "react";
import UserCard from "../../../components/UserCard/UserCard";

const Friends = () => {
  const { getUserFollowing, followers, getUserFollowers, yourFriends, profileUser } = useUserStore();
  const [lastName, setLastName] = useState("");
  const [activeTab, setActiveTab] = useState<"following" | "followers">("following");

  useEffect(() => {
    getUserFollowing(profileUser._id as string, lastName);
    getUserFollowers(profileUser._id as string, lastName)
  }, [profileUser.user_name, lastName]);

  return (
    <div className="w-full h-full flex flex-col shadow-md bg-white">
      <div className="w-full flex justify-between items-center p-3">
        <h3 className="text-xl font-bold">Người theo dõi</h3>
        <div className="flex items-center gap-x-3">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Tìm kiếm"
            size="large"
            className="rounded-2xl! bg-gray-100!"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <Link
            to="/friends"
            className="w-60 text-blue-500 font-medium text-center py-1 rounded-md hover:bg-gray-100 transition-all ease-in px-2"
          >
            Tìm người theo dõi
          </Link>
        </div>
      </div>

      <div className="flex border-b border-gray-200 px-3">
        <button
          type="button"
          onClick={() => setActiveTab("following")}
          className={`relative px-4 py-3 cursor-pointer transition-colors duration-300 ease-out ${activeTab === "following" ? "text-blue-500 font-semibold" : "text-gray-500 font-medium hover:text-gray-700"
            }`}
        >
          Người theo dõi
          <span
            className={`absolute bottom-0 inset-x-4 h-0.5 rounded-full bg-blue-500 origin-center transition-transform duration-300 ease-in-out ${activeTab === "following" ? "scale-x-100" : "scale-x-0"
              }`}
          />
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("followers")}
          className={`relative px-4 py-3 cursor-pointer transition-colors duration-300 ease-out ${activeTab === "followers" ? "text-blue-500 font-semibold" : "text-gray-500 font-medium hover:text-gray-700"}`}
        >
          Đang theo dõi
          <span
            className={`absolute bottom-0 inset-x-4 h-0.5 rounded-full bg-blue-500 origin-center transition-transform duration-300 ease-in-out ${activeTab === "followers" ? "scale-x-100" : "scale-x-0"}`}
          />
        </button>
      </div>

      <div className="w-full my-4 grid grid-cols-2 gap-4 px-3 py-1">
        {yourFriends.length !== 0 && activeTab == "following" ? (
          <UserCard userInfo={yourFriends} activeTab={activeTab} />
        ) : followers.length !== 0 && activeTab == "followers" ? (
          <UserCard userInfo={followers} activeTab={activeTab} />
        ) : (
          <i className="w-full text-center text-gray-500 col-span-2">
            Chưa có người theo dõi...
          </i>
        )}
      </div>
    </div>
  );
};

export default Friends;
