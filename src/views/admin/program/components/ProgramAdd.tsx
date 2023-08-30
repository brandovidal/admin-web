import { useMemo } from 'react'

// libs
import isEmpty from 'just-is-empty'

// interfaces
import type { ProgramViewProps } from '@/interfaces/views/program'

// common
import Alert from '@/common/Alert/default'
import Card from '@/components/card/Card'
import Input from '@/common/Input/default'
import NumberInput from '@/common/Input/number'
import Select from '@/common/Select/default'
import Date from '@/common/Date/default'

// constant
import { COUNTRY_OPTIONS } from '@/constants/program'
import { PHONE_PREFIX } from '@/constants/default'

import { overToday } from '@/utils/date'

// styles
import { Box, Button, Grid, GridItem, Heading, SimpleGrid } from '@chakra-ui/react'
import { MdChevronLeft, MdSave } from 'react-icons/md'

const ProgramAddView = ({ control, watch, setValue, alert, isSubmitting = false, isDisabled = false, onSubmit, onCancel }: ProgramViewProps): JSX.Element => {
  const countryOptions = useMemo(() => COUNTRY_OPTIONS, [])

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

        <GridItem colSpan={{ base: 2 }}>
          <Card flexDirection='column' w='100%' px='0px'>
            <Box margin={{ base: 6, lg: 8 }}>
              <Heading as='h3' size='md' fontWeight='bold' mb={{ base: 4, md: 6 }}>
                Personal Information
              </Heading>

              <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={{ base: 6, md: 8 }}>
                <Select control={control} name='course' label='Course' options={countryOptions} placeholder='Select a course' isDisabled={isSubmitting} />

                <Input control={control} type='text' name='name' label='Name' placeholder='Enter name' maxLength={50} disabled={isSubmitting} />

                <Input control={control} type='text' name='code' label='Code' placeholder='Enter code' maxLength={50} disabled={isSubmitting} />

                <Date control={control} name='startDate' label='Start Date' placeholder='Enter your start date' disabled={isSubmitting} maxDate={overToday} />

                <Date control={control} name='endDate' label='End Date' placeholder='Enter your end date' disabled={isSubmitting} />

                <NumberInput control={control} type='tel' name='amount' label='Amount' format='#### ####.##' placeholder='9999.99' maxLength={12} disabled={isSubmitting} />

                <NumberInput control={control} type='tel' name='discount' label='Discount' format='#### ####.##' placeholder='9999.99' maxLength={12} disabled={isSubmitting} isOptional />

                <NumberInput control={control} type='tel' name='total' label='Total' format='#### ####.##' placeholder='9999.99' maxLength={12} disabled={isSubmitting} />

                <Input control={control} type='text' name='observation' label='Observation' placeholder='Enter your observation' maxLength={50} disabled={isSubmitting} isOptional />
              </SimpleGrid>
            </Box>
          </Card>
        </GridItem>
      </Grid>
    </form>
  )
}

export default ProgramAddView
