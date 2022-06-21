import React, { useState, useEffect } from "react";
import apis from "../api/api";
import { storage } from "../shared/Firebase";
import { ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createPostJson, loadPostJson } from "../redux/modules/post";
import styled from "styled-components";
import { VscBold, VscItalic, VscListOrdered, VscMention, VscSmiley } from "react-icons/vsc";
import { RiStrikethrough, RiFileCodeLine, RiSendPlane2Fill, RiArrowDownSLine } from "react-icons/ri";
import { IoIosLink } from "react-icons/io";
import { TbList, TbCode, TbVideo } from "react-icons/tb";
import { BsBarChartSteps, BsType } from "react-icons/bs";
import { CgMic } from "react-icons/cg";









const Post = ({ scrollRef }) => {
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

        // useEffect(() => {
        //     dispatch(loadPostJson());
        //     return()=>{
        //         console.log("청소중2")
        //     }
        // }, [dispatch]);

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
                        profileUrl: res.data.profileUrl,
                        username: res.data.username,
                        nickname: res.data.nickname
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
                        <button>
                            <VscBold size="20px" />
                        </button>
                        <button>
                            <VscItalic size="20px" />
                        </button>
                        <button>
                            <RiStrikethrough size="20px" />
                        </button>
                        <span></span>
                        <button>
                            <IoIosLink size="20px" />
                        </button>
                        <span></span>
                        <button>
                            <VscListOrdered size="20px" />
                        </button>
                        <button>
                            <TbList size="20px" />
                        </button>
                        <span></span>
                        <button>
                            <BsBarChartSteps size="20px" />
                        </button>
                        <span></span>
                        <button>
                            <TbCode size="20px" />
                        </button>
                        <button>
                            <RiFileCodeLine size="20px" />
                        </button>
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
                            <button>
                                <TbVideo color="#ccc" size="20px" />
                            </button>
                            <button>
                                <CgMic color="#ccc" size="20px" />
                            </button>
                            <span></span>
                            <button>
                                <VscSmiley color="#525252" size="20px" />
                            </button>
                            <button>
                                <VscMention color="#525252" size="20px" />
                            </button>
                            <button>
                                <BsType color="#525252" size="20px" />
                            </button>
                        </div>
                        <div className='submit'>
                            <UnderBar>

                                <button onClick={postNew} type="submit">
                                    <RiSendPlane2Fill size="20px" />
                                </button>
                                <span></span>
                                <button>
                                    <RiArrowDownSLine size="20px" />
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
      color: #ccc;
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
        height: 28px;
        border-radius: 4px;
        padding: 2px 8px;
        width: 40px;
        font-size: 13px;
        background-color: #fff;
        color: #ccc;
        align-items: center;
        justify-content: center;
      }
      span {
        width: 1px;
        height: 20px;
        margin: 2px 4px;
        background-color: #ccc;
        align-self: center;
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