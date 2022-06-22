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
  delPost: (postId) => api.delete(`/api/posts/${postId}`),
  getPosts: () => api.get("/api/posts"),
  // getDetail: (postId) => api.get(`/api/posts/${postId}`),
  getDetail: (postId) => api.get(`/api/posts/${postId}`),

  //comment
  addComment: (postId, comment) =>
    api.post(`/api/posts/${Number(postId)}/comments`, comment),
  // editComment: (id, commentId, comments) =>
  //   api.post(`/api/board/${id}/comment/${commentId}`, comments),
  delComment: (id, commentId) =>
    api.delete(`/posts/${id}`),
  getComments: (postId) => api.get(`/api/posts/${postId}/comments`),

  //heart
  addheart: (id) => api.post(`/api/board/${id}/like`),



  //채팅 관련 
  // 유저정보 들고오기
  getAllUserChat: () => api.get('/api/chat/users'),
  // 방 목록 가져오기
  getChatRoom: () => api.get('/api/chat/rooms'),
  // 방 추가하기
  addChatRoom: (room) => api.post('/api/chat/rooms', room),
  // 방 접속하기
  enterRoom: (roomId) => api.get(`/api/chat/rooms/${roomId}`),

  // 유저 초대하기
  inviteUser: (roomid, username) => api.post(`/api/chat/invite`, { username: username, roomId: roomid }),

  // 이전 메세지 가져오기
  getMessage: (roomId) => api.get(`/api/chat/rooms/${roomId}/messages`),
};

export default apis;

//npx json-server ./data.json --port 4000