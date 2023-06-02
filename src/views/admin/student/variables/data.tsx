import type { NextRouter } from 'next/router'

// interfaces
import type { Student } from '@/interfaces/api/Student'
import type { ActionsProps } from '@/interfaces/common/MenuActions'

// Components
import MenuActions from '@/components/menu/Actions'

// styles
import { Icon } from '@chakra-ui/react'

// icons
import { MdModeEditOutline, MdOutlineDelete } from 'react-icons/md'

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
        console.log('Eliminar', student.id as string)
      }
    }
  ]
}

export const formatData = (data: Student[] = [], router: NextRouter, addStudent: (student: Student) => void, deleteStudent: (student: Student) => void): Student[] => {
  return data.map((student) => {
    const { username, name, email, role } = student
    const actions = generateActions(student, router, addStudent, deleteStudent)
    return { username, name, email, role, actions: <MenuActions actions={actions}></MenuActions> }
  })
}
