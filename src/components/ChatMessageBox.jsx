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

const ChatMessageBox = () => {
  let sock = new SockJS('');
  let ws = Stomp.over(sock);

  const dispatch = useDispatch();
  const roomId = useParams();

  let headers = getCookie("token");

  //연결이랑 구독
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

  function DisConnectUnsub() {
    try {
      ws.disconnect({
        Headers: {
          Authorization: `${token}`,
        }
      },
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

  background: #fff;
`

export default ChatMessageBox