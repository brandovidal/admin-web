// libs
import isEmpty from 'just-is-empty'

// interfaces
import type { ViewAddProps } from '@/interfaces/views/default'

// common
import Alert from '@/common/Alert/default'
import Card from '@/components/card/Card'
import Input from '@/common/Input/default'
import Select from '@/common/Select/default'

// styles
import { Box, Button, Grid, GridItem, Heading, SimpleGrid } from '@chakra-ui/react'
import { MdChevronLeft, MdSave } from 'react-icons/md'

const StudentAddView = ({ control, alert, isSubmitting = false, isDisabled = false, onSubmit, onCancel }: ViewAddProps): JSX.Element => {
  const modalityOptions = [
    { label: 'Presencial', value: 'faceToFaceModality' },
    { label: 'Semi Presencial', value: 'semiFaceToFaceModality' },
    { label: 'Virtual', value: 'virtualModality' }
  ]
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

              <SimpleGrid columns={{ sm: 1, lg: 2 }} spacing={{ sm: 6, md: 8 }}>
                <Input control={control} type='text' name='name' label='Name' placeholder='Enter full names' maxLength={50} helperText='Enter full names to issue your certificate' disabled={isSubmitting} />

                <Input control={control} type='text' name='lastname' label='Lastname' placeholder='Enter full surnames' maxLength={50} helperText='Enter full surnames to issue your certificate' disabled={isSubmitting} />

                <Select control={control} options={modalityOptions} name='country' label='Country' placeholder='Select a country' isDisabled={isSubmitting} />

                <Input control={control} type='tel' name='phone' label='Phone' placeholder='987654321' maxLength={15} disabled={isSubmitting} />

                <Input control={control} type='tel' name='dni' label='DNI' placeholder='87654321' disabled={isSubmitting} />

                <Input control={control} type='email' name='email' label='Phone' placeholder='Enter your email' disabled={isSubmitting} />

                <Input control={control} type='tel' name='ladline' label='Ladline' placeholder='Enter your ladline' disabled={isSubmitting} />

                <Input control={control} type='tel' name='ruc' label='RUC' placeholder='10876543210' disabled={isSubmitting} />

                <Input control={control} type='radio' name='status' label='Status' disabled={isSubmitting} />

                <Input control={control} type='text' name='businessName' label='Business Name' placeholder='Enter your businessName' disabled={isSubmitting} />
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

              <SimpleGrid columns={{ sm: 1, lg: 2 }} spacing={{ sm: 6, md: 8 }}>
                <Input control={control} type='radio' name='training' label='Academic Formation' disabled={isSubmitting} />

                <Input control={control} type='text' name='studyCenter' label='Name' placeholder='Enter your university / institute' disabled={isSubmitting} />
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

              <SimpleGrid columns={{ sm: 1, lg: 2 }} spacing={{ sm: 6, md: 8 }}>
                <Input control={control} type='text' name='workplace' label='Work center (Optional)' placeholder='Enter your work center' disabled={isSubmitting} />

                <Input control={control} type='text' name='workPosition' label='Position (Optional)' placeholder='Enter your position' disabled={isSubmitting} />

                <Input control={control} type='text' name='workAddress' label='Address (Optional)' placeholder='Enter your address' disabled={isSubmitting} />
              </SimpleGrid>
            </Box>
          </Card>
        </GridItem>
      </Grid>
    </form>
  )
}

export default StudentAddView
