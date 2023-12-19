"use client";

import { Text } from "@tremor/react";

import PageContainer from "~/shared/custom/page-container";
import PageHeading from "~/shared/custom/page-heading";
import { Separator } from "~/shared/shadcn/ui/separator";

const SettingsPage = () => {
  return (
    <PageContainer>
      <PageHeading
        mainTitle={"Support Page"}
        subTitle={"This page gives us the informations about the supportpnp."}
      />
      <Separator />
      <Text>Sample</Text>
    </PageContainer>
  );
};

export default SettingsPage;
