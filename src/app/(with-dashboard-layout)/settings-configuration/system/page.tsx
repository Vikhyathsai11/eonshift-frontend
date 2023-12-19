"use client";

import { Text } from "@tremor/react";

import PageContainer from "~/shared/custom/page-container";
import PageHeading from "~/shared/custom/page-heading";
import { Separator } from "~/shared/shadcn/ui/separator";

const SettingsPage = () => {
  return (
    <PageContainer>
      <PageHeading
        mainTitle={"Settings Configuration"}
        subTitle={
          "This page allows us to configure the settings of the working model."
        }
      />
      <Separator />
      <Text>Sample</Text>
    </PageContainer>
  );
};

export default SettingsPage;
