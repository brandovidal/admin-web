const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000'

export const config = {
  apiUrl: `${NEXT_PUBLIC_API_URL}/api`
}
