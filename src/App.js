import React from 'react';
import './css/modal.css';
import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Main from './pages/Main';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Comments from './components/Comments';

function App() {
//npx json-server ./data.json --port 4000
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/main' element={<Main />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/detail/:id' element={<Detail />} />
      <Route path='/detail/comments' element={<Comments/>}/>
    </Routes>
  );
}

export default App;


//npx json-server ./data.json --port 4000