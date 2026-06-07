import { SearchOutlined } from "@ant-design/icons";
import { Divider, Popover } from "antd";
import { ArrowLeft, MessageCircle, MoreHorizontal, XSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useUserStore from "../../store/useUserStore";

const FriendSidebar = () => {
  const { getUserFollowing, myFriends, me } = useUserStore()
  const [name, setName] = useState("")

  useEffect(() => {
    getUserFollowing(me._id as string, name)
  }, [name])

  return (
    <>
      <div className="flex items-center gap-x-[10px] mt-2 px-1">
        <Link to={"/friends"} className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-200 transition-all flex-shrink-0">
          <ArrowLeft className="w-5 h-5 text-[#65676B]" strokeWidth={2.5} />
        </Link>
        <div className="flex flex-col">
          <span className="text-[#65676B] text-[13px] leading-4">Người theo dõi</span>
          <span className="text-[#050505] text-[24px] font-bold leading-7">Tất cả người theo dõi</span>
        </div>
      </div>

      <div className="px-1 mt-4">
        <div className="flex items-center bg-[#F0F2F5] rounded-full px-3 py-[8px]">
          <SearchOutlined className="text-[#65676B] text-[16px] mr-2" />
          <input
            type="text"
            placeholder="Tìm kiếm username"
            className="bg-transparent border-none outline-none w-full text-[15px] text-black placeholder:text-[#65676B]"
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        </div>
      </div>

      <Divider className="my-4" />

      <h3 className="font-bold text-[17px] mb-2 px-1">{myFriends.length} người theo dõi</h3>

      {myFriends.map((friend, index) => {
        const popoverContent = (
          <div className="w-[340px] flex flex-col">
            <div className="flex items-center gap-x-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer transition-all">
              <MessageCircle className="w-6 h-6 text-black flex-shrink-0" />
              <span className="font-semibold text-[15px] text-black">Nhắn tin cho {friend.last_name}</span>
            </div>
            <div className="flex items-start gap-x-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer transition-all mt-1">
              <XSquare className="w-6 h-6 text-black flex-shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-semibold text-[15px] text-black">Bỏ theo dõi {friend.last_name}</span>
                <span className="text-[13px] text-gray-500 leading-tight mt-1">
                  Không nhìn thấy bài viết của họ nữa. Họ sẽ không nhận được thông báo là bạn đã bỏ theo dõi.
                </span>
              </div>
            </div>
          </div>
        );

        return (
          <Link to={`/friends/list/${friend.user_name}`} key={index} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-all">
            <div className="flex items-center gap-x-3">
              <img className="w-14 h-14 rounded-full object-cover bg-gray-300" src="" alt="" />
              <div className="flex flex-col">
                <span className="font-semibold text-[15px] text-black">{friend.first_name + " " + friend.last_name}</span>
                <span className="text-[13px] text-gray-500">{friend.user_name}</span>
              </div>
            </div>
            <Popover content={popoverContent} trigger="click" placement="bottomRight" arrow={false} overlayInnerStyle={{ padding: '8px', borderRadius: '8px', boxShadow: '0 2px 12px rgba(0,0,0,0.2)' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                <MoreHorizontal className="w-5 h-5 text-gray-500" />
              </div>
            </Popover>
          </Link>
        )
      })}

    </>
  );
};

export default FriendSidebar;
