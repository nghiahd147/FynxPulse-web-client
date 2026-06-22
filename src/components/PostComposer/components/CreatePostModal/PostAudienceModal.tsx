import { ArrowLeft, MoreHorizontal } from "lucide-react";
import type { Audience, AudienceRecord } from "../../types";

const audienceOptions: Audience[] = ["every_one", "friends", "only_me"];

const PostAudience = ({
    handleAudienceBack,
    audienceConfig,
    tempAudience,
    setTempAudience,
    handleAudienceDone,
}: {
    handleAudienceBack: () => void,
    audienceConfig: AudienceRecord,
    tempAudience: Audience,
    setTempAudience: React.Dispatch<React.SetStateAction<Audience>>,
    handleAudienceDone: () => void
}) => {
    return (
        <div className="animate-slide-in-right">
            {/* Audience Header */}
            <div className="flex items-center justify-between p-3 border-b border-gray-200">
                <button
                    onClick={handleAudienceBack}
                    className="cursor-pointer p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-800" />
                </button>
                <h2 className="text-xl font-bold">Đối tượng của bài viết</h2>
                <button className="cursor-pointer p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200">
                    <MoreHorizontal className="w-5 h-5 text-gray-800" />
                </button>
            </div>

            {/* Audience Body */}
            <div className="p-4">
                <h3 className="text-[17px] font-bold mb-1">
                    Ai có thể xem bài viết của bạn?
                </h3>
                <p className="text-[15px] text-gray-500 mb-4 leading-snug">
                    Bài viết của bạn sẽ hiển thị trên Bảng feed, trang cá nhân
                    và trong kết quả tìm kiếm.
                </p>

                <div className="flex flex-col">
                    {audienceOptions.map((option) => {
                        const { label, icon: Icon, description } = audienceConfig[option];
                        const isSelected = tempAudience === option;

                        return (
                            <button
                                key={option}
                                onClick={() => setTempAudience(option)}
                                className="cursor-pointer flex items-center gap-3 py-3 hover:bg-gray-50 rounded-lg px-1 transition-colors duration-200"
                            >
                                <div className="w-15 h-15 shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
                                    <Icon className="w-7 h-7 text-gray-700" />
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="font-semibold text-[15px]">
                                        {label}
                                    </p>
                                    {description && (
                                        <p className="text-[13px] text-gray-500 mt-0.5">
                                            {description}
                                        </p>
                                    )}
                                </div>
                                <div
                                    className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors duration-200 ${isSelected
                                        ? "border-blue-500"
                                        : "border-gray-400"
                                        }`}
                                >
                                    {isSelected && (
                                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>

                <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-100">
                    <span className="text-[15px] text-gray-500">
                        Đặt làm đối tượng mặc định.
                    </span>
                    <input
                        type="checkbox"
                        disabled
                        className="w-5 h-5 rounded border-gray-300 opacity-40 cursor-not-allowed"
                    />
                </div>

                <button
                    onClick={handleAudienceDone}
                    className="w-full mt-4 py-2.5 rounded-lg font-semibold text-[15px] bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
                >
                    Xong
                </button>
            </div>
        </div>
    )
}

export default PostAudience