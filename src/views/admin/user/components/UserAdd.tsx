// common
import { useState } from 'react'

// interfaces
import type { UserAddProps } from '@/interfaces/User'

// styles
import { Box, Button, Card, FormControl, FormLabel, Input, InputGroup, InputRightElement, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react'

// form
import { z } from 'zod'
import { type SubmitHandler, useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// libs
import isEmpty from 'just-is-empty'

// styles
import { MdSave } from 'react-icons/md'

const validationSchema = z.object({
  username: z.string().min(3, { message: 'Ingrese tu usuario.' }),
  name: z.string().min(3, { message: 'Ingrese tu nombre completo.' }),
  email: z.string().min(3, { message: 'Ingrese tu email.' }).email({
    message: 'Ingrese su email valido.'
  }),
  password: z.string().min(6, { message: 'Ingrese una contraseña con 6 caracteres' })
})

type ValidationSchema = z.infer<typeof validationSchema>

const UserAddView = ({ router }: UserAddProps): JSX.Element => {
  const textColor = useColorModeValue('secondaryGray.900', 'white')

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema)
  })

  const onSubmit: SubmitHandler<ValidationSchema> = data => {
    console.log(data)
  }

  const [show, setShow] = useState(false)
  const handleClick = (): void => {
    setShow(!show)
  }

  return (
    <SimpleGrid mb='20px' columns={{ sm: 1, md: 1 }} spacing={{ base: '20px', xl: '20px' }}>
      <Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
        <Box margin={{ base: '6', lg: '12' }}>
          <form autoComplete='new-password' onSubmit={handleSubmit(onSubmit)}>
            <SimpleGrid columns={{ sm: 1, lg: 2 }} spacing='10'>
              <FormControl>
                <FormLabel htmlFor='username'>Usuario</FormLabel>
                <Controller
                  control={control}
                  name='username'
                  render={({ field: { name, onChange, value = '' } }) => (
                    <Input
                      type='text'
                      placeholder='joe'
                      color={textColor}
                      autoComplete='new-password'
                      errorBorderColor='red.300'
                      isInvalid={!isEmpty(errors?.username)}
                      name={name}
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                {!isEmpty(errors?.username) && (<Text fontSize='12' color='red.300' mt='2'>{errors.username?.message}</Text>)}
              </FormControl>

              <FormControl>
                <FormLabel htmlFor='name'>Nombre</FormLabel>
                <Input type='text' placeholder='Joe Doe' autoComplete='new-password' color={textColor} isInvalid={!isEmpty(errors?.name)} {...register('name')} />
                {!isEmpty(errors?.name) && (
                  <Text fontSize='12' color='red.300' mt='2'>
                    {errors.name?.message}
                  </Text>
                )}
              </FormControl>

              <FormControl>
                <FormLabel htmlFor='email'>Correo</FormLabel>
                <Input type='email' placeholder='jode@doe.com' autoComplete='new-password' color={textColor} isInvalid={!isEmpty(errors?.email)} {...register('email')} />
                {!isEmpty(errors?.email) && (
                  <Text fontSize='12' color='red.300' mt='2'>
                    {errors.email?.message}
                  </Text>
                )}
              </FormControl>

              <FormControl>
                <FormLabel htmlFor='password'>Contraseña</FormLabel>
                <InputGroup size='md'>
                  <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='123456'
                    autoComplete='new-password'
                    color={textColor}
                    isInvalid={!isEmpty(errors?.email)}
                    {...register('password')}
                  />
                  <InputRightElement width='4.5rem' borderRadius='16px'>
                    <Button h='1.75rem' size='sm' onClick={handleClick} borderRadius='10px'>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {!isEmpty(errors?.password) && (
                  <Text fontSize='12' color='red.300' mt='2'>
                    {errors.password?.message}
                  </Text>
                )}
              </FormControl>
            </SimpleGrid>

            <Box display='flex' justifyContent='flex-end' alignItems='center' mt='6'>
              <Button type='submit' leftIcon={<MdSave />} fontSize='sm' variant='brand' fontWeight='500' h='50' px='8'>
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
