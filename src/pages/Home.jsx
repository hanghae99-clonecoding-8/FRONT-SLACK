import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div>Home
      <Link to="/main"><div>main</div></Link>
      <Link to="/login"><div>login</div></Link>
      <Link to="/signup"><div>signup</div></Link>
    </div>
  )
}

export default Home