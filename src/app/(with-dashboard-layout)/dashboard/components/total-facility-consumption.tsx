"use client";

import { doc, type DocumentReference } from "firebase/firestore";
import { useFirestoreDocData } from "reactfire";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/shared/shadcn/ui/card";
import { Skeleton } from "~/shared/shadcn/ui/skeleton";

import { db } from "~/lib/firebase";
import { type FacilityDocument } from "~/types";

const ValueCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className={"text-2xl font-bold"}>{value}</CardTitle>
      </CardHeader>
    </Card>
  );
};

const TotalFacilityConsumption = () => {
  const { data: facility, status } = useFirestoreDocData(
    doc(
      db,
      "facilities",
      "0173bd34-cb83-4569-9db6-8efa08fe3c2e",
    ) as DocumentReference<FacilityDocument>,
    {
      initialData: null,
    },
  );

  if (status === "loading" || !facility) {
    return (
      <section className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </section>
    );
  }

  return (
    <section className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <ValueCard
        title={"Total Energy Consumption"}
        value={`${facility?.total_consumption?.current_energy_usage} kWh`}
      />
      <ValueCard
        title={"Peak Usage"}
        value={`${facility?.total_consumption?.peak_usage} kWh`}
      />
      <ValueCard
        title={"Average Daily Usage"}
        value={`${facility?.total_consumption?.daily_average_usage} kWh`}
      />
      <ValueCard
        title={"Carbon Footprint"}
        value={`${facility?.total_consumption?.carbon_footprint} kg`}
      />
    </section>
  );
};

export default TotalFacilityConsumption;
