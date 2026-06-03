import { LogoutOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import useUserStore from "../../store/useUserStore";
import { useEffect } from "react";

const Friends = () => {
  const { getFollowSuggestions, me, listFriends } = useUserStore();

  useEffect(() => {
    getFollowSuggestions(me._id as string);
  }, []);

  return (
    <div className="h-full flex">
      {/* Left */}
      <div className="w-[22%] px-2 py-1 shadow-[4px_0_8px_rgba(0,0,0,0.1)] m">
        <h3 className="text-2xl font-bold ml-2">Người theo dõi</h3>
        <div className="w-full font-bold mt-2 flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-200 transition-all ease-in">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
            <LogoutOutlined className="mt-px" />
          </div>
          <span className="ml-2">Trang chủ</span>
        </div>
        <div className="w-full font-bold mt-2 flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-200 transition-all ease-in">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
            <LogoutOutlined className="mt-px" />
          </div>
          <span className="ml-2">Trang chủ</span>
        </div>
        <div className="w-full font-bold mt-2 flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-200 transition-all ease-in">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
            <LogoutOutlined className="mt-px" />
          </div>
          <span className="ml-2">Trang chủ</span>
        </div>
        <div className="w-full font-bold mt-2 flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-200 transition-all ease-in">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
            <LogoutOutlined className="mt-px" />
          </div>
          <span className="ml-2">Trang chủ</span>
        </div>
      </div>
      {/* Right */}
      <div className="w-full overflow-y-auto py-4 px-10">
        <h3 className="text-xl font-bold">Những người bạn có thể biết</h3>
        <Row gutter={[12, 12]} className="mt-4">
          {/* Friend */}
          {listFriends.map((item) => {
            return (
              <Col span={4}>
                <div className="flex flex-col min-w-50 border border-[#DADCDF] rounded-lg overflow-hidden">
                  <img className="w-full h-50 object-cover" src="" alt="" />
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
          })}
        </Row>
      </div>
    </div>
  );
};

export default Friends;
