import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { registerUser } from "../api/endpoints/auth";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register: React.FC = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const password = watch("password");

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
       await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success("User registered successfully!");
      reset();
      setTimeout(() => {
      navigate("/dashboard");
      }, 1000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(`Errorif: ${error.message} || This email is already registered`);
      } else {
        console.error("An unknown error occurred");
        toast.error("An unknown error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen w-[100%] flex items-center justify-center relative loginImg">
      <div className="flex relative top-[80px] left-[100px]">
      <div className="relative w-[360px] bg-transparent bg-opacity-20 rounded-xl shadow-xl backdrop-blur-[5px] p-[12px]  border-[#FFF] border-[2px] rounded-[13px]">
        <h2 className="text-center text-[#384f5a] text-xl font-semibold m-[2px] mb-[15px]">
          Register Form
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col gap-[12px]"
        >
          <div className="w-full flex flex-col">
            <input
              type="text"
              placeholder="Username"
              {...register("name", { required: "Username is required" })}
              className=" py-[12px] pl-[8px] rounded-md bg-white bg-opacity-80 focus:outline-none text-[#384f5a] border-none rounded-[6px]"
            />
            {errors.name && (
              <p className="text-sm text-[#ff0e3e] ml-[8px]">
                {errors.name.message}
              </p>
            )}
          </div>

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

          <div className="flex flex-col relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="py-[12px] pl-[8px] rounded-md bg-white bg-opacity-80 focus:outline-none text-[#384f5a] border-none rounded-[6px]"
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

          <div className="flex flex-col relative">
            <input
              type={showConfirmPass ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className=" py-[12px] pl-[8px] rounded-md bg-white bg-opacity-80 focus:outline-none text-[#384f5a] border-none rounded-[6px]"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
              className="absolute right-[20px] top-2.5 mt-[12px] text-[#3b3b3f] border-none"
            >
              {showConfirmPass ? <BiSolidShow /> : <BiSolidHide />}
            </button>
            {errors.confirmPassword && (
              <p className="text-sm text-[#ff0e3e] ml-[8px]">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex justify-center mt[10px]">
            <button
              type="submit"
              className="w-[220px] bg-[#4582b9] text-[#FFF]  py-[12px] rounded-[8px] hover:opacity-90 transition border-none text-center font-bold text-[20px] "
            >
              Register
            </button>
          </div>

          <div className="text-center text-[#384f5a] text-[17px] mt-2">
            Don’t have an account?{" "}
            <Link
              to="/login"
              className="underline hover:text-[#ffde59] ml-[7px] text-[#384f5a]"
            >
              LOGIN HERE
            </Link>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Register;
