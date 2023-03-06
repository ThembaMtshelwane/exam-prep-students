import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import {theme} from '../charkra/theme'
import Layout from '../components/Layout/Layout'

function myApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>

    </ChakraProvider>
  )
}

export default myApp