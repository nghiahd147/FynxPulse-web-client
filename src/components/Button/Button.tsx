import { Spin } from "antd";

const Button = ({
  message,
  loading,
}: {
  message: string;
  loading: boolean;
}) => {
  return (
    <button
      type="submit"
      className="w-full bg-red-600 py-3 text-white text-xl font-bold rounded-sm cursor-pointer hover:bg-red-500 transition-all duration-300 ease-in"
    >
      {loading == true ? <Spin /> : message}
    </button>
  );
};

export default Button;
