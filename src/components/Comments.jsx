import React from 'react'
import apis from '../api/api'
import { createCommentJson, deleteCommentJson, loadCommentJson } from '../redux/modules/comments'
import styled from 'styled-components'
import {useDispatch,useSelector} from 'react-redux'

const Comments = () => {
    // let res = useQuery(['posts'],apis.getComments)
    //그래서이거왜쓰는데 ㅡㅡ
    const CommentReducer = useSelector((state) => state.comment.list);
    const [text,setText] = React.useState('')
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(loadCommentJson());
      }, [dispatch]);

const comment = () => {
              return (
                  <div>
                      {CommentReducer.map((comments) => {
                          return (
                              <div key={comments.id}>
                                  <h2>{comments.id}.</h2>
                                  <span>{comments.comment}</span>
                                  <button onClick={()=>{
                                    const result = window.confirm("정말 삭제할까요?");
                                    if(result){
                                        dispatch(deleteCommentJson)
                                    }
                                  }}>삭제하기</button>
                              </div>
                          )
                      })}
                  </div>
              )
          }
      
  
//  const res2 = useQuery(['posts'],apis.addComment(
//   {comment : text}))

const plusComment = (e)=>{
  e.preventDefault();
   dispatch(createCommentJson(text))
  console.log(text)
}

    return (
      <>
        <div>
            {comment()}
        </div>
        <input
              type="text"
              placeholder='댓글자리'
              value={text}
              onChange={(e)=>{
                setText(e.target.value)
              }}
              />
              <button onClick={plusComment}>등록스</button>
      </>
    )
}


export default Comments
