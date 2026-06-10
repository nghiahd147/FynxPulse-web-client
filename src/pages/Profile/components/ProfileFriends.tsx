import {
  EllipsisOutlined,
  SearchOutlined,
  CloseSquareOutlined,
} from "@ant-design/icons";
import { Input, Dropdown } from "antd";
import { Link } from "react-router-dom";
import useUserStore from "../../../store/useUserStore";
import { useEffect, useState } from "react";
import { notificationError, notificationSuccess } from "../../../config/notify";
const Friends = () => {
  const { getProfile, getUserFollowing, unfollowUser, myFriends, profileUser, me } = useUserStore();
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    getUserFollowing(profileUser._id as string, lastName);
  }, [profileUser.user_name, lastName]);

  const handleUnfollowUser = async (id: string) => {
    const result = await unfollowUser(id)
    if (result.success) {
      getProfile(me.user_name || "")
      getUserFollowing(me._id as string)
      notificationSuccess(result.message as string)
    } else {
      notificationError(result.message as string)
    }
  }

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
      <div className="w-full my-4 grid grid-cols-2 gap-4 px-3 py-1">
        {/* Item Friend */}
        {myFriends.length !== 0 ? (
          myFriends.map((item, index) => {
            return (
              <div key={index} className="w-full bg-white px-2 py-4 rounded-md border border-gray-200 flex items-center justify-between">
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
                      1 Bạn chung
                    </span>
                  </div>
                </div>
                {profileUser._id === me._id && (
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: "unfollower",
                          label: <span className="text-base font-medium ml-1" onClick={() => handleUnfollowUser(item._id as string)}>Bỏ theo dõi</span>,
                          icon: <CloseSquareOutlined className="text-xl" />,
                        }
                      ]
                    }}
                    trigger={['click']}
                    placement="bottomRight"
                    arrow
                  >
                    <div className="rounded-full p-3 flex items-center justify-center hover:bg-gray-100 transition-all ease-in cursor-pointer">
                      <EllipsisOutlined />
                    </div>
                  </Dropdown>
                )}

              </div>
            );
          })
        ) : (
          <i className="w-full text-center text-gray-500 col-span-2">
            Bạn chưa theo dõi ai...
          </i>
        )}
      </div>
    </div>
  );
};

export default Friends;
