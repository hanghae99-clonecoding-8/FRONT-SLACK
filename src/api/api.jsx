import axios from "axios";
import { getCookie } from "../shared/Cookie";

const api = axios.create({
  baseURL: "http://3.38.165.46",
  //http://localhost:4000
  //http://3.39.190.102:8080
  //http://3.38.165.46 >>>우리꺼
});

api.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    config.headers.Authorization = "Bearer"+" "+token;
    return config;
  },
  (error) => {
  }
);

const apis = {
  //user

  //db api 설정
  // checkEmail: (userEmail) => api.post(`/api/checkId`,userEmail),
  // checkNickName: (nickName) => api.post(`/api/checkNick`,nickName),
  // addUser: (newUser) => api.post("/api/users", newUser),
  // postLogin: (userdata) => api.post("/api/users/login", userdata),

  // fake db api 
  checkEmail: (userEmail) => api.post(`/api/checkId`,userEmail),
  checkNickName: (nickName) => api.post(`/api/checkNick`,nickName),
  addUser: (newUser) => api.post("/api/users", newUser),
  postLogin: (userdata) => api.post("/api/users/login", userdata),


  //post
  addPost: (contents) => api.post("/api/posts", contents),
  delPost: (postId) => api.delete(`/api/post/${postId}`),
  getPosts: () => api.get("/api/posts"),
  getDetail: (postId) => api.get(`/api/posts/${postId}`),

  //comment
  addComment: ( comment, postId) =>
    api.post(`/api/posts/${postId}/comments`, comment),
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