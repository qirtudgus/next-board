import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { RefObject, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../store/store';
import customAxios from '../../utils/customAxios';
import { BoardInterface } from './[idx]';

interface EditInterface extends BoardInterface {
  idx: string;
}

const Edit = (props: EditInterface) => {
  let titleRef = useRef() as RefObject<HTMLInputElement>;
  let contentRef = useRef() as RefObject<HTMLInputElement>;
  const userId = useAppSelector((state) => state.userInfoSlice.id);
  const router = useRouter();

  useEffect(() => {
    if (userId !== props.data[0].userId) {
      alert('권한이 없어요!');
      router.push('/');
    }
  }, []);

  return (
    <>
      제목 :{' '}
      <input
        ref={titleRef}
        defaultValue={props.data[0].title}
      ></input>
      내용 :{' '}
      <input
        ref={contentRef}
        defaultValue={props.data[0].content}
      ></input>
      <button
        onClick={() => {
          customAxios('PUT', '/api/posts', {
            idx: props.idx,
            title: titleRef.current?.value,
            content: contentRef.current?.value,
          }).then((res) => {
            if (res!.status === 201) {
              router.push('/board');
            }
          });
        }}
      >
        수정하기
      </button>
    </>
  );
};

export default Edit;

export const getServerSideProps: GetServerSideProps = async (context) => {
  //context 인자에는 다양한 키가 들어있다. 아래 코드는 context에서 동적 경로 페이지 정보를 가져와서 그 번호로 axios 요청을 한것

  let { data }: BoardInterface = await customAxios('GET', `/posts?idx=${context.query.idx}`);

  //   console.log(context.query)
  // let { data }: BoardInterface = await axios.get(
  //   `http://172.30.1.19:3000/api/getBoard?idx=${context.params.idx}`,
  // );
  let idx = context.query.idx;

  return {
    props: {
      data,
      idx,
    },
  };
};
