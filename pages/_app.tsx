import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from './layout/layout';
import { Provider } from 'react-redux';
import wrapper from '../store/store';
function App({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default App;
