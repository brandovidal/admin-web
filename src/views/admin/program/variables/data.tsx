import type { NextRouter } from 'next/router'

// interfaces
import type { Program, ProgramData } from '@/interfaces/api/Program'
import type { ActionsProps } from '@/interfaces/common/MenuActions'

// Components
import MenuActions from '@/components/menu/Actions'

// styles
import { Badge, Icon } from '@chakra-ui/react'

// icons
import { MdModeEditOutline, MdOutlineDelete } from 'react-icons/md'

import { formatDate } from '@/utils/date'

function generateActions (program: Program, router: NextRouter, addProgram: (program: Program) => void, deleteProgram: (program: Program) => void): ActionsProps[] {
  return [
    {
      label: 'Editar',
      icon: <Icon as={MdModeEditOutline} h='16px' w='16px' me='8px' />,
      onClick: () => {
        addProgram(program)
        void router.push(`/admin/program/edit/${program.id as string}`)
      }
    },
    {
      label: 'Eliminar',
      icon: <Icon as={MdOutlineDelete} h='16px' w='16px' me='8px' />,
      onClick: () => {
        deleteProgram(program)
      }
    }
  ]
}

function Status (status = false): JSX.Element {
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

export const formatData = (data: Program[] = [], router: NextRouter, addProgram: (program: Program) => void, deleteProgram: (program: Program) => void): ProgramData[] => {
  return data.map((program) => {
    const { email, phone, dni, ruc, status, createdAt: date } = program

    const fullName = `${program?.name} ${program?.lastname}`
    const numberDocument = String(dni ?? ruc)
    const actions = generateActions(program, router, addProgram, deleteProgram)
    const createdAt = formatDate(String(date))

    return { fullName, email, phone, numberDocument, createdAt, status: Status(status as boolean), actions: <MenuActions actions={actions}></MenuActions> }
  })
}
