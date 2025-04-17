import instance from "./axios";

export const registerUser = async(data: {
  name:string;
  email:string;
  password:string;
}) => {
  return await instance.post("/api/auth/signup", data);
};

export const loginUser = async (data:{
  email:string;
  password:string;
}) =>{
  return await instance.post("/api/auth/login", data);
};