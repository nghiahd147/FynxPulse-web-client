import { Input } from "antd";

const Friends = () => {
  return (
    <div className="w-full h-full flex justify-between items-center bg-white rounded-md shadow-md p-3">
      <h3 className="text-xl font-bold">Bạn bè</h3>
      <div className="flex items-center gap-x-3">
        <Input placeholder="Tìm kiếm bạn bè" className="w-48" />
      </div>
    </div>
  );
};

export default Friends;
