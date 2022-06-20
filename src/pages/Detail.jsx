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
      <div>왜못읽지</div>
      <button onClick={onClick}>X</button>
     <button onClick={openModal}>삭제하기</button>
     <DelPost open={modalOpen} close={closeModal} id={id} header="메세지 삭제"/>
     <div><Comments id={Detail?.id}/></div>
     
     </Wrap>
   ):null}
   </>
  )
}

const Wrap = styled.div`
display: flex;
flex-direction: column;
`

export default Detail