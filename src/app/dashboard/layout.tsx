import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { SyncUser } from "@/components/SyncUser";
import { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ConvexClientProvider>
      <SyncUser />
      {children}
    </ConvexClientProvider>
  );
}
