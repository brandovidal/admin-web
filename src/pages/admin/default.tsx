import {
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue
} from '@chakra-ui/react'

// Assets
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy
} from 'react-icons/md'
import Usa from '@/img/dashboards/usa.png'

// Custom components
import MiniStatistics from '@/components/card/MiniStatistics'
import IconBox from '@/components/icons/IconBox'
import { Image } from '@/components/image/Image'

import CheckTable from '@/views/admin/default/components/CheckTable'
import ComplexTable from '@/views/admin/default/components/ComplexTable'
import DailyTraffic from '@/views/admin/default/components/DailyTraffic'
import PieCard from '@/views/admin/default/components/PieCard'
import History from '@/views/admin/default/components/History'
import TotalSpent from '@/views/admin/default/components/TotalSpent'
import WeeklyRevenue from '@/views/admin/default/components/WeeklyRevenue'

import {
  columnsDataCheck,
  columnsDataComplex,
  type TableData
} from '@/views/admin/default/variables/columnsData'
import tableDataCheck from '@/views/admin/default/variables/tableDataCheck.json'
import tableDataComplex from '@/views/admin/default/variables/tableDataComplex.json'

import AdminLayout from '@/layouts/admin'

export default function UserReports (): JSX.Element {
  // Chakra Color Mode
  const brandColor = useColorModeValue('brand.500', 'white')
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100')

  return (
    <AdminLayout>
      <Box pt={{ base: '28', md: '24', xl: '24' }}>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }}
          gap="20px"
          mb="20px"
        >
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />
                }
              />
            }
            name="Earnings"
            value="$350.4"
          />
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon
                    w="32px"
                    h="32px"
                    as={MdAttachMoney}
                    color={brandColor}
                  />
                }
              />
            }
            name="Spend this month"
            value="$642.39"
          />
          <MiniStatistics growth="+23%" name="Sales" value="$574.34" />
          <MiniStatistics
            endContent={
              <Flex me="-16px" mt="10px">
                <FormLabel htmlFor="balance">
                  <Box boxSize={'12'}>
                    <Image src={Usa} alt="" w={'100%'} h={'100%'} />
                  </Box>
                </FormLabel>
                <Select
                  id="balance"
                  variant="mini"
                  mt="5px"
                  me="0px"
                  defaultValue="usd"
                >
                  <option value="usd">USD</option>
                  <option value="eur">EUR</option>
                  <option value="gba">GBA</option>
                </Select>
              </Flex>
            }
            name="Your balance"
            value="$1,000"
          />
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
                icon={<Icon w="28px" h="28px" as={MdAddTask} color="white" />}
              />
            }
            name="New Tasks"
            value="154"
          />
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon w="32px" h="32px" as={MdFileCopy} color={brandColor} />
                }
              />
            }
            name="Total Projects"
            value="2935"
          />
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
          <TotalSpent />
          <WeeklyRevenue />
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck as unknown as TableData[]}
          />
          <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
            <DailyTraffic />
            <PieCard />
          </SimpleGrid>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
          <ComplexTable
            columnsData={columnsDataComplex}
            tableData={tableDataComplex as unknown as TableData[]}
          />
          <History />
        </SimpleGrid>
      </Box>
    </AdminLayout>
  )
}
