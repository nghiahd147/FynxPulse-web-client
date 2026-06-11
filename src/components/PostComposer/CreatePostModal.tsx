import { X, Lock, ChevronDown, Smile } from "lucide-react";
import useUserStore from "../../store/useUserStore";
import { Button } from "antd";

interface CreatePostModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreatePostModal = ({ isOpen, onClose }: CreatePostModalProps) => {
    const { me } = useUserStore();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-white/80" onClick={onClose}></div>

            {/* Modal */}
            <div className="relative w-full max-w-125 bg-white rounded-xl shadow-[0_12px_28px_rgba(0,0,0,0.2)]">
                {/* Header */}
                <div className="flex items-center justify-center p-4 border-b border-gray-200 relative">
                    <h2 className="text-xl font-bold">Tạo bài viết</h2>
                    <button
                        onClick={onClose}
                        className="cursor-pointer absolute right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-4">
                    {/* User Info */}
                    <div className="flex items-center gap-3 mb-4">
                        <img
                            src={me.avatar || "https://i.pinimg.com/736x/8f/1b/09/8f1b09269d8df868039a5f9db1698bf7.jpg"}
                            alt="avatar"
                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        />
                        <div>
                            <div className="font-semibold text-[15px]">{me.first_name + " " + me.last_name || "Người dùng"}</div>
                            <button className="cursor-pointer flex items-center gap-1 bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-md text-xs font-semibold text-gray-800 mt-0.5">
                                <Lock className="w-3 h-3" />
                                Chỉ mình tôi
                                <ChevronDown className="w-3 h-3" />
                            </button>
                        </div>
                    </div>

                    {/* Textarea */}
                    <textarea
                        placeholder="Bạn đang nghĩ gì?"
                        className="w-full text-2xl outline-none resize-none min-h-37.5 placeholder-gray-500"
                        autoFocus
                    />

                    {/* Footer Icons */}
                    <div className="flex items-center justify-between mt-2">
                        <button className="cursor-pointer w-9 h-9 flex items-center justify-center rounded-lg bg-linear-to-tr from-pink-500 via-purple-500 to-yellow-500 text-white font-bold text-sm shadow hover:opacity-90">
                            Aa
                        </button>
                        <button className="cursor-pointer p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                            <Smile className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Submit Button */}
                    <Button type="primary" className="w-full mt-2 py-5!">
                        Đăng bài
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CreatePostModal;
