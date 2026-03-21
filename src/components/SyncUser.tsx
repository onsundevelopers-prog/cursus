"use client";

import { useMutation } from "convex/react";
import { useEffect } from "react";
import { api } from "../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";

export function SyncUser() {
  const { user, isLoaded } = useUser();
  const storeUser = useMutation(api.users.store);

  useEffect(() => {
    if (isLoaded && user) {
      storeUser();
    }
  }, [user, storeUser, isLoaded]);

  return null;
}
