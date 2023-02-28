import React, { useState, useEffect } from 'react'

import { Box, SimpleGrid } from '@chakra-ui/react'

import Card from '@/components/card/Card'

import AdminLayout from '@/layouts/admin'

import { formatRowData } from '@/views/admin/customTables/variables/data'

import Table from '@/views/admin/customTables/components/Table'
import { columns } from '@/views/admin/customTables/variables/columnsData'

import { getUsers } from '@/services/user/getUsers'

interface PageData {
  rowData: any[]
  isLoading: boolean
  totalPages: number
  totalRows: number
}

export default function CustomTable (): JSX.Element {
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
            <Table
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
