import { useEffect, useState } from "react";

import { ChartProps } from "./LineAreaChart";

import { isWindowAvailable } from "utils/navigation";

interface LineChartProps extends ChartProps {}

export default function LineChart({ chartOptions, chartData }: LineChartProps) {
  const [Chart, setChart] = useState<any>();

  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  if (!isWindowAvailable()) return <></>;

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
  );
}
