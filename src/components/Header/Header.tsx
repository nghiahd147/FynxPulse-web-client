import {
  Dropdown,
  message,
  Space,
  type DropdownProps,
  type MenuProps,
} from "antd";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import {
  DownOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

const Header = () => {
  const { logoutUser } = useAuthStore();
  const navigate = useNavigate();
  const nameUser = localStorage.getItem("name");

  const handleLogoutUser = async () => {
    try {
      await logoutUser({
        refresh_token: localStorage.getItem("refresh_token") || "",
      });
      navigate("/login");
      message.success("Đăng xuất thành công");
    } catch (error) {
      console.log("error", error);
      message.error("Có lỗi xảy ra");
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "2",
      label: "Settings",
      icon: <SettingOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "Logout",
      label: (
        <div className="flex items-center" onClick={handleLogoutUser}>
          <LogoutOutlined className="mt-px" />
          <span className="ml-2">Đăng xuất</span>
        </div>
      ),
      danger: true,
    },
  ];

  const sharedProps: DropdownProps = {
    menu: { items },
    placement: "bottomLeft",
  };

  return (
    <div className="h-20 border-b border-gray-200 mx-8 flex items-center justify-between">
      <div className="flex items-center">
        <img src="./icons8-yelp.svg" alt="logo_home" />
        <span className="text-[#dd2c00] text-2xl font-bold">
          Fyn<span className="text-black">x</span>
        </span>
      </div>
      {/*  */}
      <Dropdown {...sharedProps}>
        <Space className="cursor-default flex items-center px-2 py-1 rounded-md bg-red-100">
          <span className="ml-1">{nameUser}</span>
          <DownOutlined className="text-[12px]" />
        </Space>
      </Dropdown>
    </div>
  );
};

export default Header;
