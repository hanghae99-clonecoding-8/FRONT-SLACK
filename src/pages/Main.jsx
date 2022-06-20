import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getCookie } from '../shared/Cookie'
import { loadPostJson } from "../redux/modules/post";
import Post from '../components/Post'
import { Link } from 'react-router-dom';
import Card from '../components/Card';



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
      {PostReducer?.map((item, index) => {
        //console.log(PostReducer);
        return (
          <Cardbox key={index}>
              <Card item={item} />
          </Cardbox>
        );
       
      } 
      )}

      <Post />
    </>
  )
}

const Cardbox = styled.div`
  width: 70%;
  border-bottom: 0.5px solid grey;
  margin: 3px;
  padding: 16px;
  
`;



export default Main