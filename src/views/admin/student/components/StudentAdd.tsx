import { useMemo } from 'react'

// libs
import isEmpty from 'just-is-empty'

// interfaces
import type { StudentViewProps } from '@/interfaces/views/student'

// common
import Alert from '@/common/Alert/default'
import Card from '@/components/card/Card'
import Input from '@/common/Input/default'
import PatternInput from '@/common/Input/pattern'
import Select from '@/common/Select/default'
import Radio from '@/common/Input/radio'
import Date from '@/common/Date/default'

// constant
import { PHONE_PREFIX } from '@/constants/default'

import { over18Years, over1900Years } from '@/utils/date'

// styles
import { Box, Button, Grid, GridItem, Heading, SimpleGrid } from '@chakra-ui/react'
import { MdChevronLeft, MdSave } from 'react-icons/md'

const StudentAddView = ({ countryOptions, trainingOptions, statusOptions, control, watch, setValue, alert, isSubmitting = false, isDisabled = false, onSubmit, onCancel }: StudentViewProps): JSX.Element => {
  const country = watch('country', null)
  const phone = watch('phone', null)

  const phoneCodeText = useMemo(() => {
    if (isEmpty(country) || isEmpty(phone)) return PHONE_PREFIX

    const phoneCode = countryOptions.find((option) => option.value === country.value)?.phoneCode as string
    if (isEmpty(phoneCode)) return PHONE_PREFIX

    setValue('phoneCode', phoneCode)
    return `${PHONE_PREFIX}${phoneCode}`
  }, [country, phone, countryOptions, setValue])

  return (
    <form onSubmit={onSubmit}>
      {!isEmpty(alert) && <Alert status={alert?.status} message={alert?.message} />}

      <Grid
        templateColumns='repeat(2, 1fr)'
        gap={{ base: '6', lg: '12' }}
        mb='20px'
      >
        <GridItem colSpan={{ base: 2 }}>
          <Box display='flex' justifyContent='flex-end' alignItems='center' mt={2} gap={4}>
            <Button type='button' leftIcon={<MdChevronLeft />} fontSize='md' variant='outline' fontWeight='400' p={6} isDisabled={isSubmitting && isDisabled} onClick={onCancel}>
              Back
            </Button>
            <Button type='submit' leftIcon={<MdSave />} fontSize='md' variant='brand' fontWeight='400' p={6} isDisabled={isSubmitting && isDisabled}>
              {isSubmitting ? 'Adding...' : 'Add'}
            </Button>
          </Box>
        </GridItem>

        <GridItem colSpan={{ base: 2, md: 1 }} rowSpan={{ base: 1, md: 2 }}>
          <Card flexDirection='column' w='100%' px='0px'>
            <Box margin={{ base: 6, lg: 8 }}>
              <Heading as='h3' size='md' fontWeight='bold' mb={{ base: 4, md: 6 }}>
                Personal Information
              </Heading>

              <SimpleGrid columns={{ sm: 1, lg: 2 }} spacing={{ base: 6, md: 8 }}>
                <Input control={control} type='text' name='name' label='Name' placeholder='Enter full names' maxLength={50} helperText='Enter full names to issue your certificate' disabled={isSubmitting} />

                <Input control={control} type='text' name='lastname' label='Lastname' placeholder='Enter full surnames' maxLength={50} helperText='Enter full surnames to issue your certificate' disabled={isSubmitting} />

                <Date control={control} name='birthday' label='Birthday' placeholder='Enter birthday' disabled={isSubmitting} minDate={over1900Years} maxDate={over18Years} />

                <Select control={control} name='country' label='Country' options={countryOptions} placeholder='Select a country' isDisabled={isSubmitting} />

                <PatternInput control={control} type='tel' name='phone' label='Phone' format='### ### ### ###' placeholder='987654321' leftIconText={phoneCodeText} maxLength={12} disabled={isSubmitting} />

                <Input control={control} rules={{ required: true }} type='tel' name='dni' label='DNI' placeholder='87654321' maxLength={8} disabled={isSubmitting} />

                <Input control={control} type='email' name='email' label='Email' placeholder='Enter your email' maxLength={50} disabled={isSubmitting} />

                <Input control={control} type='tel' name='ladline' label='Ladline' placeholder='Enter your ladline' maxLength={12} disabled={isSubmitting} />

                <Input control={control} type='tel' name='ruc' label='RUC' placeholder='10876543210' maxLength={11} disabled={isSubmitting} />

                <Radio control={control} name='status' label='Status' options={statusOptions} disabled={isSubmitting} />

                <Input control={control} type='text' name='businessName' label='Business Name' placeholder='Enter your business name' maxLength={50} disabled={isSubmitting} />
              </SimpleGrid>
            </Box>
          </Card>
        </GridItem>

        <GridItem colSpan={{ base: 2, md: 1 }}>
          <Card flexDirection='column' w='100%' px='0px'>
            <Box margin={{ base: 6, lg: 8 }}>
              <Heading as='h3' size='md' fontWeight='bold' mb={{ base: 4, md: 6 }}>
                Academic Information
              </Heading>

              <SimpleGrid columns={{ base: 1 }} spacing={{ base: 6, md: 8 }}>
                <Radio control={control} name='training' label='Academic Formation' options={trainingOptions} disabled={isSubmitting} />

                <Input control={control} type='text' name='studyCenter' label='Name' placeholder='Enter your university / institute' maxLength={50} disabled={isSubmitting} />
              </SimpleGrid>
            </Box>
          </Card>
        </GridItem>

        <GridItem colSpan={{ base: 2, md: 1 }}>
          <Card flexDirection='column' w='100%' px='0px'>
            <Box margin={{ base: 6, lg: 8 }}>
              <Heading as='h3' size='md' fontWeight='bold' mb={{ base: 4, md: 6 }}>
                Employment Information
              </Heading>

              <SimpleGrid columns={{ sm: 1, lg: 2 }} spacing={{ base: 6, md: 8 }}>
                <Input control={control} type='text' name='workplace' label='Work center (Optional)' placeholder='Enter your work center' maxLength={50} disabled={isSubmitting} />

                <Input control={control} type='text' name='workPosition' label='Position (Optional)' placeholder='Enter your position' maxLength={50} disabled={isSubmitting} />

                <Input control={control} type='text' name='workAddress' label='Address (Optional)' placeholder='Enter your address' maxLength={50} disabled={isSubmitting} />
              </SimpleGrid>
            </Box>
          </Card>
        </GridItem>
      </Grid>
    </form>
  )
}

export default StudentAddView
