import { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import 'bootstrap/dist/css/bootstrap.min.css'

const queryClient = new QueryClient()

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />

      {process.env.NODE_ENV === 'development' ? (
        <ReactQueryDevtools initialIsOpen />
      ) : null}
    </QueryClientProvider>
  )
}

export default App
