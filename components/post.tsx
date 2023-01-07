import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import CommentCountSVG from './CommentCountSVG';
import LikeCountSVG from './LikeCountSVG';
import ViewCountSVG from './viewCountSVG';

const BoardLi = styled.li`
  &:first-child {
    border-top: 1px solid#c4c4c4;
    margin-top: 10px;
  }
  border-bottom: 1px solid#c4c4c4;
`;

const BoardDiv = styled.div`
  width: 100%;
  padding: 0.3em 0;
  & > div {
    margin-top: 3px;
  }
`;

const BoardUserInfo = styled.div`
  font-size: 0.8rem;
`;

const BoardTitle = styled.div`
  font-size: 0.9em;

  & a {
    display: block;
    max-width: fit-content;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & a:hover {
    color: ${({ theme }) => theme.colors.main};
  }
`;

const BoardFooterInfo = styled.div`
  display: flex;
  /* text-align: left; */
  justify-content: flex-end;
  & span {
    display: flex;
    align-items: center;
    margin-right: 7px;
  }
  & svg {
    opacity: 0.7;
    margin-right: 2px;
  }
`;

export interface ListInterface {
  idx: string;
  userId: string;
  date: string;
  title: string;
  viewCount: string;
  likeCount: string;
  commentCount: string;
}

const Posts = ({ idx, userId, date, title, viewCount, commentCount, likeCount }: ListInterface) => {
  return (
    <React.Fragment key={idx}>
      <BoardLi>
        <BoardDiv>
          <BoardUserInfo>
            {userId} {date}
          </BoardUserInfo>
          <BoardTitle>
            <Link href={`/posts/${idx}`}> {title} </Link>
          </BoardTitle>
          <BoardFooterInfo>
            <span>
              <LikeCountSVG />
              {likeCount}
            </span>
            <span>
              <CommentCountSVG />
              {commentCount}
            </span>
            <span>
              <ViewCountSVG />
              {viewCount}
            </span>
          </BoardFooterInfo>
        </BoardDiv>
      </BoardLi>
    </React.Fragment>
  );
};

export default Posts;
