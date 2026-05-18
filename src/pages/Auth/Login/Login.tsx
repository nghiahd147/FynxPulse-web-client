import { Divider, Input, Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
import { onFinishFailed } from "../../../utils/message";
import Button from "../../../components/Button/Button";

const Login = () => {
  const { loginUser } = useAuthStore();
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    const result = await loginUser(values);
    if (result.success) {
      message.success("Đăng nhập thành công");
      navigate("/");
    } else {
      message.error(result.message);
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
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
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
          <Button message="Đăng nhập" />
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
          className="w-50 mx-auto text-center bg-black py-3 rounded-md text-white font-bold cursor-pointer hover:bg-gray-800 transition-all duration-200 ease-in"
        >
          Tạo tài khoản mới
        </Link>
      </div>
    </div>
  );
};

export default Login;
