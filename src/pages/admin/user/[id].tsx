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

export default function UserDetail (): JSX.Element {
  const router = useRouter()

  const userId = useMemo(() => router.query.id, [router.query.id])

  return (
    <AdminLayout navbarText='User edit'>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <SimpleGrid mb='20px' columns={{ sm: 1, md: 1 }} spacing={{ base: '20px', xl: '20px' }}>
          <Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
            User id: {userId}
          </Card>
        </SimpleGrid>
      </Box>
    </AdminLayout>
  )
}
