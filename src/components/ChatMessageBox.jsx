import React from 'react'
import styled from "styled-components";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

import { useDispatch, useSelector } from "react-redux";
import {useParams} from "react-router";

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function ChatMessageBox() {
  return (
    <div>ChatMessageBox</div>
  )
}

export default ChatMessageBox