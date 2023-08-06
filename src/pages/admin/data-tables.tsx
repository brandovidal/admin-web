import React from 'react'

import { Box, SimpleGrid } from '@chakra-ui/react'
import DevelopmentTable from '@/views/admin/dataTables/components/DevelopmentTable'
import CheckTable from '@/views/admin/dataTables/components/CheckTable'
import ColumnsTable from '@/views/admin/dataTables/components/ColumnsTable'
import ComplexTable from '@/views/admin/dataTables/components/ComplexTable'
import { columnsDataDevelopment, columnsDataCheck, columnsDataColumns, columnsDataComplex } from '@/views/admin/dataTables/variables/columnsData'
import tableDataDevelopment from '@/views/admin/dataTables/variables/tableDataDevelopment.json'
import tableDataCheck from '@/views/admin/dataTables/variables/tableDataCheck.json'
import tableDataColumns from '@/views/admin/dataTables/variables/tableDataColumns.json'
import tableDataComplex from '@/views/admin/dataTables/variables/tableDataComplex.json'

import AdminLayout from '@/layouts/admin'
import { type TableData } from '@/views/admin/default/variables/columnsData'

export default function DataTables (): JSX.Element {
  return (
    <AdminLayout>
      <Box pt={{ base: '24', md: '20', xl: '20' }}>
        <SimpleGrid mb='20px' columns={{ sm: 1, md: 2 }} spacing={{ base: '20px', xl: '20px' }}>
          <DevelopmentTable columnsData={columnsDataDevelopment} tableData={tableDataDevelopment as unknown as TableData[]} />
          <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck as unknown as TableData[]} />
          <ColumnsTable columnsData={columnsDataColumns} tableData={tableDataColumns as unknown as TableData[]} />
          <ComplexTable columnsData={columnsDataComplex} tableData={tableDataComplex as unknown as TableData[]} />
        </SimpleGrid>
      </Box>
    </AdminLayout>
  )
}
