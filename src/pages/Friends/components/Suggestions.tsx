import { Outlet, useParams } from "react-router-dom"

const Suggestions = () => {
    const { user_name } = useParams();

    return (
        <>
            {!user_name ? (
                <div className="flex h-full flex-col items-center justify-center">
                    <img src="/friends-bro.svg" className="w-50 h-50" />
                    <span className="text-[#65676B] text-[20px] font-bold mt-4">
                        Chọn tên của người mà bạn muốn xem trước trang cá nhân.
                    </span>
                </div>
            ) : (
                <Outlet />
            )}
        </>
    );
}

export default Suggestions