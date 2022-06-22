import apis from "../../api/api";
/* ----------------- 모듈의 초기 상태 ------------------ */
let intialstate = {
    list: [],
    user_list: [],
    room:'',
    username: '',
    nickname: '',
    user_profile: '',
    is_loaded: false,
    is_login: false,
};
/* ----------------- 액션 타입 ------------------ */

const GET_CHAT_ROOM = "chat_reducer/LOAD_ROOM";
const ADD_CHAT_ROOM = "chat_reducer/CREATE_ROOM";
const GET_MESSAGE = "chat_reducer/LOAD_MESSAGE";
const ENTER_ROOM = "chat_reducer/ENTER";
const SEND_MESSAGE = "chat_reducer/SEND";
const GET_ALL_USER = "user_reducer/ALLUSER"

/* ----------------- 액션 생성 함수 ------------------ */
//채팅방

export function getAllUser(payload) {
    return { type: GET_ALL_USER, payload };
  }
export function getChatRoom(chat_list) {
    return { type: GET_CHAT_ROOM, chat_list };
}
export function addChatRoom(room) {
    return { type: ADD_CHAT_ROOM, room };
}
export function enterChatRoom(payload) {
    return { type: ENTER_ROOM, payload };
}
// 이전 채팅 메세지
export function getChatMessage(payload) {
    return { type: GET_MESSAGE, payload };
}
export function sendChatMessage(payload) {
    return { type: SEND_MESSAGE, payload };
}




/* ----------------- 미들웨어 ------------------ */
//유저가져와(완) >>> 리스폰스 내부의 유저리스트 자체를 getAllUser보내줘야됨
export const getAllUserDB = () => {
    return function (dispatch) {
      apis.getAllUser()
        .then((response) => {
          // console.log("getAllUserDB : response", response.data)
          dispatch(getAllUser(response.data));
        }).catch((error) => {
          console.log(error.response);
        })
    }
  }

// 방 목록 가져오기(완)
export const getChatRoomDB = (roomId) => {
    return async function (dispatch) {
        apis
        .getChatRoom()
        .then((response) => {
            console.log("getChatRoomDB : response", response);
            dispatch(getChatRoom(response.data));
        }).catch((error) => {
            console.log("getChatRoomDB : ERROR", error.response)
        })
    }
    };


// 채팅방 추가하기 (완)
export const addChatRoomDB = (roomName) => {
    return async function (dispatch) {
        console.log("addChatRoomDB : roomName", roomName)
    
        const room = {
          chatRoomName: roomName,
        }
        // console.log(room);
        apis.addChatRoom(room)
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
    };
};
        


// 방 입장하기 (완)
export const enterChatRoomDB = (response) => {
    return async function (dispatch) {
          const room_data = {
            roomId: response.data.roomId,
            roomName: response.data.chatRoomName,
          }
          dispatch(enterChatRoom(room_data))
        }
};


// 유저 초대하기(완 -리듀서없음)
export const inviteUserDB = (roomId, username) => {
    return async function (dispatch) {
        //console.log("inviteUserDB : username", roomid, username);
        const res = await apis.inviteUser(roomId, username)
        // dispatch(inviteUser(res.data))
    };
};

// 이전 메세지 가져오기
export const getMessageDB = (roomId) => {
    return async function (dispatch) {
        //console.log("getMessage : roomId ", roomId)
        const res = await apis.getMessage(roomId)
        console.log(res)
        dispatch(getChatMessage(res.data.content))
    };
};



/* ----------------- 리듀서 ------------------ */


export default function Chat_reducer(state = intialstate, action) {
    // 새로운 액션 타입 추가시 case 추가한다.
    switch (action.type) {
        case  GET_ALL_USER:{
            return { ...state,user_list:[...action.payload]  };
        }
        //완
        case GET_CHAT_ROOM: {
            return {...state, list: [...action.chat_list] };
        }
        //완
        case ADD_CHAT_ROOM: {
            return { ...state, list: [...state.list, action.payload] };
        }
        //완
        case ENTER_ROOM: {
            return {  ...state, room: action.payload };
        }
        //완

        case GET_MESSAGE: {
            console.log("GET_MESSAGE : message", action.payload);
            return {  ...state, message: [...action.payload] };
        }
        
        case SEND_MESSAGE: {
            return { ...state, message: [ ...state.massage, action.payload]};
        }
        
        default:
            return state;
    }
}