import { Button } from "antd";
import {
  ChevronDown,
  ChevronUp,
  Ellipsis,
  Pencil,
  UserCheck,
  UserRoundPlus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { notificationError, notificationSuccess } from "../../config/notify";
import SuggestionCarousel from "../../components/SuggestionCarousel/SuggestionCarousel";
import useUserStore from "../../store/useUserStore";

const Profile = () => {
  const [suggestionCarousel, setSuggestionCarousel] = useState(true);
  const {
    getProfile,
    profileUser,
    followUser,
    checkUserFollowStatus,
    getFollowSuggestions,
    userFollowed,
    unfollowUser,
    getMe,
    me,
    setOpenModalProfile,
  } = useUserStore();
  const params = useParams();
  const usernameCurrent = params.user_name;
  const userIdCurrent = profileUser._id;
  const navigate = useNavigate()
  const location = useLocation();
  const isFriendsList = location.pathname.startsWith("/friends/list");
  const isSuggestions = location.pathname.startsWith("/friends/suggestions")
  const basePath = isFriendsList ? "/friends/list" : isSuggestions ? "/friends/suggestions" : "/profile";

  useEffect(() => {
    if (usernameCurrent) {
      getProfile(usernameCurrent as string);
    } else {
      getMe()
    }
  }, [usernameCurrent]);

  useEffect(() => {
    if (userIdCurrent && userIdCurrent !== me._id) {
      checkUserFollowStatus(userIdCurrent as string);
    }
  }, [userIdCurrent]);

  const handleFollowUser = async () => {
    const result = await followUser({
      follower_user_id: userIdCurrent as string,
    });
    if (result.success) {
      checkUserFollowStatus(userIdCurrent as string);
      getFollowSuggestions(me._id as string);
      notificationSuccess(result.message as string);
    } else {
      notificationError(result.message as string);
    }
  };

  const handleUnFollowUser = async () => {
    const result = await unfollowUser(userIdCurrent as string);
    if (result.success) {
      checkUserFollowStatus(userIdCurrent as string);
      getFollowSuggestions(me._id as string);
      notificationSuccess(result.message as string);
    } else {
      notificationError(result.message as string);
    }
  };

  const redirectToPageFollowing = () => {
    navigate(`/profile/${profileUser.user_name || me._id}/friends`, { state: { tab: "following" } });
  };

  const redirectToPageFollowers = () => {
    navigate(`/profile/${profileUser.user_name || me._id}/friends`, { state: { tab: "followers" } });
  };

  return (
    <div className="w-full bg-bgPrimary">
      {/* Header Profile */}
      <div className="w-full flex flex-col items-center bg-white border-b border-bgPrimary z-10 relative">

        {/* Layer custom bgr */}
        <div className="absolute top-0 left-0 w-full h-116.25 overflow-hidden z-0 pointer-events-none">
          <div
            className="absolute -inset-25 bg-cover bg-center blur-[60px] opacity-60 transition-all duration-700 ease-in-out"
            style={{ backgroundImage: `url(${profileUser.profile_picture_url || "/anh_nen_mac_dinh_2.jpg"})` }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/20 to-white" />
        </div>

        <div
          className={`relative z-10 ${location.pathname.startsWith('/profile') ? "w-300" : "w-[90%]"}`}
        >
          {/* Background */}
          <div className="w-full h-116.25 flex">
            <div className="flex-1 mx-auto relative overflow-hidden rounded-b-2xl">
              <img
                src={
                  profileUser.profile_picture_url || "/anh_nen_mac_dinh_2.jpg"
                }
                alt="bg-user"
                className="w-full h-full object-cover"
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
                    <span onClick={redirectToPageFollowing} className="cursor-pointer hover:text-blue-400 hover:underline transition-all ease-in">{profileUser.following_count} đang theo dõi</span>
                    <span>•</span>
                    <span onClick={redirectToPageFollowers} className="cursor-pointer hover:text-blue-400 hover:underline transition-all ease-in">{profileUser.followers_count} người theo dõi</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  {me.user_name == profileUser.user_name ? (
                    <Button
                      className="font-bold! bg-[#e2e5e9]! text-black! hover:bg-[#d6d6d6]! w-28.25"
                      type="primary"
                      icon={<Pencil className="w-4 h-4" />}
                      onClick={() => {
                        console.log("Open Modal Edit Profile");
                        setOpenModalProfile(true);
                      }}
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
          <div className="h-15 flex items-center justify-between border-t border-[#ced0d4]">
            <div className="h-full flex items-center gap-x-1">
              <Link
                to={`${basePath}/${profileUser?.user_name}`}
                className={`relative flex items-center justify-center h-12 px-4 font-semibold rounded-md cursor-pointer transition-colors ${location.pathname === `${basePath}/${profileUser?.user_name}` ? "text-[#1877F2]" : "text-[#65676B] hover:bg-[#F2F2F2]"
                  } after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-0.75 after:bg-[#1877F2] after:transition-transform after:duration-300 after:ease-out ${location.pathname === `${basePath}/${profileUser?.user_name}` ? "after:scale-x-100" : "after:scale-x-0"
                  }`}
              >
                Tất cả
              </Link>
              <Link
                to={`${basePath}/${profileUser?.user_name}/images`}
                className={`relative flex items-center justify-center h-12 px-4 font-semibold rounded-md cursor-pointer transition-colors ${location.pathname === `${basePath}/${profileUser?.user_name}/images` ? "text-[#1877F2]" : "text-[#65676B] hover:bg-[#F2F2F2]"
                  } after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-0.75 after:bg-[#1877F2] after:transition-transform after:duration-300 after:ease-out ${location.pathname === `${basePath}/${profileUser?.user_name}/images` ? "after:scale-x-100" : "after:scale-x-0"
                  }`}
              >
                Ảnh
              </Link>
              <Link
                to={`${basePath}/${profileUser?.user_name}/friends`}
                className={`relative flex items-center justify-center h-12 px-4 font-semibold rounded-md cursor-pointer transition-colors ${location.pathname === `${basePath}/${profileUser?.user_name}/friends` ? "text-[#1877F2]" : "text-[#65676B] hover:bg-[#F2F2F2]"
                  } after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-0.75 after:bg-[#1877F2] after:transition-transform after:duration-300 after:ease-out ${location.pathname === `${basePath}/${profileUser?.user_name}/friends` ? "after:scale-x-100" : "after:scale-x-0"
                  }`}
              >
                Bạn bè
              </Link>
              <Link
                to={`${basePath}/${profileUser?.user_name}/posts`}
                className={`relative flex items-center justify-center h-12 px-4 font-semibold rounded-md cursor-pointer transition-colors ${location.pathname === `${basePath}/${profileUser?.user_name}/posts` ? "text-[#1877F2]" : "text-[#65676B] hover:bg-[#F2F2F2]"
                  } after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-0.75 after:bg-[#1877F2] after:transition-transform after:duration-300 after:ease-out ${location.pathname === `${basePath}/${profileUser?.user_name}/posts` ? "after:scale-x-100" : "after:scale-x-0"
                  }`}
              >
                Bài viết quan tâm
              </Link>
            </div>
            <div className="bg-[#e4e6e9] rounded-md cursor-pointer w-12 h-9 hover:bg-[#d8dadf] flex transition-all ease-in my-3">
              <Ellipsis className="m-auto w-5 h-5 text-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Body Profile */}
      <div className={`${location.pathname.startsWith('/profile') ? "w-300" : "w-[90%]"} flex justify-between gap-x-5 mx-auto py-4`}>
        <Outlet />
      </div>

    </div>
  );
};

export default Profile;
