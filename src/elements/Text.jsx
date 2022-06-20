import React from 'react';
import styled from 'styled-components';

const Text = (props) => {
    const { children, bold, color, size, margin, right, } = props;
    const styles = {
        bold: bold,
        color: color,
        size: size,
        margin: margin,
        right: right,
    };
    return (
        <React.Fragment>
            <P {...styles}>{children}</P>
        </React.Fragment>
    );
}

Text.defaultProps = {
    children: null,
    bold: false,
    color: '#222831',
    size: '16px',
    margin: false,
    right: false,
};

const P = styled.p`
  font-family: 'Pretendard-Regular';
  word-break: keep-all;
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? "700" : "400")};
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
  ${(props) => (props.right ? `text-align: ${props.right};` : '')}
`;

export default Text;