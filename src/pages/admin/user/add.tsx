import { useRouter } from 'next/router'

// Components

// Layout
import AdminLayout from '@/layouts/admin'

// Views
import UserAddView from '@/views/admin/user/components/UserAdd'

// Interfaces

// Variables

// Services

// styles
import { Box } from '@chakra-ui/react'

export default function UserAdd (): JSX.Element {
  const router = useRouter()

  return (
    <AdminLayout navbarText='Agregar Usuario'>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <UserAddView router={router} />
      </Box>
    </AdminLayout>
  )
}
