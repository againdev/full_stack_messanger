"use client";
import { ChannelType, MemberRole } from "@/src/gql/graphql";
import { useModal } from "@/src/hooks/useModal";
import { useGeneralStore } from "@/src/store/generalStore";
import { Flex, Text, Tooltip } from "@mantine/core";
import { IconPlus, IconSettings } from "@tabler/icons-react";
import React from "react";

interface Props {
  className?: string;
  sectionType: "channels" | "members";
  channelType: ChannelType;
  role: MemberRole;
  lable: string;
}

export const ServerSidebarSection: React.FC<Props> = ({
  className,
  sectionType,
  channelType,
  role,
  lable,
}) => {
  const channelModal = useModal("CreateChannel");
  const manageMembersModal = useModal("ManageMembers");

  const setChannelTypeForCreateChannelModal = useGeneralStore(
    (state) => state.setChannelTypeForCreateChannelModal
  );

  const handleOnClick = () => {
    setChannelTypeForCreateChannelModal(channelType);
    channelModal.openModal();
  };

  if (role !== MemberRole.Guest && sectionType === "channels") {
    return (
      <Tooltip label="Create Channel" withArrow onClick={handleOnClick}>
        <Flex p="md" style={{ cursor: "pointer" }}>
          <Flex justify="space-between" w="100%">
            <Text fw={700}>{lable}</Text>
          </Flex>
          <IconPlus />
        </Flex>
      </Tooltip>
    );
  }

  if (role === MemberRole.Admin && sectionType === "members") {
    return (
      <Tooltip
        label="Manage Members"
        withArrow
        onClick={manageMembersModal.openModal}
      >
        <Flex p="md" style={{ cursor: "pointer" }}>
          <Flex justify="space-between" w="100%">
            <Text fw={700}>{lable}</Text>
          </Flex>
          <IconSettings />
        </Flex>
      </Tooltip>
    );
  }
};
