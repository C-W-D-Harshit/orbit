"use client";

import { getUserDataAction } from "@/actions/authActions";
import { setUser } from "@/stores/userStore";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function UserStoreProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!session?.user) return;

    const getData = async () => {
      const userData = await getUserDataAction(session.user?.email as string);
      if (userData) {
        setUser(userData);
      }
    };

    getData(); // Initial call to get data immediately

    const interval = setInterval(getData, 5000);

    return () => clearInterval(interval);
  }, [session, router, pathname]);

  return <>{children}</>;
}