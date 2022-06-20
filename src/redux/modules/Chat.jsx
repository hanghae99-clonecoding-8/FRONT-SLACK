import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import thunk from "redux-thunk";

// import Axios from "../../shared/request";
// import {RESP} from "../../shared/response" 
import { ChatAPI } from "../../api/api";

// 액션 
const GET_CHAT_ROOM = "GET_CHAT_ROOM";
const ADD_CHAT_ROOM = "ADD_CHAT_ROOM";
const GET_MESSAGE = "GET_MESSAGE";
const ENTER_ROOM = "ENTER_ROOM";
const SEND_MESSAGE = "SEND_MESSAGE";

// 초기값
const initialState = {
  list: [

  ],
}

// 액션 생성
//채팅방
const getChatRoom = createAction(GET_CHAT_ROOM, (chat_list) => ({ chat_list }));
const addChatRoom = createAction(ADD_CHAT_ROOM, (room) => ({ room }));
const enterRoom = createAction(ENTER_ROOM, (room) => ({ room }) );
// 이전 채팅 메세지
const getMessage = createAction(GET_MESSAGE, (message) => ({message}));
const sendMessage = createAction(SEND_MESSAGE, (message) => ({message}));



// 미들웨어
// 방 목록 가져오기
const getChatRoomDB = () => {
  return async function (dispatch, getState, { history }) {
    ChatAPI
    .getChatRoom()
    .then((response) => {
        console.log("getChatRoomDB : response", response);
        dispatch(getChatRoom(response.data));
    }).catch((error) => {
        console.log("getChatRoomDB : ERROR", error.response)
    })

    // const response = RESP.GET_CHAT_ROOM;
    // console.log("getChatRoomDB : response", response);
    // dispatch(getChatRoom(response));
  }
}



// 채팅방 추가하기
const addChatRoomDB = (roomName) => {
  return async function (dispatch, getState, { history }) {
    console.log("addChatRoomDB : roomName", roomName)
    
    const room = {
      chatRoomName: roomName,
    }
    // console.log(room);
    ChatAPI.addChatRoom(room)
    .then((response) => {
        console.log("addChatRoomDB : response", response.data);
        const roomdata = {
          roomName: roomName,
          roomId: response.data.id
        }
        dispatch(getChatRoomDB());    
    }).catch((error) => {
        console.log("addChatRoomDB : ERROR", error.response)
    })
  }
}


// 방 입장하기
const enterRoomDB = (roomId) => {
  return async function (dispatch, getState, { history }) {
    // console.log("enterRoomDB : roomId", roomId);

    ChatAPI.enterRoom(roomId)
    .then((response) => {
      // console.log("enterRoomDB : response", response);
      const room_data = {
        roomId: response.data.id,
        roomName: response.data.chatRoomName,
      }
      dispatch(enterRoom(room_data))
      history.push(`/chat/`+response.data.id); 
    }).catch((error) => {
      console.log("enterRoomDB : error.response", error.response);
    })
  }
}


// 유저 초대하기
const inviteUserDB = (roomid, username) => {
  return async function (dispatch, getState, { history }) {
    console.log("inviteUserDB : username", roomid, username);

    ChatAPI.inviteUser(roomid, username)
    .then((response) => {
      console.log("inviteUserDB : response", response);
    }).catch((error) => {
      console.log(error.response);
    })

  }
}


// 이전 메세지 가져오기
const getMessageDB = (roomId) => {
  return async function (dispatch, getState, { history }) {
    console.log("getMessage : roomId ", roomId)

    ChatAPI.getMessage(roomId)
    .then((response) => {
      console.log("getMessageDB : response", response);
      dispatch(getMessage(response.data)); 
    }).catch((error) => {
      console.log("getMessageDB : ERROR", error.response);
    })
    // const response = RESP.GET_MESSAGE;
    // console.log("getMessageDB : response", response);
    // dispatch(getMessage(response));
  }
}





// 리듀서
export default handleActions(
  {
    [GET_CHAT_ROOM]: (state, action) => produce(state, (draft) => {
      // console.log("GET_CHAT_ROOM : chat_list", action.payload.chat_list)
      draft.list = action.payload.chat_list;
    }),
    [ADD_CHAT_ROOM]: (state, action) => produce(state, (draft) => {
      // console.log("ADD_CHAT_ROOM : room", action.payload.room)
      draft.list.push(action.payload.room);
      draft.is_open = false;
    }),
    [ENTER_ROOM]: (state, action) => produce(state, (draft) => {
      // console.log("ENTER_ROOM : room", action.payload.room);
      draft.room = action.payload.room;
    }),
    [GET_MESSAGE]: (state, action) => produce(state, (draft) => {
      console.log("GET_MESSAGE : message", action.payload.message);
      draft.message = action.payload.message;
      // draft.message.push(action.payload);
    }),
    [SEND_MESSAGE]: (state, action) => produce(state, (draft) => {
      console.log("SEND_MESSAGE : message", action.payload.message);
      draft.message = action.payload.message;
    }),
  },
  initialState
)


const ChatCreators = {
  getChatRoom,
  getChatRoomDB,
  
  addChatRoom,
  addChatRoomDB,
  
  getMessage,
  getMessageDB,

  enterRoom,
  enterRoomDB,

  sendMessage,

  inviteUserDB,
}

export { ChatCreators };