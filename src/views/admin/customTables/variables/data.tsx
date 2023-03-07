import type { NextRouter } from 'next/router'

// interfaces
import type { User, UserData } from '@/interfaces/User'
import type { ActionsProps } from '@/interfaces/MenuActions'

// Components
import MenuActions from '@/components/menu/Actions'

// styles
import { Icon } from '@chakra-ui/react'

// icons
import { MdInfoOutline, MdModeEditOutline, MdOutlineDelete } from 'react-icons/md'

function generateActions (id: string, router: NextRouter): ActionsProps[] {
  return [
    {
      label: 'Ver',
      icon: <Icon as={MdInfoOutline} h='16px' w='16px' me='8px' />,
      onClick: () => {
        void router.push(`/admin/user/${id}`)
      }
    },
    {
      label: 'Editar',
      icon: <Icon as={MdModeEditOutline} h='16px' w='16px' me='8px' />,
      onClick: () => {
        void router.push(`/admin/user/edit/${id}`)
      }
    },
    {
      label: 'Eliminar',
      icon: <Icon as={MdOutlineDelete} h='16px' w='16px' me='8px' />,
      onClick: () => {
        console.log('Eliminar', id)
      }
    }
  ]
}

export const formatData = (data: User[] = [], router: NextRouter): UserData[] => {
  return data.map(({ id, name, email, role }) => {
    const actions = generateActions(id, router)
    return { name, email, role, actions: <MenuActions actions={actions}></MenuActions> }
  })
}
