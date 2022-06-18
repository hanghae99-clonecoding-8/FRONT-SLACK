import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import apis from '../api/api'
import { createCommentJson, loadCommentJson } from '../redux/modules/comments'
import styled from 'styled-components'
import {useDispatch} from 'react-redux'

const Comments = () => {
    let res = useQuery(['posts'],apis.getPosts)
    const [text,setText] = React.useState('')
    const dispatch = useDispatch()

const comment = () => {
    console.log(res.data)
  // 로딩 중일 경우
          if(res.isLoading) {
              return (
                  <div>Loading...</div>
              )
          }
          // 결과값이 전달되었을 경우
          if(res.data) {
              const comments= res.data.data;
              console.log(comments)
              dispatch(loadCommentJson(comments))
              return (
                  <div>
                      {comments.map((comments) => {
                          return (
                              <div key={comments.id}>
                                  <h2>{comments.id}.</h2>
                                  <span>{comments.comment}</span>
                              </div>
                          )
                      })}
                  </div>
              )
          }
      
  }
//  const res2 = useQuery(['posts'],apis.addComment(
//   {comment : text}))

const plusComment = (e)=>{
  e.preventDefault();
   dispatch(createCommentJson({comment:text}))
          
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
