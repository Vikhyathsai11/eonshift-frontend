"use client";

import * as React from "react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Button, Card, Metric, Text, Title } from "@tremor/react";
import axios from "axios";
import {
  collection,
  doc,
  orderBy,
  query,
  setDoc,
  type Query,
} from "firebase/firestore";
import moment from "moment";

import { useSelector } from "react-redux";
import { useFirestoreCollectionData } from "reactfire";
import { z } from "zod";

import PageContainer from "~/shared/custom/page-container";
import PageHeading from "~/shared/custom/page-heading";
import { Separator } from "~/shared/shadcn/ui/separator";

import { columns } from "~/app/(with-dashboard-layout)/devices/control/components/datatable/columns";
import { DataTable } from "~/app/(with-dashboard-layout)/devices/control/components/datatable/data-table";
import { deviceSchema } from "~/app/(with-dashboard-layout)/devices/control/components/datatable/data/schema";

import { db } from "~/lib/firebase";
import { Icons } from "~/lib/icons";
import { type RootState } from "~/redux/store";
import { type DeviceDocument } from "~/types";

// ... (existing imports)

const ControlDevices = () => {
  const { id: facilityId } = useSelector((state: RootState) => state.facility);

  const router = useRouter();
  const [loadingDeviceId, setLoadingDeviceId] = useState<string | null>(null);
  const [isAddDeviceDialogOpen, setAddDeviceDialogOpen] = useState(false);

  // State for form input values
  const [newDeviceValues, setNewDeviceValues] = useState({
    name: "",
    type: "",
    location: "",
    manufacturer: "",
  });

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

  const togglePinDevice = async (deviceId: string, pinned: boolean) => {
    await setDoc(
      doc(db, "facilities", facilityId, "devices", deviceId),
      {
        pinned: !pinned,
      },
      {
        merge: true,
      },
    );
  };

  const handleAddDeviceClick = () => {
    // Reset the form values when opening the dialog
    setNewDeviceValues({
      name: "",
      type: "",
      location: "",
      manufacturer: "",
    });
    // Toggle the visibility of the dialog
    setAddDeviceDialogOpen(!isAddDeviceDialogOpen);
  };

  const handleInputChange = (e) => {
    // Update the form values when input changes
    setNewDeviceValues({
      ...newDeviceValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddDeviceSubmit = async () => {
    // Add your logic here to submit the new device data
    // For simplicity, let's just log the values to the console
    console.log("New Device Values:", newDeviceValues);
    // Close the dialog
    setAddDeviceDialogOpen(false);
  };

  return (
    <PageContainer>
      <PageHeading
        mainTitle={"Devices"}
        subTitle={"Review and control all the device resources."}
      />
      <Separator />
      {status === "loading" && <>Loading Devices</>}
      {status === "success" && devices && (
        <>
          <div
            className={
              "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 w-full"
            }
          >
            {devices
              .filter((item) => item?.pinned)
              .map((device) => (
                <Card
                  key={device.id}
                  decoration={"top"}
                  decorationColor={device.status === "active" ? "green" : "red"}
                  onClick={() => {
                    router.push(`/devices/${device.id}`);
                  }}
                  className={"relative"}
                >
                  <Icons.pinned
                    className={"absolute top-2 right-2"}
                    onClick={async (event) => {
                      event.stopPropagation();
                      await togglePinDevice(device.id, device.pinned);
                    }}
                  />
                  <Text>{device.name}</Text>
                  <Metric>{device.energy_usage} mWh</Metric>
                  <p className={"text-muted-foreground text-xs"}>
                    Last Updated:{" "}
                    {moment(device?.last_updated?.toDate()).fromNow()}
                  </p>
                </Card>
              ))}
          </div>
                   <Button
            onClick={handleAddDeviceClick}
            className="mt-4 bg-green-500 hover:bg-green-700 text-white"
          >
            Add a Device
          </Button>
          {/* Add device dialog */}
          {isAddDeviceDialogOpen && (
            <div className="bg-black p-4 shadow-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Title color="white">New Device</Title>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newDeviceValues.name}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded-md w-full text-black" // Set text color to black
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">
                  Type
                </label>
                <input
                  type="text"
                  name="type"
                  value={newDeviceValues.type}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded-md w-full text-black" // Set text color to black
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={newDeviceValues.location}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded-md w-full text-black" // Set text color to black
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">
                  Manufacturer
                </label>
                <input
                  type="text"
                  name="manufacturer"
                  value={newDeviceValues.manufacturer}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded-md w-full text-black" // Set text color to black
                />
              </div>
              <Button
                onClick={handleAddDeviceSubmit}
                className="bg-green-500 hover:bg-green-700 text-white"
              >
                Submit
              </Button>
              <Button onClick={handleAddDeviceClick} className="ml-2 text-white">
                Close
              </Button>
            </div>
          )}
          <DataTable
            columns={columns}
            toggleAllDevices={toggleAllDevices}
            data={z.array(deviceSchema).parse(devices)}
          />
        </>
      )}
    </PageContainer>
  );
};

export default ControlDevices;