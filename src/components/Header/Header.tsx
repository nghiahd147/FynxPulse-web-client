import { Button, message } from "antd";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { logoutUser, refresh_token } = useAuthStore();
  const navigate = useNavigate();

  const handleLogoutUser = async () => {
    try {
      await logoutUser({ refresh_token });
      navigate("/login");
      message.success("Đăng xuất thành công");
    } catch (error) {
      console.log("error", error);
      message.error("Có lỗi xảy ra");
    }
  };

  return (
    <div className="h-15 bg-amber-100 flex items-center justify-between">
      <span>Logo</span>
      <Button onClick={handleLogoutUser}>Đăng xuất</Button>
    </div>
  );
};

export default Header;
