import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const TT = styled.h1`
  color: #fff;
`;

export const boardArr = [
  { index: 1, title: '제목이에요.', date: '2020-12-12' },
  { index: 2, title: '자랑입니다.', date: '2020-12-12' },
  { index: 3, title: '공부중이에요.', date: '2020-12-12' },
];

export default function Title() {
  return (
    <>
      <Link href={'/'}>처음으로</Link>
      <TT>게시판 목록</TT>
      <ul>
        {boardArr.map((el) => {
          return (
            <React.Fragment key={el.index}>
              <li>
                <Link href={`/posts/${el.index}`}>
                  {el.index} {el.title} 날짜 : {el.date}
                </Link>
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </>
  );
}
