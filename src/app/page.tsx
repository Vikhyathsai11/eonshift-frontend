"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import Message from "~/shared/message";

const DefaultPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, []);

  return <Message title={"Loading..."} />;
};

export default DefaultPage;
