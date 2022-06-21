import React from "react";
import styled from "styled-components";
import { FiEdit } from "react-icons/fi";
import Grid from "../elements/Grid2";
import Button from "../elements/Button";
import Text from "../elements/Text";

import { GoChevronDown, GoTriangleDown } from "react-icons/go";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoChatbubblesOutline } from "react-icons/io5";
import { IoAtOutline } from "react-icons/io5";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FiLock } from "react-icons/fi";

const SideBar = () => {
    return (
        <>
            <ListBox>
                <ListElement height="50px" border="#522653">
                    <Grid is_flex>
                        <Text margin="0 10px" bold size="1.2em" color="#fff">HangHae99<GoChevronDown size="15px" /> </Text>
                        <Button writeBtn>
                            <FiEdit size="18px" color="#3F0E40" />
                        </Button>
                    </Grid>
                </ListElement >

                <PBList border="#522653">
                    <ListElement height="30px" >
                        <Text margin="0 15px" size="1em" color="#A6A6BC"><IoChatbubbleEllipsesOutline size="15px" /> 스레드</Text>
                    </ListElement>
                    <ListElement height="30px" >
                        <Text margin="0 15px" size="1em" color="#A6A6BC"><IoChatbubblesOutline size="15px" /> 다이렉트 메시지</Text>
                    </ListElement>
                    <ListElement height="30px" >
                        <Text margin="0 15px" size="1em" color="#A6A6BC"><IoAtOutline size="15px" /> 멘션 및 반응</Text>
                    </ListElement>
                    <ListElement height="30px" >
                        <Text margin="0 15px" size="1em" color="#A6A6BC"><HiOutlineOfficeBuilding size="15px" /> Slack Connect</Text>
                    </ListElement>
                    <ListElement height="30px" >
                        <Text margin="0 15px" size="1em" color="#A6A6BC"><BiDotsVerticalRounded size="15px" /> 더 보기</Text>
                    </ListElement>
                </PBList>

                <ListElement height="30px">
                    <Text margin="0 15px" size="1em" color="#A6A6BC"><FiLock size="13px" />　채널</Text>
                </ListElement>

                <ListElement height="30px" bg="#350D36" >
                    <Grid is_flex margin="0 20px" >
                        <Text margin=" 40px" size="1em" color="#A6A6BC">
                            <Button addBtn >+</Button>_7기_a반_공지방</Text>
                    </Grid>
                </ListElement>

                <ListElement height="30px">
                    <Text margin="0 15px" size="1em" color="#A6A6BC"><GoTriangleDown size="13px" />　다이렉트 메세지</Text>
                </ListElement>

                <ListElement height="30px" bg="#350D36" >
                    <Grid is_flex margin="0 20px" >
                        <Text margin=" 40px" size="1em" color="#A6A6BC">
                            <Button addBtn >+</Button>채널 추가</Text>
                    </Grid>
                </ListElement>

            </ListBox>


        </>
    );
}

const ListBox = styled.div`

    overflow: hidden;
   
    width: 260px;
    height: calc(100vh - 40px);

    background: #3F0E40;
    
`
const PBList = styled.div`
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    background: ${(props) => props.bg};
    ${(props) => (props.height ? `height: ${props.height};` : "")};
    ${(props) => (props.height ? `line-height: ${props.height};` : "")};
    ${(props) => (props.border ? `border: 1px solid ${props.border};` : "")};
`
const ListElement = styled.div`
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    background: ${(props) => props.bg};
    ${(props) => (props.height ? `height: ${props.height};` : "")};
    ${(props) => (props.height ? `line-height: ${props.height};` : "")};
    ${(props) => (props.border ? `border: 1px solid ${props.border};` : "")};
    &:hover {
        background: #350D36;
    }
`

export default SideBar;