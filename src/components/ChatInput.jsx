import React, { useEffect } from 'react'
import styled from "styled-components";

import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';

import Button from "../elements/Button";
import Grid2 from "../elements/Grid2";
import { HiPaperAirplane } from "react-icons/hi";
import { VscBold, VscItalic, VscListOrdered, VscMention, VscSmiley } from "react-icons/vsc";
import { RiStrikethrough, RiFileCodeLine, RiSendPlane2Fill, RiArrowDownSLine } from "react-icons/ri";
import { IoIosLink } from "react-icons/io";
import { TbList, TbCode, TbVideo } from "react-icons/tb";
import { BsBarChartSteps, BsType } from "react-icons/bs";
import { CgMic } from "react-icons/cg";

import { getMessageDB, sendChatMessage } from '../redux/modules/chat';

import { getCookie } from "../shared/Cookie"

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let sock = new SockJS('http://3.38.165.46:8080/ws-stomp'); // 
let ws = Stomp.over(sock);//client

const ChatInput = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = React.useRef();

  //보내는 사람((쿠키한글로보이게해주세요 제발))
  const nickname = getCookie("nickname")
  const username = getCookie("username")

  //보낼 메세지
  const [text, setText] = React.useState('');
  //방
  const roomId = useParams();

  const token = getCookie("token");//베어러 붙여야되는지 확인

  const onSend = async () => {
    props.enter(true)
    try {

      if (!token) {
        alert('문제가 발생했습니다. 다시 로그인 해주세요.');
        navigate('/');
      }

      const message = {
        roomId: String(roomId.roomid),
        message: text.target.value,
        // nickname: nickname,
        sender: username,
        type: 'TALK'
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
        const NewMessage = JSON.stringify(message)
        // console.log(NewMessage);
        // dispatch(sendChatMessage(NewMessage.message)); //몰루
        console.log(JSON.stringify(message));

        // dispatch(sendChatMessage(JSON.stringify(message))); //몰루
        setText("");
      });
    } catch (error) {
      console.log(error);
      console.log(ws.ws.readyState);
    }

  }
  //엔터로 전송
  const MessageEnter = (e) => {
    // enter입력시 메세지 전송
    if (e.key === "Enter") {
      onSend();
      dispatch(getMessageDB(String(roomId.roomid)))
      inputRef.current.value=""
    }
  };



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
      <Wrap>
        <MessageForm>
          <div className='m_format'>
            <button>
              <VscBold size="20px" />
            </button>
            <button>
              <VscItalic size="20px" />
            </button>
            <button>
              <RiStrikethrough size="20px" />
            </button>
            <span></span>
            <button>
              <IoIosLink size="20px" />
            </button>
            <span></span>
            <button>
              <VscListOrdered size="20px" />
            </button>
            <button>
              <TbList size="20px" />
            </button>
            <span></span>
            <button>
              <BsBarChartSteps size="20px" />
            </button>
            <span></span>
            <button>
              <TbCode size="20px" />
            </button>
            <button>
              <RiFileCodeLine size="20px" />
            </button>
          </div>
          <div className='m_text'>
            <textarea
              type="text"
              placeholder="내용을 입력하세요"
              style={{ height: "70px" }}
              wrap="hard"
              cols="20"
              onChange={setText} onKeyPress={MessageEnter} ref={inputRef}
            />
          </div>
          <div className='m_toolbar'>
            <button>+</button>
            <div className='buttons'>
              <span></span>
              <button>
                <TbVideo color="#ccc" size="20px" />
              </button>
              <button>
                <CgMic color="#ccc" size="20px" />
              </button>
              <span></span>
              <button>
                <VscSmiley color="#525252" size="20px" />
              </button>
              <button>
                <VscMention color="#525252" size="20px" />
              </button>
              <button>
                <BsType color="#525252" size="20px" />
              </button>
            </div>
            <div className='submit'>
              <UnderBar>

                <button onClick={onSend} value={text}>
                  <RiSendPlane2Fill size="20px" />
                </button>
                <span></span>
                <button>
                  <RiArrowDownSLine size="20px" />
                </button>

              </UnderBar>
            </div>
          </div>
        </MessageForm>

      </Wrap>

      {/* <Grid2 width="100%">
        <Center>
          <Box>
            <Box2 bg="#fafafa" br="6px 6px 0 0" />
            <InputBox onChange={setText} onKeyPress={MessageEnter} ref={inputRef}/>
            <Button sendBtn onClick={onSend} value={text}>
              <HiPaperAirplane color="#aaa" size="18px" transform="rotate(90)" />
            </Button>

          </Box>
        </Center>
      </Grid2> */}
    </>
  );
}

// const InputBox = styled.input`
//     position: absolute;
//     top: 40px;

//     padding: 10px;

//     width: 94%;
//     height: 60px;

//     resize: none;

//     font-family: 'Pretendard-Regular';
//     font-size: 1em;

//     border: none;

//     &:focus {
//         outline: none;
//     }
// `
// const Center = styled.div`
//     width: 100%;

//     margin: auto;
// `
// const Box = styled.div`
//     position: absolute;
//     bottom: 20px;

//     width: 100%;
//     height: 130px;

//     border: 1px solid #ddd;
//     border-radius: 8px;

// `
// const Box2 = styled.div`
//     position: absolute;
//     bottom: ${(props) => props.bt};

//     margin: auto;

//     width: 100%;
//     height: 40px;

//     border-radius: ${(props) => props.br};
//     background: ${(props) => props.bg};
// `

const Wrap = styled.div`
      
      width: 95%;
      margin: auto;
      margin-top: 25px;
      position: relative;
      bottom: px;
      overflow-x: hidden;
    `;
const MessageForm = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  button {
    cursor: pointer;
  }
  .m_format {
    padding: 4px;
    background-color: #efefef;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    display: flex;
    button {
      height: 28px;
      width: 28px;
      padding: 2px;
      margin: 2px;
      color: #ccc;
      border-radius: 4px;
      border: none;
      background-color: transparent;
    }
    span {
      width: 1px;
      height: 20px;
      margin: 2px 4px;
      background-color: #ccc;
      align-self: center;
    }
  }
  .m_text {
    padding: 0px 10px;
    box-sizing: border-box;
    textarea {
      border: none;
      outline: none;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 10px;
      width: 97%;
      height: 30%;
      white-space: pre-line;
    }
  }
  .m_toolbar {
    padding: 4px 6px 4px 6px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      width: 24px;
      height: 24px;
      border-radius: 24px;
      outline: none;
      border: none;
      font-size: 20px;
    }
    .buttons {
      display: flex;
      align-items: center;
      flex-grow: 1;
      // flex-shrink: 1;
      // padding-left: 0;
      // padding-right: 0;
      span {
        width: 1px;
        height: 20px;
        margin: 2px 4px;
        background-color: #ccc;
        align-self: center;
      }
      button {
        font-size: 15px;
        height: 28px;
        width: 28px;
        padding: 2px;
        margin: 2px;
        border-radius: 4px;
        border: none;
        background-color: transparent;
      }
    }
    .submit {
      button {
        height: 28px;
        border-radius: 4px;
        padding: 2px 8px;
        width: 40px;
        font-size: 13px;
        background-color: #fff;
        color: #ccc;
        align-items: center;
        justify-content: center;
      }
      span {
        width: 1px;
        height: 20px;
        margin: 2px 4px;
        background-color: #ccc;
        align-self: center;
      }
    }
  }
`;
/* const Inputbox = styled.textarea`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 10px;
      width: 90%;
      height: 30%;
      white-space: pre-line;
    `; */
const Button2 = styled.button`
      padding: 3px;
      margin-bottom: 20px;
    `;
const UnderBar = styled.div`
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`

export default ChatInput