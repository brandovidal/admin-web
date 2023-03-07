import { useState, useEffect } from 'react'

export interface DataResponse {
  status: number
  code: string
  message: string
  data: object | [] | null
}

export interface FetchResponse {
  response: DataResponse | null
  loading: boolean
  error: string | null
}

export const useFetch = (url: string, options?: object): FetchResponse => {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)

    fetch(url, options)
      .then(async response => await response.json())
      .then(response => { setResponse(response) })
      .catch(error => { setError(error) })
      .finally(() => { setLoading(false) })
  }, [url, options])

  return { response, loading, error }
}
