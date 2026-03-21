import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { ReactNode } from "react";

export default function SignUpLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ConvexClientProvider>
      {children}
    </ConvexClientProvider>
  );
}
