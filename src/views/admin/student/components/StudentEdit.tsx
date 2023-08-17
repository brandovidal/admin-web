// libs
import isEmpty from 'just-is-empty'

// interfaces
import type { ViewEditProps } from '@/interfaces/views/default'

// common
import Alert from '@/common/Alert/default'
import Card from '@/components/card/Card'
import Input from '@/common/Input/default'

// styles
import { Box, Button, SimpleGrid } from '@chakra-ui/react'
import { MdChevronLeft, MdSave } from 'react-icons/md'

const StudentEditView = ({ control, alert, isSubmitting = false, isDisabled = false, onSubmit, onCancel }: ViewEditProps): JSX.Element => {
  return (
    <SimpleGrid mb='20px' columns={{ sm: 1, md: 1 }} spacing={{ base: '20px', xl: '20px' }}>
      <Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
        <Box margin={{ base: 6, lg: 10 }}>
          <form onSubmit={onSubmit}>
            {!isEmpty(alert) && <Alert status={alert?.status} message={alert?.message} />}

            <SimpleGrid columns={{ sm: 1, lg: 2 }} spacing='10'>
              <Input control={control} name='name' label='Name' placeholder='Ingresa tu nombre' disabled={isSubmitting} />

              <Input control={control} name='email' label='Email' placeholder='Ingresa tu email' disabled={isSubmitting} />
            </SimpleGrid>

            <Box display='flex' justifyContent='flex-end' alignItems='center' mt={6} gap={4}>
              <Button type='button' leftIcon={<MdChevronLeft />} fontSize='md' variant='outline' fontWeight='500' p={6} isDisabled={isSubmitting && isDisabled} onClick={onCancel}>
                Back
              </Button>
              <Button type='submit' leftIcon={<MdSave />} fontSize='md' variant='brand' fontWeight='500' p={6} isDisabled={isDisabled}>
                {isSubmitting ? 'Editando...' : 'Editar'}
              </Button>
            </Box>
          </form>
        </Box>
      </Card>
    </SimpleGrid>
  )
}

export default StudentEditView
