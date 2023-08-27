// libs
import React from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'

// services
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// styles
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@theme/theme'

import '@styles/Fonts.css'
import '@styles/Contact.css'
import '@styles/MiniCalendar.css'

import '@styles/App.css'
import '@styles/index.css'

import 'react-calendar/dist/Calendar.css'

function MyApp ({ Component, pageProps }: AppProps): JSX.Element {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Head>
          <title>Panel Dashboard</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta name='@theme-color' content='#707EAE' />
        </Head>
        <React.StrictMode>
          <Component {...pageProps} />
        </React.StrictMode>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp
