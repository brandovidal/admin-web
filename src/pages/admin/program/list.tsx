// libs
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'

import isEmpty from 'just-is-empty'

// Components
import Card from '@/components/card/Card'

// common
import Alert from '@/common/Alert/default'
import Dialog from '@/common/Dialog/default'

// Layout
import AdminLayout from '@/layouts/admin'

// Views
import ProgramListView from '@/views/admin/program/components/ProgramList'

// interfaces
import type { AlertProps } from '@/interfaces/common/Alert'

// Variables
import { formatData } from '@/views/admin/program/variables/data'
import { columns } from '@/views/admin/program/variables/columnsData'

// store
import { useProgramStore } from '@/store/program'

// hooks
import { useNotification } from '@/hooks/useNotification'

// Services
import { useDeleteProgram, useGetPrograms } from '@/services/program'

// styles
import { Box, SimpleGrid, useDisclosure } from '@chakra-ui/react'

import type { Program } from '@/interfaces/api/Program'

export default function ProgramList (): JSX.Element {
  const router = useRouter()

  const [page, pageChangeHandler] = useState(1)
  const [limit, pageSizeHandler] = useState(5)

  const { data: programs, isLoading, refetch } = useGetPrograms({ page, limit })

  const program = useProgramStore((state) => state.program) as Program
  const addProgram = useProgramStore(state => state.addProgram)
  const cleanProgram = useProgramStore(state => state.cleanProgram)

  const [alert, setAlert] = useState<AlertProps>()
  const { showToast, showErrorToast } = useNotification()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleRefresh = useCallback(
    async (): Promise<void> => {
      await refetch()
    },
    [refetch]
  )

  const onDeleteSuccess = useCallback(async (): Promise<void> => {
    setAlert({ message: 'Program successfully deleted', status: 'success' })
    showToast({ title: 'Program successfully deleted', description: 'The program has been successfully deleted' })
    await handleRefresh()
    void router.push('/admin/program/list')
  }, [handleRefresh, showToast, router])

  const onDeleteError = useCallback((): void => {
    setAlert({ message: 'Program could not be deleted', status: 'warning' })
    showErrorToast({ title: 'Program could not be deleted', description: 'Please try again later' })
  }, [showErrorToast])

  const { mutate: deleteProgram } = useDeleteProgram({ onSuccess: onDeleteSuccess, onError: onDeleteError })

  const confirmDelete = useCallback(
    (program: Program): void => {
      onOpen()
      addProgram(program)
    },
    [onOpen, addProgram]
  )

  const onCloseComplete = useCallback((): void => {
    deleteProgram(program)
    onClose()
  }, [program, onClose, deleteProgram])

  const tableData = useMemo(() => formatData(programs?.data, router, addProgram, confirmDelete), [programs, router, addProgram, confirmDelete])
  const pagination = useMemo(() => programs?.meta?.pagination, [programs?.meta?.pagination])

  useEffect(() => {
    cleanProgram()
  }, [cleanProgram])

  const handleAddProgram = useCallback((): void => {
    void router.push('/admin/program/add')
  }, [router])

  return (
    <AdminLayout>
      <Box pt={{ base: '28', md: '24', xl: '24' }}>
        <SimpleGrid mb='20px' columns={{ sm: 1, md: 1 }} spacing={{ base: '20px', xl: '20px' }}>
          {!isEmpty(alert) && <Alert status={alert?.status} message={alert?.message} />}

          <Dialog title='Delete Program' message='Are you sure you want to delete this program' isOpen={isOpen} onClose={onClose} onCloseComplete={onCloseComplete} />

          <Card flexDirection='column' w='100%' px='0'>
            <ProgramListView
              handleAdd={handleAddProgram}
              handleRefresh={handleRefresh}
              columnsData={columns}
              tableData={tableData}
              isLoading={isLoading}
              pagination={pagination}
              pageChangeHandler={pageChangeHandler}
              pageSizeHandler={pageSizeHandler}
            />
          </Card>
        </SimpleGrid>
      </Box>
    </AdminLayout>
  )
}
