import Link from 'next/link';
import styled from 'styled-components';

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
`;
const Main = styled.main`
  min-height: calc(100vh - ${HeaderHeight + FooterHeight}px);
`;

//레이아웃을 설정하는법
//https://nextjs.org/docs/basic-features/layouts
export default function Layout({ children }: any) {
  return (
    <>
      <Header>
        <ul>
          <li>
            <Link href={'/posts/list'}>게시판</Link>
          </li>
          <li>
            <Link href={'/posts/write'}>작성하기</Link>
          </li>
        </ul>
      </Header>
      <Main>{children}</Main>
      <Footer>푸터영영입니다.</Footer>
    </>
  );
}
