import React from 'react'
import styled from "styled-components";

import Header from '../components/Header';
import SideBar from '../components/SideBar';
import ChatRoomBox from '../components/ChatRoomBox';

const ChatRoom = () => {
  return (
    <>
    <Box>
      <Header/>
      <SideBar/>
      <ChatRoomBox/>
    </Box>
    </>
  )
}

const Box = styled.div`
    overflow: hidden;  
    background: #3F0E40;
`

export default ChatRoom