import { Button } from "antd";
import {
  Cake,
  Camera,
  ChevronDown,
  ChevronUp,
  Ellipsis,
  House,
  MapPinHouse,
  Pencil,
  User,
  UserCheck,
} from "lucide-react";
import SuggestionCarousel from "../../components/SuggestionCarousel/SuggestionCarousel";
import { useEffect, useState } from "react";
import useUserStore from "../../store/useUserStore";
import { useParams } from "react-router-dom";
import { usernameMe } from "../../utils/storages";
import { notificationError, notificationSuccess } from "../../config/notify";

const Profile = () => {
  const [suggestionCarousel, setSuggestionCarousel] = useState(true);
  const {
    getMe,
    getProfile,
    profileUser,
    getListUser,
    followUser,
    data,
    getUserFollow,
    userFollowed,
    unfollowUser,
  } = useUserStore();
  const params = useParams();
  const usernameCurrent = params.user_name;
  const userIdCurrent = profileUser._id;

  useEffect(() => {
    if (usernameCurrent) {
      getProfile(usernameCurrent as string);
    } else {
      getMe();
    }
  }, [usernameCurrent]);

  useEffect(() => {
    getListUser({ page: -1, page_size: -1 });
  }, []);

  useEffect(() => {
    if (userIdCurrent) {
      getUserFollow(userIdCurrent as string);
    }
  }, [userIdCurrent]);

  const handleFollowUser = async () => {
    const result = await followUser({
      follower_user_id: userIdCurrent as string,
    });
    if (result.success) {
      getUserFollow(userIdCurrent as string);
      notificationSuccess(result.message as string);
    } else {
      notificationError(result.message as string);
    }
  };

  const handleUnFollowUser = async () => {
    const result = await unfollowUser(userIdCurrent as string);
    if (result.success) {
      getUserFollow(userIdCurrent as string);
      notificationSuccess(result.message as string);
    } else {
      notificationError(result.message as string);
    }
  };

  // console.log("userFollowed", userFollowed);

  return (
    <div className="w-full bg-bgPrimary">
      {/* Header Profile */}
      <div className="w-full flex flex-col items-center bg-white border-b border-bgPrimary z-10">
        <div className="w-313">
          {/* Background */}
          <div className="w-full h-116.25 flex">
            <div className="flex-1 mx-auto relative overflow-y-hidden rounded-b-2xl">
              <img
                src={
                  profileUser.profile_picture_url || "/nen-trang-mac-dinh.jpg"
                }
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
          <div className="w-full h-57.5 flex items-center mt-5">
            <div className="mx-7.5 relative">
              <img
                src={profileUser.avatar || "/avatar-mac-dinh.jpg"}
                alt="avatar-user"
                className="w-50 h-50 rounded-[100%] cursor-pointer"
              />
              <span className="bg-[#e2e5e9] hover:bg-bgPrimary transition-all ease-in absolute bottom-9 right-3 rounded-[100%] flex items-center justify-center cursor-pointer gap-x-2 p-3">
                <Camera />
              </span>
            </div>
            <div className="pt-3 pr-1 pb-1 pl-3 flex-1">
              {/* Avatar-top */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col my-2">
                  <span className="font-bold text-4xl">{`${profileUser.first_name} ${profileUser.last_name}`}</span>
                  <div className="flex items-center gap-x-2 font-bold">
                    <span>120 người theo dõi</span>
                    <span>•</span>
                    <span>85 người đang theo dõi</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  {usernameMe == profileUser.user_name ? (
                    <Button
                      className="font-bold! bg-[#e2e5e9]! text-black! hover:bg-[#d6d6d6]! w-28.25"
                      type="primary"
                      icon={<Pencil className="w-4 h-4" />}
                    >
                      Chỉnh sửa
                    </Button>
                  ) : userFollowed == true ? (
                    <Button
                      className="font-bold! bg-[#e2e5e9]! text-black! hover:bg-[#d6d6d6]! w-28.25"
                      type="primary"
                      icon={<UserCheck className="w-4 h-4" />}
                      onClick={handleUnFollowUser}
                    >
                      Đã theo dõi
                    </Button>
                  ) : (
                    <Button
                      className="font-bold! w-28.25"
                      type="primary"
                      icon={<User className="w-4 h-4" />}
                      onClick={handleFollowUser}
                    >
                      Theo dõi
                    </Button>
                  )}
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
            </div>
          </div>

          {/* Other friends */}
          {suggestionCarousel === true && (
            <div className="w-[95%] mx-auto flex flex-col gap-x-4 border border-[#e5e5e5] rounded-2xl px-4 py-3 mb-4">
              <div className="flex items-center justify-between font-medium mb-2">
                <span className="text-md">Những người bạn có thể biết</span>
                <span className="text-blue-700 hover:text-blue-500 transition-all ease-in cursor-pointer">
                  Xem tất cả
                </span>
              </div>
              {/* Slide Friends */}
              <SuggestionCarousel
                data={data}
                usernameMe={usernameMe as string}
                currentProfile={profileUser}
              />
            </div>
          )}

          {/* Nav profile */}
          <div className="h-full flex items-center justify-between border-t-2 border-[#e2e5e9]">
            <div className="h-full flex items-center gap-x-2 text-[#b1b2b4] font-bold mt-1">
              <span
                className={`hover:bg-[#e2e5e9] transition-all ease-in cursor-pointer px-2 block border-b-2 border-blue-400 text-blue-400`}
              >
                Tất cả
              </span>
              <span className="hover:bg-[#e2e5e9] transition-all ease-in cursor-pointer px-2 block h-full">
                Giới thiệu
              </span>
              <span className="hover:bg-[#e2e5e9] transition-all ease-in cursor-pointer px-2 block h-full">
                Ảnh
              </span>
              <span className="hover:bg-[#e2e5e9] transition-all ease-in cursor-pointer px-2 block h-full">
                Bạn bè
              </span>
            </div>
            <div className="bg-[#e2e5e9] rounded-md cursor-pointer w-12.5 h-9.5 hover:bg-[#f5f6f7] flex transition-all ease-in mt-1">
              <Ellipsis className="m-auto" />
            </div>
          </div>
        </div>
      </div>
      {/* Body Profile */}
      <div className="w-313 flex justify-between gap-x-5 mx-auto my-2">
        {/* Info */}
        <div className="w-[40%] flex flex-col py-2 px-3 rounded-md bg-white shadow-md">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">Thông tin cá nhân</h3>
            <div className="hover:bg-bgPrimary transition-all ease-in cursor-pointer p-3 rounded-[100%]">
              <Pencil className="w-5 h-5" />
            </div>
          </div>
          <div className="flex flex-col gap-y-4 mt-3 ml-3">
            <div className="flex items-center gap-x-2">
              <MapPinHouse />
              <span>Quang Nghĩa</span>
            </div>
            <div className="flex items-center gap-x-2">
              <House />
              <span>Quang Nghĩa</span>
            </div>
            <div className="flex items-center gap-x-2">
              <Cake />
              <span>Quang Nghĩa</span>
            </div>
          </div>
        </div>
        {/* Posts */}
        <div className="w-[60%] bg-white p-3 rounded-md shadow-md">2</div>
      </div>
    </div>
  );
};

export default Profile;
