import { Icon } from '@chakra-ui/react'
import {
  MdPerson,
  MdHome,
  MdLock,
  MdPeople,
  MdContacts,
  MdSchool
} from 'react-icons/md'

import type { IRoute } from '@/types/navigation'

// Auth Imports
import SignInCentered from '@pages/auth/sign-in'

// Admin Imports
import MainDashboard from '@pages/admin/default'
import Profile from '@pages/admin/profile'
import UserList from '@/pages/admin/user/list'
import StudentList from '@/pages/admin/student/list'
import CourseList from '@/pages/admin/course/list'

const routes: IRoute[] = [
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard
  },
  {
    name: 'Users',
    layout: '/admin',
    path: '/user/list',
    icon: <Icon as={MdPeople} width="20px" height="20px" color="inherit" />,
    component: UserList
  },
  {
    name: 'Students',
    layout: '/admin',
    path: '/student/list',
    icon: <Icon as={MdContacts} width="20px" height="20px" color="inherit" />,
    component: StudentList
  },
  {
    name: 'Course',
    layout: '/admin',
    path: '/course/list',
    icon: <Icon as={MdSchool} width="20px" height="20px" color="inherit" />,
    component: CourseList
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: '/profile',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: Profile
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: SignInCentered
  }
]

export default routes
