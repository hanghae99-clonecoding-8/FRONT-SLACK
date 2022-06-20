import React from 'react'
import "../css/modal.css"

import { useDispatch, useSelector } from "react-redux";
import { deletePostJson } from "../redux/modules/post";

const DelPost = (props) => {
  const { open, close, header, id } = props;
  const dispatch = useDispatch()

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
        <div>이 메세지를 삭제하시겠습니까? 이 작업은 실행 취소할 수 없습니다.</div>
      </main>
      <footer>
            <button className="close" onClick={close}>
              취소
            </button>
            <button onClick={()=>{
              dispatch(deletePostJson(id))
            }}> 삭제</button>
          </footer>
      </section>
      ):null}
     
    </div>
    </>
  )
}

export default DelPost