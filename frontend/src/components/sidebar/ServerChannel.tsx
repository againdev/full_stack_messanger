"use client";
import { Channel, ChannelType, MemberRole, Server } from "@/src/gql/graphql";
import { useModal } from "@/src/hooks/useModal";
import { useGeneralStore } from "@/src/store/generalStore";
import { NavLink, rem, Stack } from "@mantine/core";
import {
  IconCamera,
  IconHash,
  IconMessage,
  IconMicrophone,
  IconTrash,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  className?: string;
  channel: Channel;
  server: Server;
  role?: MemberRole;
  isActive?: boolean;
}

const iconMap = {
  [ChannelType.Text]: <IconHash size={15} />,
  [ChannelType.Audio]: <IconMicrophone size={15} />,
  [ChannelType.Video]: <IconCamera size={15} />,
};

export const ServerChannel: React.FC<Props> = ({
  className,
  channel,
  server,
  role,
  isActive,
}) => {
  if (!channel && !server) return null;

  const router = useRouter();
  const Icon = iconMap[channel.type];
  const deleteChannelModal = useModal("DeleteChannel");
  const updateChannelModal = useModal("UpdateChannel");

  const setChannelToBeUpdatedOrDeletedId = useGeneralStore(
    (state) => state.setChannelToBeUpdatedOrDeletedId
  );

  if (channel.name !== "general") {
    return (
      <NavLink ml="md" w={rem(260)} label={channel.name} rightSection={Icon}>
        {role !== MemberRole.Guest && (
          <Stack>
            <NavLink
              label="Join"
              rightSection={
                <IconMessage style={{ marginLeft: "8px" }} size={20} />
              }
              onClick={() =>
                router.push(
                  `/servers/${server.id}/channels/${channel.type}/${channel.id}`
                )
              }
            ></NavLink>

            <NavLink
              label="Delete"
              rightSection={
                <IconTrash style={{ marginLeft: "8px" }} size={20} />
              }
              onClick={() => {
                setChannelToBeUpdatedOrDeletedId(channel.id);
                deleteChannelModal.openModal();
              }}
            ></NavLink>
          </Stack>
        )}
      </NavLink>
    );
  }

  return <div className={className}></div>;
};
