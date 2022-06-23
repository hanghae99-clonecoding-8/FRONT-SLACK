import React from "react";
import styled from "styled-components";

import { useParams } from "react-router-dom";
import Grid from "../elements/Grid2";
import { IoSearch } from "react-icons/io5";
import { BiTime } from "react-icons/bi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import { BsSliders } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { getCookie } from "../shared/Cookie";

import { addChatRoomDB } from "../redux/modules/chat";

import Profile from "./Profile";
import { useDispatch } from "react-redux";


const Header = () => {
  const profileUrl = getCookie("profileUrl")
  // const nickname = getCookie("nickname")
  const username = getCookie("username")
  const nickname = getCookie("nickname")
  const [modalOpen, setModalOpen] = React.useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const profileImg = profileUrl.split("profileimages/")[0]+ "profileimages%2F"+ profileUrl.split("profileimages/")[1]


    return (
        <>
            <HeaderBox>
                <Grid margin="auto" width="680px" is_flex>
                    <OuterBox>
                        <AiOutlineArrowLeft className="icon3" color="#fff" size="20px" />
                        <AiOutlineArrowRight className="icon4" color="#fff" size="20px" />
                        <AiOutlineMenu className="icon5" color="#fff" size="20px" />
                        <BiTime className="icon1" color="#fff" size="20px" />
                        <IoSearch className="icon2" color="#fff" size="20px" />
                        <InputBox placeholder="새 워크스페이스 검색"></InputBox>
                        <BsSliders className="icon6" color="#fff" size="20px" />
                       
                        <AiOutlineSearch className="icon7" color="#fff" size="20px" />
                    </OuterBox>
                     <ImageBox2 src={profileImg} onClick={openModal}/>
                    <Profile open={modalOpen} close={closeModal} header="프로필" profileImg={profileImg} username={username} nickname={nickname} />
                    <ImageBox />
                    
                    
                </Grid>

            </HeaderBox>
        </>
    );
}

const HeaderBox = styled.div`
    width: 100%;
    height: 40px; 
    background: #350D36;
`

const OuterBox = styled.div`
  display: flex;
  position: relative;  
  margin: auto;

  width: 70vw;
  height: 30px;

  .icon1 {
    position: absolute;
    top: 4px;
    left: -30px;
    }
  .icon2 {
    position: absolute;
    top: 4px;
    right: 0px;
    border: 3px solid black;
    }
  .icon3 {
    position: absolute;
    top: 4px;
    left: -140px;
    }
    .icon4 {
    position: absolute;
    top: 4px;
    left: -100px;
    }
    .icon5 {
    position: absolute;
    top: 4px;
    left: -600px;
    }
    .icon6 {
    position: absolute;
    top: 4px;
    left: 620px;
    }
    .icon7 {
    position: absolute;
    top: 4px;
    left: 650px;
    }


`

const InputBox = styled.input`
  font-family: 'Pretendard-Regular';
  position: absolute;

  top: 1px;
  left: 0px;
  right: 0px;

  padding: 0 10px;
  height: 28px;

  border: none;
  border-radius: 5px;

  background: #5d3d5e;

  color: #fff;
  &::placeholder {
    color: #fff;
    font-weight: 800;
  }
  &:hover {
    background-color: #6f5170;
  }
  &:focus {
    outline: none;
  }
`

const ImageBox2 = styled.img`
  position: absolute;
  right: 80px;

  width: 40px;
  height: 40px;

  border-radius: 4px;



  ${'' /* background: #ddd; */}
`

const ImageBox = styled.div`
  position: absolute;
  right: 20px;

  width: 40px;
  height: 40px;

  border-radius: 4px;

  background-image: url('https://ifh.cc/g/hvhy7n.png');
  background-size: cover;
  ${'' /* background: #ddd; */}
`

export default Header;
