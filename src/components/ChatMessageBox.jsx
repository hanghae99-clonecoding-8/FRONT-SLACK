import React from 'react'
import styled from "styled-components";

import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getMessageDB } from '../redux/modules/chat';

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import { getCookie } from '../shared/Cookie';


const token = getCookie("token");

function ChatMessageBox() {
  let sock = new SockJS('http://52.79.226.242:8080/ws-stomp');
  let ws = Stomp.over(sock);

  const dispatch = useDispatch();
  // 방 번호
  const roomId = useParams();
  
  let headers = {Authorization: token}

  // 연결하고 구독하기
  function ConnectSub(token) {
    try {
      ws.connect({
        token: token
      }, () => {
          ws.subscribe(
            `/sub/api/chat/rooms/${roomId.roomid}`,
            (response) => {
              // console.log("받은 메세지", response);
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
  function DisConnectUnsub() {
    try {
      ws.disconnect( {
        Headers: {
        Authorization: `${token}`,
      }},
        () => {
          ws.unsubscribe('sub-0');
        },
        { token: token }
      );
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    ConnectSub(token);
    return () => {
      DisConnectUnsub();
    };
  }, []);

  // 이전 메세지 가져오기
  const message = useSelector((state) => state.chat?.message?.content)
  React.useEffect(() => {
    dispatch(getMessageDB(roomId.roomid));
  }, [roomId.roomid])


  return (
    <Wrapper>
      <MessageWrapper>

        {message?.map((message, idx) => {
          return (
            <ChatMessage 
              key={idx} 
              message={message?.message} 
              nickName={message?.nickName} 
              createdAt={message?.createdAt} />
          );
        })}
  //프로필사진넣는거 고민해야됨

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