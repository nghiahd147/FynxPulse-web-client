// import LoginForm from "./LoginForm/LoginForm";

import { Globe } from "lucide-react";

const Login = () => {
  return (
    <div className="w-full h-screen overflow-x-hidden bg-[#f5f2e9]">
      {/* Header */}
      <div className="flex items-center h-15 justify-between mx-16">
        <div className="text-3xl">
          <span className="text-black font-bold">Fynx</span>
        </div>
        <div className="flex items-center gap-x-6">
          <Globe className="cursor-pointer" />
          <button className="text-black bg-[#facb86] px-4 py-2 rounded-sm cursor-pointer text-md font-bold hover:bg-[#ffd698] transition-all duration-300 ease-in">
            Sign up
          </button>
        </div>
      </div>
      {/* Form */}
      <div></div>
    </div>
  );
};

export default Login;
