import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import apis from "../api/api";

const Card = ({ item, id }) => {
    return (
        <div>
            <Underbar className="underbar">
                <Heart>🤍</Heart>

                <Link to={`/detail/${item?.id}`} style={{ textDecoration: "none" }}>
                    {" "}
                    <Dat>💬</Dat>{" "}
                </Link>
            </Underbar>
        </div>
    );
};

const PostBox = styled.div`
  height: 270px;
  width: 270px;
`;
const Heart = styled.div`
  width: 8%;
`;
const Dat = styled.div`
  width: 8%;
  margin-left: 80%;
`;
const Underbar = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: row;
`;
export default Card;
