import React, { useState, useEffect } from "react";
import apis from "../api/api";
import { storage } from "../shared/Firebase";
import { ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createPostJson, loadPostJson } from "../redux/modules/post";
import styled from "styled-components";

const Post = ({scrollRef}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [content, setContent] = React.useState("");
    const [textareaHeight, setTextareaHeight] = useState(0);
    const text = React.useRef(null)
// console.log(scrollRef)

const scollToMyRef = () => {
  const scroll =
    scrollRef.current.scrollHeight - scrollRef.current.clientHeight
    scrollRef.current.scrollTo(0, scroll);
  console.log(scrollRef.current.clientHeight)
};

    useEffect(() => {  
        scollToMyRef();
    
        dispatch(loadPostJson());
    }, [dispatch]);

    const postNew = async (e) => {
        e.preventDefault();
      const res = await apis
            .addPost({
                contents: content,
            })
            .then((res) => {   
             
                //res의 타이틀 이런식으로바꿔줘야함
                dispatch(
              
                    createPostJson({
                        contents: res.data.contents,
                        createdAt: (res.data.createdAt).split("T")[0],
                        profileUrl : res.data.profileUrl,
                        username: res.data.username
                    })
                );
                console.log(text.current.value)
                 console.log(res)
                // console.log(res);
                // dispatch(createPostJson(res.data)); 서버오픈시 시도
                //window.alert("등록성공");
                
              
                navigate("/main");
            })
            .catch((err) => {
                alert("로그인 후 작성해주세요");
                navigate("/");
            });
    };

    const textareaChange = (e) => {
        setContent(e.target.value.replaceAll("<br>", "\r\n"));
        setTextareaHeight(e.target.value.split('\n').length - 1);
    }

    return (
        <> 
            <Wrap>
                <MessageForm>
                    <div className='m_format'>
                        <button>B</button>
                        <button>I</button>
                        <button>S</button>
                        <span></span>
                        <button>L</button>
                        <span></span>
                        <button>N</button>
                        <button>D</button>
                        <span></span>
                        <button>Q</button>
                        <span></span>
                        <button>C</button>
                        <button>C</button>
                    </div>
                    <div className='m_text'>
                        <textarea
                            type="text"
                            placeholder="내용을 입력하세용"
                            value={content}
                            onChange={textareaChange}
                            style={{ height: "100px" }}
                            ref={text}
                            wrap="hard"
                            cols="20"
                        />
                    </div>
                    <div className='m_toolbar'>
                        <button>+</button>
                        <div className='buttons'>
                            <span></span>
                            <button>C</button>
                            <button>A</button>
                            <span></span>
                            <button>E</button>
                            <button>@</button>
                            <button>F</button>
                        </div>
                        <div className='submit'>
                            <UnderBar>

                                <button onClick={postNew} type="submit">
                                    보내기
                                </button>

                            </UnderBar>
                        </div>
                    </div>
                </MessageForm>

            </Wrap>
        </>
    );
};

const Wrap = styled.div`
      /* display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: black;
      margin: 15% auto;
      border: 1px white solid; */
      width: 95%;
      margin: auto;
      margin-top: 25px;
      position: relative;
      bottom: px;
      overflow-x: hidden;

    `;


const MessageForm = styled.div`

  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  button {
    cursor: pointer;
  }
  .m_format {
    padding: 4px;
    background-color: #efefef;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    display: flex;
    button {
      height: 28px;
      width: 28px;
      padding: 2px;
      margin: 2px;
      border-radius: 4px;
      border: none;
      background-color: transparent;
    }
    span {
      width: 1px;
      height: 20px;
      margin: 2px 4px;
      background-color: #ccc;
      align-self: center;
    }
  }
  .m_text {
    padding: 0px 10px;
    box-sizing: border-box;
    textarea {
      border: none;
      outline: none;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 10px;
      width: 97%;
      height: 30%;
      white-space: pre-line;
    }
  }
  .m_toolbar {
    padding: 4px 6px 4px 6px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      width: 24px;
      height: 24px;
      border-radius: 24px;
      outline: none;
      border: none;
      font-size: 20px;
    }
    .buttons {
      display: flex;
      align-items: center;
      flex-grow: 1;
      // flex-shrink: 1;
      // padding-left: 0;
      // padding-right: 0;
      span {
        width: 1px;
        height: 20px;
        margin: 2px 4px;
        background-color: #ccc;
        align-self: center;
      }
      button {
        font-size: 15px;
        height: 28px;
        width: 28px;
        padding: 2px;
        margin: 2px;
        border-radius: 4px;
        border: none;
        background-color: transparent;

      }
    }
    .submit {
      button {
        heigth: 28px;
        border-radius: 4px;
        padding: 2px 8px;
        width: 100px;
        font-size: 13px;
        background-color: #007a5a;
        color: #fff;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;



/* const Inputbox = styled.textarea`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 10px;
      width: 90%;
      height: 30%;
      white-space: pre-line;
    `; */
const Button2 = styled.button`
      padding: 3px;
      margin-bottom: 20px;
    `;
const UnderBar = styled.div`
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`

export default Post;
