import Router from 'next/router'
import React, { useEffect } from 'react'

export default function Home (): JSX.Element {
  useEffect(() => {
    void Router.push('/admin/default')
  })

  return <></>
}
