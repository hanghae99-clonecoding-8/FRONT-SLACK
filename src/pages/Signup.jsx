import React, { useState, Component } from 'react';
import { useNavigate } from "react-router-dom";
import { storage } from '../shared/Firebase';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import apis from "../api/api";
import styled from "styled-components";
import "./css.css"

const SignUp = (props) => {
    const { open, close, header } = props;
    const navigate = useNavigate();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Password2, setPassword2] = useState("");
    const [Nickname, setNickname] = useState("");
    const [fileImage, setFileImage] = React.useState("");
    const fileInputRef = React.useRef();
    const password = React.useRef();
    const password2 = React.useRef();
    const check = React.useRef();

    // 이메일 중복 체크
    const dupEmail = async () => {
        await apis.checkEmail(Email)
            .then(() => {
                window.alert("사용 가능한 아이디입니다.");
            })
            .catch((error) => {
                window.alert("이미 사용중인 아이디입니다.");
                console.log("Login Error", error);
            });
    };

    // 닉네임 중복 체크
    const dupNick = async () => {
        await apis.checkNickName(Nickname)
            .then(() => {
                window.alert("사용 가능한 닉네임입니다.");
            })
            .catch((error) => {
                window.alert("이미 사용중인 닉네임입니다.");
                console.log("Login Error", error);
            });
    };


    //아이디,비번,닉네임 정규식
    const idCheck = (email) => {
        let regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        // 대문자 포함
        return regExp.test(email);
    };
    const pwCheck = (email) => {
        let regExp = /^[0-9a-zA-Z]{8,}$/;
        // 대문자 포함
        return regExp.test(email);
    };
    const nickCheck = (nick) => {
        let regExp = /^[a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣!@#$%^&*]/;
        return regExp.test(nick);
    };

    //submit handler
    const onSubmitUserHandler = async (event) => {
        event.preventDefault();
        if (
            Email === "" ||
            Password === "" ||
            Password2 === "" ||
            Nickname === "" ||
            fileImage === ""
        ) {
            window.alert("아이디,비밀번호,닉네임을 모두 입력해주세요!");
            return;
        }
        if (!idCheck(Email)) {
            window.alert("형식을 지켜주세요.");
            return;
        }
        if (!pwCheck(Password, Password2)) {
            window.alert("숫자 및 영어만 입력가능합니다.");
            return;
        }
        if (Password !== Password2) {
            window.alert("비밀번호 불일치 : 고새 까먹었어?");
            return;
        }
        if (!nickCheck(Nickname)) {
            window.alert("올바른 닉네임 형식을 작성해주세요");
            return;
        }
        //디텔가져오는거
        // const ret = await apis.getDetail(1)
        // console.log(ret)
        const res = await apis.addUser({
            email: Email,
            password: Password,
            password2: Password2,
            nickname: Nickname,
            profileUrl: fileInputRef.current?.url,
        });
        console.log(res);
        alert(res.data.body[0].message);
        navigate("/login");
    };
    //프로필 사진 업로드
    const saveFileImage = async (e) => {
        setFileImage(URL.createObjectURL(e.target.files[0]));
        // console.log(URL.createObjectURL(e.target.files[0]))
        // // ref로도 확인해봅시다. :)
        // console.log(fileInputRef.current.files[0]);
        const uploaded_file = await uploadBytes(
            ref(storage, `profileimages/${e.target.files[0].name}`),
            e.target.files[0]
        );
        // console.log(uploaded_file);
        const file_url = await getDownloadURL(uploaded_file.ref);
        // console.log(file_url);
        fileInputRef.current = { url: file_url };
    };



    return (
        <div>
            <div className={open ? 'openModal modal' : 'modal'}>

                {open ? (
                    <section>
                        <header>
                            {header}
                            <button className="close" onClick={close}>
                                &times;
                            </button>
                        </header>
                        <main>
                            <div onSubmit={onSubmitUserHandler} style={{ marginTop: "30px" }}>
                                아이디 :
                                <input
                                    type="text"
                                    placeholder="아이디를 입력하세요"
                                    value={Email}
                                    onChange={(event) => {
                                        setEmail(event.target.value);
                                    }}
                                />
                                <button onClick={dupEmail}
                                >
                                    중복확인
                                </button>
                                <h6>E-mail주소를 입력해 주세요</h6>
                                <br />
                                비밀번호 :
                                <input
                                    type="password"
                                    placeholder="비밀번호를 입력하세요"
                                    value={Password}
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                    }}
                                    ref={password}
                                />
                                <h6>비밀번호는 8자 이상 영문과 숫자로만 이루어져야해요</h6>
                                <br />
                                비밀번호 재확인 :
                                <input
                                    type="password"
                                    placeholder="비밀번호를 재입력하세요"
                                    value={Password2}
                                    onChange={(event) => {
                                        setPassword2(event.target.value);
                                    }}
                                    ref={password2}
                                />
                                <p ref={check} />
                                <h6>비밀번호는 8자 이상 영문과 숫자로만 이루어져야해요</h6>
                                <br />
                                닉네임 :
                                <input
                                    type="text"
                                    placeholder="예전 느낌 살려서! 큰거온다!!!"
                                    value={Nickname}
                                    onChange={(event) => {
                                        setNickname(event.target.value);
                                    }}
                                />
                                <button onClick={dupNick}
                                >
                                    중복확인
                                </button>
                                <h6>닉네임은 당신의 멋대로에요</h6>
                                <br />
                                프로필 사진
                                {fileImage && (
                                    <img
                                        alt="sample"
                                        src={fileImage}
                                        style={{ margin: "auto", maxWidth: "300px", maxHeight: "250px" }}
                                    />)}
                                <input
                                    name="imgUpload"
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={saveFileImage}
                                />
                                <div style={{ fontSize: "10px", color: "tomato" }}>
                                    사진변경하지 말아주세요 오류생겨요...:울음:
                                </div>
                                <button>가입하기</button>
                            </div>

                        </main>
                        <footer>
                            <button className="close" onClick={close}>
                                close
                            </button>
                        </footer>
                    </section>
                ) : null}
            </div>
        </div>

    );
};


export default SignUp;