import {
  Dropdown,
  message,
  Space,
  type DropdownProps,
  type MenuProps,
} from "antd";
import useAuthStore from "../../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import {
  DownOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ListIndentIncrease } from "lucide-react";

const Header = (props: any) => {
  const { setTabOpen } = props;
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
      label: <Link to={"/profile"}>Profile</Link>,
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
    <div className="relative h-20 border-b border-gray-200 sm:mx-8 flex items-center justify-between">
      {/* mobile */}
      <div className="flex items-center">
        <div
          className="block mx-2 mt-1 sm:hidden"
          onClick={() => {
            setTabOpen(true);
            console.log("click");
          }}
        >
          <ListIndentIncrease color="red" size={20} />
        </div>
        <Link to={"/"} className="flex items-center">
          <img
            src="./icons8-yelp.svg"
            alt="logo_home"
            className="hidden sm:block"
          />
          <span className="text-[#dd2c00] text-3xl sm:text-2xl font-bold">
            Fyn<span className="text-black">x</span>
          </span>
        </Link>
      </div>
      {/* desktop, tablet */}
      <div className="hidden sm:block">
        <Dropdown {...sharedProps}>
          <Space className="cursor-default flex items-center px-2 py-1 rounded-md bg-red-100">
            <span className="ml-1">{nameUser}</span>
            <DownOutlined className="text-[12px]" />
          </Space>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
