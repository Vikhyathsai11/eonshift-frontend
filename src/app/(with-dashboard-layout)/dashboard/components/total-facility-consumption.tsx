"use client";

import { useMemo } from "react";

import { doc, type DocumentReference } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useFirestoreDocData } from "reactfire";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/shared/shadcn/ui/card";
import { Skeleton } from "~/shared/shadcn/ui/skeleton";

import { db } from "~/lib/firebase";
import { type RootState } from "~/redux/store";
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
  const { id: facilityId } = useSelector((state: RootState) => state.facility);

  const query = useMemo(
    () =>
      doc(db, "facilities", facilityId) as DocumentReference<FacilityDocument>,
    [facilityId],
  );

  const { data: facility, status } = useFirestoreDocData(query, {
    initialData: null,
  });

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

  if (status === "error") {
    console.error("Error loading facility data", facility);
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
