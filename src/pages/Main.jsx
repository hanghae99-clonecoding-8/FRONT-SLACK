import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getCookie } from '../shared/Cookie'
import { loadPostJson } from "../redux/modules/post";
import Post from '../components/Post'
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Header from '../components/Header';
import SideBar from '../components/SideBar';



const Main = () => {
  const dispatch = useDispatch();
  getCookie("token");
  const PostReducer = useSelector((state) => state.post.list);
  console.log(PostReducer);
  useEffect(() => {
    dispatch(loadPostJson());
  }, [dispatch]);

  
  return (

      <Box>
        <Header />
        <SideBar />
        {/* {PostReducer?.map((item, index) => {
        //console.log(PostReducer);
        return (
          <Cardbox key={index}>
              <Card item={item} />
          </Cardbox>
        );
       
      } 
      )}    
      <Post /> */}
      </Box>
  )
}

const Cardbox = styled.div`
  width: 70%;
  border-bottom: 0.5px solid grey;
  margin: 3px;
  padding: 16px;
  
`;

const Box = styled.div`
    overflow: hidden;
    background-image: url('https://www.itworld.co.kr/files/itworld/2020/12_01/slack_logo_with_background_by_mudassir_ali_cc0_via_pexels_2400x1600-100838404-large.jpg') ;
    background-size: 90%;
    background-position: 100% 70%;
    
`



export default Main