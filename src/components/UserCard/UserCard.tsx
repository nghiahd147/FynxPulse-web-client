import { Link } from "react-router-dom"
import type { Users } from "../../types/user.types"
import useUserStore from "../../store/useUserStore"
import { CloseSquareOutlined, EllipsisOutlined } from "@ant-design/icons"
import { Dropdown } from "antd"
import { notificationError, notificationSuccess } from "../../config/notify"

const UserCard = ({ userInfo, activeTab }: { userInfo: Users[], activeTab?: string }) => {
    const { profileUser, me, unfollowUser, getProfile, getUserFollowing } = useUserStore()
    const handleUnfollowUser = async (id: string) => {
        const result = await unfollowUser(id)
        if (result.success) {
            getProfile(me.user_name || "")
            getUserFollowing(me._id as string)
            notificationSuccess(result.message as string)
        } else {
            notificationError(result.message as string)
        }
    }
    return (
        <>
            {userInfo.map((item, index) => {
                return (
                    <div key={index} className="w-full bg-white px-2 py-4 rounded-md border border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-x-3">
                            <Link to={`/profile/${item.user_name}`}>
                                <img
                                    src={item.avatar || "/avatar-mac-dinh.jpg"}
                                    alt="avatar-user"
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                            </Link>
                            <div className="flex flex-col">
                                <Link
                                    to={`/profile/${item.user_name}`}
                                    className="font-medium text-lg hover:underline transition-all ease-in"
                                >{`${item.first_name + " " + item.last_name}`}</Link>
                                <span className="text-sm text-gray-500 font-medium">
                                    {item.mutual_friends_count} Bạn chung
                                </span>
                            </div>
                        </div>
                        {profileUser._id === me._id && activeTab === "following" && (
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: "unfollower",
                                            label: <span className="text-base font-medium ml-1" onClick={() => handleUnfollowUser(item._id as string)}>Bỏ theo dõi</span>,
                                            icon: <CloseSquareOutlined className="text-xl" />,
                                        }
                                    ]
                                }}
                                trigger={['click']}
                                placement="bottomRight"
                                arrow
                            >
                                <div className="rounded-full p-3 flex items-center justify-center hover:bg-gray-100 transition-all ease-in cursor-pointer">
                                    <EllipsisOutlined />
                                </div>
                            </Dropdown>
                        )}
                    </div>
                )
            })}

        </>
    )
}

export default UserCard