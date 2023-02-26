import { useEffect, useState } from "react";

import { ApexOptions } from "apexcharts";

import { isWindowAvailable } from "utils/navigation";

export type ChartState = {
  chartData: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chartOptions: ApexOptions;
};

export type ChartProps = ChartState & {
  [x: string]: any;
};

const LineChart = (props: ChartProps) => {
  const [Chart, setChart] = useState<any>();
  const [chartData, setChartData] = useState<ChartState["chartData"]>([]);
  const [chartOptions, setChartOptions] = useState<ChartState["chartOptions"]>(
    {}
  );

  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  useEffect(() => {
    setChartData(props.chartData);
    setChartOptions(props.chartOptions);
  }, [props]);

  if (!isWindowAvailable()) return <></>;

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
  );
};

export default LineChart;
