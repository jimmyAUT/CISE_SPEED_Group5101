import axios from "axios";

// const API_BASE_URL = "http://localhost:5000";
const API_BASE_URL = "https://speed-server.vercel.app";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// export const searchAll = async () => {
//   try {
//     const response = await api.get("/seach/all");
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const searchArticles = async (query: any) => {
  try {
    const response = await api.post("/search", query, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
