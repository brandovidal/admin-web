import React from 'react'

// Chakra imports
import { Button, Flex, Text, useColorModeValue } from '@chakra-ui/react'

// Custom components
import Card from '@/components/card/Card'
import HistoryItem from './HistoryItem'

// Assets
import Nft1 from '@/img/nfts/Nft1.png'
import Nft2 from '@/img/nfts/Nft2.png'
import Nft3 from '@/img/nfts/Nft3.png'
import Nft4 from '@/img/nfts/Nft4.png'
import Nft5 from '@/img/nfts/Nft5.png'
import Nft6 from '@/img/nfts/Nft6.png'

export default function History (props: { [key: string]: any }): JSX.Element {
  // Chakra Color Mode
  const textColor = useColorModeValue('brands.900', 'white')

  return (
    <Card p='0px'>
      <Flex align={{ sm: 'flex-start', lg: 'center' }} justify='space-between' w='100%' px='22px' py='18px'>
        <Text color={textColor} fontSize='xl' fontWeight='600'>
          History
        </Text>
        <Button variant='action'>See all</Button>
      </Flex>

      <HistoryItem name='Colorful Heaven' author='By Mark Benjamin' date='30s ago' image={Nft5} price='0.91 ETH' />
      <HistoryItem name='Abstract Colors' author='By Esthera Jackson' date='58s ago' image={Nft1} price='0.91 ETH' />
      <HistoryItem name='ETH AI Brain' author='By Nick Wilson' date='1m ago' image={Nft2} price='0.91 ETH' />
      <HistoryItem name='Swipe Circles' author='By Peter Will' date='1m ago' image={Nft4} price='0.91 ETH' />
      <HistoryItem name='Mesh Gradients ' author='By Will Smith' date='2m ago' image={Nft3} price='0.91 ETH' />
      <HistoryItem name='3D Cubes Art' author='By Manny Gates' date='3m ago' image={Nft6} price='0.91 ETH' />
    </Card>
  )
}
