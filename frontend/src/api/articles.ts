import axios from "axios";

// const API_BASE_URL = "http://localhost:5000";
const API_BASE_URL = "https://cise-w4-backend.vercel.app";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getArticles = async () => {
  try {
    const response = await api.get("/articles");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createArticle = async (articleData: any) => {
  try {
    const response = await api.post("/articles", articleData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
//test
