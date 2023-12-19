"use client"
import { AreaChart, Card, Title } from "@tremor/react";

const chartdata1 = [
  {
    date: "Jan 1",
    Category1: 2890,
    Category2: 2338,
  },
  {
    date: "Feb 1",
    Category1: 2899,
    Category2: 2880,
  }
];

const chartdata2 = [
  {
    date: "Jan 1",
    Category1: 2890,
    Category2: 2338,
  },
  {
    date: "Feb 1",
    Category1: 2899,
    Category2: 2880,
  }
];

const chartdata3 = [
  {
    date: "Jan 1",
    Category1: 2890,
    Category2: 2338,
  },
  {
    date: "Feb 1",
    Category1: 2899,
    Category2: 2880,
  }
];

const chartdata4 = [
  {
    date: "Jan 1",
    Category1: 2890,
    Category2: 2338,
  },
  {
    date: "Feb 1",
    Category1: 2899,
    Category2: 2880,
  }
];

const chartdata5 = [
  {
    date: "Jan 1",
    Category1: 2890,
    Category2: 2338,
  },
  {
    date: "Feb 1",
    Category1: 2899,
    Category2: 2880,
  }
];

const valueFormatter = function (number1) {
  return "$ " + new Intl.NumberFormat("us").format(number1).toString();
};

const PerformancePage = () => (
  <div>
    {/* First Chart */}
    <Card>
      <Title>BLDC Motor 1</Title>
      <AreaChart
        className="h-72 mt-4"
        data={chartdata1}
        index="date"
        categories={["Category1", "Category2"]}
        colors={["indigo", "cyan"]}
        valueFormatter={valueFormatter}
      />
    </Card>

    {/* Second Chart */}
    <Card>
      <Title>BLDC Motor 2</Title>
      <AreaChart
        className="h-72 mt-4"
        data={chartdata2}
        index="date"
        categories={["Category1", "Category2"]}
        colors={["indigo", "cyan"]}
        valueFormatter={valueFormatter}
      />
    </Card>
    <Card>
      <Title>BLDC Motor 2</Title>
      <AreaChart
        className="h-72 mt-4"
        data={chartdata3}
        index="date"
        categories={["Category1", "Category2"]}
        colors={["indigo", "cyan"]}
        valueFormatter={valueFormatter}
      />
    </Card>
    <Card>
      <Title>BLDC Motor 2</Title>
      <AreaChart
        className="h-72 mt-4"
        data={chartdata4}
        index="date"
        categories={["Category1", "Category2"]}
        colors={["indigo", "cyan"]}
        valueFormatter={valueFormatter}
      />
    </Card>
    <Card>
      <Title>BLDC Motor 2</Title>
      <AreaChart
        className="h-72 mt-4"
        data={chartdata5}
        index="date"
        categories={["Category1", "Category2"]}
        colors={["indigo", "cyan"]}
        valueFormatter={valueFormatter}
      />
    </Card>

  </div>
);

export default PerformancePage;
