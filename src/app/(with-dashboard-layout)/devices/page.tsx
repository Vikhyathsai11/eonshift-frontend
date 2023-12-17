"use client";

import { useMemo } from "react";

import { Card, Metric, Text } from "@tremor/react";
import {
  collection,
  doc,
  orderBy,
  query,
  updateDoc,
  type Query,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { useFirestoreCollectionData } from "reactfire";

import PageContainer from "~/shared/custom/page-container";
import PageHeading from "~/shared/custom/page-heading";
import { Button } from "~/shared/shadcn/ui/button";
import { Separator } from "~/shared/shadcn/ui/separator";

import { db } from "~/lib/firebase";
import { type RootState } from "~/redux/store";
import { type DeviceDocument } from "~/types";

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

  const handleDeviceToggle = async (deviceId: string, status: string) => {
    const docRef = doc(db, "facilities", facilityId, "devices", deviceId);
    await updateDoc(docRef, {
      status: status === "active" ? "inactive" : "active",
    });
  };

  return (
    <PageContainer>
      <PageHeading mainTitle={"Devices"} subTitle={"Manage all the devices"} />
      <Separator />
      {status === "loading" && <>Loading Devices</>}
      {status === "success" && devices && (
        <div className={"grid grid-cols-4 gap-2"}>
          {devices?.map((device) => {
            return (
              <Card
                decoration={"top"}
                decorationColor={device?.status == "active" ? "green" : "rose"}
              >
                <Text>{device.id}</Text>
                <Metric>{device.energy_usage}</Metric>
                <Button
                  onClick={() => handleDeviceToggle(device.id, device.status)}
                >
                  {device.status == "active" ? "Turn Off" : "Turn On"}
                </Button>
              </Card>
            );
          })}
        </div>
      )}
    </PageContainer>
  );
};

export default DevicesPage;
