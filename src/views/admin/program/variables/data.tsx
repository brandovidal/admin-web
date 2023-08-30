import type { NextRouter } from 'next/router'

// interfaces
import type { Program, ProgramData } from '@/interfaces/api/Program'
import type { ActionsProps } from '@/interfaces/common/MenuActions'

// Components
import MenuActions from '@/components/menu/Actions'

// styles
import { Icon } from '@chakra-ui/react'

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

export const formatData = (data: Program[] = [], router: NextRouter, addProgram: (program: Program) => void, deleteProgram: (program: Program) => void): ProgramData[] => {
  return data.map((program) => {
    const { name, total, startDate, endDate } = program

    const startDateFormatted = formatDate(startDate)
    const endDateFormatted = formatDate(endDate)
    const actions = <MenuActions actions={generateActions(program, router, addProgram, deleteProgram)} />

    return { name, total, startDate: startDateFormatted, endDate: endDateFormatted, actions }
  })
}
