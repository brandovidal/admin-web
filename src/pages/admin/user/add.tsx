import { useMemo } from 'react'
import { useRouter } from 'next/router'

// Components
import Card from '@/components/card/Card'

// Layout
import AdminLayout from '@/layouts/admin'

// Interfaces

// Variables

// Services

// styles
import { Box, SimpleGrid } from '@chakra-ui/react'

export default function UserAdd (): JSX.Element {
  const router = useRouter()

  const userId = useMemo(() => router.query.id, [router.query.id])

  return (
    <AdminLayout navbarText='User Add'>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <SimpleGrid mb='20px' columns={{ sm: 1, md: 2 }} spacing={{ base: '20px', xl: '20px' }}>
          <Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
            User add: {userId}
          </Card>
          <Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
            User add: {userId}
          </Card>
        </SimpleGrid>
      </Box>
    </AdminLayout>
  )
}
