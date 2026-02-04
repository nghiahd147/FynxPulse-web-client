import { DatePicker, Input, Form, type DatePickerProps } from "antd";
import { Link } from "react-router-dom";
import { onFinishFailed } from "../../../utils/validate";

const Register = () => {
  const [form] = Form.useForm();

  const onFinish = (values: string) => {
    console.log(values);
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div className="w-full h-screen overflow-x-hidden bg-gray-100 flex flex-col items-center justify-center gap-y-5">
      <h1 className="text-red-600 text-5xl font-bold">
        Fyn<span className="text-black">x</span>
      </h1>
      <div className="bg-white shadow-md border-gray-200 border rounded-md p-4 flex flex-col gap-y-5">
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="on"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className="flex items-center gap-x-2">
            <Form.Item
              name="vertical"
              rules={[{ required: true, message: "Vui lòng họ" }]}
            >
              <Input style={{ padding: "12px" }} placeholder="Họ" type="text" />
            </Form.Item>
            <Form.Item
              name="vertical"
              rules={[{ required: true, message: "Vui lòng tên" }]}
            >
              <Input
                style={{ padding: "12px" }}
                placeholder="Tên"
                type="text"
              />
            </Form.Item>
          </div>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input
              style={{ padding: "12px" }}
              placeholder="Email hoặc số điện thoại"
              type="email"
              className="py-3 px-3 border border-gray-200 rounded-md outline-none"
            />
          </Form.Item>
          <Form.Item
            name="vertical"
            rules={[{ required: true, message: "Vui lòng mật khẩu" }]}
          >
            <Input
              style={{ padding: "12px" }}
              placeholder="Mật khẩu"
              type="password"
              className="py-3 px-3 border border-gray-200 rounded-md outline-none"
            />
          </Form.Item>
          <Form.Item
            name="confirm_password"
            rules={[{ required: true, message: "Vui lòng nhập lại mật khẩu" }]}
          >
            <Input
              style={{ padding: "12px" }}
              placeholder="Nhập lại mật khẩu"
              type="password"
              className="py-3 px-3 border border-gray-200 rounded-md outline-none"
            />
          </Form.Item>
          <Form.Item
            name="date_of_birth"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ngày tháng năm sinh",
              },
            ]}
            className="w-full"
          >
            <DatePicker
              style={{ padding: "12px" }}
              className="py-3 px-3 w-full"
              placeholder="Ngày sinh"
              onChange={onChange}
            />
          </Form.Item>
          <button className="w-full bg-red-600 py-3 text-white text-xl font-bold rounded-sm cursor-pointer hover:bg-red-500 transition-all duration-300 ease-in">
            Đăng ký
          </button>
        </Form>
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
