import React, { useRef } from 'react'
//router
import { Link, useNavigate } from 'react-router-dom'
//redux
import { useDispatch } from 'react-redux'
//cookie
import { setCookie } from "../shared/Cookie"
//css
import styled from 'styled-components'
//middleware
import apis from '../api/api'

const Login = () => {
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
          username: "email",
          password: "1234"
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
      <Link to='/'><div>homebutton</div></Link>
      <div>로그인 페이지</div>
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

    </>
  )
}

export default Login