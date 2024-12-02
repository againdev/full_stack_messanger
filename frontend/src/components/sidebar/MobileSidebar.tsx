"use client";
import { useGeneralStore } from "@/src/store/generalStore";
import { Drawer, rem } from "@mantine/core";
import React from "react";
import { ServerSidebar } from "./ServerSidebar";
import { Sidebar } from "./sidebar";

interface Props {
  className?: string;
}

export const MobileSidebar: React.FC<Props> = ({ className }) => {
  const { drawerOpen, toggleDrawer } = useGeneralStore((state) => state);

  return (
    <>
      <Sidebar />
      <Drawer
        onClose={toggleDrawer}
        padding="0"
        mb="0"
        zIndex={10}
        opened={drawerOpen}
        size={rem(320)}
        position="left"
        withOverlay={false}
        style={{ position: "fixed" }}
        withCloseButton={false}
        ml={rem(80)}
      >
        <ServerSidebar />
      </Drawer>
    </>
  );
};
