import { useState } from "react";

import { CodeIcon, TableIcon } from "@heroicons/react/solid";
import {
  BarList,
  Bold,
  Card,
  Flex,
  Tab,
  TabGroup,
  TabList,
  Text,
  Title,
} from "@tremor/react";
import { number, Values } from "zod";

// const categories = [
//   { key: "developers", name: "Developers", icon: CodeIcon },
//   { key: "analysts", name: "Analysts", icon: TableIcon },
// ];

interface Visits {
  name: string;
  value: number;
}

const visits = [
  { name: "Device-1", value: 652 },
  { name: "Device-2", value: 134 },
  { name: "Device-3", value: 542 },
  { name: "Device-4", value: 234 },
  { name: "Device-5", value: 32 },
  { name: "Device-6", value: 15 },
  { name: "Device-7", value: 456 },
];

// const developerVisits = [
//   { name: "Device-1", value: 652 },
//   { name: "Device-2", value: 134 },
//   { name: "Device-3", value: 542 },
//   { name: "Device-4", value: 234 },
//   { name: "Device-5", value: 32 },
//   { name: "Device-6", value: 15 },
// ];

// const analystVisits = [
//   { name: "Device-1", value: 456 },
//   { name: "Device-2", value: 371 },
//   { name: "Device-3", value: 96 },
//   { name: "Device-4", value: 191 },
//   { name: "Device-5", value: 82 },
//   { name: "Device-6", value: 35 },
// ];

// const visits = {
//   developers: developerVisits,
//   analysts: analystVisits,
// };

const sortData = (data: Visits[]) =>
  data.sort((a, b) => {
    if (a.value < b.value) return 1;
    if (a.value > b.value) return -1;
    return 0;
  });

// export default function Example() {
// //   const [selectedIndex, setSelectedIndex] = useState(0);
//   // const selectedCategory = selectedIndex === 0 ? "developers" : "analysts";

//   return (
//     <Card className="max-w-md mx-auto">
//       <Title>Most energy Consuming Devices</Title>
//       {/* <TabGroup
//         index={selectedIndex}
//         onIndexChange={setSelectedIndex}
//         className="mt-6"
//       >
//         <TabList>
//           {categories.map((category) => (
//             <Tab key={category.key} value={category.key} icon={category.icon}>
//               {category.name}
//             </Tab>
//           ))}
//         </TabList>
//       </TabGroup> */}
//       <Flex className="mt-6">
//         <Text>
//           <Bold>Device</Bold>
//         </Text>
//         <Text>
//           <Bold>Energy Consumed</Bold>
//         </Text>
//       </Flex>
//       {/* <BarList
//         data={sortData(visits[selectedCategory])}
//         showAnimation={false}
//         className="mt-4"
//       /> */}
//     </Card>
//   );
// }

export default function Example() {
  return (
    <Card className="max-w-md mx-auto">
      <Title>Most energy Consuming Devices</Title>
      <Flex className="mt-6">
        <Text>
          <Bold>Device</Bold>
        </Text>
        <Text>
          <Bold>Energy Consumed (kWh)</Bold>
        </Text>
      </Flex>
      <BarList data={sortData(visits)} showAnimation={false} className="mt-4" />
    </Card>
  );
}
