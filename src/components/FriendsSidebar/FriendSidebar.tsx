import { SearchOutlined } from "@ant-design/icons";
import { Divider, Input } from "antd";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const FriendSidebar = () => {
  return (
    <>
      <div className="flex items-center gap-x-3 mt-2">
        <Link to={"/friends"}>
          <ArrowLeft className="w-10 h-10 p-2 rounded-full cursor-pointer hover:bg-gray-300 transition-all ease-in" />
        </Link>
        <div className="flex flex-col font-bold">
          <span className="text-gray-400 text-sm">Bạn bè</span>
          <span className="text-black text-lg">Tất cả bạn bè</span>
        </div>
      </div>
      <Input
        prefix={<SearchOutlined />}
        placeholder="Tìm kiếm bạn bè"
        className="mt-2 rounded-2xl!"
      />
      <Divider className="border border-gray-200 my-3!" />
      <h3 className="font-bold">100 Người bạn</h3>
      <div className="flex items-center mt-2">
        <img className="w-15 h-15 rounded-full" src="" alt="" />
        <div className="flex flex-col ml-3">
          <span className="text-sm font-bold">Tên</span>
          <span className="text-sm text-gray-400">11 Bạn chung</span>
        </div>
      </div>
    </>
  );
};

export default FriendSidebar;
