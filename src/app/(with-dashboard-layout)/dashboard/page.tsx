"use client";

import { Grid } from "@tremor/react";

import PageContainer from "~/shared/custom/page-container";
import PageHeading from "~/shared/custom/page-heading";
import { Separator } from "~/shared/shadcn/ui/separator";

import AreaChart from "~/app/(with-dashboard-layout)/dashboard/components/areachart";
import BarChartExample from "~/app/(with-dashboard-layout)/dashboard/components/bargraph";
import DonutChart from "~/app/(with-dashboard-layout)/dashboard/components/donut";
import ListGraph from "~/app/(with-dashboard-layout)/dashboard/components/listbar";
import TotalFacilityConsumption from "~/app/(with-dashboard-layout)/dashboard/components/total-facility-consumption";
import Sample from "~/app/(with-dashboard-layout)/dashboard/components/sample";


export default function HomePage() {
  return (
    <PageContainer>
      <PageHeading
        mainTitle={"Dashboard"}
        subTitle={"Contains all the summary of the facility and consumption"}
      />
      <Separator />
      <TotalFacilityConsumption />
      {/* <Sample /> */}
      <Grid numItemsMd={3} className="mt-6 gap-6">
        <AreaChart />
        <ListGraph />
        <DonutChart />
      </Grid>
      <BarChartExample />
    </PageContainer>
  );
}
