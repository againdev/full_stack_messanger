"use client";
import { MemberRole, Server } from "@/src/gql/graphql";
import { useModal } from "@/src/hooks/useModal";
import { Divider, Flex, Menu, rem, Text } from "@mantine/core";
import {
  IconArrowAutofitDown,
  IconPlus,
  IconSettings,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import classNames from "classnames";
import React from "react";

interface Props {
  className?: string;
  server: Server;
  memberRole: MemberRole;
}

export const ServerHeader: React.FC<Props> = ({
  className,
  server,
  memberRole,
}) => {
  const isAdmin = memberRole === MemberRole.Admin;
  const isModerator = memberRole === MemberRole.Moderator || isAdmin;

  const inviteModal = useModal("InvitePeople");
  const updateServerModal = useModal("UpdateServer");
  const createChannelModal = useModal("CreateChannel");
  const deleteServerModal = useModal("DeleteServer");

  return (
    <Menu shadow="md" width={rem(300)}>
      <Menu.Target>
        <Flex
          className={classNames(className)}
          p="md"
          justify="space-between"
          align="center"
          w="100%"
          style={{
            cursor: "pointer",
          }}
        >
          {server?.name} <IconArrowAutofitDown />
        </Flex>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={inviteModal.openModal} rightSection={<IconPlus />}>
          Invite People
        </Menu.Item>
        {isAdmin && (
          <Menu.Item
            onClick={updateServerModal.openModal}
            rightSection={<IconSettings />}
          >
            Update Server
          </Menu.Item>
        )}
        {isModerator && (
          <Menu.Item
            rightSection={<IconPlus />}
            onClick={createChannelModal.openModal}
          >
            Create Channel
          </Menu.Item>
        )}
        {isModerator && <Divider />}
        {isAdmin && (
          <Menu.Item color="red" rightSection={<IconTrash />}>
            <Text>Delete Server</Text>
          </Menu.Item>
        )}
        {!isAdmin && (
          <Menu.Item
            color="red"
            rightSection={<IconX />}
            onClick={deleteServerModal.openModal}
          >
            <Text>Leave Server</Text>
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};
