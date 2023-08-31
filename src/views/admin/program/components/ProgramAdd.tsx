import { useEffect } from 'react'

// libs
import isEmpty from 'just-is-empty'

// interfaces
import type { ProgramViewProps } from '@/interfaces/views/program'

// common
import Alert from '@/common/Alert/default'
import Card from '@/components/card/Card'
import Input from '@/common/Input/default'
import Select from '@/common/Select/default'
import Date from '@/common/Date/default'

// utils
import { overToday } from '@/utils/date'
import { sanitize } from '@/utils/string'

// styles
import { Box, Button, Grid, GridItem, Heading, SimpleGrid } from '@chakra-ui/react'
import { MdChevronLeft, MdSave } from 'react-icons/md'
import NumericInput from '@/common/Input/numeric'

const ProgramAddView = ({ courseOptions, control, watch, setValue, alert, isSubmitting = false, isDisabled = false, onSubmit, onCancel }: ProgramViewProps): JSX.Element => {
  const name = watch('name', null)
  const course = watch('course', null)
  const amount = watch('amount', null)
  const discount = watch('discount', null)

  useEffect(() => {
    function getCourseId () {
      if (isEmpty(course)) return null

      const courseId = courseOptions.find((option) => option.value === course.value)?.value as string
      if (isEmpty(courseId)) return null

      return courseId
    }

    function updateCourseId () {
      setValue('courseId', getCourseId())
    }

    updateCourseId()

    return () => {
      updateCourseId()
    }
  }, [course, courseOptions, setValue])

  useEffect(() => {
    function getCode () {
      if (isEmpty(name)) return ''

      return sanitize(name, '-')
    }

    function updateCode () {
      setValue('code', getCode())
    }

    updateCode()

    return () => {
      updateCode()
    }
  }, [name, setValue])

  useEffect(() => {
    function getTotal () {
      const amountValue = Number(amount?.floatValue ?? 0)
      const discountValue = Number(discount?.floatValue ?? 0)

      return amountValue + discountValue
    }

    function updateTotal () {
      setValue('total', getTotal())
    }

    updateTotal()

    return () => {
      updateTotal()
    }
  }, [amount, discount, setValue])

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
                Add Program
              </Heading>

              <SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} spacing={{ base: 6, md: 8 }}>
                <Select control={control} name='course' label='Course' options={courseOptions} placeholder='Select a course' isDisabled={isSubmitting} />

                <Input control={control} type='text' name='name' label='Name' placeholder='Enter name' maxLength={50} disabled={isSubmitting} />

                <Input control={control} type='text' name='code' label='Code' placeholder='Enter code' maxLength={50} disabled />

                <Date control={control} name='startDate' label='Start Date' placeholder='Enter your start date' disabled={isSubmitting} maxDate={overToday} />

                <Date control={control} name='endDate' label='End Date' placeholder='Enter your end date' disabled={isSubmitting} />

                <NumericInput control={control} type='tel' name='amount' label='Amount' placeholder='9999.99' maxLength={12} disabled={isSubmitting} />

                <NumericInput control={control} type='tel' name='discount' label='Discount' placeholder='9999.99' maxLength={12} disabled={isSubmitting} isOptional />

                <NumericInput control={control} type='tel' name='total' label='Total' placeholder='9999.99' maxLength={12} disabled={isSubmitting} />

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
