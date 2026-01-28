import { DatePicker, Input, type DatePickerProps } from "antd";
import { Link } from "react-router-dom";

const Register = () => {
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <div className="w-full h-screen overflow-x-hidden bg-gray-100 flex flex-col items-center justify-center gap-y-5">
      <h1 className="text-red-600 text-5xl font-bold">
        Fyn<span className="text-black">x</span>
      </h1>
      <div className="bg-white shadow-md border-gray-200 border rounded-md p-4 flex flex-col gap-y-5">
        <div className="flex items-center gap-x-2">
          <Input style={{ padding: "12px" }} placeholder="Họ" type="text" />
          <Input style={{ padding: "12px" }} placeholder="Tên" type="text" />
        </div>
        <Input
          style={{ padding: "12px" }}
          placeholder="Email hoặc số điện thoại"
          type="email"
          className="py-3 px-3 border border-gray-200 rounded-md outline-none"
        />
        <Input
          style={{ padding: "12px" }}
          placeholder="Mật khẩu"
          type="password"
          className="py-3 px-3 border border-gray-200 rounded-md outline-none"
        />
        <Input
          style={{ padding: "12px" }}
          placeholder="Nhập lại mật khẩu"
          type="password"
          className="py-3 px-3 border border-gray-200 rounded-md outline-none"
        />
        <DatePicker
          style={{ padding: "12px" }}
          className="py-3 px-3"
          placeholder="Ngày sinh"
          onChange={onChange}
        />
        <button className="bg-red-600 py-3 text-white text-xl font-bold rounded-sm cursor-pointer hover:bg-red-500 transition-all duration-300 ease-in">
          Đăng ký
        </button>
        <Link
          className="text-sm text-black text-center hover:underline"
          to={"/login"}
        >
          Bạn đã có tài khoản ư?
        </Link>
      </div>
    </div>
  );
};

export default Register;
