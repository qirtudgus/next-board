import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from './layout/layout';
import { Provider } from 'react-redux';
import wrapper from '../store/store';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/GlobalStyles';
import type { NextComponentType, NextPage } from 'next';
import { ReactElement, ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import { loginSuccess, logoutSuccess } from '../store/userInfoSlice';
import customAxios from '../utils/customAxios';
import { useScroll } from 'framer-motion';

// replace console.* for disable log on production
if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
}; // 기존 AppProps타입에 Layout을 추가한 것.

function App({ Component, pageProps }: AppPropsWithLayout) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  const getLayout = Component.getLayout ?? ((page) => page);
  const [isLoadUser, setIsLoadUser] = useState(false);

  const ref2 = useRef() as RefObject<HTMLElement>;
  const { scrollYProgress } = useScroll({
    target: ref2,
    offset: ['start start', 'end end'],
  });
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      //전체스크롤 진행률 할당
      document.getElementById('__next')?.setAttribute('data-fullprogress', scrollYProgress.get().toString());
      const progress = Number(scrollYProgress.get());
      if (progress > 0.0377) {
        (document!.getElementById('header') as HTMLElement).classList.add('show');
      } else {
        (document!.getElementById('header') as HTMLElement).classList.remove('show');
      }

      // (document!.getElementById('header') as HTMLElement).classList.add('show');

      // if (document.getElementById('__next')?.getAttribute('data-fullprogress') === '0') {
      //   (document!.getElementById('header') as HTMLElement).classList.remove('show');
      //   console.log('if문 비교1');
      //   return;
      // } else {
      //   (document!.getElementById('header') as HTMLElement).classList.add('show');
      // }

      // //초반 구간 블랙
      // if (prog > 0 && prog < 0.6004418762746431) {
      //   (document!.getElementById('header') as HTMLElement).classList.remove('text_black');
      // }

      // //포폴 구간 글씨 화이트
      // if (prog > 0.6006 && prog < 0.8426) {
      //   (document!.getElementById('header') as HTMLElement).classList.add('text_black');
      // }
      // //포레이드 구간 글씨 화이트
      // if (prog > 0.8428 && prog < 0.9632) {
      //   (document!.getElementById('header') as HTMLElement).classList.remove('text_black');
      // }
      // if (prog > 0.964 && prog < 1) {
      //   (document!.getElementById('header') as HTMLElement).classList.add('text_black');
      // }

      //던전노트 구간 글씨 블랙

      // if (Number(document.getElementById('__next')?.getAttribute('data-fullprogress')) > 0.05) {
      //   (document!.getElementById('header') as HTMLElement).classList.add('show');
      //   console.log('if문 비교2');
      //   //리턴하면 이 코드 블럭 바깥 아래로는 실행되지않음
      // }
      // if (Number(document.getElementById('__next')?.getAttribute('data-fullprogress')) > 0.85) {
      //   (document!.getElementById('header') as HTMLElement).classList.add('text_white');
      //   console.log('if문 비교3');
      // }
      // if (Number(document.getElementById('__next')?.getAttribute('data-fullprogress')) > 0.972) {
      //   (document!.getElementById('header') as HTMLElement).classList.remove('text_white');
      // } else {
      //   (document!.getElementById('header') as HTMLElement).classList.add('text_white');
      // }
    });
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      //해당주소는 클라이언트의 쿠키를 검증한 뒤 아이디와 인덱스를 반환해준다.
      await customAxios('GET', '/loadUser')
        .then((res) => {
          if (res.status === 200) {
            let id = res.data.id;
            let idx = res.data.idx;
            store.dispatch(loginSuccess({ id, idx }));
          } else {
            // store.dispatch(logoutSuccess());
          }
        })
        .then(() => {
          setIsLoadUser(true);
        });
    };
    loadUser();
    //전체스크롤 진행률 설정
    document.getElementById('__next')?.setAttribute('data-progress', scrollYProgress.get().toString());
  }, []);

  return getLayout(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {/* isLoading이 true가 되고나면 페이지를 로드시켜준다, 이걸로 새로고침되었을 때에도 게시판에서 초기값이 0이라 좋아요 리스트가 무조건 좋아요로 나오던 오류가 수정된다. */}
        {isLoadUser && (
          <Layout>
            <Component
              ref={ref2}
              {...pageProps}
            />{' '}
          </Layout>
        )}
      </ThemeProvider>
    </Provider>,
  );
}

export default App;
