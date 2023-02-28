import Router from 'next/router'
import React, { useEffect } from 'react'

export default function Auth (): JSX.Element {
  useEffect(() => {
    void Router.push('/auth/sign-in')
  })

  return <div />
}
