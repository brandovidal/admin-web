import type { NextRouter } from 'next/router'

// interfaces
import type { User } from '@/interfaces/api/User'
import type { ActionsProps } from '@/interfaces/common/MenuActions'

// Components
import MenuActions from '@/components/menu/Actions'

// styles
import { Icon } from '@chakra-ui/react'

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

export const formatData = (data: User[] = [], router: NextRouter, addUser: (user: User) => void, deleteUser: (user: User) => void): User[] => {
  return data.map((user) => {
    const { username, name, email, role } = user
    const actions = generateActions(user, router, addUser, deleteUser)
    return { username, name, email, role, actions: <MenuActions actions={actions}></MenuActions> }
  })
}
