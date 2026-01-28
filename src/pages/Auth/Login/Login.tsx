import { Divider, Input } from "antd";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="w-full h-screen overflow-x-hidden bg-gray-100 flex items-center justify-center">
      <div className="flex flex-col">
        <h1 className="text-red-600 text-5xl font-bold">
          Fyn<span className="text-black">x</span>
        </h1>
        <span className="text-black text-2xl mt-5">
          Nơi bạn kết nối với mọi người, chia sẻ khoảnh khắc
          <br /> và câu chuyện trong cuộc sống mỗi ngày
        </span>
      </div>
      <div className="ml-10 w-100 bg-white shadow-md border-gray-200 border rounded-md p-4 flex flex-col gap-y-3">
        <Input
          style={{ padding: "12px" }}
          placeholder="Email hoặc số điện thoại"
          type="email"
        />
        <Input
          style={{ padding: "12px" }}
          placeholder="Mật khẩu"
          type="password"
        />
        <button className="bg-red-600 py-3 text-white text-xl font-bold rounded-sm cursor-pointer hover:bg-red-500 transition-all duration-300 ease-in">
          Đăng nhập
        </button>
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
