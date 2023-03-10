import { rejects } from 'assert';
import React from 'react';
import { Dispatch, SetStateAction, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAppSelector } from '../store/store';
import customAxios from '../utils/customAxios';

const CommentListWrap = styled.div`
  width: 100%;
  height: fit-content;
  border-bottom: 1px solid#c4c4c4;
`;

const CommentListHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentListUserInfo = styled.div`
  font-size: 14px;
  display: flex;
  padding: 5px 0 0;
  & .date {
    color: #858585;
    font-size: 13px;
    padding-left: 10px;
  }
`;

const CommentListContent = styled.div`
  font-size: 15px;
  padding: 10px 0 10px;
`;

const MoreBtnDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
`;

const MoreBtn = styled.svg`
  user-select: none;
  position: relative;
  cursor: pointer;
  &:hover {
    fill: ${({ theme }) => theme.colors.main};
  }
  & path {
    pointer-events: none;
  }
`;

export const modalAni = keyframes`
  from{opacity:0}
  to{opacity:1}
`;

const MoreBtnList = styled.div`
  width: 100px;
  height: fit-content;
  padding: 10px;
  background: #fff;
  position: absolute;
  top: 20px;
  border-radius: 4px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  animation: ${modalAni} 0.15s;
  display: none;
  flex-direction: column;
  align-items: flex-start;
  & > li {
    font-size: 14px;
    cursor: pointer;
    margin: 5px 0;
  }
  & > li:hover {
    color: ${({ theme }) => theme.colors.main};
  }

  &.active {
    display: flex;
  }
`;

export interface CommentInterface {
  userId: string;
  date: string;
  userIdx: string;
  content: string;
  commentIdx: string;
  commentLength: number;
  postIdx: string;
  setComments: Dispatch<SetStateAction<any[]>>;
}
const Comment = ({ userId, date, userIdx, content, commentIdx, postIdx, setComments }: CommentInterface) => {
  const loginId = useAppSelector((state) => state.userInfoSlice.id);

  const commentDelete = () => {
    if (window.confirm('????????? ??????????????????????')) {
      customAxios('DELETE', `/comment?commentIdx=${commentIdx}&postIdxQuery=${postIdx}`).then((res) => {
        console.log(res.data);
        setComments([...res.data]);
      });
    }
  };

  return (
    <CommentListWrap>
      <CommentListHeader>
        <CommentListUserInfo>
          <p>{userId}</p>
          <p className='date'>{date} </p>
        </CommentListUserInfo>
        {loginId === userId && (
          <MoreBtnDiv>
            <MoreBtn
              onClick={(e) => {
                let dom = e.target as HTMLElement;
                let activeDom = document.getElementsByClassName('active');
                //?????? ????????? ????????? ?????? ??????
                if (dom.nextElementSibling?.classList.contains('active')) {
                  activeDom[0].classList.remove('active');
                } else {
                  //?????? ????????? ????????? ???, ???????????? ????????? ????????? ???????????? ??? ????????? ?????? ??????
                  if (activeDom.length !== 0) activeDom[0].classList.remove('active');
                  dom.nextElementSibling?.classList.add('active');
                }
              }}
              id='commentMoreBtn'
              xmlns='http://www.w3.org/2000/svg'
              height='24px'
              viewBox='0 0 24 24'
              width='24px'
              fill='#979797'
            >
              <path
                d='M0 0h24v24H0z'
                fill='none'
              />
              <path d='M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z' />
            </MoreBtn>
            <MoreBtnList id='commentMoreBtnList'>
              <li onClick={commentDelete}>????????????</li>
            </MoreBtnList>
          </MoreBtnDiv>
        )}
      </CommentListHeader>
      <CommentListContent>{content}</CommentListContent>
    </CommentListWrap>
  );
};

export default React.memo(Comment);
