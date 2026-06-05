// import useUserStore from "../../../store/useUserStore";
import Profile from "../../Profile/Profile";

const List = () => {
  // const { userNameSidebar } = useUserStore()

  return (
    <>
      <Profile />
      {/* {!userNameSidebar ? <div>Chọn...</div> : <Profile />} */}
    </>
  );
};

export default List;
