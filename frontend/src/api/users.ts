import axios from "axios";

const API_BASE_URL = "http://localhost:5000";
// const API_BASE_URL = "https://speed-server.vercel.app";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getUsers = async () => {
  try {
    const response = await api.get("/user");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeUser = async (userId: string) => {
  try {
    const response = await api.delete(`/user/${userId}`); // 使用 DELETE 请求删除用户
    return response.data;
  } catch (error) {
    // 处理错误
    throw error;
  }
};
