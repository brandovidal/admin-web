import React from 'react'

import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import type { AppProps } from 'next/app'
import Head from 'next/head'

import theme from '@theme/theme'

import '@styles/Fonts.css'
import '@styles/App.css'
import '@styles/Contact.css'

import 'react-calendar/dist/Calendar.css'
import '@styles/MiniCalendar.css'

function MyApp ({ Component, pageProps }: AppProps): JSX.Element {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Head>
          <title>Horizon UI Dashboard</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta name='@theme-color' content='#000000' />
        </Head>
        <React.StrictMode>
          <Component {...pageProps} />
        </React.StrictMode>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp
