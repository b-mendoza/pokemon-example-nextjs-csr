import type { AppProps as NextJSAppProps } from 'next/app';
import { SSRProvider } from 'react-bootstrap';
import { SWRConfig } from 'swr';

import { CustomPageProps } from 'typings/shared';

import { fetcher } from 'utils/fetcher';

import 'bootstrap/dist/css/bootstrap.min.css';

type CustomAppProps = Omit<NextJSAppProps<CustomPageProps>, 'pageProps'> & {
  pageProps: CustomPageProps;
};

function __App({ Component, pageProps }: CustomAppProps) {
  return (
    <SWRConfig value={{ fetcher, revalidateOnFocus: false }}>
      <SSRProvider>
        <Component {...pageProps} />
      </SSRProvider>
    </SWRConfig>
  );
}

export default __App;
