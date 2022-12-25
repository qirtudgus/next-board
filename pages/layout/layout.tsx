import Link from 'next/link';
import styled from 'styled-components';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useAppSelector } from '../../store/store';

const HeaderHeight = 50;
const FooterHeight = 100;

const Header = styled.header`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: ${HeaderHeight}px;
  background-color: #aaa;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  & > div {
    max-width: 1000px;
    margin: 0 auto;
    width: 100%;
  }
  & ul {
    display: flex;

    list-style: none;
  }
  & ul li {
    margin: 0 10px;
  }
`;
const Footer = styled.footer`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: ${FooterHeight}px;
  background-color: #aaa;
  padding: 0 10px;
  & > div {
    /* width: 95%; */
    max-width: 1000px;
    margin: 0 auto;
  }
`;
const Main = styled.main`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  background-color: #fff;
  min-height: calc(100vh - ${HeaderHeight + FooterHeight}px);
  padding: 0 10px;
  & > div {
    margin: 0 auto;
  }
`;

//레이아웃을 설정하는법
//https://nextjs.org/docs/basic-features/layouts
export default function Layout({ children }: any) {
  const isLoading = useAppSelector((state) => state.isLoadingSlice.value);
  const menuArr = [
    { menu: '홈', href: '/' },
    { menu: '로그인', href: '/login' },
    { menu: '회원가입', href: '/login/register' },
    { menu: '게시판', href: '/posts/list' },
    { menu: '작성하기', href: '/write' },
    { menu: '리덕스 테스트', href: '/reduxTestPage' },
  ];
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Header>
        <div>
          <ul>
            {menuArr.map((i, index) => (
              <li key={index}>
                <Link href={i.href}> {i.menu}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Header>

      <Main>
        <div>{children}</div>
      </Main>
      <Footer>
        <div>푸터영영입니다. </div>
      </Footer>
    </>
  );
}
