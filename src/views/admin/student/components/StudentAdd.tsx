// libs
import isEmpty from 'just-is-empty'

// interfaces
import type { ViewAddProps } from '@/interfaces/views/default'

// common
import Alert from '@/common/Alert/default'
import Card from '@/components/card/Card'
import Input from '@/common/Input/default'

// styles
import { Box, Button, Grid, GridItem, Heading, SimpleGrid } from '@chakra-ui/react'
import { MdChevronLeft, MdSave } from 'react-icons/md'
import Select from '@/common/Select/default'

const StudentAddView = ({ control, alert, isSubmitting = false, isDisabled = false, onSubmit, onCancel }: ViewAddProps): JSX.Element => {
  const modalityOptions = [
    { label: 'Presencial', value: 'faceToFaceModality' },
    { label: 'Semi Presencial', value: 'semiFaceToFaceModality' },
    { label: 'Virtual', value: 'virtualModality' }
  ]
  return (
    <form onSubmit={onSubmit}>
      {!isEmpty(alert) && <Alert status={alert?.status} message={alert?.message} />}

      <Grid mb='20px' templateColumns='repeat(2, 1fr)' gap={{ base: '6', lg: '12' }}>
        <GridItem colSpan={{ base: 2 }}>
          <Box display='flex' justifyContent='flex-end' alignItems='center' mt={2} gap={4}>
            <Button type='button' leftIcon={<MdChevronLeft />} fontSize='md' variant='outline' fontWeight='500' p={6} isDisabled={isSubmitting && isDisabled} onClick={onCancel}>
              Back
            </Button>
            <Button type='submit' leftIcon={<MdSave />} fontSize='md' variant='brand' fontWeight='500' p={6} isDisabled={isSubmitting && isDisabled}>
              {isSubmitting ? 'Adding...' : 'Add'}
            </Button>
          </Box>
        </GridItem>

        <GridItem colSpan={{ base: 2, md: 1 }} rowSpan={{ base: 1, md: 2 }}>
          <Card flexDirection='column' w='100%' px='0px'>
            <Box margin={{ base: 6, lg: 10 }}>
              <SimpleGrid columns={{ sm: 1, lg: 2 }} spacing='8'>
                <Heading as='h3' size='md' fontWeight='500' mb='0'>
                  Personal Information
                </Heading>

                <Input control={control} name='name' label='Name' placeholder='Enter full names' helperText='Enter full names to issue your certificate' disabled={isSubmitting} />

                <Input control={control} name='lastname' label='Lastname' placeholder='Enter full surnames' helperText='Enter full surnames to issue your certificate' disabled={isSubmitting} />

                <Select control={control} options={modalityOptions} name='country' label='Country' placeholder='Select a country' isDisabled={isSubmitting} />
              </SimpleGrid>
            </Box>
          </Card>
        </GridItem>

        <GridItem colSpan={{ base: 2, md: 1 }}>
          <Card flexDirection='column' w='100%' px='0px'>
            <Box margin={{ base: 6, lg: 10 }}>
              <SimpleGrid columns={{ sm: 1, lg: 2 }} spacing='8'>
                <Heading as='h3' size='md' fontWeight='500' mb='0'>
                  Academic Information
                </Heading>

                <Input control={control} name='studyCenter' label='Academic Education' placeholder='Enter your university / institute' disabled={isSubmitting} />
              </SimpleGrid>
            </Box>
          </Card>
        </GridItem>

        <GridItem colSpan={{ base: 2, md: 1 }}>
          <Card flexDirection='column' w='100%' px='0px'>
            <Box margin={{ base: 6, lg: 10 }}>
              <SimpleGrid columns={{ sm: 1, lg: 2 }} spacing='8'>
                <Heading as='h3' size='md' fontWeight='500' mb='0'>
                  Employment Information
                </Heading>

                <Input control={control} name='workplace' label='Work center (Optional)' placeholder='Enter your university / institute' disabled={isSubmitting} />
              </SimpleGrid>
            </Box>
          </Card>
        </GridItem>
      </Grid>
    </form>
  )
}

export default StudentAddView
