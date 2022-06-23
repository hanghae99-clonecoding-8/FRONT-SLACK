import React from "react";
import styled from "styled-components";
import { FiEdit } from "react-icons/fi";
import Grid2 from "../elements/Grid2";
import Button from "../elements/Button";
import Text from "../elements/Text";
import { useNavigate, useParams, Link } from "react-router-dom";
import { GoChevronDown, GoTriangleDown } from "react-icons/go";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoChatbubblesOutline } from "react-icons/io5";
import { IoAtOutline } from "react-icons/io5";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FiLock } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addChatRoomDB, enterChatRoom, enterChatRoomDB, getChatRoomDB } from "../redux/modules/chat";
import Modal from "react-modal";
import apis from "../api/api";

const SideBar = () => {
    const id = useParams();
    // const ChatRoom = React.useSelector((state) => state.chat?.list);
    const roomNameRef = React.useRef(null);
    const dispatch = useDispatch();
    const ChatRoom = useSelector((state) => state.chat?.list);
    // console.log("ChatList : id", id)
    const [isOpen, setIsOpen] = React.useState(false);
    const navigate = useNavigate()

    //챗방생성
  const roomCreate = async() => {
    const roomName = roomNameRef.current.value;
    if(roomName==="") {
      window.alert("채널 이름을 입력해주세요!")
      return;
    }
    // if()
    // console.log("AddChatModal : roomCreate : roomName", roomName);
    dispatch(addChatRoomDB(roomName)); 
  }

  React.useEffect(() => {
    dispatch(getChatRoomDB());
  }, [dispatch])


    return (
        <>
            <ListBox>
                <ListElement height="50px" border="#522653">
                    <Grid2 is_flex>
                        <Text margin="0 10px" bold size="1.2em" color="#fff">HangHae99<GoChevronDown size="15px" /> </Text>
                        <Button writeBtn>
                            <FiEdit size="18px" color="#3F0E40" />
                        </Button>
                    </Grid2>
                </ListElement >

                <PBList border="#522653">
                    <ListElement height="30px" >
                        <Text margin="0 15px" size="1em" color="#A6A6BC"><IoChatbubbleEllipsesOutline size="15px" /> 스레드</Text>
                    </ListElement>
                    <ListElement height="30px" >
                        <Text margin="0 15px" size="1em" color="#A6A6BC"><IoChatbubblesOutline size="15px" /> 다이렉트 메시지</Text>
                    </ListElement>
                    <ListElement height="30px" >
                        <Text margin="0 15px" size="1em" color="#A6A6BC"><IoAtOutline size="15px" /> 멘션 및 반응</Text>
                    </ListElement>
                    <ListElement height="30px" >
                        <Text margin="0 15px" size="1em" color="#A6A6BC"><HiOutlineOfficeBuilding size="15px" /> Slack Connect</Text>
                    </ListElement>
                    <ListElement height="30px" >
                        <Text margin="0 15px" size="1em" color="#A6A6BC"><BiDotsVerticalRounded size="15px" /> 더 보기</Text>
                    </ListElement>
                </PBList>

                <ListElement height="30px">
                    <Text margin="0 15px" size="1em" color="#A6A6BC"><FiLock size="13px" />　채널</Text>
                </ListElement>

                <ListElement height="30px" bg="#350D36" >
                    <Grid2 is_flex margin="0 20px" >
                     <Link to = "/main" style={{borderBottom:"0", textDecoration:"none"}}>  
                      <Text margin=" 40px" size="1em" color="#A6A6BC" >
                            <Button addBtn >+</Button>_7기_a반_공지방</Text></Link>
                    </Grid2>
                </ListElement>

                <ListElement height="30px">
                    <Text margin="0 15px" size="1em" color="#A6A6BC"><GoTriangleDown size="13px" />　다이렉트 메세지</Text>
                </ListElement>

                <ListElement height="30px" bg="#350D36" onClick={() => setIsOpen(true)}>
                    <Grid2 is_flex margin="0 20px" >
                        <Text margin=" 40px" size="1em" color="#A6A6BC">
                            <Button 
                            addBtn style={{cursur:"pointer"}}>+</Button>채널 추가</Text>
                    </Grid2>
                </ListElement>
                {ChatRoom?.map((room) => {
                    return (
                        <ListElement key={room.id} height="30px" onClick={() => { 
                          // console.log(room.id)
                          apis.enterRoom(room.id)
                          .then((response) => {
                            dispatch(enterChatRoomDB(response) )
                            // console.log("enterRoomDB : response", response);
                              navigate(`/chat/${Number(room.id)}`)
                          //   history.push(`/chat/`+response.data.id); 
                          }).catch((error) => {
                            console.log("enterRoomDB : error.response", error.response);
                          })}}>
                        <Grid2 margin="0 20px">
                            <Text margin="0 15px" size="1em" color="#A6A6BC">#　{room.chatRoomName}</Text>
                        </Grid2>
                        </ListElement>
                    );
                    })}
                    {isOpen? <Modal
          isOpen={isOpen} ariaHideApp={false} onRequestClose={() => setIsOpen(false)}
          style={{
            overlay: {
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.75)'
            },
            content: { position: 'absolute', margin: 'auto', width: 'fit-content', height: 'fit-content', background: '#fff',
              overflow: 'auto', WebkitOverflowScrolling: 'touch', outline: 'none',
            }}}>

          <ModalBox>
            <Text bold margin="0" size="1.8em">채널 생성</Text>
            <Text color="#858485" > 채널은 팀이 소통하는 공간입니다. 채널은 주제(예:마케팅)를 중심으로 구성하는 것이 가장 좋습니다.</Text>
            <Grid2 height="fit-content">
              <Text bold margin="10px 0">이름</Text>
              <ModalInput ref={roomNameRef} />
            </Grid2>
            <Grid2 padding="15px 0" height="fit-content">
              <Text bold margin="10px 0">설명(옵션)</Text>
              <ModalInput />
              <Text color="#858485" margin="5px 0" size="0.9em">무엇에 대한 채널인가요?</Text>
            </Grid2>
            <Grid2 is_flex height="fit-content">
              <Grid2 margin="10px 0" width="300px">
                <Text bold margin="0">비공개로 만들기</Text>
                <Text margin="5px 0">채널이 비공개로 설정된 경우 초대를 통해서만 조회 또는 참여할 수 있습니다.</Text>
              </Grid2>
              <Grid2 width="130px" />
              <Grid2 width="fit-content">
                <Button toggleBtn />
              </Grid2>
              <ModalBtn
                onClick={() => {
                  roomCreate()
                }} >
                생성
              </ModalBtn>
            </Grid2>
          </ModalBox>
        </Modal> : null }
            </ListBox>


        </>
    );
}

const ListBox = styled.div`

    overflow: hidden;
   
    width: 260px;
    height: calc(100vh - 40px);

    background: #3F0E40;
    
`
const PBList = styled.div`
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    background: ${(props) => props.bg};
    ${(props) => (props.height ? `height: ${props.height};` : "")};
    ${(props) => (props.height ? `line-height: ${props.height};` : "")};
    ${(props) => (props.border ? `border: 1px solid ${props.border};` : "")};
`
const ListElement = styled.div`
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    background: ${(props) => props.bg};
    ${(props) => (props.height ? `height: ${props.height};` : "")};
    ${(props) => (props.height ? `line-height: ${props.height};` : "")};
    ${(props) => (props.border ? `border: 1px solid ${props.border};` : "")};
    &:hover {
        background: #350D36;
    }
`

const ModalBox = styled.div`
    position: relative;

    padding: 30px;
    width: 470px;
    height: 450px;

    border-radius: 10px;
`
const ModalInput = styled.input`
    box-sizing: border-box;
    padding: 0 10px;
    width: 100%;
    height: 40px;
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
    right: 30px;
    bottom: 30px;
    
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

export default SideBar;