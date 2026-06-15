import { Button, Col, message, Row, Spin } from "antd";
import { Link } from "react-router-dom";
import useUserStore from "../../../store/useUserStore";
import { notificationError, notificationSuccess } from "../../../config/notify";
import { UserRoundPlus } from "lucide-react";

import { useState } from "react";
import EmptyFollowSuggestions from "../../../components/EmptyFollowSuggestions/EmptyFollowSuggestions";

const PeopleYouMayKnow = () => {
    const {
        listFriends,
        getFollowSuggestions,
        me,
        followUser,
        loading: { getFollowSuggestions: loadingFollowSuggestions, followUser: loadingFollowUser },
    } = useUserStore();

    const [loadingFollowUserId, setLoadingFollowUserId] = useState<string | null>(null);

    const handleFollowUser = async (id: string) => {
        setLoadingFollowUserId(id);
        const result = await followUser({ follower_user_id: id })
        if (result.success) {
            getFollowSuggestions(me._id as string)
            notificationSuccess(result.message as string)
        } else {
            notificationError(result.message as string)
        }
        setLoadingFollowUserId(null);
    }

    return (
        <div className="py-4 px-10">
            {listFriends.length > 0 ?
                <>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[20px] font-bold">Những người bạn có thể biết</h3>
                        <Link to="/friends" className="text-blue-500 font-semibold hover:underline">Xem tất cả</Link>
                    </div>
                    <Row gutter={[12, 12]}>
                        {/* Friend */}
                        {loadingFollowSuggestions ? (
                            <Spin className="m-auto" />
                        ) : (
                            listFriends.map((item, index) => {
                                return (
                                    <Col key={index} span={5}>
                                        <div className="flex flex-col rounded-t-sm overflow-hidden bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
                                            <img
                                                className="w-full h-55 object-cover bg-gray-200"
                                                src=""
                                                alt=""
                                            />
                                            <div className="flex flex-col p-3">
                                                <span className="font-bold text-[16px] text-black mb-3">
                                                    {item.first_name + " " + item.last_name}
                                                </span>
                                                <Button loading={loadingFollowUser && loadingFollowUserId === item._id} icon={<UserRoundPlus className="w-4 h-4" />} type="primary" onClick={() => handleFollowUser(item._id as string)}>
                                                    Theo dõi
                                                </Button>
                                                <Button type="default" className="mt-2" onClick={() => message.info("Đang phát triển tính năng này...")}>
                                                    Gỡ
                                                </Button>
                                            </div>
                                        </div>
                                    </Col>
                                );
                            })
                        )}
                    </Row>
                </>
                :
                loadingFollowSuggestions ? (
                    <div className="flex justify-center py-16">
                        <Spin />
                    </div>
                ) : (
                    <EmptyFollowSuggestions />
                )
            }
        </div>
    )
}

export default PeopleYouMayKnow