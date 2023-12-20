"use client";

import PageContainer from "~/shared/custom/page-container";
import PageHeading from "~/shared/custom/page-heading";
import { Separator } from "~/shared/shadcn/ui/separator";
import { Grid } from "@tremor/react";
import TotalFacilityConsumption from "~/app/(with-dashboard-layout)/dashboard/components/total-facility-consumption";

import BarChartExample from "~/app/(with-dashboard-layout)/dashboard/components/bargraph";
import AreaChart from "~/app/(with-dashboard-layout)/dashboard/components/areachart";
import ListGraph from "~/app/(with-dashboard-layout)/dashboard/components/listbar";
import DonutChart from "~/app/(with-dashboard-layout)/dashboard/components/donut";

export default function HomePage() {
  return (
    <PageContainer>
      <PageHeading
        mainTitle={"Dashboard"}
        subTitle={"Contains all the summary of the facility and consumption"}
      />
      <Separator />
      <TotalFacilityConsumption />
      <BarChartExample />
      <Grid  numItemsMd={3} className="mt-6 gap-6">
      <AreaChart />
      <ListGraph />
      <DonutChart />
      </Grid>
    </PageContainer>
  );
}
