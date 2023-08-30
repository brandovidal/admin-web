// interfaces
import type { User, UserData, UserRoleEnumType, UserStatusEnumType } from '@/interfaces/api/User'

import { generateActions } from '@/utils/page'

// styles
import { Badge } from '@chakra-ui/react'

function generateRole (data = 'user'): JSX.Element {
  const roleLabel = data === 'admin' ? 'Admin' : 'User'
  const roleColor = data === 'admin' ? 'purple' : 'green'

  return <Badge variant='subtle' colorScheme={roleColor}>{roleLabel}</Badge>
}
function generateStatus (status = 'active'): JSX.Element {
  const data = {
    active: {
      label: 'Active',
      color: 'green'
    },
    inactive: {
      label: 'Inactive',
      color: 'yellow'
    },
    deleted: {
      label: 'Deleted',
      color: 'red'
    },
    banned: {
      label: 'Banned',
      color: 'purple'
    }
  }
  const roleLabel = data[status]?.label ?? data.inactive.label
  const roleColor = data[status]?.color ?? data.inactive.color

  return <Badge variant='subtle' colorScheme={roleColor}>{roleLabel}</Badge>
}

export const formatData = (data: User[] = [], handleEdit: (user: User) => void, handleDelete: (user: User) => void): UserData[] => {
  return data.map((user) => {
    const { username, name, email, role, status } = user
    const roleFormatted = generateRole(role as UserRoleEnumType)
    const statusFormatted = generateStatus(status as UserStatusEnumType)

    const handleEditClick = () => {
      handleEdit(user)
    }
    const handleDeleteClick = () => {
      handleDelete(user)
    }

    const actions = generateActions(handleEditClick, handleDeleteClick)

    return { username, name, email, role: roleFormatted, status: statusFormatted, actions }
  })
}
