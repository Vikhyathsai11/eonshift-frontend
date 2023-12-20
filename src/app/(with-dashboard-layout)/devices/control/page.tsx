"use client";

import * as React from "react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Card, Metric, Text } from "@tremor/react";
import axios from "axios";
import { collection, orderBy, query, type Query } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useFirestoreCollectionData } from "reactfire";

import PageContainer from "~/shared/custom/page-container";
import PageHeading from "~/shared/custom/page-heading";
import { Button } from "~/shared/shadcn/ui/button";
import { Separator } from "~/shared/shadcn/ui/separator";

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
    devices.forEach((device) => {
      handleDeviceToggle(device.id, toggleStatus);
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
          <div className={"mb-4"}>
            <h1>
              Use the below buttons to switch on and switch off all the devices.
            </h1>
            <Button
              size={"sm"}
              onClick={() => toggleAllDevices("active")}
              disabled={loadingDeviceId !== null}
            >
              Turn On All Devices
            </Button>{" "}
            <Button
              size={"sm"}
              onClick={() => toggleAllDevices("inactive")}
              disabled={loadingDeviceId !== null}
            >
              Turn Off All Devices
            </Button>
          </div>
          <div
            className={"grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2"}
          >
            {devices.map((device) => (
              <Card
                key={device.id}
                decoration={"top"}
                decorationColor={device.status === "active" ? "green" : "red"}
              >
                <Text>{device.id}</Text>
                <Metric>{device.energy_usage} kWh</Metric>
                <Button
                  size={"sm"}
                  onClick={async (event) => {
                    event.stopPropagation();
                    await handleDeviceToggle(
                      device.id,
                      device.status === "active" ? "inactive" : "active",
                    );
                  }}
                  disabled={loadingDeviceId === device.id}
                >
                  {loadingDeviceId === device.id && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {device.status === "active" ? "Turn Off" : "Turn On"}
                </Button>
              </Card>
            ))}
          </div>
        </>
      )}
    </PageContainer>
  );
};

export default ControlDevices;
