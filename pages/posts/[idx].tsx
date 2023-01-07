import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import customAxios from '../../utils/customAxios';
import { useAppSelector } from '../../store/store';
import BasicButton from '../../components/BasicButton';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import ViewCountSVG from '../../components/viewCountSVG';

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
interface Data {
  idx: number;
  title: string;
  content: string;
  date: string;
  userId: string;
  likeList: string;
  viewCount: string;
  likeCount: string;
}

export default function Post({ data }: BoardInterface) {
  const router = useRouter();
  const idx = router.query.idx;
  const userId = useAppSelector((state) => state.userInfoSlice.id);
  const userIdx = useAppSelector((state) => state.userInfoSlice.idx);
  const isLogin = useAppSelector((state) => state.userInfoSlice.isLogin);
  const [isLike, setIsLike] = useState(data[0].likeList.includes(userIdx.toString()));

  const [post, setPost] = useState({
    idx: data[0].idx,
    title: data[0].title,
    content: data[0].content,
    date: data[0].date,
    userId: data[0].userId,
    likeList: data[0].likeList,
    viewCount: data[0].viewCount,
    likeCount: data[0].likeCount,
  });

  const deletePost = () => {
    if (confirm('게시물을 삭제하시겠어요?')) {
      customAxios('DELETE', `/posts?idx=${idx}`).then(() => {
        router.push('/posts');
      });
    }
  };

  const moveEditPost = () => {
    router.push(`/posts/edit?idx=${idx}`);
  };

  const doNotLike = () => {
    setIsLike((prev) => !prev);
    if (isLogin) {
      customAxios('PUT', `/postlike?userIdx=${userIdx}&boardIdx=${idx}&behavior=unlike`).then((res) => {
        setPost({ ...post, likeCount: res.data[0].likeCount });
      });
    } else {
      alert('로그인 후 이용 가능해요!');
      return;
    }
  };

  const doLike = () => {
    if (isLogin) {
      setIsLike((prev) => !prev);
      customAxios('PUT', `/postlike?userIdx=${userIdx}&boardIdx=${idx}&behavior=like`).then((res) => {
        setPost({ ...post, likeCount: res.data[0].likeCount });
      });
    } else {
      alert('로그인 후 이용 가능해요!');
      return;
    }
  };

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta
          property='og:title'
          content={data[0].title}
          key='title'
        />
      </Head>
      <UserInfo>
        <p className='userId'>{post.userId}</p>
        <p>{post.date}</p>
        <p>
          <ViewCountSVG />
          {post.viewCount}
        </p>
      </UserInfo>
      <Title>{post.title}</Title>
      <h3>{post.content}</h3>

      {userId === post.userId && (
        <>
          <BasicButton
            width={100}
            BasicButtonValue='삭제'
            OnClick={deletePost}
          ></BasicButton>
          <BasicButton
            width={100}
            BasicButtonValue='수정'
            OnClick={moveEditPost}
          ></BasicButton>
        </>
      )}
      <p>{post.likeCount}</p>
      {isLike ? <button onClick={doNotLike}>좋아요 취소</button> : <button onClick={doLike}>좋아요</button>}
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
