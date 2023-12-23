import { Card, DonutChart, Flex, Text, Title } from "@tremor/react";

const devices = [
  {
    name: "Device1",
    status: "active",
  },
  {
    name: "Device2",
    status: "inactive",
  },
  {
    name: "Device3",
    status: "active",
  },
  {
    name: "Device4",
    status: "inactive",
  },
  {
    name: "Device5",
    status: "active",
  },
];

const statusData = devices.reduce(
  (acc, device) => {
    acc[device.status]++;
    return acc;
  },
  { active: 0, inactive: 0 },
);

const valueFormatter = (number) => `${number}`;

const DonutChart2 = () => (
  <Card className="max-w-lg">
    <Title>Device Status</Title>
    <DonutChart
      className="mt-6"
      data={Object.entries(statusData).map(([status, count]) => ({
        name: status,
        count,
      }))}
      category="count"
      index="name"
      valueFormatter={valueFormatter}
      colors={["green", "red"]}
    />

    {/* Display counts below the DonutChart in a column */}
    <Flex className="flex-col items-center mt-4">
      {Object.entries(statusData).map(([status, count]) => (
        <Flex key={status} direction="column" items="center" className="my-2">
          <Text>{`${
            status.charAt(0).toUpperCase() + status.slice(1)
          } Devices`}</Text>
          <Text>{valueFormatter(count)}</Text>
        </Flex>
      ))}
    </Flex>
  </Card>
);

export default DonutChart2;
