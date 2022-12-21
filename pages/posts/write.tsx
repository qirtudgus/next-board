import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router';
import { RefObject, useRef, useState } from 'react';

const Write = () => {
  let nameRef = useRef() as RefObject<HTMLInputElement>;
  let titleRef = useRef() as RefObject<HTMLInputElement>;
  let contentRef = useRef() as RefObject<HTMLInputElement>;
  const router = useRouter();

  return (
    <>
      닉네임 : <input ref={nameRef}></input>
      제목 : <input ref={titleRef}></input>
      내용 : <input ref={contentRef}></input>
      <button
        onClick={() => {
          console.log(nameRef.current?.value);
          axios
            .post('/api/addBoard', {
              nickname: nameRef.current?.value,
              title: titleRef.current?.value,
              content: contentRef.current?.value,
              date: moment().format('YYYY-MM-DD hh:mm:ss'),
            })
            .then((res) => {
              if (res.status === 201) {
                router.push('/posts/list');
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
