import React from 'react'
import {Link} from 'react-router-dom'
import Login from './Login';
import styled from 'styled-components'
import SignUp from './Signup';
import '../css/modal.css';



const Home = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalOpen2, setModalOpen2] = React.useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const openModal2 = () => {
    setModalOpen2(true);
  };
  const closeModal2 = () => {
    setModalOpen2(false);
  };
  return (
    <Background>
       <Topbar src="https://ifh.cc/g/FN87rg.png"/>
       <Mainbutton onClick={openModal}><div>이메일로 로그인해 보세요</div></Mainbutton>
       <Login open={modalOpen} close={closeModal} header="로그인"/>
        
      <Bottom>
      <span>팀이 sleep을 처음 사용하나요?</span>
      <span onClick={openModal2}><span style={{textDecoration:"underline", marginLeft:"5px",  cursor: "pointer"}}>새 계정 개설</span></span>
     
      </Bottom>
       <SignUp open={modalOpen2} close={closeModal2} header="회원가입"
      />
      <Undertext>웹 브라우저에서 로그인 하면 여기로 다시 이동합니다.</Undertext>

      <Img2 src="https://ifh.cc/g/WWsml4.png"></Img2>
      <Title>Sleep은 어디에 있든 팀을 하나로</Title>
      <Img src='https://ifh.cc/g/n9s83T.png'/>

    </Background>
  )
}





const Background = styled.div`
  background-color: rgb(74,21,75);
  width: 100vw;
  height: 100vh;
`
const Topbar =styled.img`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
`

const Mainbutton =styled.button`
  position: fixed;
  bottom: 41%;
  right: 62%;
  background-color: rgb(0,122,90);
  border: none;
  font-size: 18px;
  font-weight: 700;
  border-radius: 3px ;
  color: white;
  width: 17%;
  height: 5%;
  cursor: pointer;
`
const Undertext = styled.div`
  color: white;
  position: fixed;
  font-size: 14px;
  bottom: 37%;
  right: 55%;
  width: 24%;
`

const Bottom =styled.div`
  color: white;
  font-size: 14px;
  position: fixed;
  bottom: 4.5%;
 left: 21%;
  
`

const Img = styled.img`
  position: fixed;
  bottom: 16%;
  right: 5%;
  width: 44%;
  height: 7;
  z-index: 0;
`
const Img2 = styled.img`
  position: fixed;
  bottom: 65%;
  right: 69.5%;
  width: 10%;
  height: 7;
  /* width: 160px; */
  
`
const Title = styled.div`
  font-size: 45px;
  color: white;
  font-weight: 600;
  width: 410px;
  /* width: 23%; */
  height: 13%;
  position: fixed;
  bottom: 50%;
  left: 20.9%;
  text-align: left;
`

export default Home