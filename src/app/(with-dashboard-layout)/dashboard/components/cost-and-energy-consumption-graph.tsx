import { BarChart, Card, Flex, Grid, Text, Title } from "@tremor/react";

const chartdata = [
  {
    name: "Jan 2021",
    "Energy Consumption": 2488,
  },
  {
    name: "Feb 2021",
    "Energy Consumption": 1445,
  },
];

const valueFormatter = (number) =>
  `mWh ${new Intl.NumberFormat("us").format(number).toString()}`;

const BarChartComponent = () => (
  <Card>
    <Title size="lg">CHANGE IN COST</Title>

    {/* Additional Cards for Increase in Energy and Increase in Cost */}
    <Flex className="mt-6">
      <Card className="mr-4 flex-1">
        <Title size="xl" color="yellow" weight="bold">
          +40%
        </Title>
        <Text size="sm">Increase in the energy.</Text>
        {/* Add content for Increase in Energy */}
      </Card>

      <Card className="flex-1">
        <Title size="xl" color="red" weight="bold">
          {" "}
          +2000 Rs.{" "}
        </Title>
        <Text size="sm">Increase in cost</Text>
        {/* Add content for Increase in Cost */}
      </Card>
    </Flex>

    {/* Bar Chart */}
    <BarChart
      className="mt-6"
      data={chartdata}
      index="name"
      categories={["Energy Consumption"]}
      colors={["blue"]}
      valueFormatter={valueFormatter}
      yAxisWidth={48}
    />
  </Card>
);

export default BarChartComponent;
