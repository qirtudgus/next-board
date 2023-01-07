import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import customAxios from '../../utils/customAxios';
import { useAppSelector } from '../../store/store';
import BasicButton from '../../components/BasicButton';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

interface Data {
  idx: number;
  title: string;
  content: string;
  date: string;
  userId: string;
  likeList: string;
  viewCount: string;
}

export interface BoardInterface {
  data: Data[];
}

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  padding: 15px 0 30px;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.7rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.4rem;
  }
`;

const UserInfo = styled.div`
  padding-top: 50px;
  display: flex;
  align-items: center;
  font-size: 14px;
  & p {
    display: flex;
    align-items: center;
    padding-right: 1rem;
  }
  & svg {
    opacity: 0.7;
  }
  & .userId {
    font-size: 1.1rem;
  }
  @media ${({ theme }) => theme.device.tablet} {
    & .userId {
      font-size: 1rem;
    }
    padding-top: 30px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    padding-top: 20px;
  }
`;

export default function Post({ data }: BoardInterface) {
  const router = useRouter();
  const idx = router.query.idx;
  const userId = useAppSelector((state) => state.userInfoSlice.id);
  const userIdx = useAppSelector((state) => state.userInfoSlice.idx);
  const isLogin = useAppSelector((state) => state.userInfoSlice.isLogin);
  const [isLike, setIsLike] = useState(data[0].likeList.includes(userIdx.toString()));

  useEffect(() => {
    console.log(userIdx);
    console.log(data[0].likeList.includes(userIdx.toString()));
  }, []);

  return (
    <>
      <Head>
        <title>{data[0].title}</title>
        <meta
          property='og:title'
          content={data[0].title}
          key='title'
        />
      </Head>
      <UserInfo>
        <p className='userId'>{data[0].userId}</p>
        <p>{data[0].date}</p>
        <p>
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
          {data[0].viewCount}
        </p>
      </UserInfo>
      <Title>{data[0].title}</Title>
      <h3>{data[0].content}</h3>

      {userId === data[0].userId && (
        <>
          <BasicButton
            width={100}
            BasicButtonValue='삭제'
            OnClick={() => {
              if (confirm('게시물을 삭제하시겠어요?')) {
                customAxios('DELETE', `/posts?idx=${idx}`).then(() => {
                  router.push('/posts');
                });
                console.log('삭제 시도');
              }
            }}
          ></BasicButton>
          <BasicButton
            width={100}
            BasicButtonValue='수정'
            OnClick={() => {
              router.push(`/posts/edit?idx=${idx}`);
              console.log('수정 시도');
            }}
          ></BasicButton>
        </>
      )}
      {isLike ? (
        <button
          onClick={() => {
            console.log('좋아요 시도');
            setIsLike((prev) => !prev);
            if (isLogin) {
              customAxios('PUT', `/postlike?userIdx=${userIdx}&boardIdx=${idx}&behavior=unlike`).then((res) => {
                console.log('좋아요 취소');
              });
            } else {
              alert('로그인 후 이용 가능해요!');
              return;
            }
          }}
        >
          좋아요 취소
        </button>
      ) : (
        <button
          onClick={() => {
            if (isLogin) {
              setIsLike((prev) => !prev);
              console.log('좋아요 시도');
              customAxios('PUT', `/postlike?userIdx=${userIdx}&boardIdx=${idx}&behavior=like`).then((res) => {
                console.log('좋아요 완료');
              });
            } else {
              alert('로그인 후 이용 가능해요!');
              return;
            }
          }}
        >
          좋아요
        </button>
      )}
    </>
  );
}

//getServerSideProps를 호출하면 프론트에 렌더링되기전에 서버에서 데이터를 받아와 사용할 수 있다.
//getServerSideProps를 사용하는 페이지는 요청 시 서버 측에서 렌더링되며 캐시 제어 헤더가 구성된 경우에만 캐시된다.
//해당 함수는 요청하는 동안 데이터를 렌더링 할 필요가 있을 때 사용되는것이 Best다. ex)게시물 등..
//요청하는동안 데이터를 렌더링할 필요가 없는 경우 클라이언트측이나 StaticProps를 가져오는것을 고려
export const getServerSideProps: GetServerSideProps = async (context) => {
  //context 인자에는 다양한 키가 들어있다. 아래 코드는 context에서 동적 경로 페이지 정보를 가져와서 그 번호로 axios 요청을 한것
  let { data }: BoardInterface = await customAxios('GET', `/posts?idx=${context.params?.idx}`);

  return {
    props: {
      data,
    },
  };
};
