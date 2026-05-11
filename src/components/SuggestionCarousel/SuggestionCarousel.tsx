import { Button } from "antd";
import { ChevronLeft, ChevronRight, UserRoundPlus } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const SuggestionCarousel = () => {
  const data = [
    {
      id: 1,
      img: "https://scontent.fhan1-1.fna.fbcdn.net/v/t39.30808-1/695686322_2136382257121536_52926069871033537_n.jpg?stp=dst-jpg_s240x240_tt6&_nc_cat=111&ccb=1-7&_nc_sid=e99d92&_nc_ohc=43c2yUlOWeUQ7kNvwHmLnh5&_nc_oc=AdoSnkmpBxjiklMWTIXYkoIxlGV3ht4OcvHPQYJYJAIXfEqcWyJBVo4x31NA4NYDlWA&_nc_zt=24&_nc_ht=scontent.fhan1-1.fna&_nc_gid=wQNqUHKDD6O979yFXKULzw&_nc_ss=7b2a8&oh=00_Af7j5ayk96d8q6NFgWnm65BA1IAWUnbhZmKufPOsKIgXvQ&oe=6A0766D2",
      name: "Mai Linh",
      friend_number: 15,
    },
    {
      id: 2,
      img: "https://scontent.fhan1-1.fna.fbcdn.net/v/t39.30808-1/648737202_1604454030760223_1350942422357214196_n.jpg?stp=dst-jpg_s240x240_tt6&_nc_cat=102&ccb=1-7&_nc_sid=e99d92&_nc_ohc=mlLBv_TwXcoQ7kNvwGm0uMI&_nc_oc=AdqXt-OmxIyEKaEzrwPbchgsHJxEKk1iozd7p8NiihwIENfpQhmbT2s7gQrLS52WyvA&_nc_zt=24&_nc_ht=scontent.fhan1-1.fna&_nc_gid=O4MQDwZPucIynfOI8aBU1g&_nc_ss=7b2a8&oh=00_Af6n4yW5wF0bR0ZCD0wTQoJHCIf1LDgErI3cnq1-4jft0g&oe=6A07685B",
      name: "Thanh Long",
      friend_number: 15,
    },
    {
      id: 3,
      img: "https://scontent.fhan1-1.fna.fbcdn.net/v/t39.30808-1/670613438_122128249395140593_2740891723842661849_n.jpg?stp=dst-jpg_s240x240_tt6&_nc_cat=107&ccb=1-7&_nc_sid=1d2534&_nc_ohc=nbfcDk-GrRoQ7kNvwEjZWRb&_nc_oc=AdoKwrgMoYYSPJQKvPVgvm2-kaDQ8yZo3rflRKCh0k7bRVmNpWKPsMa_XRkZP7f2Fv4&_nc_zt=24&_nc_ht=scontent.fhan1-1.fna&_nc_gid=NVl3cLJg7KWEIjIAAspPJw&_nc_ss=7b2a8&oh=00_Af6H_jOJC7-UCYpDn_CBbvLBHgaHXspfMeO_LHWo78mhqw&oe=6A07507A",
      name: "Kim Hồng",
      friend_number: 15,
    },
    {
      id: 4,
      img: "https://scontent.fhan1-1.fna.fbcdn.net/v/t39.30808-1/660301691_122165521148925032_6341798236756361173_n.jpg?stp=c0.0.648.648a_dst-jpg_s240x240_tt6&_nc_cat=104&ccb=1-7&_nc_sid=1d2534&_nc_ohc=FZHPDksTrGAQ7kNvwEguo_L&_nc_oc=AdpeNqVWbkjtgnVjtvTyi9WGIzvUiOg7RJjcDz6RZ-HNWHnOrK76A2t5efuk9d6nQPY&_nc_zt=24&_nc_ht=scontent.fhan1-1.fna&_nc_gid=wQNqUHKDD6O979yFXKULzw&_nc_ss=7b2a8&oh=00_Af5Ej6rVLAd66DngqNhLOzfE1Xlzrd2w2W4QuLX9OKl4hQ&oe=6A075393",
      name: "Lynh Bei",
      friend_number: 15,
    },
    {
      id: 5,
      img: "https://scontent.fhan1-1.fna.fbcdn.net/v/t39.30808-1/645810247_122192748248401578_6740327683668186701_n.jpg?stp=dst-jpg_s240x240_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e99d92&_nc_ohc=4sHYduLFnv4Q7kNvwFYqIQG&_nc_oc=Adr6ub8zUluLcXrXJeAUKbqyj8jZZbG3AP0LxUhAepTm0NuGITIh88ZXmI7TNc1Qmgw&_nc_zt=24&_nc_ht=scontent.fhan1-1.fna&_nc_gid=wQNqUHKDD6O979yFXKULzw&_nc_ss=7b2a8&oh=00_Af7_d1bFHeyFu2bWMSh8iFqVmhxt2skQouGv8H1qMlUyJw&oe=6A07506E",
      name: "Lin Ng",
      friend_number: 15,
    },
    {
      id: 6,
      img: "https://scontent.fhan1-1.fna.fbcdn.net/v/t39.30808-1/444480043_7367426490035492_7198096965733224967_n.jpg?stp=dst-jpg_s240x240_tt6&_nc_cat=107&ccb=1-7&_nc_sid=e99d92&_nc_ohc=Pi1ZWQ7hMQMQ7kNvwGvUoW0&_nc_oc=AdrU4T-uHqxs6CQuyqjeH1zjUr5bji47Po_XekejeTjJRYVX8rCMGs0IyoJA5rGgCbg&_nc_zt=24&_nc_ht=scontent.fhan1-1.fna&_nc_gid=wQNqUHKDD6O979yFXKULzw&_nc_ss=7b2a8&oh=00_Af4_dIBhulPOkvw9jK3rcuvy_e09r7sEQDiwbN15lUrETA&oe=6A076D84",
      name: "Trịnh Thị Mỹ Hằng",
      friend_number: 15,
    },
    {
      id: 7,
      img: "https://scontent.fhan1-1.fna.fbcdn.net/v/t39.30808-1/515640325_4201186776782967_6518636588544432748_n.jpg?stp=dst-jpg_s240x240_tt6&_nc_cat=109&ccb=1-7&_nc_sid=1d2534&_nc_ohc=opEbarxneNcQ7kNvwHJFzS-&_nc_oc=AdqVlHAJl3m3VAisf-8UuUYRVM-xU610E06AJMR2cC7_pmBnhRA_QohVgW3t2CZJgLg&_nc_zt=24&_nc_ht=scontent.fhan1-1.fna&_nc_gid=wQNqUHKDD6O979yFXKULzw&_nc_ss=7b2a8&oh=00_Af6_eORTBt5FhYXt5iM9Bi15XbLb9mDBywsDK3USnEL-1g&oe=6A074EB1",
      name: "Nguyễn Thùy Trang",
      friend_number: 15,
    },
    {
      id: 8,
      img: "https://scontent.fhan1-1.fna.fbcdn.net/v/t39.30808-1/672072120_4360565194271539_8345689272579447827_n.jpg?stp=dst-jpg_s240x240_tt6&_nc_cat=103&ccb=1-7&_nc_sid=1d2534&_nc_ohc=evMzDku3psEQ7kNvwEl3qz-&_nc_oc=AdpPcUZQtWdUkAh_TNjGr19p2QbjCo75XGdd19gG1g4FSy1jJlK-MlMYYOcu_0q7j_M&_nc_zt=24&_nc_ht=scontent.fhan1-1.fna&_nc_gid=wQNqUHKDD6O979yFXKULzw&_nc_ss=7b2a8&oh=00_Af4voWNmUdhr4LdekTdulX-rwF1h14onOa_WTX1I41waag&oe=6A074193",
      name: "Nguyễn Duy Phong",
      friend_number: 15,
    },
    {
      id: 9,
      img: "https://scontent.fhan1-1.fna.fbcdn.net/v/t39.30808-1/547718033_818406780525129_3904987597900869939_n.jpg?stp=dst-jpg_s240x240_tt6&_nc_cat=109&ccb=1-7&_nc_sid=1d2534&_nc_ohc=Y3wWNK8aWGcQ7kNvwE0Y1sG&_nc_oc=AdqgHzE6xt80MUSKn_UT_Wwj60apGT4Ihgl6Sc2ScQVbg9UIij0zjuz_miYxTsSBooI&_nc_zt=24&_nc_ht=scontent.fhan1-1.fna&_nc_gid=wQNqUHKDD6O979yFXKULzw&_nc_ss=7b2a8&oh=00_Af7uKlfp-zwO8kdAoQjqA4QMGbKElFBB8aJgohnScZnLrg&oe=6A075D6B",
      name: "Nguyễn Thị Lan",
      friend_number: 15,
    },
    {
      id: 10,
      img: "https://scontent.fhan1-1.fna.fbcdn.net/v/t39.30808-1/496093028_3182396711907531_932298508166430371_n.jpg?stp=dst-jpg_s240x240_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_ohc=pQPGhVan5LQQ7kNvwEeM0Ue&_nc_oc=AdroTZT8URg1ukb_DYWiET_3g3CwG88aDUVgbpuz-Q9AoaDYQ4K7zTz0lh6wieXZK_4&_nc_zt=24&_nc_ht=scontent.fhan1-1.fna&_nc_gid=wQNqUHKDD6O979yFXKULzw&_nc_ss=7b2a8&oh=00_Af74k6s4xTrH78vToIojKwjnBdVFZne61aN1V8CDbgbQGw&oe=6A0737D5",
      name: "Nam Trịnh",
      friend_number: 15,
    },
  ];

  return (
    <div className="flex items-center gap-x-2 overflow-x-hidden relative">
      <button className="custom-prev custom-nav-btn">
        <ChevronLeft size={20} />
      </button>
      <button className="custom-next custom-nav-btn">
        <ChevronRight size={20} />
      </button>
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        slidesPerView={7}
        spaceBetween={14}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              key={index}
              className="flex flex-col border border-[#cdd0d4] rounded-md shadow-2xs shadow-amber-500"
            >
              <img
                src={item.img}
                alt="avatar user other"
                className="w-full h-37 rounded-t-md cursor-pointer"
              />
              <div className="flex flex-col px-2 py-1">
                <span className="font-bold hover:text-underline cursor-pointer text-nowrap overflow-hidden">
                  {item.name}
                </span>
                <span className="my-1">{item.friend_number} Bạn chung</span>
                <Button
                  className="my-1"
                  type="primary"
                  icon={<UserRoundPlus className="w-4 h-4" />}
                >
                  Thêm bạn bè
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
