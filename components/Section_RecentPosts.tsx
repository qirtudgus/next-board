import styled from 'styled-components';
import customAxios from '../utils/customAxios';
import cheerio from 'cheerio';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Wrap = styled.div`
  width: 100%;
  height: 600px;
  background-color: #202124;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Title = styled.div`
  color: #fff;
  font-size: 72px;
  font-weight: bold;
  letter-spacing: -2px;
  margin-bottom: 30px;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 54px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 44px;
  }
`;

const PostWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.device.mobile} {
    overflow-y: scroll;
    flex-wrap: nowrap;
    flex-direction: column;
  }
`;

const Post = styled(motion.div)`
  cursor: pointer;
  width: 250px;
  height: 300px;
  background: #fff;
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  &:hover {
    /* &::after {
      content: '';
      position: absolute;
      z-index: 100;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: red;
    } */
    & .ImgDiv {
      /* height: 0px; */
    }
    & .TitleDiv {
      height: 100%;
      background: rgba(0, 0, 0, 1);
      /* position: absolute; */
    }
  }
`;

const ImgDiv = styled.div`
  width: 250px;
  height: 150px;
`;

const TitleDiv = styled.div`
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  bottom: 0px;
  height: 100px;
  padding: 0 10px;
  position: relative;
  z-index: 2;
  color: #fff;
  transition: 0.5s all;

  & .titleText {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
  }
  &:hover .titleText {
    white-space: normal;
  }
`;

const AtagWrap = styled(motion.a)``;

const Section_RecentPosts = () => {
  interface postsInterface {
    titleList: string[];
    dateList: string[];
    imgList: string[];
    categoryList: string[];
    linkList: string[];
  }

  const [posts, setPosts] = useState<postsInterface>({
    titleList: [],
    dateList: [],
    imgList: [],
    categoryList: [],
    linkList: [],
  });

  useEffect(() => {
    let a = async () => {
      let { data } = await customAxios('GET', '/recentposts');
      setPosts(data);
      console.log(data);
    };
    a();
  }, []);

  return (
    <Wrap>
      <Title>Recent Posts</Title>
      <PostWrap>
        {posts.titleList.map((i, idx) => {
          return (
            <AtagWrap
              key={idx}
              href={posts.linkList[idx]}
              target='_blank'
              rel='noreferrer'
            >
              <Post>
                {/* {i} */}
                <ImgDiv className='ImgDiv'>
                  <Image
                    src={posts.imgList[idx]}
                    alt='썸네일'
                    width={250}
                    height={250}
                  ></Image>
                </ImgDiv>
                <TitleDiv className='TitleDiv'>
                  <div>{posts.categoryList[idx]}</div>
                  <div>{posts.dateList[idx]}</div>
                  <div className='titleText'>{i}</div>
                </TitleDiv>
              </Post>{' '}
            </AtagWrap>
          );
        })}
      </PostWrap>
    </Wrap>
  );
};

export default Section_RecentPosts;
