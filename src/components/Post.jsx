import React, { useState, useEffect } from "react";
import apis from "../api/api";
import { storage } from "../shared/Firebase";
import { ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createPostJson, loadPostJson } from "../redux/modules/post";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const Post = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [content, setContent] = React.useState("");
    const [textareaHeight, setTextareaHeight] = useState(0);

    useEffect(() => {
        dispatch(loadPostJson());
    }, [dispatch]);

    const postNew = async (e) => {
        e.preventDefault();
            await apis
            .addPost({
                contents: content,
            })
            .then((res) => {
                //res의 타이틀 이런식으로바꿔줘야함
                dispatch(
                    createPostJson({
                        contents: res.data.contents,
                        id: res.data.id,
                    })
                );
                console.log(res);
                // dispatch(createPostJson(res.data)); 서버오픈시 시도
                //window.alert("등록성공");
                navigate("/main");
            })
            .catch((err) => {
                alert("로그인 후 작성해주세요");
                navigate("/login");
            });
    };

    const textareaChange = (e) =>{
        setContent(e.target.value.replaceAll("<br>", "\r\n"));
        setTextareaHeight(e.target.value.split('\n').length - 1);
    }
    
    return (
        <>
            <Wrap>


                <Inputbox
                    type="text"
                    placeholder="내용을 입력하세용"
                    value={content}
                    onChange={textareaChange}
                    style={{ height: "100px" }}
                    wrap="hard"
                    cols="20"
                />

                <UnderBar>
                    <FontAwesomeIcon icon="fa-duotone fa-circle-plus" />
                    <Button2 onClick={postNew} type="submit">
                        등록하기
                    </Button2>
                </UnderBar>
            </Wrap>
        </>
    );
};

const Wrap = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: black;
      margin: 15% auto;
      border: 1px white solid;
      width: 50%;
    `;
const Inputbox = styled.textarea`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 10px;
      width: 90%;
      height: 30%;
      white-space: pre-line;
    `;
const Button2 = styled.button`
      padding: 3px;
      margin-bottom: 20px;
    `;
 const UnderBar = styled.div`
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
    
export default Post;
