import { CreateServerModal } from "@/src/components/modals/CreateServerModal";
import { Sidebar } from "@/src/components/sidebar/sidebar";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Messanger | Main",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Sidebar />
      <CreateServerModal />
      {children}
    </main>
  );
}
