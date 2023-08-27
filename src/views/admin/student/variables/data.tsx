import type { NextRouter } from 'next/router'

// interfaces
import type { Student, StudentData } from '@/interfaces/api/Student'
import type { ActionsProps } from '@/interfaces/common/MenuActions'

// Components
import MenuActions from '@/components/menu/Actions'

// styles
import { Badge, Icon } from '@chakra-ui/react'

// icons
import { MdModeEditOutline, MdOutlineDelete } from 'react-icons/md'

import { formatDate } from '@/utils/date'

function generateActions (student: Student, router: NextRouter, addStudent: (student: Student) => void, deleteStudent: (student: Student) => void): ActionsProps[] {
  return [
    {
      label: 'Editar',
      icon: <Icon as={MdModeEditOutline} h='16px' w='16px' me='8px' />,
      onClick: () => {
        addStudent(student)
        void router.push(`/admin/student/edit/${student.id as string}`)
      }
    },
    {
      label: 'Eliminar',
      icon: <Icon as={MdOutlineDelete} h='16px' w='16px' me='8px' />,
      onClick: () => {
        deleteStudent(student)
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

export const formatData = (data: Student[] = [], router: NextRouter, addStudent: (student: Student) => void, deleteStudent: (student: Student) => void): StudentData[] => {
  return data.map((student) => {
    const { email, phone, dni, ruc, status, createdAt: date } = student

    const fullName = `${student?.name} ${student?.lastname}`
    const numberDocument = String(dni ?? ruc)
    const actions = generateActions(student, router, addStudent, deleteStudent)
    const createdAt = formatDate(String(date))

    return { fullName, email, phone, numberDocument, createdAt, status: Status(status as boolean), actions: <MenuActions actions={actions}></MenuActions> }
  })
}
