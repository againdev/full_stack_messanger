"use client";

import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./apoloClent";

export default function ApolloWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Показывает ничего, пока не выполняется на клиенте

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
