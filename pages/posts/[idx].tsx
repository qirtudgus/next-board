import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import customAxios from '../../utils/customAxios';
import { useAppSelector } from '../../store/store';
import { SolidButton } from '../../components/BasicButton';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import styled, { css, keyframes } from 'styled-components';
import ViewCountSVG from '../../components/viewCountSVG';
import Comment from '../../components/Comment';

interface commentPropsInterface {
  idx: string;
  userId: string;
  userIdx: string;
  content: string;
  date: string;
  postIdx: string;
}

export interface PostInterface {
  data: {
    post: postPropsInterface[];
    comment: commentPropsInterface[];
  };
}
interface postPropsInterface {
  idx: number;
  title: string;
  content: string;
  date: string;
  userId: string;
  likeList: string;
  viewCount: string;
  likeCount: string;
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
  justify-content: space-between;
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

const UserInfoWrap = styled.div`
  display: flex;
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
  padding: 15px;
  background: #fff;
  position: absolute;
  top: 20px;
  border-radius: 4px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  animation: ${modalAni} 0.15s;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  & > li {
    cursor: pointer;
    margin: 5px 0;
  }
  & > li:hover {
    color: ${({ theme }) => theme.colors.main};
  }
`;

const BorderLine = styled.div`
  width: 100%;
  border-bottom: 1px solid #c4c4c4;
  padding-top: 15px;
`;

interface LikeInterface {
  isLike: boolean;
}

const LikeWrap = styled.div`
  width: 100%;
  padding-top: 50px;
  position: relative;
  display: flex;
  justify-content: center;
  user-select: none;
`;

const LikeDiv = styled.div<LikeInterface>`
  position: relative;
  z-index: 3;
  width: fit-content;
  height: fit-content;
  background: #fff;
  border: 2px solid ${({ theme }) => theme.colors.main};
  border-radius: 4px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  & .likeCount {
  }

  ${(props) =>
    props.isLike &&
    css`
      /* border: none; */
      /* background: ${({ theme }) => theme.colors.main}; */
    `}
`;

const LikeButton = styled.button`
  background: ${({ theme }) => theme.colors.main};
  width: 60px;
  height: 40px;
  outline: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  color: #fff;
`;

const ViewCountDiv = styled.div`
  width: fit-content;
  background: #fff;
  position: relative;
  z-index: 2;
  padding: 0 10px;
`;

const HeartAni = keyframes`
  from{transform:translateY(0px) ;opacity:1};
  70% {opacity:1}
  to{transform:translateY(-40px) ;opacity:0}
`;

const LikeAniHeart = styled.div`
  position: absolute;
  z-index: 0;
  width: 20px;
  height: 20px;
  animation: ${HeartAni} 0.6s ease;
`;

const CommentWrap = styled.div`
  width: 100%;
  height: fit-content;
  padding: 10px 10px 5px 10px;
  background: #eee;
  border: 1px solid#c4c4c4;
  margin-top: 60px;
  border-radius: 4px;
`;

const CommentArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  resize: none;
`;

const CommentBtnWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
const CommentBtn = styled(SolidButton)``;

const NoComments = styled.div`
  width: 100%;
  height: 100px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: #c4c4c4;
`;

export default function Post({ propsPost, comment }: any) {
  const router = useRouter();
  const idx = router.query.idx;
  const { id: userId, idx: userIdx, isLogin } = useAppSelector((state) => state.userInfoSlice);
  const [isLike, setIsLike] = useState<boolean>(propsPost.likeList.includes(userIdx.toString()));
  const [isOpen, setOpen] = useState(false);
  const [isLikeHeart, setIsLikeHeart] = useState(false);

  const textareaRef = useRef() as RefObject<HTMLTextAreaElement>;
  const [post, setPost] = useState<postPropsInterface>({
    idx: propsPost.idx,
    title: propsPost.title,
    content: propsPost.content,
    date: propsPost.date,
    userId: propsPost.userId,
    likeList: propsPost.likeList,
    viewCount: propsPost.viewCount,
    likeCount: propsPost.likeCount,
  });

  const [comments, setComments] = useState<commentPropsInterface[]>([...comment]);

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
        setIsLikeHeart(false);
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
        setIsLikeHeart(true);
      });
    } else {
      alert('로그인 후 이용 가능해요!');
      return;
    }
  };

  useEffect(() => {
    const handleCloseModal = (e: MouseEvent) => {
      if (
        (e.target as Element).getAttribute('id') === 'moreBtn' ||
        (e.target as Element).getAttribute('id') === 'moreBtnList'
      ) {
        return;
      } else {
        setOpen(false);
        return;
      }
    };

    const commentCloseModal = (e: MouseEvent) => {
      if (
        (e.target as Element).getAttribute('id') === 'commentMoreBtn' ||
        (e.target as Element).getAttribute('id') === 'commentMoreBtnList'
      ) {
        return;
      } else {
        let activeDom = document.getElementsByClassName('active');
        if (activeDom.length !== 0) {
          activeDom[0].classList.remove('active');
        }
      }
    };

    document.addEventListener('click', handleCloseModal);
    document.addEventListener('click', commentCloseModal);
    return () => {
      document.removeEventListener('click', handleCloseModal);
      document.removeEventListener('click', commentCloseModal);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta
          property='og:title'
          content={post.title}
          key='title'
        />
      </Head>
      <UserInfo>
        <UserInfoWrap>
          <p className='userId'>{post.userId}</p>
          <p>{post.date}</p>
          <p>
            <ViewCountSVG />
            {post.viewCount}
          </p>
        </UserInfoWrap>
        {userId === post.userId && (
          <MoreBtnDiv>
            <MoreBtn
              onClick={() => {
                setOpen((prev) => !prev);
              }}
              id='moreBtn'
              xmlns='http://www.w3.org/2000/svg'
              height='24px'
              viewBox='0 0 24 24'
              width='24px'
              fill='#000000'
            >
              <path
                d='M0 0h24v24H0z'
                fill='none'
              />
              <path d='M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z' />
            </MoreBtn>
            {isOpen && (
              <MoreBtnList id='moreBtnList'>
                <li onClick={deletePost}>삭제하기</li>
                <li onClick={moveEditPost}>수정하기</li>
              </MoreBtnList>
            )}
          </MoreBtnDiv>
        )}
      </UserInfo>
      <BorderLine />
      <Title>{post.title}</Title>
      <h3>{post.content}</h3>
      <LikeWrap>
        <LikeDiv isLike={isLike}>
          {isLike ? (
            <LikeButton onClick={doNotLike}>취소</LikeButton>
          ) : (
            <LikeButton onClick={doLike}>좋아요!</LikeButton>
          )}
          <ViewCountDiv className='likeCount'>{post.likeCount}</ViewCountDiv>
        </LikeDiv>
        {isLikeHeart && (
          <LikeAniHeart>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='#366bff'
              width='30px'
              height='30px'
            >
              <path
                d='M0 0h24v24H0V0z'
                fill='none'
              />
              <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
            </svg>
          </LikeAniHeart>
        )}
      </LikeWrap>
      <BorderLine />
      {comments.length === 0 && <NoComments>달린 댓글이 없어요..</NoComments>}
      {comments.map((i, index) => {
        return (
          <React.Fragment key={index}>
            <Comment
              userId={i.userId}
              userIdx={i.idx}
              content={i.content}
              date={i.date}
              commentIdx={i.idx}
              commentLength={comments.length}
              postIdx={idx as string}
              setComments={setComments}
            ></Comment>
          </React.Fragment>
        );
      })}
      <CommentWrap>
        <CommentArea ref={textareaRef} />
        <CommentBtnWrap>
          <CommentBtn
            OnClick={() => {
              //공백 체크
              let blank_pattern = /^\s+|\s+$/g;
              console.log('댓글 등록 함수');
              if (!isLogin) {
                alert('로그인 후 이용 가능합니다.');
              } else if (
                textareaRef.current?.value === '' ||
                textareaRef.current?.value.replace(blank_pattern, '') == ''
              ) {
                alert('내용을 입력해주세요');
              } else {
                customAxios('POST', '/comment', {
                  userId,
                  userIdx,
                  content: textareaRef.current?.value,
                  date: new Date(),
                  postIdx: idx,
                }).then((res) => {
                  console.log(res);
                  textareaRef.current!.value = '';
                  setComments([...res.data]);
                });
              }
            }}
            BasicButtonValue='등록'
            width={80}
            height={30}
            marginTop={0}
          ></CommentBtn>
        </CommentBtnWrap>
      </CommentWrap>
    </>
  );
}

//getServerSideProps를 호출하면 프론트에 렌더링되기전에 서버에서 데이터를 받아와 사용할 수 있다.
//getServerSideProps를 사용하는 페이지는 요청 시 서버 측에서 렌더링되며 캐시 제어 헤더가 구성된 경우에만 캐시된다.
//해당 함수는 요청하는 동안 데이터를 렌더링 할 필요가 있을 때 사용되는것이 Best다. ex)게시물 등..
//요청하는동안 데이터를 렌더링할 필요가 없는 경우 클라이언트측이나 StaticProps를 가져오는것을 고려
export const getServerSideProps: GetServerSideProps = async (context) => {
  //context 인자에는 다양한 키가 들어있다. 아래 코드는 context에서 동적 경로 페이지 정보를 가져와서 그 번호로 axios 요청을 한것
  let { data }: PostInterface = await customAxios('GET', `/posts?idx=${context.params?.idx}`);
  return {
    props: {
      propsPost: data.post[0],
      comment: data.comment,
    },
  };
};
