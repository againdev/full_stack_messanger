"use client";
import { ChannelType } from "@/src/gql/graphql";
import { useServer } from "@/src/hooks/graphql/server/useServer";
import { ScrollArea, Stack } from "@mantine/core";
import classNames from "classnames";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { ServerHeader } from "../headers/ServerHeader";
import { ServerChannel } from "./ServerChannel";
import classes from "./ServerSidebar.module.scss";
import { ServerSidebarSection } from "./ServerSidebarSection";

interface Props {
  className?: string;
}

export const ServerSidebar: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const {
    serverId,
    memberId,
    channelId,
  }: { serverId: string; memberId: string; channelId: string } = useParams();
  const { textChannels, audioChannels, videoChannels, server, role } =
    useServer(serverId as string);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (!channelId && !memberId && textChannels[0]?.id) {
      router.push(`/servers/${serverId}/channels/TEXT/${textChannels[0]?.id}`);
    }
  }, [isMounted, textChannels, serverId, router]);

  const [activeMemberId, setActiveMemberId] = React.useState<number | null>();
  const [activeChannelId, setActiveChannleId] = React.useState<number | null>();

  React.useEffect(() => {
    if (memberId) {
      setActiveMemberId(memberId as unknown as number);
      setActiveChannleId(null);
    }

    if (channelId) {
      setActiveChannleId(channelId as unknown as number);
      setActiveMemberId(null);
    }
  }, [channelId, memberId, textChannels]);

  if (!server && !role) return null;
  return (
    <nav className={classNames(className, classes.nav)}>
      <ServerHeader server={server} memberRole={role} />

      {/* Server Search */}
      <ScrollArea>
        {!!textChannels.length && (
          <ServerSidebarSection
            sectionType="channels"
            channelType={ChannelType.Text}
            role={role}
            lable="Text Channels"
          />
        )}

        <Stack>
          {textChannels.map((channel) => (
            <ServerChannel
              key={channel?.id}
              channel={channel}
              isActive={activeChannelId === channel.id}
              role={role}
              server={server}
            />
          ))}
        </Stack>

        {!!audioChannels.length && (
          <ServerSidebarSection
            sectionType="channels"
            channelType={ChannelType.Audio}
            role={role}
            lable="Audio Channels"
          />
        )}

        <Stack>
          {audioChannels.map((channel) => (
            <ServerChannel
              key={channel?.id}
              channel={channel}
              isActive={activeChannelId === channel.id}
              role={role}
              server={server}
            />
          ))}
        </Stack>

        {!!videoChannels.length && (
          <ServerSidebarSection
            sectionType="channels"
            channelType={ChannelType.Video}
            role={role}
            lable="Video Channels"
          />
        )}

        <Stack>
          {videoChannels.map((channel) => (
            <ServerChannel
              key={channel?.id}
              channel={channel}
              isActive={activeChannelId === channel.id}
              role={role}
              server={server}
            />
          ))}
        </Stack>
      </ScrollArea>
    </nav>
  );
};
