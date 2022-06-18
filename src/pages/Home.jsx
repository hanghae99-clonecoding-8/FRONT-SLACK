import React from 'react'
import { Link } from 'react-router-dom'
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
      <button onClick={openModal}><div>login</div></button>
      <Login open={modalOpen} close={closeModal} header="로그인" />
      <div>
        <button onClick={openModal2}><div>signup</div></button>
        <SignUp open={modalOpen2} close={closeModal2} header="회원가입" />
      </div>
      <Sleep>

        <Img2 src="https://ifh.cc/g/KHJTRC.png"></Img2>
        <Title>Sleep은 어디에 있든 팀을 하나로</Title>
        <Img src='https://ifh.cc/g/n9s83T.png' />
      </Sleep>
      <Link to = '/Main'>
        <button>main</button>
      </Link>

    </Background>
  )
}


const Background = styled.div`
  background-color: rgb(74,21,75);
  width: 100vw;
  height: 100vh;
`
const Sleep = styled.div`
  position: fixed;
  bottom: 60%;
  right: 60%;
`
const Img = styled.img`
  position: fixed;
  bottom: 10%;
  right: 5%;

  width: 44%;
  height: 7;
`
const Img2 = styled.img`
  
  width: 44%;
  height: 7;
  width: 300px;
`
const Title = styled.div`
  font-size: 45px;
  color: white;
  font-weight: 600;
  width: 450px;
  position: fixed;
  bottom: 50%;
  right: 50%;
`

export default Home