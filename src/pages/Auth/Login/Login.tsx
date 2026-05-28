import { Divider, Input, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../../../store/useUserStore";
import { onFinishFailed } from "../../../utils/message";
import Button from "../../../components/Button/Button";
import { REGEX_PASSWORD } from "../../../utils/regex";
import { notificationError, notificationSuccess } from "../../../config/notify";
import urlOauthGoogle from "../../../utils/oauth";
import type { LoginPayload } from "../../../types/payloads";

const Login = () => {
  const { loginUser, isLoading } = useUserStore();
  const navigate = useNavigate();

  const onFinish = async (values: LoginPayload) => {
    const result = await loginUser(values);
    if (result.success) {
      notificationSuccess(result.message as string);
      navigate("/", { replace: true });
    } else {
      notificationError(result.message as string);
    }
  };

  return (
    <div className="w-full h-screen overflow-x-hidden bg-gray-100 flex items-center justify-center">
      <div className="sm:flex flex-col hidden">
        <h1 className="text-[#dd2c00] text-5xl font-bold">
          Fyn<span className="text-black">x</span>
        </h1>
        <span className="text-black text-2xl mt-5">
          Nơi bạn kết nối với mọi người, chia sẻ khoảnh khắc
          <br /> và câu chuyện trong cuộc sống mỗi ngày
        </span>
      </div>
      <div className="sm:ml-10 w-100 bg-white shadow-md border-gray-200 border rounded-md p-4 flex flex-col gap-y-3">
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
          className="w-full"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input
              style={{ padding: "12px" }}
              placeholder="Email hoặc số điện thoại"
              type="email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu!" },
              {
                pattern: REGEX_PASSWORD,
                message:
                  "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ thường, chữ hoa, số và ký tự đặc biệt",
              },
            ]}
          >
            <Input.Password
              style={{ padding: "12px" }}
              placeholder="Mật khẩu"
              type="password"
            />
          </Form.Item>
          <Button loading={isLoading} message="Đăng nhập" />
        </Form>
        <Link
          className="text-sm text-red-600 text-center hover:underline"
          to={"/login"}
        >
          Quên mật khẩu?
        </Link>
        <Divider
          className="bg-gray-200"
          style={{ marginTop: "2px", marginBottom: "3px" }}
        />
        <Link
          to={"/register"}
          className="w-full mx-auto text-center bg-black py-3 rounded-md text-white font-bold cursor-pointer hover:bg-gray-800 transition-all duration-200 ease-in"
        >
          Tạo tài khoản mới
        </Link>
        <Link
          to={urlOauthGoogle}
          className="w-full flex justify-center items-center gap-x-2 mx-auto text-center bg-white border-2 border-[#E9E9E9] shadow-md py-3 rounded-md text-black font-bold cursor-pointer hover:bg-[#dedede] transition-all duration-200 ease-in"
        >
          <img
            src="/google.png"
            alt="icon-google"
            className="w-5 h-5 ml-2 mt-0.5"
          />
          <span>Đăng nhập với Google</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
