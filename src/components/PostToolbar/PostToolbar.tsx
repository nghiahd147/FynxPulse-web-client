import { Grid2x2, List, Settings, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const PostToolbar = () => {
    const [isListView, setIsListView] = useState(true);

    const tabClass = (isListTab: boolean) =>
        `flex-1 flex items-center justify-center gap-2 py-3 text-[15px] font-semibold cursor-pointer transition-all duration-200 
         ${isListView === isListTab ? "text-blue-600" : "text-gray-500 hover:bg-gray-50"
        }`;

    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
                <h3 className="text-2xl font-bold">Bài viết</h3>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 transition-colors duration-200 rounded-xl px-4 py-2 text-base font-semibold text-gray-800"
                    >
                        <SlidersHorizontal className="w-5 h-5" />
                        <span>Bộ lọc</span>
                    </button>
                    <button
                        type="button"
                        className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 transition-colors duration-200 rounded-xl px-4 py-2 text-base font-semibold text-gray-800"
                    >
                        <Settings className="w-5 h-5" />
                        <span>Quản lý bài viết</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2">
                <button type="button" className={tabClass(true)} onClick={() => setIsListView(true)}>
                    <List className="w-5 h-5" />
                    <span>Chế độ xem danh sách</span>
                </button>
                <button type="button" className={tabClass(false)} onClick={() => setIsListView(false)}>
                    <Grid2x2 className="w-5 h-5" />
                    <span>Chế độ xem lưới</span>
                </button>
            </div>

            <div className="relative h-[3px] bg-gray-100">
                <span
                    className="absolute top-0 h-full w-1/2 bg-blue-600 transition-all duration-300"
                    style={{ left: isListView ? "0%" : "50%" }}
                />
            </div>
        </div>
    );
};

export default PostToolbar;