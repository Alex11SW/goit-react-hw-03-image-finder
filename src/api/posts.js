import axios from "axios";

const API_KEY = "40978531-d49fca5d0ddc7815b1fb6eda5";
const BASE_URL = "https://pixabay.com/api/";

const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    image_type: "photo",
    orientation: "horizontal",
    per_page: 12,
  },
});

export const getAllPosts = (q) => {
  return instance.get("/", { params: { q, page: 1, _limit: 12 } });
};

export const searchPosts = (q, tags, page = 1, per_page = 12) => {
  return instance.get("/", {
    params: { q, tags, page, per_page },
  });
};
