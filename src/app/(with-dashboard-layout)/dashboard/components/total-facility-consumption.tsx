// "use client";

// import { useMemo } from "react";

// import { doc, type DocumentReference } from "firebase/firestore";
// import { useSelector } from "react-redux";
// import { useFirestoreDocData } from "reactfire";

// import {
//   Card,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "~/shared/shadcn/ui/card";
// import { Skeleton } from "~/shared/shadcn/ui/skeleton";

// import { db } from "~/lib/firebase";
// import { type RootState } from "~/redux/store";
// import { type FacilityDocument } from "~/types";

// const ValueCard = ({ title, value }: { title: string; value: string }) => {
//   return (
//     <Card className="flex flex-col">
//       <CardHeader>
//         <CardDescription>{title}</CardDescription>
//         <CardTitle className={"text-2xl font-bold"}>{value}</CardTitle>
//       </CardHeader>
//     </Card>
//   );
// };

// /**
//  * TotalFacilityConsumption is a React component that displays the total energy consumption
//  * of a facility. It fetches the facility data from Firestore and displays it in a grid of cards.
//  * Each card represents a different aspect of the facility's energy consumption.
//  *
//  * While the data is loading, it displays a skeleton loader.
//  *
//  * If there's an error loading the data, it logs the error to the console.
//  */
// const TotalFacilityConsumption = () => {
//   // The ID of the facility is fetched from the Redux store.
//   const { id: facilityId } = useSelector((state: RootState) => state.facility);

//   // A Firestore query is created to fetch the facility data.
//   const query = useMemo(
//     () =>
//       doc(db, "facilities", facilityId) as DocumentReference<FacilityDocument>,
//     [facilityId],
//   );

//   // The facility data is fetched from Firestore.
//   const { data: facility, status } = useFirestoreDocData(query, {
//     initialData: null,
//     suspense: true,
//   });

//   // If the data is still loading or if there's no facility data, a skeleton loader is displayed.
//   if (status === "loading" || !facility) {
//     return (
//       <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 w-full">
//         <Skeleton className="h-24" />
//         <Skeleton className="h-24" />
//         <Skeleton className="h-24" />
//         <Skeleton className="h-24" />
//       </section>
//     );
//   }

//   // If there's an error loading the data, the error is logged to the console.
//   if (status === "error") {
//     console.error("Error loading facility data", facility);
//   }

//   // If the data has loaded successfully, it is displayed in a grid of cards.
//   return (
//     <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 w-full">
//       <ValueCard
//         title={"Total Energy Consumption"}
//         value={`${facility?.total_consumption?.current_energy_usage} kWh`}
//       />
//       <ValueCard
//         title={"Peak Usage"}
//         value={`${facility?.total_consumption?.peak_usage} kWh`}
//       />
//       <ValueCard
//         title={"Average Daily Usage"}
//         value={`${facility?.total_consumption?.daily_average_usage} kWh`}
//       />
//       <ValueCard
//         title={"Carbon Footprint"}
//         value={`${facility?.total_consumption?.carbon_footprint} kg`}
//       />
//     </section>
//   );
// };

// export default TotalFacilityConsumption;

import React from "react";
import {
  AreaChart,
  Card,
  Metric,
  TabList,
  Tab,
  TabGroup,
  TabPanels,
  TabPanel,
} from "@tremor/react";

const data = [
  {
    Month: "Jan 22",
    Visitors: 289,
    "Page Views": 1012,
    "Bounce Rate": 0.5,
  },
  //...
  {
    Month: "Jan 23",
    Visitors: 389,
    "Page Views": 1232,
    "Bounce Rate": 0.51,
  },
];

const numberFormatter = (value) => Intl.NumberFormat("us").format(value).toString();

const percentageFormatter = (value) =>
  `${Intl.NumberFormat("us")
    .format(value * 100)
    .toString()}%`;

function sumArray(array, metric) {
  return array.reduce((accumulator, currentValue) => accumulator + currentValue[metric], 0);
}

// Placeholder components for Usage and Performance
const UsageComponent = () => (
  <div>
    <p>Usage Component</p>
    {/* Add your content for Usage here */}
  </div>
);

const PerformanceComponent = () => (
  <div>
    <p>Performance Component</p>
    {/* Add your content for Performance here */}
  </div>
);

export default function Example() {
  return (
    <Card className="p-0 flex">
      <div className="flex-1">
        <AreaChart
          className="h-80 mt-10"
          data={data}
          index="Month"
          categories={["Visitors"]}
          colors={["blue"]}
          valueFormatter={numberFormatter}
          showLegend={false}
          yAxisWidth={50}
        />
      </div>
      <div className="flex-1 p-6">
        <TabGroup>
          <TabList>
            <Tab>
              <UsageComponent />
            </Tab>
            <Tab>
              <PerformanceComponent />
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {/* Content for Usage TabPanel */}
            </TabPanel>
            <TabPanel>
              {/* Content for Performance TabPanel */}
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </Card>
  );
}
