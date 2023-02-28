import { useEffect, useState } from 'react'

import { type ChartProps } from './LineAreaChart'

import { isWindowAvailable } from '@utils/navigation'

interface LineChartProps extends ChartProps {}

export default function LineChart ({ chartOptions, chartData }: LineChartProps): any {
  const [Chart, setChart] = useState<any>()

  useEffect(() => {
    import('react-apexcharts').then((mod) => {
      setChart(() => mod.default)
    }).catch((err) => {
      console.error('Failed to load ApexCharts', err)
    })
  }, [])

  if (!isWindowAvailable()) return <></>

  return (
    Chart && (
      <Chart
        options={chartOptions}
        series={chartData}
        type="line"
        width="100%"
        height="100%"
      />
    )
  )
}
