import React from 'react'
import {Link} from 'react-router-dom'
import Login from './Login';
import styled from 'styled-components'
import SignUp from './Signup';



const Home = () => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <Background>
       <button onClick={openModal}><div>login</div></button>
       <Login open={modalOpen} close={closeModal} header="로그인"/>
     <div>
      <button onClick={openModal}><div>signup</div></button>
      <SignUp open={modalOpen} close={closeModal} header="회원가입"/>
</div>

       <Link to="/main"><button>main</button></Link>
      {/* <Link to="/signup"><button>signup</button></Link>  */}
      <Img src='https://ifh.cc/g/n9s83T.png'/>
    </Background>
  )
}


const Background = styled.div`
  background-color: rgb(74,21,75);
  width: 100vw;
  height: 100vh;
`
const Img = styled.img`
  position: fixed;
  bottom: 10%;
  right: 5%;

  
`
export default Home