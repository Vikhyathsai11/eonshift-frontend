"use client";

import { useEffect, type ReactElement } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useSigninCheck } from "reactfire";

import Message from "~/shared/message";

const CheckAuthProvider = ({ children }: { children: ReactElement }) => {
  const { data: signinData, status } = useSigninCheck({});
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Ensure the signin check is complete
    if (status === "loading") return;

    if (signinData?.signedIn === true) {
      // // User is logged in, redirect to dashboard if not already there
      if (pathname === "/login") {
        router.push("/dashboard");
      }
    } else {
      // User is not logged in, redirect to login page
      router.push("/login");
    }
  }, [signinData, status, router, pathname]);

  // Render children only if user is logged in and signin check is complete
  if (signinData?.signedIn && status !== "loading") {
    return children;
  }

  // Optionally, return a loading indicator or null while waiting for signin check
  return <Message title={"Loading..."} />;
};

export default CheckAuthProvider;
