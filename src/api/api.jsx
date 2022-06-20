import axios from "axios";
import { getCookie } from "../shared/Cookie";

const api = axios.create({
  baseURL: "http://localhost:4000",
  //http://localhost:4000
  //http://3.39.190.102:8080
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
  checkEmail: (userEmail) => api.post(`/api/checkId`,userEmail),
  checkNickName: (nickName) => api.post(`/api/checkNick`,nickName),
  addUser: (newUser) => api.post("/api/users", newUser),
  postLogin: (userdata) => api.post("/api/users/login", userdata),

  //post
  addPost: (contents) => api.post("/comments", contents),
  // editPost: (id, contents) => api.post(`/posts/${id}`, contents),
  delPost: (id) => api.delete(`/comments/${id}`),

  getPosts: () => api.get("/comments"),
  getDetail: (id) => api.get(`/comments`),

  //comment
  addComment: ( comment) =>
    api.post(`/posts`, comment),
  editComment: (id, commentId, comments) =>
    api.post(`/api/board/${id}/comment/${commentId}`, comments),
  delComment: (id, commentId) =>
    api.delete(`/posts/${id}`),
  getComments: () => api.get(`/posts`),

  //heart
  addheart: (id) => api.post(`/api/board/${id}/like`),
};

export default apis;

//npx json-server ./data.json --port 4000