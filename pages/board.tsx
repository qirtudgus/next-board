import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import BasicTitle from '../components/BasicTitle';
import Posts, { ListInterface } from '../components/posts';
import customAxios from '../utils/customAxios';

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
interface activeInterface {
  active: boolean;
}
const Active = styled.div<activeInterface>`
  width: 30px;
  height: 30px;
  display: flex;
  margin-right: 10px;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.active &&
    css`
      border-top: 2px solid ${({ theme }) => theme.colors.main};
      color: ${({ theme }) => theme.colors.main};
  }
    `}
  &:hover {
    color: ${({ theme }) => theme.colors.main};
  }
`;

const FirstActive = styled.div`
  width: 22px;
  display: flex;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
  color: #858585;
  &:hover {
    color: ${({ theme }) => theme.colors.main};
  }
`;
const LastActive = styled.div`
  width: 22px;
  display: flex;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
  color: #858585;
  &:hover {
    color: ${({ theme }) => theme.colors.main};
  }
`;

const PageBtnList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SearchInputWrap = styled.div`
  max-width: 500px;
`;

const SearchInputDiv = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  height: 40px;
  border-radius: 4px;
  border: 1px solid#9c9c9c;
  & input {
    width: 100%;
    max-width: 500px;
    height: 100%;
    padding-inline-end: 12px;
    padding-inline-start: 12px;
    outline: none;
    border: none;
  }
  & select {
    cursor: pointer;
    height: 95%;
    border: none;
    outline: none;
  }
  & > div {
    cursor: pointer;
    margin-right: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export interface BoardListInterface {
  data: { [key: string]: any };
  currentPageNumber: number;
  btnArr: Number[];
  searchKeyword: string;
  searchTheme: string;
  sortKeyword: string;
}
export default function BoardList(props: BoardListInterface) {
  const [searchTheme, setSearchTheme] = useState('제목');
  const sortRef = useRef() as RefObject<HTMLSelectElement>;
  const searchThemeRef = useRef() as RefObject<HTMLSelectElement>;
  const searchKeywordRef = useRef() as RefObject<HTMLInputElement>;
  const router = useRouter();

  //유동적인 Link컴포넌트를 생성해보자....
  const UrlFunc = (queryKey: string, queryValue: string) => {
    //현재 URL을 가져오고
    let a = new URLSearchParams(location.search);
    a.set(queryKey, queryValue);
    let newParam = a.toString();
    let b = new URL('?' + newParam, location.href);
    return b;
  };

  return (
    <>
      <BasicTitle BasicTitleValue='게시판'></BasicTitle>
      <SearchInputWrap>
        <SearchInputDiv>
          <select
            ref={searchThemeRef}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setSearchTheme(e.target.value);
            }}
          >
            <option>제목</option>
            <option>글쓴이</option>
          </select>
          <input ref={searchKeywordRef}></input>
          <div
            onClick={() => {
              console.log(`${searchTheme}검색기능 실행`);
              if (searchKeywordRef.current?.value) {
                const decode = encodeURIComponent(searchKeywordRef.current?.value);
                console.log(decode);
                router.push(`/board?page=${1}&keyword=${decode}&theme=${searchTheme}`);
              } else {
                alert('검색어를 입력해주세요!');
              }
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24px'
              viewBox='0 0 24 24'
              width='24px'
              fill='#000000'
            >
              <path
                d='M0 0h24v24H0z'
                fill='none'
              />
              <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
            </svg>
          </div>
        </SearchInputDiv>
        {/* <select
          ref={sortRef}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            console.log(sortKeyword);
            let a = new URLSearchParams(location.search);
            a.set('sort', e.target.value);
            let newParam = a.toString();
            let b = new URL('?' + newParam, location.href);
            router.push(b);
          }}
        >
          <option>최신순</option>
          <option>오래된순</option>
        </select> */}
      </SearchInputWrap>
      <ul>
        {(props.data.list as ListInterface[]).map((el: ListInterface) => {
          return (
            <Posts
              key={el.idx}
              idx={el.idx}
              userId={el.userId}
              title={el.title}
              date={el.date}
              viewCount={el.viewCount}
              commentCount={el.commentCount}
              likeCount={el.likeCount}
            ></Posts>
          );
        })}
      </ul>
      <PageBtnList>
        {/* 한페이지씩 가는 화살표..잠시 주석 */}
        {/* <Link href={`/board?page=${props.currentPageNumber - 3}`}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 0 24 24'
            width='40px'
            fill='#000000'
          >
            <path
              d='M0 0h24v24H0z'
              fill='none'
            />
            <path d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z' />
          </svg>
        </Link> */}
        {props.currentPageNumber > 2 && (
          <FirstActive>
            {props.searchKeyword ? (
              <Link href={`/board?page=${1}&keyword=${props.searchKeyword}&theme=${props.searchTheme}`}>1...</Link>
            ) : (
              <Link href={`/board?page=${1}`}>{1}...</Link>
            )}
          </FirstActive>
        )}

        {props.btnArr.map((i: any) => {
          return (
            <Active
              key={i}
              active={props.currentPageNumber === i ? true : false}
            >
              {/* 검색어가 있을 경우에만 해당 페이지로 이동 */}
              {props.searchKeyword ? (
                <Link href={`/board?page=${i}&keyword=${props.searchKeyword}&theme=${props.searchTheme}`}>{i}</Link>
              ) : (
                <Link href={`/board?page=${i}`}>{i}</Link>
              )}
            </Active>
          );
        })}
        {props.currentPageNumber < props.data.listNum - 1 && (
          <LastActive>
            {props.searchKeyword ? (
              <Link
                href={`/board?page=${props.data.listNum}&keyword=${props.searchKeyword}&theme=${props.searchTheme}`}
              >
                ...{props.data.listNum}
              </Link>
            ) : (
              <Link href={`/board?page=${props.data.listNum}`}>...{props.data.listNum}</Link>
            )}
          </LastActive>
        )}
        {/* 한페이지씩 가는 화살표..잠시 주석 */}
        {/* <Link href={`/board?page=${props.currentPageNumber + 3}`}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 0 24 24'
            width='24px'
            fill='#000000'
          >
            <path
              d='M0 0h24v24H0z'
              fill='none'
            />
            <path d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' />
          </svg>
        </Link> */}
      </PageBtnList>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  //context 인자에는 다양한 키가 들어있다. 아래 코드는 context에서 동적 경로 페이지 정보를 가져와서 그 번호로 axios 요청을 한것
  const currentPageNumber = context.query.page ? Number(context.query.page) : 1;
  const searchKeyword = context.query.keyword ? context.query.keyword : null;
  const sortKeyword = context.query.sort ? context.query.sort : null; // 잘들어옴
  const searchTheme = context.query.theme ? context.query.theme : '제목';
  console.log(context.query);
  //검색 시 기본값은 제목으로 설정

  let data: { [key: string]: any } = [];
  //키워드 쿼리 유무(검색 유무)에 따라서 호출되는 axios문을 변경하자
  if (searchKeyword || sortKeyword) {
    data = await customAxios(
      'GET',
      `/getSearchResultList?page=${currentPageNumber}&keyword=${searchKeyword}&theme=${searchTheme}&sort=${sortKeyword}`,
    ).then((res) => res.data);
  } else {
    data = await customAxios('GET', `/getBoardList?page=${currentPageNumber}`).then((res) => res.data);
  }
  const PAGE_SIZE = 3;
  const btnArr: Number[] = [];
  const btnArrFunc = () => {
    //최소 페이지사이즈보다 짧을 때
    if (data.listNum <= PAGE_SIZE) {
      for (let i = 1; i <= data.listNum; i++) {
        btnArr.push(i);
      }
    }
    //첫 페이지일 때
    else if (currentPageNumber === 1) {
      for (let i = 1; i <= PAGE_SIZE; i++) {
        btnArr.push(i);
      }
    }
    //마지막 페이지일 때
    else if (data.listNum === currentPageNumber) {
      for (let i = 0; i < PAGE_SIZE; i++) {
        btnArr.unshift(currentPageNumber - i);
      }
    }
    //중간 페이지일 때
    else {
      btnArr.push(currentPageNumber - 1);
      btnArr.push(currentPageNumber);
      btnArr.push(currentPageNumber + 1);
    }
  };

  btnArrFunc();

  return {
    props: {
      data,
      currentPageNumber,
      btnArr,
      searchKeyword,
      searchTheme,
      sortKeyword,
    },
  };
};
