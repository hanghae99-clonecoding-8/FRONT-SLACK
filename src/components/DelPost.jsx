import React from 'react'
import "../css/modal.css"

import { useDispatch, useSelector } from "react-redux";
import { deletePostJson, loadPosts } from "../redux/modules/post";
import { useNavigate } from 'react-router-dom';

const DelPost = (props) => {
  const { open, close, close2 , header, id } = props;
  const dispatch = useDispatch()
 const navigate = useNavigate()

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
        <div>이 게시글을 삭제하시겠습니까? 이 작업은 실행 취소할 수 없습니다.</div>
      </main>
      <footer>
            <button className="close" onClick={close}
              style={{marginRight:"10px"}}
            >
              취소
            </button>
            <button onClick={close2}> 삭제</button>
          </footer>
      </section>
      ):null}
     
    </div>
    </>
  )
}

export default DelPost