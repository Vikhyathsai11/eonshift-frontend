"use client";

import { useRouter } from "next/navigation";

import { Metric, Card as TremorCard, Text as TremorText } from "@tremor/react";
import { signOut } from "firebase/auth";
import { collection, orderBy, query, type Query } from "firebase/firestore";
import { useAuth, useFirestoreCollectionData, useUser } from "reactfire";

import { ModeToggle } from "~/shared/custom/theme-toggle";
import { Button } from "~/shared/shadcn/button";

import SampleChart from "~/app/(with-dashboard-layout)/dashboard/components/sample";

import { db } from "~/lib/firebase";

interface Facility {
  name: string;
  id: string;
  total_consumption: number;
}

const Facilities = () => {
  const { data: facilities, status } = useFirestoreCollectionData(
    query(
      collection(db, "facilities"),
      orderBy("created_at", "desc"),
    ) as Query<Facility>,
    {
      initialData: [],
    },
  );

  if (status === "loading") {
    return <div>Loading Facilities...</div>;
  }

  return (
    <div>
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        <span className="text-[hsl(280,100%,70%)]">
          Number of Facilities: {facilities?.length}
        </span>
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        {facilities?.map((facility) => (
          <TremorCard key={facility.id}>
            <TremorText className={"pb-2"}>{facility.name}</TremorText>
            <Metric className={"font-bold"}>
              {facility.total_consumption} kWh
            </Metric>
          </TremorCard>
        ))}
      </div>
    </div>
  );
};

export default function HomePage() {
  const { data, status } = useUser();
  const router = useRouter();

  const auth = useAuth();

  return (
    <main>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          {status === "loading"
            ? "Loading..."
            : data
              ? `Welcome ${data.displayName}`
              : "Welcome Guest User!"}
          {/*<span className="text-[hsl(280,100%,70%)]">{facilities.length}</span>*/}
        </h1>
        <Facilities />
        <Button
          onClick={() => {
            signOut(auth)
              .then(() => {
                router.push("/");
              })
              .catch((error) => {
                console.error(error);
                console.log("Error signing out");
              });
          }}
        >
          Sign out
        </Button>
        <ModeToggle />
        <SampleChart />
      </div>
    </main>
  );
}
