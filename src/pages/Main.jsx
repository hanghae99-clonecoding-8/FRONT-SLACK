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
import Detail from './Detail';





const Main = () => {


  const dispatch = useDispatch();
  getCookie("token");
  const PostReducer = useSelector((state) => state.post.list);
  console.log(PostReducer);

  const [postId,setPostId] = React.useState()

  const scrollRef = React.useRef();
  const scollToMyRef = () => {
    const scroll =
      scrollRef.current.scrollHeight - scrollRef.current.clientHeight
      scrollRef.current.scrollTo(0, scroll);
    console.log(scrollRef.current.clientHeight)
  };
  
  const [modalOpen, setModalOpen] = React.useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  
console.log(PostReducer.postId)
  useEffect(() => {
    scollToMyRef();
    dispatch(loadPostJson());
  }, [dispatch]);

  // console.log(scrollRef)
  return (

      <Box>
        <Header />
          <Wrap>
            <div ><SideBar /></div>
              <CardList>
                <Cardbar ref={scrollRef}>
                     {PostReducer?.map((item, index) => {
                    //console.log(PostReducer);
                    return (
                      <>
                      <Cardbox key={index}  >
                          <Card  item={item} setPostId={setPostId}/>
                      </Cardbox>
                      
                        </>
                    ); } )} 
                       {/* <Detail open={modalOpen} close={closeModal} id={item.postId}/> */}
                </Cardbar>
                       <Post  scrollRef={scrollRef} />    
              </CardList>
             {/* <DetailBox> */}
            <Detail close={closeModal} open={modalOpen} id={postId}/>
              {/* </DetailBox> */}
          </Wrap>
     
     
      </Box>
  )
}

const Cardbox = styled.div`
  background-color: white;
  width: calc(100% - 32px);
  border-bottom: 0.5px solid grey;
  /* margin: 3px; */
  padding: 16px;
  display: block;
  overflow-x: hidden;
`;

const Cardbar = styled.div`
  overflow-y: scroll ;
  height: 750px;
`
const CardList = styled.div`
    flex: 13;
    display: block;
    flex-direction: column;
    padding: 0 0.5%;
`

const Box = styled.div`
position: flex;
height: 100vh;
width: 100vw;
    overflow: hidden;
    /* background-image: url('https://www.itworld.co.kr/files/itworld/2020/12_01/slack_logo_with_background_by_mudassir_ali_cc0_via_pexels_2400x1600-100838404-large.jpg') ; */
    /* background-size: 90%; */
    background-position: 100% 70%;
    
`
const Wrap = styled.div`
  display: flex;  
`
// const DetailBox = styled.div`
//   flex: 3;  
// `


export default Main