import React from 'react'
import styled from "styled-components";
import { GoChevronDown } from "react-icons/go";
import { SettingsPowerRounded } from '@mui/icons-material';

import Grid2 from "../elements/Grid2";
import Text from "../elements/Text";

import ChatMessageBox from "./ChatMessageBox";
import Modal from "react-modal";

import { getAllUserDB } from "../redux/modules/chat";
import { useDispatch, useSelector } from "react-redux";
import { inviteUserDB } from "../redux/modules/chat";
import { useParams } from "react-router-dom";


const ChatRoomBox = () => {
  const dispatch = useDispatch();

  //
  const [isOpen, setIsOpen] = React.useState(false);
  const openModal = () => {
    SettingsPowerRounded(true);
  }

  const userName = React.useRef(null);
//getAllUserDb로 가져옴
  const user_list = useSelector((state) => state.chat?.user_list)

  const roomName = useSelector((state) => state.chat?.room?.roomName);
  
  const username = useSelector((state) => state.user?.user?.username);
  //쿠키로받아오자 아라찌?
  const roomId = useParams();

  console.log(username)


  // console.log("ChatRoomBox : user_list", user_list);

  const email = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;


  //유저초대 조건
  const inviteUser = () => {
    // console.log("ChatRoom : userName", userName.current.value);
    if (userName.current.value === "") {
      userName.current.value = "";
      return window.alert("사용자 아이디를 입력해주세요!")
    }
    if (!email.test(userName.current.value)) {
      userName.current.value = "";
      return window.alert("이메일 형식의 아이디를 입력해주세요.")
    }
    if (userName.current.value === username) {
      userName.current.value = "";
      return window.alert("본인은 초대할 수 없습니다")
    }

    // console.log(roomId.roomid)

    dispatch(inviteUserDB(roomId.roomid, userName.current.value));
    setIsOpen(false);
  }

  React.useEffect(() => {
    dispatch(getAllUserDB())
  }, [])



  return (
    <React.Fragment>
      <ChatBox>

        <ChatRoomHeader>
          <Text bold margin="0 20px" size="1.2em">
            # {roomName}
            <GoChevronDown size="15px" />
          </Text>
          <AddBtn onClick={openModal}>초대하기</AddBtn>
        </ChatRoomHeader>

        <ChatMessageBox />

        <Modal
          isOpen={isOpen}
          ariaHideApp={false}
          onRequestClose={() => setIsOpen(false)}
          style={{
            overlay: {
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.75)'
            },
            content: {
              position: 'absolute', margin: 'auto', width: 'fit-content', height: 'fit-content', background: '#fff',
              overflow: 'auto', borderRadius: '10px', WebkitOverflowScrolling: 'touch', outline: 'none',
            }
          }}>

          <ModalBox>
            <Text bold margin="0" size="1.5em"># 사용자 추가</Text>
            <ModalInput placeholder=" 예: user@aaa.com " ref={userName} />
            <Grid2>
              <ModalBtn onClick={inviteUser}>추가</ModalBtn>
            </Grid2>
            <Text bold size="1.2em"># 사용자 목록</Text>
            {user_list?.map((user, idx) => {
              return (
                <Text key={user.id}>- {user?.nickname} ({user?.username})</Text>
              );
            })}
          </ModalBox>

        </Modal>

      </ChatBox>
    </React.Fragment>
  );
}

const ChatBox = styled.div`

    width: 100%;
    height: 100%;
    max-height: 100vh;

    background: #fff;
`
const ChatRoomHeader = styled.div`
  position: relative;

  display: flex;
  width: 100%;
  height: 50px;
  line-height: 50px;

  border-bottom: 1px solid #ddd;
`
const ModalBox = styled.div`
    position: relative;
    margin-bottom : 40px;

    padding: 10px;
    width: 470px;
    height: fit-content;
`
const AddBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 20px;

  width: 70px;
  height: 25px;

  border: none;
  border-radius: 50px;

  background: #007a5a;

  font-size: 0.7em;
  font-weight: 800;
  color: #fff;
  &:hover { 
    background: #449E79;
  }  
`
const ModalInput = styled.input`
    font-family: 'Pretendard-Regular';
    
    box-sizing: border-box;
    margin: 25px 0;
    padding: 0 10px;

    width: 100%;
    height: 40px;
    
    font-size: 1em;
    border: 1px solid #bababa;
    border-radius: 5px;

    transition: 0.05s;
    &:focus {
        border: 1px solid #1264a3;
        outline: 4px solid #bae1f1;
    }
`
const ModalBtn = styled.button`
    
    font-family: 'Pretendard-Regular';
    font-weight: 700;
    font-size: 0.9em;

    position: absolute;
    right: 10px;
    bottom: -30px;

    width: 80px;
    height: 35px;

    border: none;
    border-radius: 5px;

    background: #ddd;
    
    &:hover {
      background: #007a5a;
      color: #fff
    }
`

export default ChatRoomBox