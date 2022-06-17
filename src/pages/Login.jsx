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

  //로그인 onclick
  const loginClick = async () => {
    try {
      const response = await apis.postLogin(
 
      {
        username: emailRef.current.value,
        password: passwordRef.current.value
      }
    )
      setCookie("token", response.headers.authorization.split(" ")[1])  


      alert("환영합니다")
      navigate("/")
    }
    catch (err) {
      alert("아이디와 비밀번호를 확인해주세요")
    }
  }


  return (
    <>
    <div className={open ? 'openModal modal' : 'modal'}>
      <Link to='/'><div>homebutton</div></Link>
      {open?(
       <section>
      <header>
        {header}
      <button className="close" onClick={close}>
              &times;
            </button>
      </header>
      <main>
      <input
        type="email"
        placeholder="Email"
        ref={emailRef}
      />
      <input
        type="password"
        placeholder="Password"
        ref={passwordRef}
      />
      <button onClick={loginClick}>로그인</button>
      <div>소셜 로그인</div>
      <div>카카오톡</div>
      </main>
      <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
      </section>
      ):null}
     
    </div>
    </>
  )
}

export default Login