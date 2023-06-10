import type { NextRouter } from 'next/router'

// interfaces
import type { User, UserData, UserRoleEnumType, UserStatusEnumType } from '@/interfaces/api/User'
import type { ActionsProps } from '@/interfaces/common/MenuActions'

// Components
import MenuActions from '@/components/menu/Actions'

// styles
import { Badge, Icon } from '@chakra-ui/react'

// icons
import { MdModeEditOutline, MdOutlineDelete } from 'react-icons/md'

function generateActions (user: User, router: NextRouter, addUser: (user: User) => void, deleteUser: (user: User) => void): ActionsProps[] {
  return [
    {
      label: 'Editar',
      icon: <Icon as={MdModeEditOutline} h='16px' w='16px' me='8px' />,
      onClick: () => {
        addUser(user)
        void router.push(`/admin/user/edit/${user.id as string}`)
      }
    },
    {
      label: 'Eliminar',
      icon: <Icon as={MdOutlineDelete} h='16px' w='16px' me='8px' />,
      onClick: () => {
        deleteUser(user)
        console.log('Eliminar', user.id as string)
      }
    }
  ]
}

function Role (data: UserRoleEnumType = 'user'): JSX.Element {
  const roleLabel = data === 'admin' ? 'Admin' : 'User'
  const roleColor = data === 'admin' ? 'red' : 'green'

  return <Badge variant='subtle' colorScheme={roleColor}>{roleLabel}</Badge>
}
function Status (status: UserStatusEnumType = 'active'): JSX.Element {
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
      color: 'red'
    }
  }
  const roleLabel = data[status]?.label ?? data.inactive.label
  const roleColor = data[status]?.color ?? data.inactive.color

  return <Badge variant='subtle' colorScheme={roleColor}>{roleLabel}</Badge>
}

export const formatData = (data: User[] = [], router: NextRouter, addUser: (user: User) => void, deleteUser: (user: User) => void): UserData[] => {
  return data.map((user) => {
    const { username, name, email, role, status } = user
    const actions = generateActions(user, router, addUser, deleteUser)

    return { username, name, email, role: Role(role), status: Status(status), actions: <MenuActions actions={actions} /> }
  })
}
