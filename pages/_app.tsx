import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

// Create a client
const queryClient = new QueryClient()


function MyApp({ Component, pageProps }: AppProps) {
  return (<QueryClientProvider client={queryClient}>
    <Component {...pageProps} />
  </QueryClientProvider>)
}

export default MyApp;
