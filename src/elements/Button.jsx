import React, { useState } from 'react';
import styled from 'styled-components';

const Button = (props) => {
    const { text, _onClick, is_float, children, width, bg, color, border, borderRadius, margin, writeBtn, addBtn, sendBtn, toggleBtn } = props;

    const styles = {
        width: width,
        bg: bg,
        color: color,
        border: border,
        borderRadius: borderRadius,
        margin: margin,
    };

    const [toggle, setToggle] = useState(false);
    const clickedToggle = () => {
        setToggle((prev) => !prev);
    };

    if (is_float) {
        return (
            <React.Fragment>
                <FloatButton onClick={_onClick}>{text ? text : children}</FloatButton>
            </React.Fragment>
        );
    }

    if (writeBtn) {
        return (
            <React.Fragment>
                <WriteBtn>{text ? text : children}</WriteBtn>
            </React.Fragment>
        )
    }

    if (addBtn) {
        return (
            <React.Fragment>
                <AddBtn>{text ? text : children}</AddBtn>
            </React.Fragment>
        );
    }

    if (sendBtn) {
        return (
            <React.Fragment>
                <SendBtn onClick={_onClick}>{text ? text : children}</SendBtn>
            </React.Fragment>
        );
    }

    if (toggleBtn) {
        return (
            <React.Fragment>
                <ToggleBtn onClick={clickedToggle} toggle={toggle}>
                    <Circle toggle={toggle} />
                </ToggleBtn>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <ElButton onClick={_onClick} {...styles}>{text ? text : children}</ElButton>
        </React.Fragment>
    );
}

Button.defaultProps = {
    text: false,
    children: null,
    _onClick: () => { },
    is_float: false,
    width: '100%',
    bg: 'transparent',
    color: '#212121',
    border: '1px solid #212121',
    borderRadius: false,
    margin: false,
};

const ElButton = styled.button`
  height: 45px;
  width: ${(props) => props.width};
  background-color: ${(props) => props.bg};
  color: ${(props) => props.color};
  outline: none;
  box-sizing: border-box;
  font-size: 16px;
  border: ${(props) => props.border};
  ${(props) => (props.borderRadius ? `border-radius: ${props.borderRadius};` : '')}
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')} 
  &:hover {
    font-weight: 700;
    cursor: pointer;
  }
`;

const FloatButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: #212121;
  color: white;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom: 50px;
  right: 30px;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 50px;
  position: fixed;
  z-index: 1;
  &:hover {
    cursor: pointer;
  }
`;

const WriteBtn = styled.button`
  position: absolute;
  top: 6px;
  right: 15px;

  width: 35px;
  height: 35px;

  border: none;
  border-radius: 20px;
  
  background: #fff;
`;

const AddBtn = styled.button`
  position: absolute;
  top: 5px;
  left: 30px;

  width: 20px;
  height: 20px;

  color: #CFC3CF;
  font-weight: 700;

  border: none;
  border-radius: 5px;
  background: #49254A;
`

const SendBtn = styled.button`
  position: absolute;
  bottom: 5px;
  right: 5px;

  width: 30px;
  height: 30px;

  background: #fff;
  color: #aaa;

  font-size: 0.8em;

  border: none;
  border-radius: 5px;

`

const ToggleBtn = styled.button`
  position: relative;
  display: flex;
  box-sizing: border-box;

  justify-content: center;
  align-items: center;

  width: 55px;
  height: 33px;

  border: ${(props) => (!props.toggle ? "1px solid #848484" : "1px solid #007a5a")};
  border-radius: 30px;
  background-color: ${(props) => (!props.toggle ? "#fff" : "#007a5a")};

  cursor: pointer;

  transition: all 0.3s ease-in-out;
  &:focus {
        border: 1px solid #1264a3;
        outline: 4px solid #bae1f1;
    }
`;
const Circle = styled.div`
  position: absolute;

  top: 4px;
  left: 7px;

  width: 23px;
  height: 23px;

  border-radius: 50px;
  background-color: ${(props) => (!props.toggle ? "#848484" : "#fff")};

  transition: all 0.3s ease-in-out;
  ${(props) => props.toggle && `transform: translate(18px, 0); transition: all 0.3s ease-in-out;`}
`;

// const ModalBtn = styled.button`
//   width: 80px;
//   height: 35px;

//   color: #4d4c4d;
//   border: none;
//   border-radius: 5px;

//   background: #DDDDDD;
// `


export default Button;