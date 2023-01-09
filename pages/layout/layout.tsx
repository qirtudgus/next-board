import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { Logout } from '../../store/userInfoSlice';
import { modalAni } from '../posts/[idx]';

const HeaderHeight = 60;
const FooterHeight = 180;

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

  & .leftMenu {
    display: flex;
    @media ${({ theme }) => theme.device.tablet} {
      display: none;
    }
    @media ${({ theme }) => theme.device.mobile} {
    }
  }
`;

const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Logo = styled.div`
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: bold;
  padding-right: 15px;
  user-select: none;
`;

const Footer = styled.footer`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: ${FooterHeight}px;
  background-color: #eee;
  padding: 0 10px;
  border-top: 1px solid#c4c4c4;
  & > div {
    /* width: 95%; */

    max-width: 1000px;
    margin: 15px auto;
  }
`;
const Main = styled.main`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  background-color: #fff;
  min-height: calc(100vh - ${HeaderHeight + FooterHeight}px);
  /* min-height: 100vh; */
  padding: 0 10px;
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
  box-shadow: ${({ theme }) => theme.boxShadow};
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
      animation: ${modalAni} 0.15s;
    `}
`;

const PcLoginButtonUl = styled.ul`
  display: block;
  @media ${({ theme }) => theme.device.tablet} {
    display: none !important;
  }
  @media ${({ theme }) => theme.device.mobile} {
  }
`;

const MobileLoginButtonUl = styled.div`
  width: auto;
  height: auto;
  cursor: pointer;
  display: none;
  position: relative;
  user-select: none;
  z-index: 101;
  @media ${({ theme }) => theme.device.tablet} {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media ${({ theme }) => theme.device.mobile} {
  }
`;

const MobileLoginButtonDiv = styled.div<SlideMenu>`
  position: fixed;
  right: -230px;
  top: 0;
  height: 100%;
  /* width: 100%; */
  width: 230px;
  background: #fff;
  transition: none;
  z-index: 100;
  display: none;
  @media ${({ theme }) => theme.device.tablet} {
    display: flex;
  }
  @media ${({ theme }) => theme.device.mobile} {
  }

  ${(props) =>
    props.isOpen &&
    css`
      right: 0;
      transition: all 0.3s ease;
    `}

  & ul {
    width: 100%;
    margin-top: ${HeaderHeight}px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 17px;
  }
  & ul li {
    margin: 10px 30px;
    width: 100%;
  }
  & ul li a {
    width: 100px;
  }
`;

const MobileCenterLine = styled.div`
  width: 80%;
  background: #c4c4c4;
  height: 1px;
  margin: 15px auto;
`;

const Bg = styled.div`
  position: fixed;
  z-index: 99;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: none;
  /* &.active {
    display: block;
  } */
  @media ${({ theme }) => theme.device.tablet} {
    display: block;
    animation: ${modalAni} 0.3s;
  }
`;

interface SlideMenu {
  isOpen: boolean;
}

//레이아웃을 설정하는법
//https://nextjs.org/docs/basic-features/layouts
export default function Layout({ children }: { children: React.ReactNode }) {
  const isLoading = useAppSelector((state) => state.isLoadingSlice.value);
  const isLogin = useAppSelector((state) => state.userInfoSlice.isLogin);
  const id = useAppSelector((state) => state.userInfoSlice.id);
  const idx = useAppSelector((state) => state.userInfoSlice.idx);
  const [isMenu, setIsMenu] = useState(false);
  const [isSlideMenuOpen, setIsSlideOpenMenu] = useState(false);
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

  const logout = () => {
    setIsSlideOpenMenu(false);
    dispatch(Logout.logout()).then(() => {
      window.location.replace('/');
    });
  };

  useEffect(() => {
    const menuRenderControl = (e: MouseEvent) => {
      if (!e.target) return;
      let dom = e.target as Element;
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

  useEffect(() => {
    //모바일 메뉴창이 타블렛 사이즈를 넘어갈 시 상태값을 false 초기화 시키기 위함
    //쓰로틀링을 통해 과부하 방지
    //타임아웃 타입 지정
    //https://stackoverflow.com/questions/45802988/typescript-use-correct-version-of-settimeout-node-vs-window
    let timer: number | null;
    window.onresize = () => {
      if (!timer) {
        timer = window.setTimeout(function () {
          timer = null;
          if (window.innerWidth > 768) {
            setIsSlideOpenMenu(false);
          }
        }, 300);
      }
    };
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!checkNotLayoutPathname() && (
        <Header>
          <div>
            <LogoDiv>
              <Logo
                onClick={() => {
                  router.push('/');
                }}
              >
                LOGO
              </Logo>
              <ul className='leftMenu'>
                {menuArr.map((i, index) => (
                  <li key={index}>
                    <Link href={i.href}>{i.menu}</Link>
                  </li>
                ))}
              </ul>
            </LogoDiv>
            <MobileLoginButtonUl
              onClick={() => {
                setIsSlideOpenMenu((prev) => !prev);
              }}
            >
              {isSlideMenuOpen ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='35px'
                  viewBox='0 0 24 24'
                  width='35px'
                  fill='#000000'
                >
                  <path
                    d='M0 0h24v24H0z'
                    fill='none'
                  />
                  <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='35px'
                  viewBox='0 0 24 24'
                  width='35px'
                  fill='#366bff'
                >
                  <path
                    d='M0 0h24v24H0V0z'
                    fill='none'
                  />
                  <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
                </svg>
              )}
            </MobileLoginButtonUl>
            <MobileLoginButtonDiv isOpen={isSlideMenuOpen}>
              <ul>
                {menuArr.map((i, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setIsSlideOpenMenu((prev) => !prev);
                      router.push(i.href);
                    }}
                  >
                    {i.menu}
                  </li>
                ))}
                <MobileCenterLine />
                {isLogin ? (
                  <>
                    <li
                      onClick={() => {
                        setIsSlideOpenMenu((prev) => !prev);
                        router.push('/mypage');
                      }}
                    >
                      내 정보
                    </li>
                    <li onClick={logout}>로그아웃</li>
                  </>
                ) : (
                  <li
                    onClick={() => {
                      router.push(`/login?returnUrl=${router.asPath}&session=false`);
                    }}
                  >
                    로그인
                  </li>
                )}
              </ul>
            </MobileLoginButtonDiv>{' '}
            {isSlideMenuOpen && <Bg></Bg>}
            <PcLoginButtonUl>
              {!isLogin ? (
                <>
                  <li>
                    {/* 로그인 링크에 패스네임을 추가해주자 */}
                    <Link href={`/login?returnUrl=${router.asPath}&session=false`}>로그인</Link>
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
                      height='35px'
                      viewBox='0 0 24 24'
                      width='35px'
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
                      <li
                        onClick={() => {
                          router.push('/mypage');
                        }}
                      >
                        내 정보
                      </li>
                      <li onClick={logout}>로그아웃</li>
                    </MenuDiv>
                  </MyMenu>
                </>
              )}
            </PcLoginButtonUl>
          </div>
        </Header>
      )}

      <Main>{children}</Main>
      {!checkNotLayoutPathname() && (
        <Footer>
          <div>안녕하세요.</div>
        </Footer>
      )}
    </>
  );
}
