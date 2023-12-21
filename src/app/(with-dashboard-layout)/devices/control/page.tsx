"use client";

import * as React from "react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Card, Metric, Text } from "@tremor/react";
import axios from "axios";
import { collection, orderBy, query, type Query } from "firebase/firestore";
import moment from "moment";
import { useSelector } from "react-redux";
import { useFirestoreCollectionData } from "reactfire";
import { z } from "zod";

import PageContainer from "~/shared/custom/page-container";
import PageHeading from "~/shared/custom/page-heading";
import { Button } from "~/shared/shadcn/ui/button";
import { Separator } from "~/shared/shadcn/ui/separator";

import { columns } from "~/app/(with-dashboard-layout)/devices/control/components/datatable/columns";
import { DataTable } from "~/app/(with-dashboard-layout)/devices/control/components/datatable/data-table";
import { taskSchema } from "~/app/(with-dashboard-layout)/devices/control/components/datatable/data/schema";

import { db } from "~/lib/firebase";
import { Icons } from "~/lib/icons";
import { type RootState } from "~/redux/store";
import { type DeviceDocument } from "~/types";

const ControlDevices = () => {
  const { id: facilityId } = useSelector((state: RootState) => state.facility);

  const router = useRouter();
  const [loadingDeviceId, setLoadingDeviceId] = useState<string | null>(null);

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
    setLoadingDeviceId(deviceId);
    await axios({
      method: "post",
      url: "/api/publish",
      data: {
        status,
        deviceId,
        facilityId,
      },
    });
    setLoadingDeviceId(null);
  };

  const toggleAllDevices = (toggleStatus: string) => {
    devices.map(async (device) => {
      await handleDeviceToggle(device.id, toggleStatus);
    });
  };

  return (
    <PageContainer>
      <PageHeading
        mainTitle={"Control Device"}
        subTitle={"Review and control all the device resources."}
      />
      <Separator />
      {status === "loading" && <>Loading Devices</>}
      {status === "success" && devices && (
        <>
          <div
            className={
              "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 w-full"
            }
          >
            {devices.map((device) => (
              <Card
                key={device.id}
                decoration={"top"}
                decorationColor={device.status === "active" ? "green" : "red"}
                onClick={() => {
                  router.push(`/devices/${device.id}`);
                }}
              >
                <Text>{device.name}</Text>
                <Metric>{device.energy_usage} mWh</Metric>
                <p className={"text-muted-foreground text-xs"}>
                  Last Updated:{" "}
                  {moment(device?.last_updated?.toDate()).fromNow()}
                </p>
              </Card>
            ))}
          </div>
          <DataTable
            columns={columns}
            toggleAllDevices={toggleAllDevices}
            data={z.array(taskSchema).parse(devices)}
          />
        </>
      )}
    </PageContainer>
  );
};

export default ControlDevices;
