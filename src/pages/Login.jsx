import React from 'react'
import apis from '../api/api'
import { Link } from 'react-router-dom'

const Login = () => {

  const user = async () => {
    await apis.addUser({
      userName: '운철',
      passWord: 1234
    })
  }


  return (
    <div>Login
      <Link to='/'><div>homebutton</div></Link>
      <button onClick={user}>등록</button>
    </div>
  )
}

export default Login