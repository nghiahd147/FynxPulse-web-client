import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import useUserStore from "../../store/useUserStore";

const SuggestionSidebar = () => {
  const { listFriends } = useUserStore();

  return (
    <>
      <div className="flex items-center gap-x-2.5 mt-2 px-1">
        <Link to={"/friends"} className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-200 transition-all shrink-0">
          <ArrowLeft className="w-5 h-5 text-[#65676B]" strokeWidth={2.5} />
        </Link>
        <div className="flex flex-col">
          <span className="text-[#65676B] text-[13px] leading-4">Bạn bè</span>
          <span className="text-[#050505] text-[24px] font-bold leading-7">Gợi ý</span>
        </div>
      </div>

      <div className="px-1 mt-4">
        <h3 className="font-bold text-[17px] mb-2">Những người bạn có thể biết</h3>

        <div className="flex flex-col gap-y-1">
          {listFriends && listFriends.map((item, index) => (
            <div key={index} className="flex items-start gap-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-all">
              <img className="w-15 h-15 rounded-full object-cover bg-gray-300 shrink-0" src="" alt="" />
              <div className="flex flex-col flex-1">
                <span className="font-semibold text-[15px] text-black">{item.first_name + " " + item.last_name}</span>
                <div className="flex items-center gap-x-1 mt-0.5">
                  <div className="flex items-center -space-x-1">
                    <img className="w-4.5 h-4.5 rounded-full border-2 border-white bg-gray-300 relative z-10" src="" alt="" />
                    <img className="w-4.5 h-4.5 rounded-full border-2 border-white bg-gray-400 relative z-0" src="" alt="" />
                  </div>
                  <span className="text-[13px] text-gray-500">4 bạn chung</span>
                </div>
                <div className="flex items-center gap-x-2 mt-3 w-full">
                  <button className="flex-1 bg-[#1877F2] text-white font-semibold py-1.5 rounded-md hover:bg-[#166FE5] transition-all text-[15px] cursor-pointer">Thêm bạn bè</button>
                  <button className="flex-1 bg-[#E4E6E9] text-black font-semibold py-1.5 rounded-md hover:bg-[#D8DADF] transition-all text-[15px] cursor-pointer">Gỡ</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SuggestionSidebar;