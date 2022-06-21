import React, { useRef } from 'react'
//router
import { Link, useNavigate } from 'react-router-dom'
//redux
import { useDispatch } from 'react-redux'
//cookie
import { setCookie } from "../shared/Cookie"
//css
import styled from 'styled-components'
import "../css/modal.css"
//middleware
import apis from '../api/api'

const Login = (props) => {
  const { open, close, header } = props;
  //hook

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //ref
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
// console.log(emailRef)
  //로그인 onclick
  const loginClick = async () => {
    try {
      const response = await apis.postLogin(
 
      {
        username: emailRef.current.value,
        password: passwordRef.current.value
      }
    )

  console.log(response)
      setCookie("token", response.headers.authorization.split(" ")[1])  
      setCookie("nickname",response.headers.nickname)
      setCookie("profileUrl",response.headers.profileurl)
console.log(response)
      alert("환영합니다")
      navigate("/main")
    }
    catch (err) {
      alert("아이디와 비밀번호를 확인해주세요")
    }
  }


  return (
    <>
    <div className={open ? 'openModal modal' : 'modal'}>
      {open?(
       <section>
      <header>
        {header}
      <button className="close" onClick={close}>
              &times;
            </button>
      </header>
      <main>
      <Inputbox
        type="email"
        placeholder="Email"
        ref={emailRef}
      />
      <Inputbox
        type="password"
        placeholder="Password"
        ref={passwordRef}
        style={{marginBottom:"20px"}}
      />
      <LoginButton onClick={loginClick}>로그인</LoginButton>
      {/* <div>소셜 로그인</div>
      <div>카카오톡</div> */}
      </main>
      <footer>
            <button className="close" onClick={close} style={{backgroundColor:"rgb(74,21,75)"}}>
              close
            </button>
          </footer>
      </section>
      ):null}
     
    </div>
    </>
  )
}


const Inputbox = styled.input`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin:15px auto;
  width: 55%;
  height: 40px;
  border: none;
  border-bottom: solid #bdbfc4 1px;
`

const LoginButton = styled.button`
  padding: 10px;
  display: flex;
  margin: 0  auto 8px auto;
  width: 80px;
  justify-content: center;
  background-color: rgb(74,21,75);
  font-size: 15px;
  color: white;
  border-radius: 5px;

`
export default Login