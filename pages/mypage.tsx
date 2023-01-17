import Head from 'next/head';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import BasicTitle from '../components/BasicTitle';
import { useAppSelector } from '../store/store';
import customAxios from '../utils/customAxios';

const Wrap = styled.div`
  width: 100%;

  height: 500px;
  margin-top: 30px;
  display: flex;
  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
    /* margin: none; */
    margin-top: 0px;
    height: fit-content;
  }
`;

const MenuWrap = styled.div`
  width: 20%;
  height: 100%;
  flex-shrink: 0;
  & li {
    width: 90%;
    cursor: pointer;
    padding: 5px;
    border-radius: 4px;
    margin: 20px 0;
    text-align: center;
  }
  & li:hover {
    color: ${({ theme }) => theme.colors.main};
  }
  & li.active {
    color: #fff;
    background: ${({ theme }) => theme.colors.main};
  }
  & li.active:hover {
    color: #fff;
    background: ${({ theme }) => theme.colors.main};
  }

  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    height: fit-content;
    & li {
      width: 100%;
      margin: 5px 0;
    }
  }
`;
const ContentWrap1 = styled.div`
  width: 80%;
  flex-shrink: 0;
  height: 100%;
  display: flex;
  border-radius: 10px;
  border: 1px solid#c4c4c4;
  align-items: flex-start;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    justify-content: center;
    flex-direction: column;
  }
`;

const ContentWrap2 = styled.div`
  width: 80%;
  height: 100%;

  display: flex;
  border-radius: 10px;
  border: 1px solid#c4c4c4;
  align-items: center;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    justify-content: center;
    flex-direction: column;
  }
`;

const UserInfoWrap = styled.div`
  display: flex;
  flex-direction: column;

  & > div {
    padding: 15px;
  }
  & .content {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const Title = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.main};
`;

const ContentBox = styled.div`
  width: 90%;
  height: 250px;
  background: #fff;
`;

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({ name: '', userId: '', joinedDate: '' });
  const userIdx = useAppSelector((state) => state.userInfoSlice.idx);
  const [tabNum, SetTabNum] = useState(0);
  useEffect(() => {
    customAxios('GET', `/mypage/userInfo?userIdx=${userIdx}`).then((res) => {
      console.log(res.data);
      setUserInfo(res.data);
    });
  }, []);

  const TabMenuArr = [{ name: '계정 정보' }, { name: '활동 내역' }];

  return (
    <>
      <Head>
        <title>마이 페이지</title>
      </Head>
      <BasicTitle BasicTitleValue='내 정보'></BasicTitle>
      <Wrap>
        <MenuWrap>
          <ul>
            {TabMenuArr.map((i, index) => {
              return (
                <li
                  key={index}
                  className={tabNum === index ? 'active' : ''}
                  onClick={() => {
                    SetTabNum(index);
                  }}
                >
                  {i.name}
                </li>
              );
            })}
          </ul>
        </MenuWrap>
        {/* <ContentWrap>
          {tabNum === 0 && (
            <UserInfoWrap>
              <div>
                <p className='title'>이름</p>
                <p className='content'>{userInfo.name}</p>
              </div>
              <div>
                <p className='title'>아이디</p>
                <p className='content'>{userInfo.userId}</p>
              </div>
              <div>
                <p className='title'>가입 날짜</p>
                <p className='content'> {userInfo.joinedDate}</p>
              </div>
            </UserInfoWrap>
          )}
          {tabNum === 1 && (
            <>
              <ContentBox>내 최근 글</ContentBox>
              <ContentBox>오늘 글 활동량</ContentBox>
              <ContentBox>오늘 댓글 활동량</ContentBox>
            </>
          )}
        </ContentWrap> */}

        {tabNum === 0 && (
          <ContentWrap1>
            <>
              <UserInfoWrap>
                <div>
                  <Title className='title'>이름</Title>
                  <p className='content'>{userInfo.name}</p>
                </div>
                <div>
                  <Title className='title'>아이디</Title>
                  <p className='content'>{userInfo.userId}</p>
                </div>
                <div>
                  <Title className='title'>가입 날짜</Title>
                  <p className='content'> {userInfo.joinedDate}</p>
                </div>
              </UserInfoWrap>
            </>
          </ContentWrap1>
        )}

        {tabNum === 1 && (
          <ContentWrap2>
            <>
              <ContentBox>
                <Title className='title'>내 최근 글</Title>
              </ContentBox>
              <ContentBox>
                <Title className='title'>오늘 글 활동량</Title>
              </ContentBox>
              <ContentBox>
                <Title className='title'>오늘 댓글 활동량</Title>
              </ContentBox>
            </>
          </ContentWrap2>
        )}
      </Wrap>
    </>
  );
};

export default MyPage;
