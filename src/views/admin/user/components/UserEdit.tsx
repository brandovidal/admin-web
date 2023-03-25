// libs
import isEmpty from 'just-is-empty'

// interfaces
import type { UserEditProps } from '@/interfaces/User'

// common
import Alert from '@/common/Alert/default'
import Card from '@/components/card/Card'
import Input from '@/common/Input/default'
import PasswordInput from '@/common/Input/password'

// styles
import { Box, Button, SimpleGrid } from '@chakra-ui/react'
import { MdChevronLeft, MdSave } from 'react-icons/md'

const UserEditView = ({ control, alert, disabled, onSubmit, onCancel }: UserEditProps): JSX.Element => {
  return (
    <SimpleGrid mb='20px' columns={{ sm: 1, md: 1 }} spacing={{ base: '20px', xl: '20px' }}>
      <Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
        <Box margin={{ base: 6, lg: 10 }}>
          <form onSubmit={onSubmit}>
            {!isEmpty(alert) && <Alert status={alert?.status} message={alert?.message} />}

            <SimpleGrid columns={{ sm: 1, lg: 2 }} spacing='10'>
              <Input control={control} name='username' label='Usuario' placeholder='Ingresa tu usuario' disabled={disabled} />

              <Input control={control} name='name' label='Nombre' placeholder='Ingresa tu nombre' disabled={disabled} />

              <Input control={control} name='email' label='Email' placeholder='Ingresa tu email' disabled={disabled} />

              <PasswordInput control={control} name='password' label='Contraseña' placeholder='Ingresa tu contraseña' disabled={disabled} />
            </SimpleGrid>

            <Box display='flex' justifyContent='flex-end' alignItems='center' mt={6} gap={4}>
              <Button type='button' leftIcon={<MdChevronLeft />} fontSize='md' variant='outline' fontWeight='500' p={6} disabled={disabled} onClick={onCancel}>
                Regresar
              </Button>
              <Button type='submit' leftIcon={<MdSave />} fontSize='md' variant='brand' fontWeight='500' p={6} disabled={disabled}>
                Editar
              </Button>
            </Box>
          </form>
        </Box>
      </Card>
    </SimpleGrid>
  )
}

export default UserEditView
