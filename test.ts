import React from 'react';
import Chart from 'react-apexcharts';
import { ChartOptions, ApexAxisChartSeries } from 'apexcharts';

interface ReusableChartProps {
  options: ChartOptions;
  series: ApexAxisChartSeries;
  width?: string | number;
}

const ReusableChart: React.FC<ReusableChartProps> = ({ options, series, width }) => {
  const chartProps: any = {};

  if (width) {
    chartProps.width = width;
  }

  return <Chart options={options} series={series} {...chartProps} />;
};

export default ReusableChart;
