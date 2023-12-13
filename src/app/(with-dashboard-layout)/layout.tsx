import { type ReactElement } from "react";

import { CheckAuthProvider } from "~/providers";
import { TooltipProvider } from "~/shared/shadcn/ui/tooltip";

import Layout from "~/app/(with-dashboard-layout)/components/layout";

export default function WithDashboardLayout({
  children,
}: {
  children: ReactElement;
}) {
  return (
    <CheckAuthProvider>
      <TooltipProvider>
        <Layout>{children}</Layout>
      </TooltipProvider>
    </CheckAuthProvider>
  );
}
