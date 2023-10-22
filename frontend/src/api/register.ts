import axios from "axios";

// const API_BASE_URL = "http://localhost:5000";
const API_BASE_URL = "https://speed-server.vercel.app";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

//register 邏輯
export const register = async (account: any) => {
  try {
    const response = await api.post("/user/register", account, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.role;
  } catch (error) {
    throw error;
  }
};

// login 邏輯
export const login = async (account: any) => {
  try {
    const response = await api.post("/user/login", account, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Log out 邏輯
export const handleLogout = () => {
  // 清除Cookie或LocalStorage并重置用户状态
  // ...
};

export const loginTest = async (account: any) => {
  try {
    const response = await api.post("/authTest/login", account, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
