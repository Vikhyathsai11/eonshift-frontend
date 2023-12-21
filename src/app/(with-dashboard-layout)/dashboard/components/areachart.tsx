import { useState } from "react";

import { ArrowRightIcon } from "@heroicons/react/24/solid";
import {
  AreaChart,
  BadgeDelta,
  Button,
  Card,
  Flex,
  Metric,
  ProgressBar,
  Tab,
  TabGroup,
  TabList,
  Text,
} from "@tremor/react";

const sales = [
  {
    Month: "Jan 21",
    Sales: 2890,
  },
  {
    Month: "Feb 21",
    Sales: 1890,
  },
  // ...
  {
    Month: "Dec 21",
    Sales: 3350,
  },
];

interface Product {
  title: string;
  value: number;
  metric: string;
  location: string;
}

const products: Product[] = [
  {
    title: "Product A",
    value: 38,
    metric: "$ 100,838",
    location: "A",
  },
  {
    title: "Product B",
    value: 34,
    metric: "$ 90,224",
    location: "A",
  },
  // ...
  {
    title: "Product N",
    value: 8,
    metric: "$ 10,614",
    location: "B",
  },
];

const valueFormatter = (number: number) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;

export default function Example() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedLocation = selectedIndex === 0 ? "A" : "B";

  return (
    <Card className="max-w-md mx-auto">
      <Flex alignItems="start">
        <Text>Total Sales</Text>
        <BadgeDelta deltaType="moderateIncrease">23.1%</BadgeDelta>
      </Flex>
      <Flex
        justifyContent="start"
        alignItems="baseline"
        className="space-x-3 truncate"
      >
        <Metric>$442,276</Metric>
        <Text>from $382,482</Text>
      </Flex>
      <AreaChart
        className="mt-10 h-48"
        data={sales}
        index="Month"
        categories={["Sales"]}
        colors={["blue"]}
        showYAxis={false}
        showLegend={false}
        startEndOnly={true}
        valueFormatter={valueFormatter}
      />
      <TabGroup
        className="mt-4"
        index={selectedIndex}
        onIndexChange={setSelectedIndex}
      >
        <TabList>
          <Tab>Location A</Tab>
          <Tab>Location B</Tab>
        </TabList>
      </TabGroup>
      {products
        .filter((item: Product) => item.location === selectedLocation)
        .map((item: Product) => (
          <div key={item.title} className="mt-4 space-y-2">
            <Flex>
              <Text>{item.title}</Text>
              <Text>{`${item.value}% (${item.metric})`}</Text>
            </Flex>
            <ProgressBar value={item.value} />
          </div>
        ))}
      <Flex className="mt-6 pt-4 border-t">
        <Button
          size="xs"
          variant="light"
          icon={ArrowRightIcon}
          iconPosition="right"
        >
          View more
        </Button>
      </Flex>
    </Card>
  );
}
