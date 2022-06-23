import React, { useEffect, useState } from 'react'
import Comments from '../components/Comments';
import apis from '../api/api'
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { loadCommentJson } from '../redux/modules/comments';
import {loadPostJson} from '../redux/modules/post';
import { useDispatch } from 'react-redux';
import DelPost from '../components/DelPost';
import { FiLock } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { deletePostJson } from '../redux/modules/post';


const Detail = (props) => {
  const { open, close, postId } = props;
// console.log(postId)

    const [Detail, setDetail] = useState(null);
    const [Comment,setComment] = useState(null)
    const [modalOpen, setModalOpen] = React.useState(false);
    const dispatch = useDispatch();
//  useEffect(()=>{
//   if(postId!=0){getDetailData()}
//   else{
//     setPostId(id)
//   } 
//     },[postId])
  

    
   const getDetailData = async() =>{
      const detailData =  await apis.getDetail(Number(postId))
                                     .catch(function(error){
                                      if(error.response){
                                        console.log("스읍기다려")
                                      }else if (error.request) {
                                        console.log("왜또도니");
                                      }
                                     })
      // setPostId(id)
      setDetail(detailData?.data)
      // console.log(Detail)
    }

 const getCommentdata = async () => {
      const commentData = await apis.getComments(Number(postId));
        // console.log(commentData);
      dispatch(loadCommentJson(Number(postId)));
      setComment(commentData?.data);
    };
    // const loadposts = async() =>{
    //   const postData = await apis.getPosts()
    //   dispatch(loadPostJson())
    // }
    // const navigate = useNavigate();
useEffect(()=>{
    //  dispatch(loadPostJson());
    // loadposts()
    getDetailData()
    getCommentdata()
    // console.log("디테일페이지도는중")
    return()=>{
      // console.log("청소중")
    }
  },[close])
 


   

    const openModal = () => {
      setModalOpen(true);
    };
    const closeModal = () => {
      setModalOpen(false);
    };
    const closeModal2 = () =>{
      setModalOpen(false);
      // console.log(modalOpen)
      dispatch(deletePostJson(postId))
       dispatch(loadPostJson())
       close()
    }

   


  return (
   <>
   {open ? (
     <Wrap>
     {/* <div>{Detail.nickname}</div>
     <img src={Detail.profileUrl}/>
     <div>{Detail.contents}</div>
     <div>{Detail?.contents}</div> */}

     <Headbar>
      <h1 style={{fontSize:"23px"}}>스레드</h1>
      <div style={{fontSize:"15px",fontWeight:"500", margin:"18px 0 5px 20px", color:"grey"}}>
        <FiLock style={{margin:"1px 6px 0 0"}}/>_7기_a반_잡담방</div>
     <button style={{right:"1%",top:"5.6%", position:"absolute", border:"none", backgroundColor:"white",fontWeight:"bold", fontSize:"15px",}}
     onClick={close}>X</button>
     </Headbar>

      <DetailWarp>
      <InnerWrap>
      <Imgbox>
      {/* <Image className="text_photo" src='https://ca.slack-edge.com/T01L2TNGW3T-U03DL8GEU0G-dc38fbbc5656-512' /> */}
      <Image className="text_photo" src={`${Detail?.profileUrl}`} />
      </Imgbox>
      <TextArea>
        <Toptext>
        {/* <Nickname>최경식(항해99 매니저)</Nickname>
        <CreateAt> 오전 8:30 </CreateAt> */}
         <Nickname>{Detail?.nickname}</Nickname>
         <Nickname>({Detail?.username})</Nickname>
        <CreateAt>{Detail?.createdAt.split("T")[0]}</CreateAt>
         <DelButton onClick={openModal}><MdDelete/></DelButton>
        </Toptext>
        <Title>{Detail?.contents}</Title>
      {/* <Title>{Detail?.comment}</Title> */}
      </TextArea>
      </InnerWrap>
      </DetailWarp>
    
     <DelPost open={modalOpen} close={closeModal} id={Number(postId)} 
     close2={closeModal2}
     header="메세지 삭제"/>
     <CommentWrap2><Comments id={Detail?.postId}/></CommentWrap2>
    
     </Wrap>
   ):null}
   </>
  )
}

const Wrap = styled.div`
display: flex;
flex-direction: column;
width: 30vw;
padding-left: 10px;
`
const Headbar = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #bdbfc4;
  padding:0px 10px ;
`

const DelButton = styled.div`
  cursor: pointer;
font-size: 20px;
font-weight: bold;
margin-left: 10.5vw;

`

const DetailWarp = styled.div`
  height: 20vh;

`

const CommentWrap = styled.div`
/* width: 29vw; */
height: 46vh;
overflow-y: scroll;
-ms-overflow-style: none;

`
const InnerWrap = styled.div`
display: flex;
padding-top: 10px;
`
const Nickname =styled.div`
  font-weight: bolder;
  font-size: 1em;
  
`
const CreateAt =styled.span`
  font-size: 0.7em;
  margin: 0 0 0 13px;
`
const Toptext =styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 7px;
`
const Title = styled.pre`
  font-weight: 400;
  font-size: 1em;
`;
const Imgbox =styled.span`
  flex: 1;
  
`
const Image = styled.img`
  flex: 1;
  width: 40px;
  height: 40px;
  border-radius: 9px;
`;
const TextArea = styled.span`
flex: 10;
text-align: left;
`

const CommentWrap2 = styled.div`
border-top: 1px solid #8f9092;
`

export default Detail