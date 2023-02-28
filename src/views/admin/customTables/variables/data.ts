export type RoleEnumType = 'user' | 'admin'

export interface User {
  id: string
  username: string
  name: string
  email: string
  photo: string | null
  verified: boolean | null
  password: string
  role: RoleEnumType | null
  verificationCode: string | null
  createdAt: Date
  updatedAt: Date
}

export const formatRowData = (data: User[] = []): any[] => data.map(({ name, email, role }) => ({ name, email, role }))
