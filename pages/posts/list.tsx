import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React from 'react';
import customAxios from '../../utils/customAxios';

export default function BoardList(props: any) {
  return (
    <>
      <ul>
        {props.data.map((el: any) => {
          return (
            <React.Fragment key={el.idx}>
              <li>
                <Link href={`/posts/${el.idx}`}>
                  {el.idx} {el.nickname} {el.title} 날짜 : {el.date}
                </Link>
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  //context 인자에는 다양한 키가 들어있다. 아래 코드는 context에서 동적 경로 페이지 정보를 가져와서 그 번호로 axios 요청을 한것
  let { data } = await customAxios('get', `/getBoardList`);
  return {
    props: {
      data,
    },
  };
};
