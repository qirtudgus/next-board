import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BasicTitle from '../../components/BasicTitle';
import customAxios from '../../utils/customAxios';

/*
게시판 데이터
1. 인덱스
2. 아이디
3. 제목
4. 날짜
5. 조회수
6. 댓글수
7. 추천수
8. 내용
*/

const BoardDiv = styled.div`
  width: 100%;
  padding: 1em 0;
  & > div {
    margin-top: 3px;
  }
  &::before {
    content: '';
    position: absolute;
    top: 1;
    display: block;
    width: 100%;
    border-bottom: 1px solid#eee;
  }
`;

const BoardUserInfo = styled.div`
  font-size: 0.9rem;
`;

const BoardTitle = styled.div`
  font-size: 1.2rem;
  & a {
    display: block;
    max-width: 600px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & a:hover {
    color: ${({ theme }) => theme.colors.main};
  }
`;

const BoardFooterInfo = styled.div`
  display: flex;
  text-align: left;
  & span {
    display: flex;
    align-items: center;
    margin-right: 7px;
  }
  & svg {
    opacity: 0.7;
    margin-right: 2px;
  }
`;

export default function BoardList(props: any) {
  const [list, setList] = useState<null | any[]>([]);
  //보여줄 페이지 사이즈
  const PAGE_SIZE = 5;
  //총 페이지 수
  let total = 0;
  //리스트에 따른 페이지 갯수
  const [pages, setPages] = useState<number[]>([]);
  //현재 보여주고있는 페이지번호
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  //현재 보여주고있는 페이지버튼 리스트
  const [pageList, setPageList] = useState<number[]>([]);

  const call = async (currentPageNum: number): Promise<void> => {
    let payloadObj = await customAxios('get', `/getBoardList?page=${currentPageNum}`, {
      currentPageNum,
    }).then((res) => {
      // 10개의 게시글을 불러온다.
      console.log(res.data);
      return res.data;
    });
    console.log(payloadObj);
    setList(() => payloadObj.list);
    //토탈페이지수를 변수에 할당해준다.
    total = payloadObj.listNum;
    //페이지 정수를 받아와 배열 생성 후 setState해준다.
    //https://hjcode.tistory.com/73
    let pagesNum = Array.from({ length: payloadObj.listNum }, (v, i) => i);
    setPages([...pagesNum]);
    foo(currentPageNum);
  };

  let arr: any = [];
  const foo = (currentPage: number) => {
    console.log('들어온 커렌트페이지');
    console.log(currentPage);
    //현재 페이지와 페이즈사이즈를 나눠 1이 남았을 때 이 후 번호의 배열을 생성
    if (currentPage % PAGE_SIZE === 1) {
      let idx = 1; // 이 수를 current에 더 해준다.
      arr = [currentPage];
      while (currentPage + idx <= total && arr.length < PAGE_SIZE) {
        arr.push(currentPage + idx);
        idx++;
      }
      console.log(arr);
      setPageList([...arr]);
    } else if (currentPage % PAGE_SIZE === 0) {
      let idx = 1;
      arr = [currentPage];
      while (arr.length < PAGE_SIZE) {
        arr.unshift(currentPage - idx);
        idx++;
      }
      console.log(arr);
      setPageList([...arr]);
    }
  };
  console.log(pageList);
  useEffect(() => {
    call(currentPageNum);
  }, [currentPageNum]);

  // console.log(list);
  // console.log(total);
  // console.log(pages);
  // console.log(pageList);

  return (
    <>
      <BasicTitle BasicTitleValue='게시판'></BasicTitle>
      <ul>
        {(props.data.list as any[]).map((el: any) => {
          return (
            <React.Fragment key={el.idx}>
              <li>
                <BoardDiv>
                  <BoardUserInfo>
                    {el.userId} {el.date}
                  </BoardUserInfo>
                  <BoardTitle>
                    <Link href={`/posts/${el.idx}`}> {el.title} </Link>
                  </BoardTitle>
                  <BoardFooterInfo>
                    <span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        width='17px'
                        height='17px'
                        fill='#000000'
                      >
                        <path
                          d='M0 0h24v24H0V0z'
                          fill='none'
                        />
                        <path d='M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z' />
                      </svg>
                      {el.viewCount}
                    </span>
                    <span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='#000000'
                        width='17px'
                        height='17px'
                      >
                        <path
                          d='M0 0h24v24H0V0z'
                          fill='none'
                        />
                        <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
                      </svg>
                      {el.likeCount}
                    </span>{' '}
                    <span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='#000000'
                        width='17px'
                        height='17px'
                      >
                        <path
                          d='M0 0h24v24H0V0z'
                          fill='none'
                        />
                        <path d='M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zM7 9h2v2H7zm8 0h2v2h-2zm-4 0h2v2h-2z' />
                      </svg>
                      {el.commentCount}
                    </span>
                  </BoardFooterInfo>
                </BoardDiv>
              </li>
            </React.Fragment>
          );
        })}
      </ul>
      {pageList.map((i: any) => {
        return <div key={i}>{i}</div>;
      })}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  //context 인자에는 다양한 키가 들어있다. 아래 코드는 context에서 동적 경로 페이지 정보를 가져와서 그 번호로 axios 요청을 한것
  let { data } = await customAxios('get', `/getBoardList?page=${1}`);
  // console.log(data);

  console.log('쿼리');
  console.log(context.query);
  return {
    props: {
      data,
    },
  };
};
