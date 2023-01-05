import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

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
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='#000000'
                width='17px'
                height='17px'
              >
                <path
                  d='M0 0h24v24H0V0z'
                  fill='none'
                />
                <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
              </svg>
              {likeCount}
            </span>{' '}
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='#000000'
                width='17px'
                height='17px'
              >
                <path
                  d='M0 0h24v24H0V0z'
                  fill='none'
                />
                <path d='M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zM7 9h2v2H7zm8 0h2v2h-2zm-4 0h2v2h-2z' />
              </svg>
              {commentCount}
            </span>{' '}
            <span>
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
              {viewCount}
            </span>
          </BoardFooterInfo>
        </BoardDiv>
      </BoardLi>
    </React.Fragment>
  );
};

export default Posts;
