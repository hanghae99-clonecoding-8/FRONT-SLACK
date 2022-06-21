import apis from "../../api/api";
/* ----------------- 모듈의 초기 상태 ------------------ */
let intialstate = {
    list: [],
};
/* ----------------- 액션 타입 ------------------ */

const GET_CHAT_ROOM = "chat_reducer/LOAD_ROOM";
const ADD_CHAT_ROOM = "chat_reducer/CREATE_ROOM";
const GET_MESSAGE = "chat_reducer/LOAD_MESSAGE";
const ENTER_ROOM = "chat_reducer/ENTER";
const SEND_MESSAGE = "chat_reducer/SEND";

/* ----------------- 액션 생성 함수 ------------------ */
//채팅방

export function getChatRoom(chat_list) {
    return { type: GET_CHAT_ROOM, chat_list };
}
export function addChatRoom(room) {
    return { type: ADD_CHAT_ROOM, room };
}
export function enterChatRoom(room) {
    return { type: ENTER_ROOM, room };
}
// 이전 채팅 메세지
export function getChatMessage(message) {
    return { type: GET_MESSAGE, message };
}
export function sendChatMessage(message) {
    return { type: SEND_MESSAGE, message };
}

/* ----------------- 미들웨어 ------------------ */
// 방 목록 가져오기
export const getChatRoomDB = () => {
    return async function (dispatch) {
        const res = await apis.getChatRoom()
        dispatch(getChatRoom(res.data))
    };
};

// 채팅방 추가하기
export const addChatRoomDB = (room) => {
    return async function (dispatch) {
        const res = await apis.addChatRoom({room:room})
        dispatch(addChatRoom(res.data))
    };
};
        


// 방 입장하기
export const enterChatRoomDB = (roomId) => {
    return async function (dispatch) {
        const res = await apis.enterRoom({roomId:roomId})
        dispatch(enterRoom(res.data))
    };
};


// 유저 초대하기
export const inviteUserDB = (roomId, username) => {
    return async function (dispatch) {
        //console.log("inviteUserDB : username", roomid, username);
        const res = await apis.inviteUser({roomId: roomId, username: username})
        dispatch(inviteUser(res.data))
    };
};


// 이전 메세지 가져오기
export const getMessageDB = (roomId) => {
    return async function (dispatch) {
        //console.log("getMessage : roomId ", roomId)
        const res = await apis.getMessage({roomId: roomId})
        dispatch(getMessage(res.data))

        
    };
};


/* ----------------- 리듀서 ------------------ */


export default function Chat_reducer(state = intialstate, action) {
    // 새로운 액션 타입 추가시 case 추가한다.
    switch (action.type) {
        case GET_CHAT_ROOM: {
            return { list: [...action.chat_list] };
        }
        case ADD_CHAT_ROOM: {
            return { ...state, list: [...state.list, action.payload] };
        }
        case ENTER_ROOM: {
            return state.filter((list) => list.id !== action.id);
        }
        case GET_MESSAGE: {
            return state.filter((list) => list.id !== action.id);
        }
        case SEND_MESSAGE: {
            return state.filter((list) => list.id !== action.id);
        }
        default:
            return state;
    }
}