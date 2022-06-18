import React, { useState } from "react";
import apis from "../api/api";
import { storage } from "../shared/Firebase";
import { ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createPostJson } from "../redux/modules/post";
import styled from "styled-components";

const Post = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [content, setContent] = React.useState("");

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
                        id: res.id,
                        contents: res.content,
                    })
                );
                // dispatch(createPostJson(res.data)); 서버오픈시 시도
                window.alert("등록성공");
                navigate("/main");
            })
            .catch((err) => {
                alert("로그인 후 작성해주세요");
                navigate("/login");
            });
    };
    return (
        <>
          <Wrap>
            
            
            <Inputbox
              type="text"
              placeholder="내용을 입력하세용"
              value={content}
              onChange={(event) => {
                setContent(event.target.value);
              }}
              style={{ height: "100px" }}
            />
            
            <div>
              <Button2 onClick={postNew} type="submit">
                등록하기
              </Button2>
            </div>
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
      background-color: wheat;
    `;
    const Inputbox = styled.input`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 10px;
      width: 90%;
      height: 30%;
    `;
    const Button2 = styled.button`
      padding: 3px;
      margin-bottom: 20px;
    `;
    export default Post;
    