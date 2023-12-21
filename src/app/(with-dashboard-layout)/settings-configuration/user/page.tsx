// "use client";

// import { Text } from "@tremor/react";

// import PageContainer from "~/shared/custom/page-container";
// import PageHeading from "~/shared/custom/page-heading";
// import { Separator } from "~/shared/shadcn/ui/separator";

// const User = () => {
//   return (
//     <PageContainer>
//       <PageHeading
//         mainTitle={"UserInfo"}
//         subTitle={"This page gives us the information about the user."}
//       />
//       <Separator />
//       <Text>Sample</Text>
//     </PageContainer>
//   );
// };

// export default User;
"use client";

import { Button, Card, Grid, Text, Title } from "@tremor/react";

export default function UserInfoPage() {
  return (
    <main>
      <Title>User Information</Title>

      {/* User Info Section */}
      <Card className="mt-6">
        {/* Circular Area with Default Picture (Custom Styling) */}
        <div
          className="flex items-center justify-center bg-blue-200 rounded-full h-16 w-16"
          style={{ fontSize: "0.9rem" }}
        >
          User Icon
        </div>

        {/* Text Area for User Information */}
        <Text className="mt-4">
          <strong>Name:</strong> John Doe
        </Text>
        <Text>
          <strong>Email:</strong> john.doe@example.com
        </Text>
      </Card>

      {/* Actions Section */}

      {/* First Panel: Add Electronic Device */}
      <Card>
        <Title>Add Electronic Device</Title>
        <Text>Connect a new electronic device to your account.</Text>
        <Button>Add Device</Button>
      </Card>

      {/* Second Panel: Payment Issues */}
      <Card>
        <Title>Payment Issues</Title>
        <Text>Resolve any payment issues and manage your subscription.</Text>
        <Button>Manage Payment</Button>
      </Card>
    </main>
  );
}
