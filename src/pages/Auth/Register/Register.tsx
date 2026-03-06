import type { Users } from "../../../types";
import useAuthStore from "../../../store/useAuthStore";
import { DatePicker, Input, Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { onFinishFailed } from "../../../utils/message";
import { convertYearMonthDay } from "../../../utils/date";
import { notificationError } from "../../../config/notify";
import Button from "../../../components/Button/Button";

const Register = () => {
  const [form] = Form.useForm();
  const { registerUser } = useAuthStore();
  const navigate = useNavigate();

  const onFinish = async (values: Users) => {
    const payload = {
      ...values,
      date_of_birth: convertYearMonthDay(values.date_of_birth),
    };

    try {
      await registerUser(payload);
      message.success("Đăng ký thành công");
      navigate("/");
    } catch (error) {
      notificationError("Có lỗi xảy ra, vui lòng thử lại sau");
      console.log("error", error);
    }
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
              name="first_name"
              rules={[{ required: true, message: "Vui lòng họ" }]}
            >
              <Input style={{ padding: "12px" }} placeholder="Họ" type="text" />
            </Form.Item>
            <Form.Item
              name="last_name"
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
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
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
            name="password"
            rules={[
              { required: true, message: "Vui lòng mật khẩu" },
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
              className="py-3 px-3 border border-gray-200 rounded-md outline-none"
            />
          </Form.Item>
          <Form.Item
            name="confirm_password"
            rules={[
              { required: true, message: "Vui lòng nhập lại mật khẩu" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu nhập lại không khớp"),
                  );
                },
              }),
            ]}
          >
            <Input.Password
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
            />
          </Form.Item>
          <Button message="Đăng ký" />
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
