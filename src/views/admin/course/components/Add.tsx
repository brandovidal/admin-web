// libs
import isEmpty from 'just-is-empty'

// interfaces
import type { CourseViewProps } from '@/interfaces/views/course'

// common
import Alert from '@/common/Alert/default'
import Card from '@/components/card/Card'
import Input from '@/common/Input/default'
import Date from '@/common/Date/default'
import NumericInput from '@/common/Input/numeric'
import Radio from '@/common/Input/radio'
import Textarea from '@/common/Input/textarea'

// utils
import { overToday } from '@/utils/date'

import { NO_OP } from '@/constants/default'

// styles
import { Box, Button, Grid, GridItem, Heading, SimpleGrid } from '@chakra-ui/react'
import { MdChevronLeft, MdSave } from 'react-icons/md'

const CourseAddView = ({
  uniqueProgramOptions = [],
  control,
  alert,
  isSubmitting = false,
  isDisabled = false,
  onSubmit = NO_OP,
  useOnChangeName = NO_OP,
  useOnChangeTotal = NO_OP,
  hasUniqueProgram = false,
  onCancel
}: CourseViewProps): JSX.Element => {
  useOnChangeName()
  useOnChangeTotal()

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
                Add Course
              </Heading>

              <SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} spacing={{ base: 6, md: 8 }}>
                <Input control={control} type='text' name='name' label='Name' placeholder='Enter name' maxLength={50} disabled={isSubmitting} />

                <Input control={control} type='text' name='code' label='Code' placeholder='Enter code' maxLength={50} disabled />

                <Radio control={control} name='uniqueProgram' label='Unique Program' optionalText="with membership" options={uniqueProgramOptions} disabled={isSubmitting} isOptional />

                {!hasUniqueProgram && <Date control={control} name='startDate' label='Start Date' placeholder='Enter your start date' disabled={isSubmitting} maxDate={overToday} />}

                {!hasUniqueProgram && <Date control={control} name='endDate' label='End Date' placeholder='Enter your end date' disabled={isSubmitting} />}

                <NumericInput control={control} type='tel' name='amount' label='Amount' placeholder='9999.99' maxLength={12} disabled={isSubmitting} />

                <NumericInput control={control} type='tel' name='discount' label='Discount' placeholder='9999.99' maxLength={12} disabled={isSubmitting} isOptional />

                <NumericInput control={control} type='tel' name='total' label='Total' placeholder='9999.99' maxLength={12} disabled={isSubmitting} />

                <Textarea control={control} name='observation' label='Observation' placeholder='Enter your observation' maxLength={100} disabled={isSubmitting} isOptional />
              </SimpleGrid>
            </Box>
          </Card>
        </GridItem>
      </Grid>
    </form>
  )
}

export default CourseAddView
