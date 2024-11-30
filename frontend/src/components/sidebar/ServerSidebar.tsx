"use client";
import { useServer } from "@/src/hooks/graphql/server/useServer";
import classNames from "classnames";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { ServerHeader } from "../headers/ServerHeader";
import classes from "./ServerSidebar.module.scss";

interface Props {
  className?: string;
}

export const ServerSidebar: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const { serverId, memberId, channelId } = useParams();
  const { textChannels } = useServer(serverId as string);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (!channelId && !memberId && textChannels[0]?.id) {
      router.push(`/servers/${serverId}/channels/TEXT/${textChannels[0]?.id}`);
    }
  }, [isMounted, textChannels, serverId, router]);

  return (
    <nav className={classNames(className, classes.nav)}>
      <ServerHeader />
    </nav>
  );
};
