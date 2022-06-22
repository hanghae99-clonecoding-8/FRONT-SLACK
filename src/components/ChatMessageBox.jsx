import React from 'react'
import styled from "styled-components";

import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { enterChatRoomDB, getMessageDB } from '../redux/modules/chat';
import { useQuery } from 'react-query';


import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import { getCookie } from '../shared/Cookie';


const token = getCookie("token");

function ChatMessageBox() {
  let sock = new SockJS('http://3.38.165.46:8080/ws-stomp');
  let ws = Stomp.over(sock);
 
  const dispatch = useDispatch();
  // 방 번호
  const roomId = useParams();
 
  let headers = {Authorization: token}

  // 연결하고 구독하기
  // function 
 const ConnectSub=(token)=> {
    console.log(roomId.roomid)
    try {
      ws.connect({
        token: token
      }, () => {
        console.log("여까진 왔거든")
          ws.subscribe(
            `/sub/api/chat/rooms/${Number(roomId.roomid)}`  ,
            (response) => {
              console.log("받은 메세지", response);
              const newMessage = JSON.parse(response.body);
              console.log("받은 메세지", newMessage);
              // dispatch(ChatCreators.getMessage(newMessage));
            },
            {
              token: token
            }
          );
        }
      );
    } catch (error) {
      console.log("fdfdfdfdf", error.response);
    }
  }

  //구독해제
 const DisConnectUnsub=(token)=> {
    try {
      ws.disconnect( 
        () => {
          ws.unsubscribe('sub-0');
          console.log("디스커넥트..")
        },
        { token:token  }
      );
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    dispatch(getMessageDB(Number(roomId.roomid)))
    ConnectSub(token);
    dispatch(enterChatRoomDB(Number(roomId.roomid)))
    return () => {
      DisConnectUnsub();
    };
  }, [dispatch,roomId]);

  // 이전 메세지 가져오기
  const message = useSelector((state) => state.chat?.message)
  
  // React.useEffect(() => {

  //   dispatch(getMessageDB(Number(roomId.roomid)));
  // }, [roomId.roomid])
  const [pressEnter, setPressEnter] = React.useState(false);

  const scrollRef = React.useRef();
  const scollToMyRef = () => {
    const scroll =
      scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
    scrollRef.current.scrollTo(0, scroll);
  };

  React.useEffect(()=>{
    scollToMyRef()
  })
  return (
    <Wrapper>
      <MessageWrapper ref={scrollRef}>

        {message?.map((message, idx) => {
          return (
            <ChatMessage 
              key={idx} 
              message={message?.message} 
              nickName={message?.nickname} ////보내는값과 같아야함
              createdAt={message?.createdAt}
              sender = {message?.sender}
              profileUrl = {message?.user?.profileUrl}
              />
          );
        })}


      </MessageWrapper>
      <InputWrpper>
        <ChatInput />
      </InputWrpper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: block;
  width: 100%;
  height: 100vh;
`
const MessageWrapper = styled.div`
  width: 100%;
  height: 80%;
  overflow-y: scroll;
`
const InputWrpper = styled.div`
  position: absolute;
  margin: auto;
  left: 280px;
  right: 20px;
  bottom : 0;


  height: 20%;

  backgroud: #fff;

`

export default ChatMessageBox