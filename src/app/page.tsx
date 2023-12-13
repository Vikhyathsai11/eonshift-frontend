"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import LoadingPage from "~/shared/custom/loading-page";

const DefaultPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, []);

  return <LoadingPage title={"Loading..."} description={"Please wait..."} />;
};

export default DefaultPage;
