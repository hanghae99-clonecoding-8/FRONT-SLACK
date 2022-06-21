import React from 'react'
import apis from '../api/api'
import { createCommentJson, deleteCommentJson, loadCommentJson } from '../redux/modules/comments'
import styled from 'styled-components'
import {useDispatch,useSelector} from 'react-redux'
import Post2 from './Post2'

const Comments = ({id}) => {
    // let res = useQuery(['posts'],apis.getComments)
    //그래서이거왜쓰는데 ㅡㅡ
    console.log(id)
    const CommentReducer = useSelector((state) => state.comment.list);
    const [text,setText] = React.useState('')
    const dispatch = useDispatch()

    
    React.useEffect(() => {
        dispatch(loadCommentJson(Number(id)));
      }, [dispatch]);


              return (
                <>
                  <CommentWrap>
                      {CommentReducer.map((comments) => {
                          return (
                            <Wrap>
      <Imgbox>
      {/* <Image className="text_photo" src='https://ca.slack-edge.com/T01L2TNGW3T-U03DL8GEU0G-dc38fbbc5656-512' /> */}
      <Image className="text_photo" src={`${comments?.profileUrl}`} />
      </Imgbox>
      <TextArea>
        <Toptext>
        {/* <Nickname>최경식(항해99 매니저)</Nickname>
        <CreateAt> 오전 8:30 </CreateAt> */}
         <Nickname>{comments?.nickname}</Nickname>
         <Nickname>({comments?.username})</Nickname>
        <CreateAt>{comments?.createdAt.split("T")[0]}</CreateAt>
        </Toptext>
      <Title>{comments?.comment}</Title>
      </TextArea>
      </Wrap>
                            //   <div key={comments.id}>
                                
                            //     <div>{comments.nickname}</div>
                            //       <div>{comments.id}</div>
                            //       <span>{comments.comment}</span>
                            //   </div>
                          )
                      })}
                  </CommentWrap>
                    <Post2 id={id}/>
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
const Wrap = styled.div`
display: flex;
padding-top: 10px;
`
const Nickname =styled.div`
  font-weight: bolder;
  font-size: 1em;
  
`
const CreateAt =styled.span`
  font-size: 0.7em;
  margin: 0 0 0 13px;
`
const Toptext =styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 7px;
`
const Title = styled.pre`
  font-weight: 400;
  font-size: 1em;
`;
const Imgbox =styled.span`
  flex: 1;
  
`
const Image = styled.img`
  flex: 1;
  width: 40px;
  height: 40px;
  border-radius: 9px;
`;
const TextArea = styled.span`
flex: 10;
text-align: left;
`
export default Comments
