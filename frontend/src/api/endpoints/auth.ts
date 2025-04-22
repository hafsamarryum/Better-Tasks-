import axiosInstance from "../axios";

const PREFIX = "/api/auth";

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return await axiosInstance.post(`${PREFIX}/signup`, data);
};

export const loginUser = async (data: { email: string; password: string }) => {
  return await axiosInstance.post(`${PREFIX}/login`, data);
};
