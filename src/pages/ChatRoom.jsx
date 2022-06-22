import React from 'react'
import styled from "styled-components";

import Header from '../components/Header';
import SideBar from '../components/SideBar';
import ChatRoomBox from '../components/ChatRoomBox';
import Grid2 from "../elements/Grid2";

const ChatRoom = () => {
  return (
    <>
    <Box>
                <Grid2 bg="#fff" height="100vh">
                    <Header />
                    <Grid2 is_flex>
                        <Grid2 width="260">
                            <SideBar/>
                        </Grid2>
                        <ChatRoomBox />
                    </Grid2>
                </Grid2>
            </Box>
    </>
  )
}

const Box = styled.div`
    overflow: hidden;  
    position: flex;
    /* background: #3F0E40; */
`

export default ChatRoom