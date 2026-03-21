'use client';

import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { SyncUser } from "@/components/SyncUser";
import { usePreventBackNavigation } from "@/hooks/use-prevent-back-navigation";
import { ReactNode } from "react";

function DashboardLayoutContent({
  children,
}: {
  children: ReactNode;
}) {
  usePreventBackNavigation();

  return <>{children}</>;
}

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ConvexClientProvider>
      <SyncUser />
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </ConvexClientProvider>
  );
}
