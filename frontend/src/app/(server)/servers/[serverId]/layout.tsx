import { DeleteChannelModal } from "@/src/components/modals/server/channel/DeleteChannelModal";
import { CreateChannelModal } from "@/src/components/modals/server/CreateChannelModal";
import { DeleteServerModal } from "@/src/components/modals/server/DeleteServerModal";
import { InviteModal } from "@/src/components/modals/server/InviteModal";
import { UpdateServerModal } from "@/src/components/modals/server/UpdateServerModal";
import { Sidebar } from "@/src/components/sidebar/sidebar";
import React from "react";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Sidebar />
      <DeleteServerModal />
      <DeleteChannelModal />
      <CreateChannelModal />
      <UpdateServerModal />
      <InviteModal />
      {children}
    </main>
  );
}
