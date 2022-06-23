import apis from "../../api/api";
/* ----------------- 모듈의 초기 상태 ------------------ */
let intialstate = {
  list: [],
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
export function loadcomments(comments) {
  return { type: LOAD_COMMENTS, comments };
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
export const loadCommentJson = (payload) => {
  return async function (dispatch) {
    try{const res = await apis.getComments(payload)
    // console.log(res)
    dispatch(loadcomments(res.data))}
    catch{
      // console.log("없어")
    }
    
  };
};


export const AddHeartJson = () => {
  return async function (dispatch) { 
  };
};

export const createCommentJson = (id, text) => {
  return async function (dispatch) {
   try{const res = await apis.addComment(Number(id) ,{comment:text})
      // console.log(res.data)
     dispatch(createcomment(res.data))}
     catch{
      // console.log("없어")
     }
  };
};
export const updateCOMMENTJson = () => {
  return async function (dispatch) {};
};
export const deleteCommentJson = (id) => {
  return async function (dispatch) {
  };
};
/* ----------------- 리듀서 ------------------ */
export default function Comment_reducer(state = intialstate, action) {
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
