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
export const addChatRoomDB = (roomName) => {
    return async function (dispatch, getState, { history }) {
        //console.log("addChatRoomDB : roomName", roomName)

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
export const enterRoomDB = (roomId) => {
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
                history.push(`/chat/` + response.data.id);
            }).catch((error) => {
                console.log("enterRoomDB : error.response", error.response);
            })
    }
}


// 유저 초대하기
export const inviteUserDB = (roomid, username) => {
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
export const getMessageDB = (roomId) => {
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


/* ----------------- 리듀서 ------------------ */


export default function Chat_reducer(state = intialstate, action) {
    // 새로운 액션 타입 추가시 case 추가한다.
    switch (action.type) {
        case LOAD_COMMENTS: {
            return { list: [...action.comments] };
        }
        case CREATE_COMMENT: {
            return { ...state, list: [...state.list, action.payload] };
        }
        case REMOVE_COMMENT: {
            return state.filter((list) => list.id !== action.id);
        }
        default:
            return state;
    }
}