import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { Logout } from '../../store/userInfoSlice';

const HeaderHeight = 60;
const FooterHeight = 100;

const Header = styled.header`
  position: sticky;
  font-size: 0.95rem;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: ${HeaderHeight}px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid#c4c4c4;
  align-items: center;
  padding: 0 10px;
  & > div {
    max-width: 1000px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  & ul {
    display: flex;
    align-items: center;
    list-style: none;
  }
  & ul li {
    cursor: pointer;
    margin: 5px 10px;
  }
  & ul li:hover {
    color: ${({ theme }) => theme.colors.main};
  }
  & > div > ul > #openMenu li {
    width: 100px;
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

interface MenuInterface {
  isOpen: boolean;
}

const MyMenu = styled.div`
  position: relative;
  cursor: pointer;
  z-index: 2;
  display: flex;
  user-select: none;
  & svg {
    pointer-events: none;
  }
`;

const MenuDiv = styled.div<MenuInterface>`
  background-color: #fff;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  position: absolute;
  top: 40px;
  right: 0;
  display: none;
  padding: 15px;
  cursor: default;
  ${(props) =>
    props.isOpen &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    `}
`;

//레이아웃을 설정하는법
//https://nextjs.org/docs/basic-features/layouts
export default function Layout({ children }: { children: React.ReactNode }) {
  const isLoading = useAppSelector((state) => state.isLoadingSlice.value);
  const isLogin = useAppSelector((state) => state.userInfoSlice.isLogin);
  const id = useAppSelector((state) => state.userInfoSlice.id);
  const idx = useAppSelector((state) => state.userInfoSlice.idx);
  const [isMenu, setIsMenu] = useState(false);
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
    { menu: '게시판', href: '/posts' },
    { menu: '소개', href: '/intro' },
  ];

  useEffect(() => {
    const menuRenderControl = (e: MouseEvent) => {
      if (!e.target) return;
      let dom = e.target as Element;
      console.log(dom.getAttribute('id'));
      if (dom.getAttribute('id') === 'menuList') {
        setIsMenu(true);
        return;
      }
      if (dom.getAttribute('id') !== 'openMenu') {
        setIsMenu(false);
      }
    };

    document.addEventListener('click', menuRenderControl);
    return () => {
      document.removeEventListener('click', menuRenderControl);
    };
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!checkNotLayoutPathname() ? (
        <Header>
          <div>
            <ul>
              {menuArr.map((i, index) => (
                <li key={index}>
                  <Link href={i.href}> {i.menu}</Link>
                </li>
              ))}
            </ul>
            <ul>
              {!isLogin ? (
                <>
                  <li>
                    {/* 로그인 링크에 패스네임을 추가해주자 */}
                    <Link href={'/login'}>로그인</Link>
                    {/* <Link href={`/login?returnUrl=${router.pathname}&session=false`}>로그인</Link> */}
                  </li>
                  <li>
                    <Link href={'/register'}>회원가입</Link>
                  </li>
                </>
              ) : (
                <>
                  <MyMenu
                    id='openMenu'
                    onClick={() => {
                      setIsMenu((prev) => !prev);
                    }}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      enableBackground='new 0 0 24 24'
                      height='40px'
                      viewBox='0 0 24 24'
                      width='40px'
                      fill='#366bff'
                    >
                      <g>
                        <rect
                          fill='none'
                          height='24'
                          width='24'
                        />
                      </g>
                      <g>
                        <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z' />
                      </g>
                    </svg>
                    <MenuDiv
                      isOpen={isMenu}
                      id='menuList'
                    >
                      <li>{id}</li>
                      <li>마이페이지</li>
                      <li
                        onClick={() => {
                          dispatch(Logout.logout()).then(() => {
                            // router.push('/');
                            window.location.replace('/');
                          });
                        }}
                      >
                        로그아웃
                      </li>
                    </MenuDiv>
                  </MyMenu>
                </>
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
