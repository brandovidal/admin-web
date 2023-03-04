import React, { useState, useEffect } from 'react'

// Components
import Card from '@/components/card/Card'

// Layout
import AdminLayout from '@/layouts/admin'

// Interfaces
import type { PageData } from '@/interfaces/Table'

// Variables
import { formatRowData } from '@/views/admin/customTables/variables/data'
import { columns } from '@/views/admin/customTables/variables/columnsData'

// Views
import UserListView from '@/views/admin/user/components/UserList'

// Services
import { getUsers } from '@/services/user/getUsers'

// Styles
import { Box, SimpleGrid } from '@chakra-ui/react'

export default function UserList (): JSX.Element {
  const [pageData, setPageData] = useState<PageData>({
    rowData: [],
    isLoading: false,
    totalPages: 0,
    totalRows: 0
  })

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    getUsers(currentPage, pageSize)
      .then(info => {
        const { totalPages, data } = info

        const { users, total } = data

        setPageData({
          isLoading: false,
          rowData: formatRowData(users),
          totalPages,
          totalRows: total
        })
      })
      .catch(() => {
        setPageData({
          isLoading: false,
          rowData: [],
          totalPages: 0,
          totalRows: 0
        })
      })
  }, [currentPage, pageSize])

  return (
    <AdminLayout>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <SimpleGrid mb='20px' columns={{ sm: 1, md: 1 }} spacing={{ base: '20px', xl: '20px' }}>
          <Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
            <UserListView
              columnsData={columns}
              tableData={pageData.rowData}
              isLoading={pageData.isLoading}
              totalRows={pageData.totalRows}
              currentPage={currentPage}
              pageChangeHandler={setCurrentPage}
              pageSize={pageSize}
              pageSizeChangeHandler={setPageSize}
              rowsPerPage={10}
            />
          </Card>
        </SimpleGrid>
      </Box>
    </AdminLayout>
  )
}
