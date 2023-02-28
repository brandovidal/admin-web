// create fetch hook

import { useState, useEffect } from 'react'

export const useFetch = (url: string): { data: null, loading: boolean } => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await fetch(url)
      const data = await response.json()
      setData(data)
      setLoading(false)
    }

    void fetchData()
  }, [url])

  return { data, loading }
}
