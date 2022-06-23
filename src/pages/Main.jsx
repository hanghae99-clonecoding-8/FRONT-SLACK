import React, { useEffect, useState, useRef } from 'react'
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
import { FaLock } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { FiLink } from "react-icons/fi";
import { GiGrapes } from "react-icons/gi";

import _ from "lodash";


const Main = () => {


  const dispatch = useDispatch();
  getCookie("token");
  const PostReducer = useSelector((state) => state.post.list);
  // console.log(PostReducer);

  const [postId, setPostId] = React.useState(null)
  const [scroll, setScroll] = React.useState()

  // console.log(postId)
  //const scrollRef = React.useRef();
  // const scollToMyRef = () => {
  //     const scroll =
  //     scrollRef.current.scrollHeight - scrollRef.current.clientHeight
  //     scrollRef.current.scrollTo(0, scroll);
  //   console.log(scrollRef.current.offsetBottom)
  // };
  const [modalOpen3, setModalOpen3] = React.useState(false);
  // const [modalOpen, setModalOpen] = React.useState(false);
  // // const openModal = () => {
  // //   modalOpen3(true);
  // // };


  const closeModal = () => {
    setModalOpen3(false);
  };

  // console.log(PostReducer.postId)
  useEffect(() => {
    dispatch(loadPostJson());
    return () => {
      // console.log("메인청소중")
    }
  }, [dispatch, modalOpen3]);

  // console.log(scrollRef)

  const boxRef = useRef(); // 채팅 박스 ref
  const scrollRef = useRef(); // 채팅 박스 맨 아래를 가르키는 ref
  const [scrollState, setScrollState] = useState(true); // 자동 스크롤 여부

  //스크롤 이벤트 함수------------------------------------------------------------------------------------------------
  const scrollEvent = _.debounce(() => {
    const scrollTop = boxRef.current.scrollTop; // 스크롤 위치
    const clientHeight = boxRef.current.clientHeight; // 요소의 높이
    const scrollHeight = boxRef.current.scrollHeight; // 스크롤의 높이

    // 스크롤이 맨 아래에 있는지 검사
    const scrollState = scrollTop + clientHeight >= scrollHeight;
    setScrollState(scrollState ? true : false);
  }, 100);

  //이전 메세지 기록 호출 및 스크롤 이벤트 연결------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (!boxRef.current) return;
    const _boxRef = boxRef.current;

    _boxRef.addEventListener("scroll", scrollEvent); // 채팅 박스 스크롤 이벤트
    return () => _boxRef.removeEventListener("scroll", scrollEvent);
  }, [boxRef]);

  //메세지 로딩 완료 및 신규 메세지 수신시 스크롤------------------------------------------------------------------------------------------------
  useEffect(() => {

    scrollState && (boxRef.current.scrollTop = boxRef.current.scrollHeight);
    // 신규 메세지 수신시 스크롤
  }, [PostReducer]);

  return (
    <Box>
      <Header />

      <Wrap>
        <div ><SideBar /></div>

        <CardList>
          <div style={{ display: "flex", alignItems: "center", borderBottom: "0.5px solid #bdbfc4" }}>
            <Topbox><FaLock
              style={{ marginRight: "8px" }}
            />_7기_a반_공지방
              <IoIosArrowDown style={{ marginLeft: "4px" }} />
              
            </Topbox>
            <img
              style={{
                marginLeft: "37vw",
                right: "0px", marginTop: "14px", height: "36px"
              }}
              src='https://ifh.cc/g/9VhVVh.png' />
          </div>
          <Topbar2 >
            <FiLink style={{ margin: "0 5px 0 15px" }} />
            <span> 항해99기 7기 A반 - Docs</span>
            <GiGrapes
              style={{ backgroundColor: "blue", color: "white", borderRadius: "3px", padding: "3px", margin: "0 5px 0 15px" }} />
            <span >A반 게더</span>
            <FiLink style={{ margin: "0 5px 0 15px" }} />
            <span style={{ margin: "0 20px 0 0" }}> 체크인 페이지</span>
            +
          </Topbar2>
          <Cardbar ref={boxRef}>
            {PostReducer?.map((item, index) => {
              //console.log(PostReducer);
              return (
                <Cardbox key={index} boxRef={boxRef}>
                  <Card item={item} setPostId={setPostId} setModalOpen3={setModalOpen3} />
                </Cardbox>
              );
            })}
            <div ref={scrollRef} />

            {/* <Detail open={modalOpen} close={closeModal} id={item.postId}/> */}
          </Cardbar>
          <Post />
        </CardList>
        {/* <DetailBox> */}
        <Detail close={closeModal} open={modalOpen3} postId={postId} />
        {/* </DetailBox> */}
      </Wrap>

    </Box>
  )
}

const Topbox = styled.h3`
  width: 200px;
  height: 40px;
  background-color: white;
  margin: 20px 0 0 20px;
`
const Topbar2 = styled.div`
display:flex   ;
flex-direction: row ;
align-items:center;
border-bottom:0.5px solid #bdbfc4;
 height:30px;
font-size: 12px;
`
const Cardbox = styled.div`
  background-color: white;
  width: calc(100% - 112px);
  border-bottom: 0.5px solid #bdbfc4;
  /* margin: 3px; */
  padding: 16px;
  display: block;
  overflow-x: hidden;
`;

const Cardbar = styled.div`
  overflow-y: scroll ;
  -ms-overflow-style:none;
  height: 700px;
`
const CardList = styled.div`
    flex: 15;
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