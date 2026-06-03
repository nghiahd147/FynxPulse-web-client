import { Input, Modal, Form, Button, Divider, Tooltip } from "antd";
import useUserStore from "../../store/useUserStore";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LockOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { House, ListIndentIncrease, TvMinimalPlay, Users } from "lucide-react";
import { notificationError, notificationSuccess } from "../../config/notify";
import { useState } from "react";
import type { ChangePasswordPayload } from "../../types/payloads";
import { REGEX_PASSWORD } from "../../utils/regex";

const Header = (props: {
  setTabOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setTabOpen } = props;
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const location = useLocation();
  const { logoutUser, changePassword, me } = useUserStore();
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);

  const handleLogoutUser = async () => {
    const result = await logoutUser({
      refresh_token: localStorage.getItem("refresh_token") || "",
    });
    if (result.success) {
      notificationSuccess(result.message as string);
      navigate("/login", { replace: true });
    } else {
      notificationError(result.message as string);
    }
  };

  const handleCancel = () => {
    setChangePasswordOpen(false);
  };

  const onFinish = async (values: ChangePasswordPayload) => {
    const result = await changePassword(values);
    if (result.success) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      notificationSuccess(result.message as string);
      navigate("/login", { replace: true });
    } else {
      notificationError(result.message as string);
    }
  };

  return (
    <div className="relative h-18 border-b border-gray-200 sm:mx-8 flex items-center justify-between">
      {/* mobile */}
      <div className="flex items-center">
        <div
          className="block mx-2 mt-1 sm:hidden"
          onClick={() => {
            setTabOpen(true);
          }}
        >
          <ListIndentIncrease color="red" size={20} />
        </div>
        <Link to={"/"} className="flex items-center whitespace-nowrap">
          <img
            src="./icons8-yelp.png"
            alt="logo_home"
            className="hidden w-10 h-10 sm:block"
          />
          <span className="text-[#dd2c00] text-3xl sm:text-2xl font-bold">
            Fyn<span className="text-black">x</span>
          </span>
        </Link>
      </div>
      <div className="h-full flex items-center justify-center gap-x-2">
        <Tooltip title="Trang chủ">
          <Link
            to={"/"}
            className={`cursor-pointer w-30 h-full flex items-center justify-center hover:bg-gray-200 hover:text-blue-400 hover:border-b-blue-400 hover:border-b-2 transition-all ease-in ${location.pathname == "/" && "border-b-2 border-blue-400 text-blue-400"}`}
          >
            <House className="w-[35%] h-full p-2" />
          </Link>
        </Tooltip>
        <Tooltip title="Thước phim">
          <Link
            to={"/reels"}
            className={`cursor-pointer w-30 h-full flex items-center justify-center hover:bg-gray-200 hover:text-blue-400 hover:border-b-blue-400 hover:border-b-2 transition-all ease-in ${location.pathname == "/reels" && "border-b-2 border-blue-400 text-blue-400"}`}
          >
            <TvMinimalPlay className="w-[35%] h-full p-2" />
          </Link>
        </Tooltip>
        <Tooltip title="Bạn bè">
          <Link
            to={"/friends"}
            className={`cursor-pointer w-30 h-full flex items-center justify-center hover:bg-gray-200 hover:text-blue-400 hover:border-b-blue-400 hover:border-b-2 transition-all ease-in ${location.pathname == "/friends" && "border-b-2 border-blue-400 text-blue-400"}`}
          >
            <Users className="w-[35%] h-full p-2" />
          </Link>
        </Tooltip>
      </div>
      {/* desktop, tablet */}
      <div className="hidden sm:block">
        <div className="relative w-9 h-9 rounded-full border">
          <img
            src={me.avatar || "/avatar-mac-dinh.jpg"}
            className="w-full h-full rounded-full cursor-pointer"
            alt="avatar-icon"
            onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
          />
          {avatarMenuOpen && (
            <div
              className="fixed top-0 left-0 right-0 bottom-0 z-10"
              onClick={() => setAvatarMenuOpen(false)}
            ></div>
          )}
          {avatarMenuOpen && (
            <div className="absolute p-3 w-90 top-full right-0 bg-white rounded-md shadow-md z-50 border border-gray-200">
              <div className="flex flex-col w-full shadow-md border-gray-200 p-3 overflow-hidden rounded-md">
                <div className="flex items-center">
                  <img
                    src={me.avatar || "/avatar-mac-dinh.jpg"}
                    className="w-8 h-8 border rounded-full"
                    alt="avatar-icon"
                  />
                  <span className="ml-3">
                    {me.first_name + " " + me.last_name}
                  </span>
                </div>
                <Divider className="m-2! border-[#E3E5E7]!" />
                <Link to={`/profile/${me.user_name}`}>
                  <Button icon={<UserOutlined />} className="w-full!">
                    Xem tất cả trang cá nhân
                  </Button>
                </Link>
              </div>
              {/* Item */}
              <div
                className="w-full font-bold mt-2 flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-200 transition-all ease-in"
                onClick={() => setChangePasswordOpen(true)}
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
                  <LockOutlined className="mt-px" />
                </div>
                <span className="ml-2">Thay đổi mật khẩu</span>
              </div>
              {/* Item */}
              <div
                className="w-full font-bold mt-2 flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-200 transition-all ease-in"
                onClick={handleLogoutUser}
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
                  <LogoutOutlined className="mt-px" />
                </div>
                <span className="ml-2">Đăng xuất</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal
        title="Đổi mật khẩu"
        open={changePasswordOpen}
        onOk={() => form.submit()}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Mật khẩu cũ"
            name="old_password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ!" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu cũ" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu mới"
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới!" },
              {
                pattern: REGEX_PASSWORD,
                message:
                  "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ thường, chữ hoa, số và ký tự đặc biệt",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("old_password") !== value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu mới giống mật khẩu cũ!"),
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu mới" />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu mới"
            name="confirm_password"
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu xác nhận không khớp!"),
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Xác nhận mật khẩu mới" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Header;
