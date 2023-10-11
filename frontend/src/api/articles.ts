import axios from "axios";

const API_BASE_URL = "http://localhost:5000";
// const API_BASE_URL = "https://speed-server.vercel.app";

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

export const removeArticle = async (articleId: string) => {
  try {
    const response = await api.delete(`/articles/${articleId}`); 
    return response.data;
  } catch (error) {
    // 处理错误
    throw error;
  }
};

export const updateScore = async (articleId: string, addScore:number) => {
  try {
    
    const response = await api.patch(`/articles/${articleId}?addScore=${addScore}`, null, {
      headers: {
        "Content-Type": "application/json",
      },
    }); 
    return response.data;
  } catch (error) {
    throw error;
  }
};
