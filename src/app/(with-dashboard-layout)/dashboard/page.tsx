"use client";

import PageContainer from "~/shared/custom/page-container";
import PageHeading from "~/shared/custom/page-heading";
import { Separator } from "~/shared/shadcn/ui/separator";

import TotalFacilityConsumption from "~/app/(with-dashboard-layout)/dashboard/components/total-facility-consumption";

export default function HomePage() {
  return (
    <PageContainer>
      <PageHeading
        mainTitle={"Dashboard"}
        subTitle={"Contains all the summary of the facility and consumption"}
      />
      <Separator />
      <TotalFacilityConsumption />
    </PageContainer>
  );
}
