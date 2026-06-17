import { Camera, Ellipsis, Heart, MessageCircle, Share2, Smile, Sticker, Users } from "lucide-react";

const PostCard = () => {
    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <img
                        src="/avatar-mac-dinh.jpg"
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    />
                    <div className="flex flex-col">
                        <span className="text-[16px] font-semibold leading-none">Lê Đình Huyy <span className="text-gray-500">›</span> Quang Nghĩa</span>
                        <div className="flex items-center gap-1">
                            <span className="text-gray-500 text-xs mt-1 leading-none cursor-pointer hover:underline transition-all ease-in">25 tháng 7, 2025</span>
                            <Users className="w-3.5 h-3.5 text-gray-500 mt-1" />
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 transition-colors duration-200"
                >
                    <Ellipsis className="w-4 h-4" />
                </button>
            </div>

            <p className="mt-3 text-[22px] leading-tight font-normal">Nghĩa ơi, chúc mừng sinh nhật nhé! 🥳🎈🎉</p>

            <div className="mt-3 flex items-center justify-between text-gray-600">
                <div className="flex items-center gap-3">
                    <button type="button" className="hover:text-red-500 transition-colors duration-200">
                        <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                    </button>
                    <span className="text-sm font-medium">1</span>
                    <button type="button" className="hover:text-gray-900 transition-colors duration-200">
                        <MessageCircle className="w-5 h-5" />
                    </button>
                    <span className="text-sm font-medium">1</span>
                    <button type="button" className="hover:text-gray-900 transition-colors duration-200">
                        <Share2 className="w-5 h-5" />
                    </button>
                    <span className="text-sm font-medium">1</span>
                </div>
                <div className="flex items-center">
                    <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                </div>
            </div>

            <div className="mt-3 flex items-center gap-2 bg-gray-100 rounded-full px-2 py-2">
                <img
                    src="/avatar-mac-dinh.jpg"
                    alt="my-avatar"
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
                <input
                    type="text"
                    placeholder="Viết bình luận..."
                    className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-500"
                />
                <div className="flex items-center gap-3 text-gray-500">
                    <Smile className="w-5 h-5" />
                    <Smile className="w-5 h-5" />
                    <Camera className="w-5 h-5" />
                    <Sticker className="w-5 h-5" />
                </div>
            </div>
        </div>
    );
};

export default PostCard;