import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import apis from "../api/api";
import '../css/modal.css';


const Card = ({ item, id }) => {
  // const PostReducer = useSelector((state) => state.Post_reducer.list);
  // console.log(PostReducer);
  // const [heart, setHeart] = React.useState(false);
  // const onHeart = async (e) => {
  //   e.preventDefault();
  //   const heartData = await apis.addheart(item.id);
  //   console.log(heartData.data);
  //   // dispatch(AddHeartJson(heartData.data))
  //   setHeart(heartData.data);
  // };
  return (
    <div>
      {/* <span>{item?.nickname}</span>
      <span>{item?.createAt}</span> */}
    
     
      <Wrap>
      <Imgbox>
      <Image className="text_photo" src='https://ca.slack-edge.com/T01L2TNGW3T-U03DL8GEU0G-dc38fbbc5656-512' />
      {/* <Image className="text_photo" src={`${item?.profileUrl}`} /> */}
      </Imgbox>
      <TextArea>
        <Toptext>
        <Nickname>최경식(항해99 매니저)</Nickname>
        <CreateAt> 오전 8:30 </CreateAt>
        {/*  <Nickname>{item?.nickname}</Nickname> */}
        {/* <CreateAt>{item?.createAt}</CreateAt> */}
        </Toptext>
      <Title>{item?.contents}</Title>
      </TextArea>
      <Heart>🤍</Heart>
        <Link to={`/detail/${item?.postId}`} style={{ textDecoration: "none" }}>
          <Dat>💬</Dat>
        </Link>
      </Wrap>
      {/* <Item>{item?.contents}</Item> */}
      <Underbar className="underbar">
        

      
      </Underbar>
    </div>
  );
};
// const Imgbox = styled.div`
// height: 600px;
// width: 600px;
// overflow: hidden;
// `

const Wrap = styled.div`
display: flex;
`
const Nickname =styled.div`
  font-weight: bolder;
  font-size: 1.06em;
  
`
const CreateAt =styled.span`
  font-size: 0.8em;
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
  width: 50px;
  height: 50px;
  border-radius: 9px;
`;
const TextArea = styled.span`
flex: 11;
text-align: left;
`
// const PostBox = styled.div`
//   height: 270px;
//   width: 270px;
// `;
const Heart = styled.div`

`;
const Dat = styled.div`

`;


const Underbar = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: row;
`;
export default Card;
