import { useEffect, useState } from "react";

import {
  BadgeDelta,
  Card,
  DeltaType,
  DonutChart,
  Flex,
  Legend,
  List,
  ListItem,
  Select,
  SelectItem,
  Title,
} from "@tremor/react";
import { number, string } from "zod";

const regions = [
  { key: "all", name: "All Regions" },
  { key: "us", name: "United States" },
  { key: "europe", name: "Europe" },
  { key: "asia", name: "Asia" },
];
interface Cities {
  name: string;
  region: string;
  sales: number;
  delta: string;
  deltaType: string;
}

const cities: Cities[] = [
  {
    name: "Device-1",
    region: "us",
    sales: 984888,
    delta: "6.1%",
    deltaType: "increase",
  },
  {
    name: "Device-2",
    region: "europe",
    sales: 456700,
    delta: "1.2%",
    deltaType: "moderateDecrease",
  },
  {
    name: "Device-3",
    region: "us",
    sales: 240000,
    delta: "2.3%",
    deltaType: "moderateIncrease",
  },
  {
    name: "Device-4",
    region: "asia",
    sales: 390800,
    delta: "0.5%",
    deltaType: "moderateDecrease",
  },
 
];

const filterByRegion = (region: string, data: Cities[]) =>
  region === "all" ? data : data.filter((city) => city.region === region);

const valueFormatter = (number: number) =>
  `mWh ${Intl.NumberFormat("us").format(number).toString()}`;

export default function Example() {
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [filteredData, setFilteredData] = useState(cities);

  //   useEffect(() => {
  //     const data = cities;
  //     setFilteredData(filterByRegion(selectedRegion, data));
  //   }, [selectedRegion]);

  return (
    <Card className="max-w-md mx-auto">
      <Flex className="space-x-8" justifyContent="start" alignItems="center">
        <Title>Energy Consumed by Each Device</Title>
        {/* <Select
          onValueChange={setSelectedRegion}
          placeholder="Region Selection"
        >
          {regions.map((region) => (
            <SelectItem key={region.key} value={region.key}>
              {region.name}
            </SelectItem>
          ))}
        </Select> */}
      </Flex>
      <Legend
        categories={filteredData.map((city) => city.name)}
        className="mt-6"
      />
      <DonutChart
        data={filteredData}
        category="sales"
        index="name"
        valueFormatter={valueFormatter}
        className="mt-6"
      />
      <List className="mt-6">
        {filteredData.map((city) => (
          <ListItem key={city.name}>
            {city.name}
            <BadgeDelta deltaType={city.deltaType} size="xs">
              {city.delta}
            </BadgeDelta>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
