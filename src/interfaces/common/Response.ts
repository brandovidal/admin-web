export interface ValidationType {
  name: string | number
  path?: string | number
  code?: string
  message: string
}
export interface ErrorType {
  code: number
  name: string
  message: string
  details?: ValidationType[] | null
}
export interface PaginationType {
  page: number
  pageSize: number
  pageCount: number
  total: number
}
export interface MetaType {
  pagination: PaginationType
}
export interface DataResponse {
  status: boolean
  data?: object | string | null
  meta?: MetaType | null
  error?: ErrorType | null
}
export interface Response<T> {
  status: boolean
  data?: T[]
  meta?: MetaType | null
  error?: ErrorType | null
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
