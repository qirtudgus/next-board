import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import customAxios from '../../utils/customAxios';
import { useAppSelector } from '../../store/store';
import BasicButton from '../../components/BasicButton';
import { useState } from 'react';

interface Data {
  idx: number;
  title: string;
  content: string;
  date: string;
  userId: string;
  likeList: string;
}

export interface BoardInterface {
  data: Data[];
}

export default function Post({ data }: BoardInterface) {
  const router = useRouter();
  const idx = router.query.idx;
  const userId = useAppSelector((state) => state.userInfoSlice.id);
  const userIdx = useAppSelector((state) => state.userInfoSlice.idx);
  const isLogin = useAppSelector((state) => state.userInfoSlice.isLogin);
  const [isLike, setIsLike] = useState(data[0].likeList.includes(userIdx.toString()));

  return (
    <>
      <h1>api 라우트로 받아온 포스트 데이터</h1>

      <h3>{data[0].idx}</h3>
      <h3>{data[0].title}</h3>
      <h3>{data[0].content}</h3>
      <h3>{data[0].date}</h3>
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
      {isLogin ? (
        isLike ? (
          <button
            onClick={() => {
              console.log('좋아요 시도');
              if (isLogin) {
                customAxios('PUT', `/postlike?userIdx=${userIdx}&boardIdx=${idx}&behavior=unlike`)
                  .then((res) => {
                    console.log('좋아요 취소');
                  })
                  .then(() => setIsLike((prev) => !prev));
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
                console.log('좋아요 시도');
                customAxios('PUT', `/postlike?userIdx=${userIdx}&boardIdx=${idx}&behavior=like`)
                  .then((res) => {
                    console.log('좋아요 완료');
                  })
                  .then(() => setIsLike((prev) => !prev));
              } else {
                alert('로그인 후 이용 가능해요!');
                return;
              }
            }}
          >
            좋아요
          </button>
        )
      ) : (
        <button
          onClick={() => {
            alert('로그인 후 이용 가능해요!');
            return;
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
