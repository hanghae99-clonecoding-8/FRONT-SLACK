import apis from "../../api/index";
/* ----------------- 모듈의 초기 상태 ------------------ */
let intialstate = {
  list: [],
  detail_list: null,

  heart_list: null,
};
/* ----------------- 액션 타입 ------------------ */

const LOAD_DETAIL = "comment_reducer/LOAD";
const LOAD_ID = "comment_reducer/LOAD_Id";
const LOAD_COMMENTS = "comment_reducer/LOAD";
const CREATE_COMMENT = "comment_reducer/CREATE";
const UPDATE_COMMENT = "comment_reducer/UPDATE";
const REMOVE_COMMENT = "comment_reducer/REMOVE";
// const CREATE_HEART = "COMMENT_reducer/CREATE";

/* ----------------- 액션 생성 함수 ------------------ */
export function loadcomments(payload) {
  return { type: LOAD_COMMENTS, payload };
}
export function loadId() {
  return { type: LOAD_ID };
}
export function loadDetail(loadDetailData) {
  return { type: LOAD_DETAIL, loadDetailData };
}

export function createcomment(payload) {

  return { type: CREATE_COMMENT, payload };
}
export function updatecomment(comment_index) {
  return { type: UPDATE_COMMENT, comment_index };
}
export function removecomment(comment_index) {
  return { type: REMOVE_COMMENT, comment_index };
}


/* ----------------- 미들웨어 ------------------ */
export const loadCOMMENTJson = () => {
  return async function (dispatch) {
  };
};


export const AddHeartJson = () => {
  return async function (dispatch) { 
  };
};

export const createCommentJson = (COMMENT) => {
  return async function (dispatch) {

  };
};
export const updateCOMMENTJson = () => {
  return async function (dispatch) {};
};
export const deleteCOMMENTJson = (id) => {
  return async function (dispatch) {
  };
};
/* ----------------- 리듀서 ------------------ */
export default function Comment_reducer(state = intialstate, action) {
  // 새로운 액션 타입 추가시 case 추가한다.
  switch (action.type) {
    case LOAD_COMMENTS: {
      return { list: action.payload.reverse() };
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
