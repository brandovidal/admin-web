// interfaces
import type { UserAddProps } from '@/interfaces/User'

// common
import Input from '@/common/Input/default'
import PasswordInput from '@/common/Input/password'
import Card from '@/components/card/Card'

// form
import { z } from 'zod'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// libs

// styles
import { Alert, AlertIcon, Box, Button, SimpleGrid, Stack } from '@chakra-ui/react'
import { MdSave } from 'react-icons/md'
import { addUser } from '@/services/user'
import { useState } from 'react'
import isEmpty from 'just-is-empty'

const validationSchema = z.object({
  username: z.string({ required_error: 'Ingresa tu usuario.' }).min(3, { message: 'Ingresa 3 caracteres como minimo' }),
  name: z.string({ required_error: 'Ingresa tu nombre completo.' }).min(3, { message: 'Ingresa 3 caracteres como minimo.' }),
  email: z.string({ required_error: 'Ingresa tu correo.' }).min(5, { message: 'Ingresa 5 caracteres como minimo.' }).email({
    message: 'Ingresa un correo valido.'
  }),
  password: z.string({ required_error: 'Ingresa tu contraseña.' }).min(6, { message: 'Ingresa una contraseña con 6 caracteres' })
})

type ValidationSchema = z.infer<typeof validationSchema>

const UserAddView = ({ router }: UserAddProps): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { isLoading, isSubmitting }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema)
  })

  const [error, setError] = useState<string>()

  const onSubmit: SubmitHandler<ValidationSchema> = data => {
    console.log(data)

    addUser(data)
      .then(response => {
        const { code } = response

        if (code === 'user_exist') {
          console.log('user_exist')
          setError('El usuario ya existe')
          return
        }

        console.log('success post')
        setError('El usuario creado')
        // void router.push('/admin/user/list')
      })
      .catch(() => {
        console.log('error')
      })
  }

  return (
    <SimpleGrid mb='20px' columns={{ sm: 1, md: 1 }} spacing={{ base: '20px', xl: '20px' }}>
      <Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
        <Box margin={{ base: 6, lg: 10 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {!isEmpty(error) && (
              <Stack paddingBottom={6}>
                <Alert status='warning'>
                  <AlertIcon />
                  {error}
                </Alert>
              </Stack>
            )}

            <SimpleGrid columns={{ sm: 1, lg: 2 }} spacing='10'>
              <Input control={control} name='username' label='Usuario' placeholder='Ingresa tu usuario' disabled={!isLoading || isSubmitting} />

              <Input control={control} name='name' label='Nombre' placeholder='Ingresa tu nombre' disabled={!isLoading || isSubmitting} />

              <Input control={control} name='email' label='Email' placeholder='Ingresa tu email' disabled={!isLoading || isSubmitting} />

              <PasswordInput control={control} name='password' label='Contraseña' placeholder='Ingresa tu contraseña' disabled={!isLoading || isSubmitting} />
            </SimpleGrid>

            <Box display='flex' justifyContent='flex-end' alignItems='center' mt='6'>
              <Button type='submit' leftIcon={<MdSave />} fontSize='md' variant='brand' fontWeight='500' h='50' px='6'>
                Agregar
              </Button>
            </Box>
          </form>
        </Box>
      </Card>
    </SimpleGrid>
  )
}

export default UserAddView