import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Post from "./modules/Post";
import Comments from "./modules/Comments";
import Chat from "./modules/Chat"
//모듈 버켓에서 메인으로 임포트 해오는건 default설정 되어 있는 reducer함수 하나고 이름은 내 맘대로 bucket으로 설정 가능 함
//리덕스 데브 툴쓰는거야
import { composeWithDevTools } from 'redux-devtools-extension';
// root 리듀서를 만들어줍니다.
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

export const history = createBrowserHistory();


const middlewares = [thunk.withExtraArgument({ history: history })];


const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
const rootReducer = combineReducers({ 
  post: Post,
  comment: Comments,
  chat: Chat,
  router: connectRouter(history),
 });

 
// 스토어를 만듭니다.
const store = createStore(rootReducer, enhancer );
export default store;