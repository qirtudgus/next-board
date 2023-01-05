import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router';
import { RefObject, useRef, useState } from 'react';
import { useAppSelector } from '../../store/store';

const Write = () => {
  let nameRef = useRef() as RefObject<HTMLInputElement>;
  let titleRef = useRef() as RefObject<HTMLInputElement>;
  let contentRef = useRef() as RefObject<HTMLInputElement>;
  const userId = useAppSelector((state) => state.userInfoSlice.id);
  const router = useRouter();

  return (
    <>
      제목 : <input ref={titleRef}></input>
      내용 : <input ref={contentRef}></input>
      <button
        onClick={() => {
          console.log(nameRef.current?.value);
          axios
            .post('/posts', {
              userId,
              title: titleRef.current?.value,
              content: contentRef.current?.value,
              date: moment().format('YYYY-MM-DD hh:mm:ss'),
            })
            .then((res) => {
              if (res.status === 201) {
                router.push('/posts');
              }
            });
        }}
      >
        작성하기
      </button>
    </>
  );
};

export default Write;
