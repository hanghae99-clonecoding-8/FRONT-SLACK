import React from 'react'
import styled from "styled-components";

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { Button, Grid } from "../elements";
import { HiPaperAirplane } from "react-icons/hi";

// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';

// let sock = new SockJS('http://52.79.226.242:8080/ws-stomp');
// let ws = Stomp.over(sock);

const ChatInput = (props) => {
  const dispatch = useDispatch();
  const sender = useSelector((state) => state.user?.user?.username)
  const [text, setText] = React.useState('');
  const roomId = useParams();

  const onSend = async () => {
    try {
      const message = {
        roomId: roomId.roomId,
        message: text.target.value,
        sender: sender,
        type: 'TALK',
      }
      // 빈문자열이면 리턴
      if (text === '') {
        return;
      }
      // 로딩 중
      waitForConnection(ws, function () {
        ws.send(
          '/pub/api/chat/message',
          { token: token },
          JSON.stringify(message)
        );
        console.log(ws.ws.readyState);
        dispatch(ChatCreators.sendMessage(message));
        setText("");
      });
    } catch (error) {
      console.log(error);
      console.log(ws.ws.readyState);
    }

  }

  // 웹소켓이 연결될 때 까지 실행
  function waitForConnection(ws, callback) {
    setTimeout(
      function () {
        // 연결되었을 때 콜백함수 실행
        if (ws.ws.readyState === 1) {
          callback();
          // 연결이 안 되었으면 재호출
        } else {
          waitForConnection(ws, callback);
        }
      },
      1 // 밀리초 간격으로 실행
    );
  }


  return (
    <>
      <Grid width="100%">
        <Center>
          <Box>
            <Box2 bg="#fafafa" br="6px 6px 0 0" />
            <InputBox onChange={setText} />
            <Button sendBtn _onClick={onSend} value={text}>

              <HiPaperAirplane color="#aaa" size="18px" transform="rotate(90)" />

            </Button>

          </Box>
        </Center>
      </Grid>
    </>
  );
}

const InputBox = styled.textarea`
    position: absolute;
    top: 40px;

    padding: 10px;

    width: 94%;
    height: 60px;

    resize: none;

    font-family: 'Pretendard-Regular';
    font-size: 1em;

    border: none;

    &:focus {
        outline: none;
    }
`
const Center = styled.div`
    width: 100%;
    
    margin: auto;
`
const Box = styled.div`
    position: absolute;
    bottom: 20px;

    width: 100%;
    height: 130px;

    border: 1px solid #ddd;
    border-radius: 8px;

`
const Box2 = styled.div`
    position: absolute;
    bottom: ${(props) => props.bt};

    margin: auto;

    width: 100%;
    height: 40px;

    border-radius: ${(props) => props.br};
    background: ${(props) => props.bg};
`

export default ChatInput