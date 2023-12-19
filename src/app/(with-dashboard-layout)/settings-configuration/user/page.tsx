"use client";

import { Text } from "@tremor/react";

import PageContainer from "~/shared/custom/page-container";
import PageHeading from "~/shared/custom/page-heading";
import { Separator } from "~/shared/shadcn/ui/separator";

const User = () => {
  return (
    <PageContainer>
      <PageHeading
        mainTitle={"UserInfo"}
        subTitle={"This page gives us the information about the user."}
      />
      <Separator />
      <Text>Sample</Text>
    </PageContainer>
  );
};

export default User;
