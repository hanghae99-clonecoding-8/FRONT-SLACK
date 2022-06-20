import React from 'react'
import apis from '../api/api'
import { createCommentJson, deleteCommentJson, loadCommentJson } from '../redux/modules/Comments'
import styled from 'styled-components'
import {useDispatch,useSelector} from 'react-redux'
import Post2 from './Post2'

const Comments = (props) => {
    // let res = useQuery(['posts'],apis.getComments)
    //그래서이거왜쓰는데 ㅡㅡ
    const CommentReducer = useSelector((state) => state.comment.list);
    const [text,setText] = React.useState('')
    const dispatch = useDispatch()

    
    React.useEffect(() => {
        
        dispatch(loadCommentJson());
      }, [dispatch]);


              return (
                <>
                  <CommentWrap>
                      {CommentReducer.map((comments) => {
                          return (
                              <div key={comments.id}>
                                  <h2>{comments.id}.</h2>
                                  <span>{comments.comment}</span>
                              </div>
                          )
                      })}
                  </CommentWrap>
                    <Post2/>
                    </>
              )
          
      

//  const res2 = useQuery(['posts'],apis.addComment(
//   {comment : text}))


}

const CommentWrap = styled.div`
/* width: 29vw; */
height: 46vh;
overflow-y: scroll;
`

export default Comments
