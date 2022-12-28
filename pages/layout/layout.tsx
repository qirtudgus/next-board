import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { Logout } from '../../store/userInfoSlice';

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
export default function Layout({ children }: { children: React.ReactNode }) {
  const isLoading = useAppSelector((state) => state.isLoadingSlice.value);
  const isLogin = useAppSelector((state) => state.userInfoSlice.isLogin);
  const id = useAppSelector((state) => state.userInfoSlice.id);
  const idx = useAppSelector((state) => state.userInfoSlice.idx);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const checkNotLayoutPathname = (): boolean => {
    let isLayoutRendering = false;
    const notLayout = ['/login', '/register'];
    if (notLayout.includes(router.pathname)) {
      isLayoutRendering = true;
    }
    return isLayoutRendering;
  };

  const menuArr = [
    { menu: '홈', href: '/' },
    { menu: '회원가입', href: '/register' },
    { menu: '게시판', href: '/posts/list' },
    { menu: '게시판2', href: '/board?page=1' },
    { menu: '작성하기', href: '/posts/write' },
  ];

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!checkNotLayoutPathname() ? (
        <Header>
          <div>
            {isLogin ? (
              <p>
                {idx}
                {id}
              </p>
            ) : (
              <p>로그인 중이지않습니다.</p>
            )}
            <ul>
              {menuArr.map((i, index) => (
                <li key={index}>
                  <Link href={i.href}> {i.menu}</Link>
                </li>
              ))}
              {isLogin === false && (
                <li>
                  {/* 로그인 링크에 패스네임을 추가해주자 */}
                  <Link href={`/login?returnUrl=${router.pathname}&session=false`}>로그인</Link>
                </li>
              )}
              {isLogin && (
                <li
                  onClick={() => {
                    dispatch(Logout.logout()).then(() => {
                      router.push('/');
                    });
                  }}
                >
                  로그아웃
                </li>
              )}
            </ul>
          </div>
        </Header>
      ) : null}

      <Main>
        <div>{children}</div>
      </Main>
      {!checkNotLayoutPathname() ? (
        <Footer>
          <div>푸터영영입니다. </div>
        </Footer>
      ) : null}
    </>
  );
}
