import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { loginUser } from "../api/endpoints/auth";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import "../index.css";
import { toast } from 'react-toastify';

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const res = await loginUser(data);
      const { token, userRole, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", userRole);
      useAuthStore.getState().setUser(user, token);
      toast.success("Login successfully!");
      setTimeout(() => {
      navigate("/dashboard");
      }, 1000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(`Errorif: ${error.message} || 'Login failed'`);
      } else {
        console.error("An unknown error occurred");
        toast.error("An unknown error occurred");
      }
    }
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-[100%] bg-center bg-no-repeat bg-contain flex items-center justify-center loginImg">
      <div className="flex relative top-[80px] left-[100px]">
      <div className="relative w-[360px] bg-transparent bg-opacity-20 rounded-xl shadow-xl backdrop-blur-[5px] p-[12px]  border-[#FFF] border-[2px] rounded-[13px]">
        
        <h1 className="text-center text-[#384f5a]">Login Form</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4  flex flex-col gap-[20px]  "
        >
          <div className="w-full flex flex-col">
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className=" py-[12px] pl-[8px] rounded-md bg-white bg-opacity-80 focus:outline-none text-[#384f5a] border-none rounded-[6px]"
            />
            {errors.email && (
              <p className="text-sm text-[#ff0e3e] ml-[8px]">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col relative ">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className=" py-[12px] pl-[8px] rounded-md bg-white bg-opacity-80 focus:outline-none text-[#384f5a] border-none rounded-[6px] "
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-[20px] top-2.5 mt-[12px] text-[#3b3b3f] border-none"
            >
              {showPass ? <BiSolidShow /> : <BiSolidHide />}
            </button>
            {errors.password && (
              <p className="text-sm text-[#ff0e3e] ml-[8px]">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[220px] bg-[#4582b9] text-[#FFF]  py-[12px] rounded-[8px] hover:opacity-90 transition border-none text-center font-bold text-[20px]"
            >
              Login{" "}
            </button>
          </div>

          <hr className="border-t border-white/40 mt-4" />

          <div className="text-center text-[#384f5a] text-[17px] mt-2">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="underline hover:text-[#ffde59] ml-[7px] text-[#384f5a]"
            >
              REGISTER HERE
            </Link>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Login;


