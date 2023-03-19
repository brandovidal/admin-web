// libs
import isEmpty from 'just-is-empty'
import { useState, useEffect } from 'react'

// interfaces
import type { FetchResponse } from '@/interfaces/Response'

export const useFetch = (url: string, options?: object): FetchResponse => {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [controller, setController] = useState<AbortController>()

  useEffect(() => {
    const abortController = new AbortController()
    setController(abortController)
    setLoading(true)

    fetch(url, { signal: abortController.signal, ...options })
      .then(async response => await response.json())
      .then(response => {
        setResponse(response)
      })
      .catch(error => {
        if (error.name === 'AbortError') {
          setError('Request cancelled')
        }
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })

    return () => {
      abortController.abort()
    }
  }, [url, options])

  const handleAbortController = (): void => {
    if (!isEmpty(controller)) {
      controller?.abort()
      setError('Request cancelled')
    }
  }

  return { response, loading, error, handleAbortController }
}
