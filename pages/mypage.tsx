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
  }
`;

const MenuWrap = styled.div`
  width: 20%;
  height: 100%;
  & li {
    cursor: pointer;
    margin: 20px 0;
    text-align: center;
  }
  & li:hover {
    color: ${({ theme }) => theme.colors.main};
  }

  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    height: fit-content;
  }
`;
const ContentWrap = styled.div`
  width: 80%;
  height: 100%;
  border-radius: 10px;
  border: 1px solid#c4c4c4;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({ name: '', userId: '' });
  const userIdx = useAppSelector((state) => state.userInfoSlice.idx);

  useEffect(() => {
    customAxios('GET', `/mypage/userInfo?userIdx=${userIdx}`).then((res) => {
      console.log(res.data);
    });
  }, []);

  return (
    <>
      <BasicTitle BasicTitleValue='내 정보'></BasicTitle>
      <Wrap>
        <MenuWrap>
          <ul>
            <li>계정 정보</li>
            <li>활동 내역</li>
          </ul>
        </MenuWrap>
        <ContentWrap></ContentWrap>
      </Wrap>
    </>
  );
};

export default MyPage;
