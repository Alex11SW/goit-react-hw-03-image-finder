import axios from "axios";

const instance = axios.create({
  baseURL: "https://pixabay.com/api/",
  params: {
    key: "40978531-d49fca5d0ddc7815b1fb6eda5",
    image_type: "photo",
    orientation: "horizontal",
    per_page: 12,
  },
});

export const getAllPosts = (q) => {
  return instance.get("/", { params: { q, page: 1, _limit: 12 } });
};

export const searchPosts = (q, tags, per_page = 12) => {
  return instance.get("/", {
    params: { q, tags, per_page, _limit: 12 },
  });
};
