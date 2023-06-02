export interface DataResponse {
  status: number
  code: string
  message: string
  data: object | [] | null
  count: number
  total: number
}

export interface QueryParams {
  page: number
  limit: number
  revalidate?: boolean
}

export interface QueryId {
  id: string
}

export interface FetchResponse {
  response: DataResponse | null
  loading: boolean
  error: string | null
  handleAbortController?: () => void
}
