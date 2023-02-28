import Router from 'next/router'
import React, { useEffect } from 'react'

export default function Admin (): JSX.Element {
  useEffect(() => {
    void Router.push('/admin/default')
  })

  return <div />
}
