import {
  Dropdown,
  Input,
  Modal,
  Space,
  Form,
  type DropdownProps,
  type MenuProps,
} from "antd";
import useUserStore from "../../store/useUserStore";
import { Link, useNavigate } from "react-router-dom";
import {
  DownOutlined,
  LockOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ListIndentIncrease } from "lucide-react";
import { notificationError, notificationSuccess } from "../../config/notify";
import { useState } from "react";
import type { ChangePasswordPayload } from "../../types/payloads";
import { REGEX_PASSWORD } from "../../utils/regex";

const Header = (props: any) => {
  const { setTabOpen } = props;
  const { logoutUser, changePassword, me } = useUserStore();
  const navigate = useNavigate();
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [form] = Form.useForm();

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

  const items: MenuProps["items"] = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: <Link to={"/profile"}>Profile</Link>,
    },
    {
      key: "2",
      icon: <LockOutlined />,
      label: (
        <span onClick={() => setChangePasswordOpen(true)}>Change Password</span>
      ),
    },
    {
      key: "3",
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
    <div className="relative h-20 border-b border-gray-200 sm:mx-8 flex items-center justify-between">
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
            <span className="ml-1">{me.user_name}</span>
            <DownOutlined className="text-[12px]" />
          </Space>
        </Dropdown>
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
