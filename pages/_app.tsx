import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from './layout/layout';
import { Provider } from 'react-redux';
import wrapper from '../store/store';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/GlobalStyles';

function App({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
