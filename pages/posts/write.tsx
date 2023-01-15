import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router';
import { RefObject, useRef, useState } from 'react';
import styled from 'styled-components';
import { SolidButton } from '../../components/BasicButton';
import BasicTitle from '../../components/BasicTitle';
import { useAppSelector } from '../../store/store';
import customAxios from '../../utils/customAxios';

const TitleInput = styled.div`
  margin-top: 15px;
  width: 100%;
  & input {
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid#c4c4c4;
  }
`;

const ContentInput = styled.div`
  margin-top: 15px;
  width: 100%;
  & textarea {
    width: 100%;
    min-height: 200px;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid#c4c4c4;
    resize: none;
  }
`;

const Write = () => {
  let nameRef = useRef() as RefObject<HTMLInputElement>;
  let titleRef = useRef() as RefObject<HTMLInputElement>;
  let contentRef = useRef() as RefObject<HTMLTextAreaElement>;
  const userId = useAppSelector((state) => state.userInfoSlice.id);
  const router = useRouter();

  return (
    <>
      <BasicTitle BasicTitleValue='게시물 작성'></BasicTitle>
      <TitleInput>
        제목
        <input
          placeholder='제목을 입력해주세요.'
          ref={titleRef}
        ></input>
      </TitleInput>
      <ContentInput>
        내용{' '}
        <textarea
          placeholder='내용을 입력해주세요.'
          ref={contentRef}
        ></textarea>
      </ContentInput>
      <SolidButton
        BasicButtonValue='작성하기'
        OnClick={() => {
          console.log(nameRef.current?.value);
          customAxios('POST', '/posts', {
            userId,
            title: titleRef.current?.value,
            content: contentRef.current?.value,
            date: moment().format('YYYY-MM-DD hh:mm:ss'),
          }).then((res) => {
            if (res.status === 201) {
              router.push('/posts');
            } else {
              alert('게시물 등록 오류');
              router.push('/posts');
            }
          });
        }}
      ></SolidButton>
    </>
  );
};

export default Write;
