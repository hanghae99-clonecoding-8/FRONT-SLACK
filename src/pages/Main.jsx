import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getCookie } from '../shared/Cookie'
import { loadPostJson } from "../redux/modules/post";
import Post from '../components/Post'
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Chat from '../components/Chat';




const Main = () => {
  const dispatch = useDispatch();
  getCookie("token");
  const PostReducer = useSelector((state) => state.post.list);
  console.log(PostReducer);
  useEffect(() => {
    dispatch(loadPostJson());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Box>


        <SideBar />
        <ChatContainer>
         
        </ChatContainer>
        {/* {PostReducer?.map((item, index) => {
          //console.log(PostReducer);
          return (
            <>
              <Cardbox key={index}>
                <div>
                  {item.contents}
                </div>
              </Cardbox>
            </>
          );
        })}
        <Post /> */}
      </Box>
    </>
  )
}

const Cardbox = styled.div`
  width: 280px;
  height: 460px;
  border: 3px solid navy;
  border-radius: 5px;
  margin: 3px;
  padding: 16px;
  background-color: wheat;
`;

const Box = styled.div`
position: flex;
height: 100vh;
width: 100vw;
    overflow: hidden;
    background-image: url('https://www.itworld.co.kr/files/itworld/2020/12_01/slack_logo_with_background_by_mudassir_ali_cc0_via_pexels_2400x1600-100838404-large.jpg') ;
    background-size: 90%;
    background-position: 100% 70%;
    
`
const ChatContainer = styled.div`
  flex: 1;
  margin-top: 44px;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: space-between;
`;


export default Main