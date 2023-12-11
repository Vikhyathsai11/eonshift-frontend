import { AreaChart, Card, Title } from "@tremor/react";

const chartdata = [
  {
    date: "Jan 22",
    test1: 2890,
    test2: 2338,
  },
  {
    date: "Feb 22",
    test1: 2756,
    test2: 2103,
  },
  {
    date: "Mar 22",
    test1: 3322,
    test2: 2194,
  },
  {
    date: "Apr 22",
    test1: 3470,
    test2: 2108,
  },
  {
    date: "May 22",
    test1: 3475,
    test2: 1812,
  },
  {
    date: "Jun 22",
    test1: 3129,
    test2: 1726,
  },
];

const valueFormatter = function (number: number): string {
  return new Intl.NumberFormat("us").format(number).toString() + " kWh";
};

const SampleChart = () => (
  <Card>
    <Title>Sample Title</Title>
    <AreaChart
      className="h-72 mt-4"
      data={chartdata}
      index="date"
      categories={["test1", "test2"]}
      colors={["indigo", "cyan"]}
      valueFormatter={valueFormatter}
    />
  </Card>
);

export default SampleChart;
