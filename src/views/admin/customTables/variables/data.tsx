// interfaces
import type { User, UserData } from '@/interfaces/User'
import type { ActionsProps } from '@/interfaces/MenuActions'

// Components
import MenuActions from '@/components/menu/Actions'

// styles
import { Icon } from '@chakra-ui/react'

// icons
import { MdInfoOutline, MdModeEditOutline, MdOutlineDelete } from 'react-icons/md'

function generateActions (id: string): ActionsProps[] {
  return [
    {
      label: 'Ver',
      icon: <Icon as={MdInfoOutline} h='16px' w='16px' me='8px' />,
      onClick: () => {
        console.log('Ver', id)
      }
    },
    {
      label: 'Editar',
      icon: <Icon as={MdModeEditOutline} h='16px' w='16px' me='8px' />,
      onClick: () => {
        console.log('Editar', id)
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

export const formatRowData = (data: User[] = []): UserData[] =>
  data.map(({ id, name, email, role }) => {
    const actions = generateActions(id)
    return { name, email, role, actions: <MenuActions actions={actions}></MenuActions> }
  })
