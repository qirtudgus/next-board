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
import { useRouter } from 'next/router';

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
  const [isLoadUser, setIsLoadUser] = useState(true);

  const ref2 = useRef() as RefObject<HTMLElement>;
  const { scrollYProgress } = useScroll({
    target: ref2,
    offset: ['start start', 'end end'],
  });

  const router = useRouter();

  useEffect(() => {
    //인덱스일 경우 클래스 조정..
    if (router.pathname === '/') {
      if (document!.getElementsByTagName('body') && document!.getElementsByTagName('header')) {
        (document!.getElementsByTagName('body') as HTMLCollectionOf<HTMLBodyElement>)[0]?.classList.remove('white');
        (document!.getElementsByTagName('body') as HTMLCollectionOf<HTMLBodyElement>)[0]?.classList.remove('outIndex');
        (document!.getElementsByTagName('header') as HTMLCollectionOf<HTMLBodyElement>)[0]?.classList.remove('dark');
        (document!.getElementsByTagName('header') as HTMLCollectionOf<HTMLBodyElement>)[0]?.classList.add('inIndex');
      }
    } else {
      if (document!.getElementsByTagName('body') && document!.getElementsByTagName('header')) {
        (document!.getElementsByTagName('body') as HTMLCollectionOf<HTMLBodyElement>)[0]?.classList.add('outIndex');
        (document!.getElementsByTagName('header') as HTMLCollectionOf<HTMLBodyElement>)[0]?.classList.remove('inIndex');
      }
    }
  }, []);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      //전체스크롤 진행률 할당
      document.getElementById('__next')?.setAttribute('data-fullprogress', scrollYProgress.get().toString());
      const progress = Number(scrollYProgress.get());

      if (document.getElementById('header')) {
        if (progress > 0.0377) {
          (document!.getElementById('header') as HTMLElement).classList.add('show');
        } else {
          (document!.getElementById('header') as HTMLElement).classList.remove('show');
        }
      }
    });
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
