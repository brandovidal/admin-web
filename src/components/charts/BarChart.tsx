import { useEffect, useState } from "react";

import { ChartProps, ChartState } from "./LineAreaChart";

import { isWindowAvailable } from "utils/navigation";

const ColumnChart = (props: ChartProps) => {
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
        type="bar"
        width="100%"
        height="100%"
      />
    )
  );
};

export default ColumnChart;
