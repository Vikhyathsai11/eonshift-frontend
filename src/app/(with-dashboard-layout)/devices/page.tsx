"use client";

import { useMemo } from "react";

import { collection, orderBy, query, type Query } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useFirestoreCollectionData } from "reactfire";

import PageContainer from "~/shared/custom/page-container";
import PageHeading from "~/shared/custom/page-heading";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/shared/shadcn/ui/card";
import { Separator } from "~/shared/shadcn/ui/separator";

import { db } from "~/lib/firebase";
import { type RootState } from "~/redux/store";
import { type DeviceDocument, type FacilityDocument } from "~/types";

const DeviceCard = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className={"text-2xl font-bold"}>{value}</CardTitle>
      </CardHeader>
    </Card>
  );
};

const DevicesPage = () => {
  const { id: facilityId } = useSelector((state: RootState) => state.facility);

  const devicesQuery = useMemo(
    () =>
      query(
        collection(db, "facilities", facilityId, "devices"),
        orderBy("created_at", "desc"),
      ) as Query<DeviceDocument>,
    [facilityId],
  );

  const { data: devices, status } = useFirestoreCollectionData(devicesQuery, {
    initialData: [],
    idField: "id",
  });

  return (
    <PageContainer>
      <PageHeading
        mainTitle={"Devices"}
        subTitle={"Manage all thesub devices"}
      />
      <Separator />
      {status === "loading" && <>Loading Devices</>}
      {status === "success" && devices && (
        <div className={"grid grid-cols-4 gap-2"}>
          {devices?.map((device) => {
            return (
              <DeviceCard
                key={device.id}
                title={device.id}
                value={`${device.energy_usage} kWh`}
              />
            );
          })}
        </div>
      )}
    </PageContainer>
  );
};

export default DevicesPage;
