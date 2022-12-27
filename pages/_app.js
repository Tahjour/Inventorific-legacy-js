import { Fragment } from 'react';
import MainLayout from '../components/layout/main-layout';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <Fragment>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Fragment>
  );
}
