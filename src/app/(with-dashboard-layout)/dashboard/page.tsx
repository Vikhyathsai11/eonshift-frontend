"use client";

import { useRouter } from "next/navigation";

import { signOut } from "firebase/auth";
import { useUser } from "reactfire";

import PageContainer from "~/shared/custom/page-container";
import PageHeading from "~/shared/custom/page-heading";
import { Button } from "~/shared/shadcn/ui/button";
import { Separator } from "~/shared/shadcn/ui/separator";
import { Skeleton } from "~/shared/shadcn/ui/skeleton";

import TotalFacilityConsumption from "~/app/(with-dashboard-layout)/dashboard/components/total-facility-consumption";

import { auth } from "~/lib/firebase";

const WelcomeUser = () => {
  const { data, status } = useUser();
  const router = useRouter();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.error(error);
        console.log("Error signing out");
      });
  };

  if (status === "loading") {
    return <Skeleton className="h-24" />;
  }

  return (
    <div className={"flex flex-row gap-4"}>
      <h1 className="text-lg text-white sm:text-xl">
        Welcome{" "}
        <span className={"font-extrabold tracking-tight text-2xl"}>
          {data?.displayName}
        </span>
      </h1>
      <Button onClick={handleSignOut}>Sign out</Button>
    </div>
  );
};

export default function HomePage() {
  return (
    <PageContainer>
      <PageHeading
        mainTitle={"Dashboard"}
        subTitle={"Contains all the summary of the facility and consumption"}
      />
      <Separator />
      <WelcomeUser />
      <TotalFacilityConsumption />
    </PageContainer>
  );
}
