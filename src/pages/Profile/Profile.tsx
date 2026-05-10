import { Button } from "antd";
import {
  BriefcaseBusiness,
  Building2,
  Camera,
  Earth,
  GraduationCap,
  Pencil,
  School,
} from "lucide-react";

const Profile = () => {
  return (
    <div className="w-full bg-bgPrimary">
      {/* Header Profile */}
      <div className="w-full flex flex-col items-center bg-white border-b border-bgPrimary z-10">
        <div className="w-313">
          {/* Background */}
          <div className="w-full h-116.25 flex">
            <div className="flex-1 mx-auto relative">
              <img
                src="https://i.pinimg.com/736x/5b/db/27/5bdb27e49ab32875bf013200799228b2.jpg"
                alt="bg-user"
                className="bg-no-repeat bg-cover bg-center w-full h-full rounded-b-2xl cursor-pointer"
              />
              <span className="bg-[#ffffff] hover:bg-bgPrimary transition-all absolute bottom-0 right-0 mr-10 mb-4 rounded-2xl flex items-center justify-center cursor-pointer gap-x-2 py-3 w-52">
                <Camera />
                Chỉnh sửa ảnh bìa
              </span>
            </div>
          </div>
          {/* Avatar */}
          <div className="w-full h-57.5 flex my-5">
            <div className="mx-7.5 relative">
              <img
                src="https://i.pinimg.com/736x/58/ac/02/58ac02be97d79d173750d49d62b8f8fe.jpg"
                alt="avatar-user"
                className="w-50 h-50 rounded-[100%] cursor-pointer"
              />
              <span className="bg-[#e2e5e9] hover:bg-bgPrimary transition-all ease-in absolute bottom-9 right-3 rounded-[100%] flex items-center justify-center cursor-pointer gap-x-2 p-3">
                <Camera />
              </span>
            </div>
            <div className="pt-3 pr-1 pb-1 pl-3 flex flex-col">
              {/* Avatar-top */}
              <div className="flex justify-between">
                <div className="flex flex-col my-2">
                  <span className="font-bold text-4xl">Quang Nghĩa</span>
                  <div className="flex items-center gap-x-2 font-bold">
                    <span>120 người theo dõi</span>
                    <span>•</span>
                    <span>85 người đang theo dõi</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <Button
                    className="font-bold! bg-[#e2e5e9]! text-black!"
                    type="primary"
                    icon={<Pencil className="w-4 h-4" />}
                  >
                    Chỉnh sửa
                  </Button>
                </div>
              </div>
              <div className="mb-2 font-bold">...</div>
              {/* Avatar Info */}
              <div className="flex gap-x-3 font-bold text-sm">
                <div className="flex items-center justify-center">
                  <BriefcaseBusiness className="mr-1" />
                  <span>Nhà thiết kế web</span>
                </div>
                <div className="flex items-center justify-center">
                  <Earth className="mr-1" />
                  <span>Hải Dương</span>
                </div>
                <div className="flex items-center justify-center">
                  <Building2 className="mr-1" />
                  <span>Công ty CP Công nghệ thông tin An Việt</span>
                </div>
                <div className="flex items-center justify-center">
                  <School className="mr-1" />
                  <span>THCS Ngọc Châu</span>
                </div>
                <div className="flex items-center justify-center">
                  <GraduationCap className="mr-1" />
                  <span>Trường Đại học Sao Đỏ</span>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
