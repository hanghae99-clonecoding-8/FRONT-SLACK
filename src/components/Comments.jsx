import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import styled from 'styled-components'

const Comments = () => {

    let res = useQuery(['posts'], ()=>
  axios.get('http://localhost:4000/posts'))

  console.log(res.data)
// 로딩 중일 경우
        if(res.isLoading) {
            return (
                <LoadingText>Loading...</LoadingText>
            )
        }

        // 결과값이 전달되었을 경우
        if(res.data) {
            const posts= res.data.data;
            console.log(posts)
            return (
                <Person.Container>
                    {posts.map((posts) => {
                        return (
                            <Person.Box key={posts.id}>
                                <Person.Title>{posts.id}.</Person.Title>
                                <Person.Text>{posts.nickname}</Person.Text>
                                <Person.Text>({posts.email})</Person.Text>
                            </Person.Box>
                        )
                    })}
                </Person.Container>
            )
        }
    

    return (
        <Wrapper>
            {Comments()}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    max-width: 728px;

    margin: 0 auto;
`;

const LoadingText = styled.h3`
    text-align: center;
`;

const Person = {
    Container: styled.div`
        padding: 8px;
    `,

    Box: styled.div`
        border-bottom: 2px solid olive;
    `,

    Title: styled.h2`
        display: inline-block;
        
        margin: 0 12px;

        line-height: 48px;
    `,

    Text: styled.span`
        margin: 0 6px;
    `}
export default Comments
