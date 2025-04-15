// src/components/Login.tsx
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { BiSolidHide, BiSolidShow } from 'react-icons/bi';

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

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log('Login Data:', data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdb0b6] via-[#f8efa5] to-[#8dbff0]">
      <div className="relative w-[360px] bg-transparent bg-opacity-20 rounded-xl shadow-xl backdrop-blur-md p-[12px]  border-[#FFF] border-[2px] rounded-[13px] ">
        {/* Avatar */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        </div>

        
        <h2 className="text-center text-[#bcbfb8]  mb-6 mt-6">Login Form</h2>

       
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4  flex flex-col gap-[20px]  ">
         
          <div className='w-full flex flex-column gap-[20px]'>
            <input
              type="email"
              placeholder="Email"
              {...register('email', { required: 'Email is required' })}
              className="w-full py-[12px] pl-[8px] rounded-md bg-white bg-opacity-80 focus:outline-none text-[#bcbfb8] border-none rounded-[6px]"
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
          </div>

          
          <div className="flex justify-end items-center">
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
              className="w-full py-[12px] pl-[8px] rounded-md bg-white bg-opacity-80 focus:outline-none text-[#bcbfb8] border-none rounded-[6px] "
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-2.5 text-gray-700 border-none"
            >
              {showPass ? <BiSolidShow /> : <BiSolidHide />}
            </button>
            {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
          </div>

         <div className='flex justify-center'>
          <button
            type="submit"
            className="w-[220px] bg-gradient-to-r from-[#7ac5ec] to-[#73bdd5] text-[#FFF]  py-[12px] rounded-[8px] hover:opacity-90 transition border-none text-center font-bold text-[20px]"
          >Login </button>
          </div>
         
          <hr className="border-t border-white/40 mt-4" />

          <div className="text-center text-[#bcbfb8] text-[17px] mt-2">
            Don’t have an account?{' '}
            <Link to="/register" className="underline hover:text-blue-200 ml-[7px] text-[#939efa]">REGISTER HERE</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
