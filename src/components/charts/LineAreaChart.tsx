import { useEffect, useState } from 'react'

import { type ApexOptions } from 'apexcharts'

import { isWindowAvailable } from '@utils/navigation'

export interface ChartState {
  chartData: ApexAxisChartSeries | ApexNonAxisChartSeries
  chartOptions: ApexOptions
}

export type ChartProps = ChartState & { [key: string]: any }

const LineChart = (props: ChartProps): any => {
  const [Chart, setChart] = useState<any>()
  const [chartData, setChartData] = useState<ChartState['chartData']>([])
  const [chartOptions, setChartOptions] = useState<ChartState['chartOptions']>(
    {}
  )

  useEffect(() => {
    import('react-apexcharts').then((mod) => {
      setChart(() => mod.default)
    }).catch((err) => {
      console.error('Failed to load ApexCharts', err)
    })
  }, [])

  useEffect(() => {
    setChartData(props.chartData)
    setChartOptions(props.chartOptions)
  }, [props])

  if (!isWindowAvailable()) return <></>

  return (
    Chart && (
      <Chart
        options={chartOptions}
        series={chartData}
        type="area"
        width="100%"
        height="100%"
      />
    )
  )
}

export default LineChart
