import { useMemo } from "react";

import { collection, orderBy, query, type Query } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useFirestoreCollectionData } from "reactfire";

import { ThemeToggleButton } from "~/shared/custom";
import { Button } from "~/shared/shadcn/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/shared/shadcn/ui/select";

import { db } from "~/lib/firebase";
import { Icons } from "~/lib/icons";
import { updateFacility } from "~/redux/slices/facilitySlice";
import { type AppDispatch, type RootState } from "~/redux/store";
import { type FacilityDocument } from "~/types";

const FacilitySelector = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedFacility = useSelector((state: RootState) => state.facility);

  const facilitiesQuery = useMemo(
    () =>
      query(
        collection(db, "facilities"),
        orderBy("created_at", "desc"),
      ) as Query<FacilityDocument>,
    [],
  );

  const { data: facilities, status } = useFirestoreCollectionData(
    facilitiesQuery,
    {
      initialData: [],
      idField: "id",
    },
  );

  const updateSelectedFacility = (id: string) => {
    const selectedFacility = facilities.find((f) => f.id === id);
    if (selectedFacility) {
      dispatch(updateFacility(selectedFacility));
    }
  };

  if (status === "success" && facilities.length === 0) {
    return (
      <Button variant={"outline"} size={"icon"} className={"mr-2 xl:hidden"}>
        <Icons.warning className={"h-4 w-4"} />
        <p>No Facilities Available</p>
      </Button>
    );
  }

  if (status === "success" && selectedFacility.id === "" && facilities?.[0]) {
    dispatch(updateFacility(facilities[0]));
  }

  return (
    <Select
      value={selectedFacility.id}
      onValueChange={updateSelectedFacility}
      disabled={status === "loading"}
    >
      <SelectTrigger className="w-[130px] lg:w-[200px] duration-150 bg-secondary/25">
        <SelectValue placeholder="Select Facility" />
      </SelectTrigger>
      <SelectContent>
        {facilities.map((f) => (
          <SelectItem key={f.id} value={f.id}>
            {f.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const TopBar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background shadow-sm">
      <div className="flex h-16 items-center px-4 sm:justify-between sm:space-x-0 sm:px-[1rem]">
        <Button variant={"outline"} size={"icon"} className={"mr-2 xl:hidden"}>
          <Icons.menu className={"h-4 w-4"} />
        </Button>
        <div className={"flex flex-row items-center gap-2"}>
          <h3
            className={
              "text-xl font-black leading-none tracking-tight lg:text-3xl text-primary mr-4"
            }
          >
            EonShift
          </h3>
          <FacilitySelector />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggleButton disabled={true} />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
