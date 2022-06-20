import React, { useEffect, useState } from 'react'
import Comments from '../components/Comments';
import apis from '../api/api'
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { loadCommentJson } from '../redux/modules/comments';
import { deletePostJson } from '../redux/modules/post';
import { useDispatch } from 'react-redux';
import DelPost from '../components/DelPost';




const Detail = () => {
    let {id} =useParams();

    const [Detail, setDetail] = useState(null);
    const [Comment,setComment] = useState(null)
    const [modalOpen, setModalOpen] = React.useState(false);
    const [showBanner, setshowBanner] = useState(true);
    const onClick = () => setshowBanner(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getDetailData = async() =>{
      const detailData =  await apis.getDetail(id)
      setDetail(detailData)
      console.log(Detail)
    }

    const openModal = () => {
      setModalOpen(true);
    };
    const closeModal = () => {
      setModalOpen(false);
    };

    useEffect(()=>{
      getDetailData();
    },[dispatch])


  return (
   <>
   {showBanner ? (
     <Wrap>
     {/* <div>{Detail.nickname}</div>
     <img src={Detail.profileUrl}/>
     <div>{Detail.contents}</div>
     <div>{Detail?.contents}</div> */}
     <Headbar>
      <h1 style={{fontSize:"23px"}}>스레드</h1>
      <div style={{fontSize:"15px",fontWeight:"500", margin:"18px 0 5px 20px", color:"grey"}}>_7기_a반_잡담방</div>
     <button style={{right:"1%",top:"5.6%", position:"absolute", border:"none", backgroundColor:"white",fontWeight:"bold", fontSize:"15px",}}
     onClick={onClick}>X</button>
     </Headbar>
      <DetailWarp>
      <div>왜못읽지</div>
      <div>왜못읽지</div>
      <div>왜못읽지</div>
      <div>왜못읽지</div>
      <div>왜못읽지</div>
      </DetailWarp>
      
     <button onClick={openModal}>삭제하기</button>
     <DelPost open={modalOpen} close={closeModal} id={id} header="메세지 삭제"/>
     <CommentWrap><Comments id={Detail?.id}/></CommentWrap>
    
     </Wrap>
   ):null}
   </>
  )
}

const Wrap = styled.div`
display: flex;
flex-direction: column;
width: 30vw;
`
const Headbar = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid grey;
  padding:0px 10px ;
`

const DetailWarp = styled.div`
  height: 20vh;

`

const CommentWrap = styled.div`
  height: calc(100% - 50vh);
`

export default Detail