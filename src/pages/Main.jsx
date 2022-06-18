import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getCookie } from '../shared/Cookie'
import { loadPostJson } from "../redux/modules/post";
import Post from '../components/Post'



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
            <div>
              {item.contents}
            </div>
          </Cardbox>
        );
      })}

      <Post />
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



export default Main