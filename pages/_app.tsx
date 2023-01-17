import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from './layout/layout';
import { Provider } from 'react-redux';
import wrapper from '../store/store';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/GlobalStyles';
import type { NextPage } from 'next';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { loginSuccess } from '../store/userInfoSlice';
import customAxios from '../utils/customAxios';
import { useRouter } from 'next/router';
import LoadingSpinner from '../components/LoadingSpinner';

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
    const loadUser = async () => {
      //해당주소는 클라이언트의 쿠키를 검증한 뒤 아이디와 인덱스를 반환해준다.
      await customAxios('GET', '/loadUser').then((res) => {
        if (res.status === 200) {
          let id = res.data.id;
          let idx = res.data.idx;
          store.dispatch(loginSuccess({ id, idx }));
          setIsLoadUser(true);
        } else {
          setIsLoadUser(true);
        }
      });
    };
    loadUser();
  }, []);

  return getLayout(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {/* isLoading이 true가 되고나면 페이지를 로드시켜준다, 이걸로 새로고침되었을 때에도 게시판에서 초기값이 0이라 좋아요 리스트가 무조건 좋아요로 나오던 오류가 수정된다. */}
        {isLoadUser ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <LoadingSpinner />
        )}
      </ThemeProvider>
    </Provider>,
  );
}

export default App;
