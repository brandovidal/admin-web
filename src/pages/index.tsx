import Router from 'next/router'
import React, { useEffect } from 'react'

import '@styles/index.css'

export default function Home (): JSX.Element {
  useEffect(() => {
    void Router.push('/admin/default')
  })

  return <></>
}
