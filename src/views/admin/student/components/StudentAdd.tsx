// libs
import isEmpty from 'just-is-empty'

// interfaces
import type { ViewAddProps } from '@/interfaces/views/default'

// common
import Alert from '@/common/Alert/default'
import Card from '@/components/card/Card'
import Input from '@/common/Input/default'

// styles
import { Box, Button, Grid, GridItem, SimpleGrid } from '@chakra-ui/react'
import { MdChevronLeft, MdSave } from 'react-icons/md'

const StudentAddView = ({ control, alert, isSubmitting = false, isDisabled = false, onSubmit, onCancel }: ViewAddProps): JSX.Element => {
  return (
    <form onSubmit={onSubmit}>
      {!isEmpty(alert) && <Alert status={alert?.status} message={alert?.message} />}

      <Grid mb='20px' templateColumns='repeat(2, 1fr)' gap={{ base: '6', lg: '12' }}>
        <GridItem colSpan={{ base: 2 }}>
          <Box display='flex' justifyContent='flex-end' alignItems='center' mt={2} gap={4}>
            <Button type='button' leftIcon={<MdChevronLeft />} fontSize='md' variant='outline' fontWeight='500' p={6} isDisabled={isSubmitting && isDisabled} onClick={onCancel}>
              Regresar
            </Button>
            <Button type='submit' leftIcon={<MdSave />} fontSize='md' variant='brand' fontWeight='500' p={6} isDisabled={isDisabled}>
              {isSubmitting ? 'Agregando...' : 'Agregar'}
            </Button>
          </Box>
        </GridItem>

        <GridItem colSpan={{ base: 2, md: 1 }} rowSpan={{ base: 1, md: 2 }}>
          <Card flexDirection='column' w='100%' px='0px'>
            <Box margin={{ base: 6, lg: 10 }}>
              <SimpleGrid columns={{ sm: 1, lg: 2 }} spacing='8'>
                <Input control={control} name='name' label='Nombre' placeholder='Ingresa tu nombre' helperText='Ingresar nombres completos para su emitir su certificado' disabled={isSubmitting} />

                <Input control={control} name='lastname' label='Apellidos' placeholder='Ingresa tu apellido' helperText='Ingresar apellidos completos para su emitir su certificado' disabled={isSubmitting} />
              </SimpleGrid>
            </Box>
          </Card>
        </GridItem>

        <GridItem colSpan={{ base: 2, md: 1 }}>
          <Card flexDirection='column' w='100%' px='0px'>
            <Box margin={{ base: 6, lg: 10 }}>
              <SimpleGrid columns={{ sm: 1, lg: 2 }} spacing='8'>
                <Input control={control} name='studyCenter' label='Nombre' placeholder='Ingresa tu universidad / instituto' disabled={isSubmitting} />
              </SimpleGrid>
            </Box>
          </Card>
        </GridItem>

        <GridItem colSpan={{ base: 2, md: 1 }}>
          <Card flexDirection='column' w='100%' px='0px'>
            <Box margin={{ base: 6, lg: 10 }}>
              <SimpleGrid columns={{ sm: 1, lg: 2 }} spacing='8'>
                <Input control={control} name='workplace' label='Nombre' placeholder='Ingresa tu universidad / instituto' disabled={isSubmitting} />
              </SimpleGrid>
            </Box>
          </Card>
        </GridItem>
      </Grid>
    </form>
  )
}

export default StudentAddView
