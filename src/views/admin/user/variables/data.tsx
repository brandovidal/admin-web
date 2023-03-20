import type { NextRouter } from 'next/router'

// interfaces
import type { User } from '@/interfaces/User'
import type { ActionsProps } from '@/interfaces/MenuActions'

// Components
import MenuActions from '@/components/menu/Actions'

// styles
import { Icon } from '@chakra-ui/react'

// icons
import { MdInfoOutline, MdModeEditOutline, MdOutlineDelete } from 'react-icons/md'

function generateActions (user: User, router: NextRouter, addUser): ActionsProps[] {
  return [
    {
      label: 'Ver',
      icon: <Icon as={MdInfoOutline} h='16px' w='16px' me='8px' />,
      onClick: () => {
        addUser(user)
        void router.push(`/admin/user/${user.id as string}`)
      }
    },
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
        console.log('Eliminar', user.id as string)
      }
    }
  ]
}

export const formatData = (data: User[] = [], router: NextRouter, addUser: (user: User) => void): User[] => {
  return data.map((user) => {
    const { username, name, email, role } = user
    const actions = generateActions(user, router, addUser)
    return { username, name, email, role, actions: <MenuActions actions={actions}></MenuActions> }
  })
}
