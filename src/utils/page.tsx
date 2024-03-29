import MenuActions from '@/components/menu/Actions'

import { NO_OP } from '@/constants/default'

import { Badge, Icon } from '@chakra-ui/react'
import { MdModeEditOutline, MdOutlineDelete } from 'react-icons/md'

export const generateRecord = (isLoading: boolean, total: number): string => {
  if (isLoading) {
    return 'Loading ...'
  }
  if (total === 0) {
    return 'without records'
  }
  if (total === 1) {
    return `${total} record`
  }
  return `${total} records`
}

export function generateStatus (status = false): JSX.Element {
  const data = {
    active: {
      label: 'Active',
      color: 'green'
    },
    inactive: {
      label: 'Inactive',
      color: 'yellow'
    }
  }
  const option = status ? 'active' : 'inactive'

  const roleLabel = data[option]?.label ?? data.inactive.label
  const roleColor = data[option]?.color ?? data.inactive.color

  return <Badge variant='subtle' colorScheme={roleColor}>{roleLabel}</Badge>
}

export function generateActions (handleEditClick = NO_OP, handleDeleteClick = NO_OP): JSX.Element {
  const actions = [
    {
      label: 'Edit',
      icon: <Icon as={MdModeEditOutline} h='1rem' w='1rem' me='0.5rem' />,
      onClick: handleEditClick
    },
    {
      label: 'Delete',
      icon: <Icon as={MdOutlineDelete} h='1rem' w='1rem' me='0.5rem' />,
      onClick: handleDeleteClick
    }
  ]
  return <MenuActions actions={actions} />
}
