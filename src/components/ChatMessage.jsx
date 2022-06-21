import React from 'react'
import styled from "styled-components";
import Text from "../elements/Text";
import Grid2 from "../elements/Grid2";



const ChatMessage = (props) => {

    const {message, nickName, createdAt} = props;
  
    return (
      <React.Fragment>
        <OuterBox>
          <InnerBox>
            <Grid2 is_flex width="70vw" height="fit-content">
              <ImageBox />
              <MessageBox>
                <Grid2 is_flex width="fit-content" height="30px">
                  <Text bold margin="0">{nickName}</Text>
                  <Text margin="0 10px" size="0.8em">{createdAt}</Text>
                </Grid2>
                <Grid2 width="fit-content" margin="0">
                  <Text margin="0 0">{message}</Text>
                </Grid2>
              </MessageBox>
            </Grid2>
          </InnerBox>
        </OuterBox>
      </React.Fragment>
    );
  }
  
  const OuterBox = styled.div`
    width: 100%;
    &:hover {
      background: #fafafa;
    }
  `
  
  const InnerBox = styled.div`
    margin: 0 20px;
  
    height: 70px;
  `
  
  const ImageBox = styled.div`
    width: 40px;
    height: 40px;
  
    background-image: url('https://ifh.cc/g/hvhy7n.png');
    background-size: cover;
    border-radius: 4px;
  `
  
  const MessageBox = styled.div`
    margin: 10px;
  
    width: 100%;
    height: 56px;
  `
  
  
  export default ChatMessage;