import axios from "axios";

const API_BASE_URL = "http://localhost:5000";
// const API_BASE_URL = "https://speed-server.vercel.app";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getSubmit = async () => {
  try {
    const response = await api.get("/submit");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createSubmit = async (articleData: any) => {
  try {
    const response = await api.post("/submit", articleData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeSubmit = async (articleId: string) => {
  try {
    const response = await api.delete(`/submit/${articleId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchSubmit = async (query: any) => {
  try {
    const response = await api.post("/submit/new", query, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const reviewSubmit = async (articleId: string, query: any) => {
  try {
    const response = await api.put(`/submit/${articleId}`, query, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
