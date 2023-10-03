import axios from "axios";

// const API_BASE_URL = "http://localhost:5000";
const API_BASE_URL = "https://speed-server.vercel.app";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// ==========   search the SPEED database articles   =========
export const searchArticles = async (query: any) => {
  try {
    const response = await api.post("/review/articles", query, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ==========   search the Rejected database articles   =========
export const searchRejecteds = async (query: any) => {
  try {
    const response = await api.post("/review/search-rejected", query, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

////       Add submission to rejected articles
// the form of rejectedArticle= {
//   title: string;
//   authors: string;
//   source: string;
//   pubyear: string;
//   doi: string;
//   comment: string;
// }
export const addRejected = async (rejectedArticle: any) => {
  try {
    const response = await api.post("/review", rejectedArticle, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
