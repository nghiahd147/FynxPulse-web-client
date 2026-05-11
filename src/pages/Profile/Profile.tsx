import { Button } from "antd";
import {
  BriefcaseBusiness,
  Building2,
  Camera,
  ChevronDown,
  ChevronUp,
  Earth,
  GraduationCap,
  Pencil,
  School,
} from "lucide-react";
import SuggestionCarousel from "../../components/SuggestionCarousel/SuggestionCarousel";
import { useState } from "react";

const Profile = () => {
  const [suggestionCarousel, setSuggestionCarousel] = useState(true);

  return (
    <div className="w-full bg-bgPrimary">
      {/* Header Profile */}
      <div className="w-full flex flex-col items-center bg-white border-b border-bgPrimary z-10">
        <div className="w-313">
          {/* Background */}
          <div className="w-full h-116.25 flex">
            <div className="flex-1 mx-auto relative overflow-y-hidden rounded-b-2xl">
              <img
                src="https://scontent.fhan1-1.fna.fbcdn.net/v/t39.30808-6/467947973_1770615467034326_6280527338305888822_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=109&ccb=1-7&_nc_sid=2a1932&_nc_ohc=eqnr_dM05ywQ7kNvwHMxvoS&_nc_oc=AdrPMtlbsH4FJb-Iz06PN7PPHYxHicJ_fTgxjA8urRo6S9S86ogkCS_GXJxFFkue8uE&_nc_zt=23&_nc_ht=scontent.fhan1-1.fna&_nc_gid=OlHQuOCmvaHqaSi49oKO9w&_nc_ss=7b2a8&oh=00_Af5zo2ReHkNQJynbDxaEZ4-k3BQ9UcQT2twrh03CrUkoUw&oe=6A072D4C"
                alt="bg-user"
                className="w-full h-full object-cover object-center cursor-pointer"
              />
              <span className="bg-[#ffffff] hover:bg-bgPrimary transition-all absolute bottom-0 right-0 mr-10 mb-4 rounded-2xl flex items-center justify-center cursor-pointer gap-x-2 py-3 w-52">
                <Camera />
                Chỉnh sửa ảnh bìa
              </span>
            </div>
          </div>

          {/* Avatar */}
          <div className="w-full h-57.5 flex mt-5">
            <div className="mx-7.5 relative">
              <img
                src="https://scontent.fhan1-1.fna.fbcdn.net/v/t39.30808-1/509440663_1926819644747240_6894251273595969346_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=1d2534&_nc_ohc=Tyd6WS-S4fkQ7kNvwEyRJ55&_nc_oc=AdrQui0cPaNRSKCa6WkdN-J2Y8r0y-6kllhtDWaThfkoT5vwVTXrm6uLgW34fKDjBWM&_nc_zt=24&_nc_ht=scontent.fhan1-1.fna&_nc_gid=OlHQuOCmvaHqaSi49oKO9w&_nc_ss=7b2a8&oh=00_Af7jB__KZRPk1NM7tXaOwG62DbY9qNNpiULv-gCWnicO5Q&oe=6A07296C"
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
                    className="font-bold! bg-[#e2e5e9]! text-black! hover:bg-[#d6d6d6]! w-28.25"
                    type="primary"
                    icon={<Pencil className="w-4 h-4" />}
                  >
                    Chỉnh sửa
                  </Button>
                  <div
                    className="w-12 h-9 cursor-pointer rounded-md bg-[#e2e5e9] flex items-center justify-center hover:bg-[#d6d6d6] transition-all"
                    onClick={() => setSuggestionCarousel(!suggestionCarousel)}
                  >
                    {suggestionCarousel === true ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronUp className="w-4 h-4" />
                    )}
                  </div>
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

          {/* Other friends */}
          {suggestionCarousel === true && (
            <div className="w-[95%] mx-auto flex flex-col gap-x-4 border border-[#e5e5e5] rounded-2xl px-4 py-3">
              <div className="flex items-center justify-between font-medium mb-2">
                <span className="text-md">Những người bạn có thể biết</span>
                <span className="text-blue-700 hover:text-blue-500 transition-all ease-in cursor-pointer">
                  Xem tất cả
                </span>
              </div>
              {/* Slide Friends */}
              <SuggestionCarousel />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
