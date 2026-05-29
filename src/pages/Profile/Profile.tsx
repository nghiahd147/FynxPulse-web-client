import { Button } from "antd";
import {
  ChevronDown,
  ChevronUp,
  Ellipsis,
  Pencil,
  UserCheck,
  UserRoundPlus,
} from "lucide-react";
import SuggestionCarousel from "../../components/SuggestionCarousel/SuggestionCarousel";
import { useEffect, useState } from "react";
import useUserStore from "../../store/useUserStore";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { usernameMe } from "../../utils/storages";
import { notificationError, notificationSuccess } from "../../config/notify";
import ProfileInfo from "./components/ProfileInfo";

const Profile = () => {
  const [suggestionCarousel, setSuggestionCarousel] = useState(true);
  const {
    getMe,
    getProfile,
    profileUser,
    followUser,
    getUserFollow,
    getListFriends,
    userFollowed,
    unfollowUser,
  } = useUserStore();
  const params = useParams();
  const usernameCurrent = params.user_name;
  const userIdCurrent = profileUser._id;
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (usernameCurrent) {
      getProfile(usernameCurrent as string);
    } else {
      getMe();
    }
  }, [usernameCurrent]);

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
      getListFriends();
      notificationSuccess(result.message as string);
    } else {
      notificationError(result.message as string);
    }
  };

  const handleUnFollowUser = async () => {
    const result = await unfollowUser(userIdCurrent as string);
    if (result.success) {
      getUserFollow(userIdCurrent as string);
      getListFriends();
      notificationSuccess(result.message as string);
    } else {
      notificationError(result.message as string);
    }
  };

  console.log("router", location.pathname.split("/"));

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
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Avatar */}
          <div className="w-full h-57.5 flex items-center mt-5">
            <div className="mx-7.5 relative">
              <img
                src={profileUser.avatar || "/avatar-mac-dinh.jpg"}
                alt="avatar-user"
                className="w-50 h-50 rounded-[100%]"
              />
            </div>
            <div className="pt-3 pr-1 pb-1 pl-3 flex-1">
              {/* Avatar-top */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col my-2">
                  <span className="font-bold text-4xl">{`${profileUser.first_name} ${profileUser.last_name}`}</span>
                  <span>{profileUser.bio}</span>
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
                      onClick={() => setOpen(true)}
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
                      icon={<UserRoundPlus className="w-4 h-4" />}
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
              <SuggestionCarousel />
            </div>
          )}

          {/* Nav profile */}
          <div className="h-full flex items-center justify-between border-t-2 border-[#e2e5e9]">
            <div className="h-full flex items-center gap-x-2 text-[#b1b2b4] font-bold mt-1">
              <Link
                to={"/profile"}
                className={`cursor-pointer px-2 block hover:border-b hover:border-blue-400 hover:text-blue-400 ${location.pathname === "/profile" && "border-b border-blue-400 text-blue-400"} transition-all ease-in`}
              >
                Tất cả
              </Link>
              <Link
                to={"/profile/image"}
                className={`cursor-pointer px-2 block hover:border-b hover:border-blue-400 hover:text-blue-400 ${location.pathname === "/profile/image" && "border-b border-blue-400 text-blue-400"} transition-all ease-in`}
              >
                Ảnh
              </Link>
              <Link
                to={`/profile/${profileUser.user_name}/friends`}
                className={`cursor-pointer px-2 block hover:border-b hover:border-blue-400 hover:text-blue-400 ${location.pathname.split("/")[3] === "friends" && "border-b border-blue-400 text-blue-400"} transition-all ease-in`}
              >
                Bạn bè
              </Link>
              <Link
                to={"/profile/post"}
                className={`cursor-pointer px-2 block hover:border-b hover:border-blue-400 hover:text-blue-400 ${location.pathname === "/profile/post" && "border-b border-blue-400 text-blue-400"} transition-all ease-in`}
              >
                Bài viết quan tâm
              </Link>
            </div>
            <div className="bg-[#e2e5e9] rounded-md cursor-pointer w-12.5 h-9.5 hover:bg-[#f5f6f7] flex transition-all ease-in my-3">
              <Ellipsis className="m-auto" />
            </div>
          </div>
        </div>
      </div>
      {/* Body Profile */}
      <div className="w-313 flex justify-between gap-x-5 mx-auto my-4">
        {location.pathname === "/profile" ? (
          <>
            {/* Info */}
            <ProfileInfo profile={profileUser} open={open} setOpen={setOpen} />
            {/* Posts */}
            <div className="w-[60%] bg-white p-3 rounded-md shadow-md">2</div>
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default Profile;
