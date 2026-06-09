import { Film, Images, Video } from "lucide-react"
import useUserStore from "../../store/useUserStore"

const PostComposer = () => {
    const { me } = useUserStore()
    return (
        <>
            <div className="flex items-center gap-3">
                <img
                    src={me.avatar || "https://i.pinimg.com/736x/8f/1b/09/8f1b09269d8df868039a5f9db1698bf7.jpg"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
                <div className="flex-1 bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors duration-200 px-4 py-2.5 rounded-full text-gray-500 text-[15px]">
                    Bạn đang nghĩ gì?
                </div>
            </div>
            <div className="h-px bg-gray-200 w-full my-3"></div>
            <div className="flex items-center justify-between px-1">
                <div className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-200 text-gray-600 font-semibold text-[15px]">
                    <Video className="w-6 h-6 text-gray-500 fill-gray-500" />
                    <span>Video trực tiếp</span>
                </div>
                <div className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-200 text-gray-600 font-semibold text-[15px]">
                    <Images className="w-6 h-6 text-gray-500" />
                    <span>Ảnh/video</span>
                </div>
                <div className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors duration-200 text-gray-600 font-semibold text-[15px]">
                    <Film className="w-6 h-6 text-gray-500 fill-gray-500" />
                    <span>Thước phim</span>
                </div>
            </div>
        </>
    )
}

export default PostComposer