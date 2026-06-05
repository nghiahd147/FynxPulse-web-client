import { Col, Row, Spin } from "antd";
import { Link } from "react-router-dom";
import useUserStore from "../../../store/useUserStore";

const PeopleYouMayKnow = () => {
    const {
        listFriends,
        loading: { getFollowSuggestions: loadingFollowSuggestions },
    } = useUserStore();
    return (
        <div className="py-4 px-10">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-[20px] font-bold">Những người bạn có thể biết</h3>
                <Link to="/friends" className="text-blue-500 font-semibold hover:underline">Xem tất cả</Link>
            </div>
            <Row gutter={[12, 12]}>
                {/* Friend */}
                {loadingFollowSuggestions ? (
                    <Spin className="m-auto" />
                ) : (
                    listFriends.map((item) => {
                        return (
                            <Col span={4}>
                                <div className="flex flex-col border border-gray-200 rounded-[10px] overflow-hidden bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
                                    <img
                                        className="w-full h-[220px] object-cover bg-gray-200"
                                        src=""
                                        alt=""
                                    />
                                    <div className="flex flex-col p-3">
                                        <span className="font-bold text-[16px] text-black mb-3">
                                            {item.first_name + " " + item.last_name}
                                        </span>
                                        <button className="w-full bg-[#E7F3FF] text-[#1877F2] font-semibold py-[6px] rounded-md hover:bg-[#DBEAFE] transition-all cursor-pointer">
                                            Theo dõi
                                        </button>
                                        <button className="w-full bg-[#E4E6E9] text-black font-semibold mt-2 py-[6px] rounded-md hover:bg-[#D8DADF] transition-all cursor-pointer">
                                            Gỡ
                                        </button>
                                    </div>
                                </div>
                            </Col>
                        );
                    })
                )}
            </Row>
        </div>
    )
}

export default PeopleYouMayKnow