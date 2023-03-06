import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import {theme} from '../charkra/theme'

function myApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
       <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default myApp