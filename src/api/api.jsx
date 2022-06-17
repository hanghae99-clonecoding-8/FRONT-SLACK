import axios from "axios";
import { getCookie } from "../shared/Cookie";

const api = axios.create({
  baseURL: "http://localhost:4000",

});

api.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    config.headers.Authorization = token;
    return config;
  },
  (error) => {
  
  }
);

const apis = {
  //user
  addUser: (newUser) => api.post("/comments", newUser),
  postLogin: (userdata) => api.post("/posts", userdata),
  //post
  addPost: (contents) => api.post("/api/board/write", contents),
  editPost: (id, contents) => api.post(`/posts/${id}`, contents),
  delPost: (id) => api.delete(`/api/board/${id}`),
  getPosts: () => api.get("/api/boards"),
  getDetail: (id) => api.get(`/api/detail/${id}`),

  //comment
  addComment: (id, comment) =>
    api.post(`/api/board/${id}/comment/write`, comment),
  editComment: (id, commentId, comments) =>
    api.post(`/api/board/${id}/comment/${commentId}`, comments),
  delComment: (id, commentId) =>
    api.delete(`/api/board/${id}/comment/${commentId}`),
  getComments: (id) => api.get(`/api/board/${id}/comments`),

  //heart
  addheart: (id) => api.post(`/api/board/${id}/like`),
};

export default apis;