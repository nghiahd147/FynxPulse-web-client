import { Button } from "antd";
import { ChevronLeft, ChevronRight, UserRoundPlus } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import useUserStore from "../../store/useUserStore";
import { useEffect } from "react";

const SuggestionCarousel = () => {
  const { getListFriends, listFriends, profileUser } = useUserStore();

  useEffect(() => {
    getListFriends();
  }, [profileUser._id]);

  return (
    <div className="flex items-center gap-x-2 overflow-x-hidden relative">
      {listFriends.length > 7 && (
        <>
          <button className="custom-prev custom-nav-btn">
            <ChevronLeft size={20} />
          </button>
          <button className="custom-next custom-nav-btn">
            <ChevronRight size={20} />
          </button>
        </>
      )}
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        slidesPerView={"auto"}
        className="ml-0!"
        spaceBetween={14}
      >
        {listFriends.map((item, index) => (
          <SwiperSlide key={index} style={{ width: "172px" }}>
            <div
              key={index}
              className="flex flex-col border border-[#cdd0d4] rounded-md shadow-2xs shadow-amber-500"
            >
              <Link to={`/profile/${item.user_name}`}>
                <img
                  src={item.avatar || "/avatar-mac-dinh.jpg"}
                  alt="avatar user other"
                  className="w-full h-37 rounded-t-md cursor-pointer"
                />
              </Link>
              <div className="flex flex-col px-2 py-1">
                <span className="font-bold hover:text-underline cursor-pointer text-nowrap overflow-hidden">
                  {item.first_name + " " + item.last_name}
                </span>
                <span className="my-1">1 Bạn chung</span>
                <Button
                  className="my-1"
                  type="primary"
                  icon={<UserRoundPlus className="w-4 h-4" />}
                >
                  Theo dõi
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SuggestionCarousel;
