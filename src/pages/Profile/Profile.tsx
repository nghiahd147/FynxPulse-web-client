import { Camera } from "lucide-react";

const Profile = () => {
  return (
    <div className="w-full bg-bgPrimary">
      {/* Header Profile */}
      <div className="w-full flex flex-col items-center bg-white border-b border-bgPrimary z-10">
        <div className="w-[60%]">
          {/* Background */}
          <div className="w-full h-116.25 flex">
            <div className="flex-1 mx-auto relative">
              <img
                src="https://i.pinimg.com/736x/5b/db/27/5bdb27e49ab32875bf013200799228b2.jpg"
                alt="bg-user"
                className="bg-no-repeat bg-cover bg-center w-full h-full rounded-b-2xl cursor-pointer"
              />
              <span className="bg-[#ffffff] hover:bg-bgPrimary transition-all absolute bottom-0 right-0 mr-10 mb-4 rounded-2xl flex items-center justify-center cursor-pointer gap-x-2 py-3 w-52">
                <Camera />
                Chỉnh sửa ảnh bìa
              </span>
            </div>
          </div>
          {/* Avatar */}
          <div className="w-full h-57.5 flex items-center">
            <div className="mx-7.5 relative">
              <img
                src="https://i.pinimg.com/736x/58/ac/02/58ac02be97d79d173750d49d62b8f8fe.jpg"
                alt="avatar-user"
                className="w-50 h-50 rounded-[100%] cursor-pointer"
              />
              <span className="bg-[#e2e5e9] hover:bg-bgPrimary transition-all ease-in absolute bottom-0 right-0 rounded-[100%] flex items-center justify-center cursor-pointer gap-x-2 p-3">
                <Camera />
              </span>
            </div>
            <div></div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
