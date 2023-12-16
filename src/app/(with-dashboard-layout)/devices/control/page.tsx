"use client";

import { Text } from "@tremor/react";

import PageContainer from "~/shared/custom/page-container";
import PageHeading from "~/shared/custom/page-heading";
import { Separator } from "~/shared/shadcn/ui/separator";

const ControlPage = () => {
  return (
    <PageContainer>
      <PageHeading
        mainTitle={"Control"}
        subTitle={"Review and Manage Control Resources."}
      />
      <Separator />
      <Text>Sample</Text>
    </PageContainer>
  );
};

export default ControlPage;
