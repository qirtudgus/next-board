import '../styles/globals.css';
import type { AppProps } from 'next/app';
import styled from 'styled-components';

const Header = styled.header`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #aaa;
`;
const Footer = styled.footer`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background-color: #aaa;
`;
const Main = styled.main`
  min-height: calc(100vh - 150px);
`;

//레이아웃을 설정하는법
//https://nextjs.org/docs/basic-features/layouts
function Layout({ children }: any) {
  return (
    <>
      <Header>헤더</Header>
      <Main>{children}</Main>
      <Footer>푸터영영입니다.</Footer>
    </>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
