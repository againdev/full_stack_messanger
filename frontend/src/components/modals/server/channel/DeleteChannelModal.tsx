"use client";
import {
  DeleteChannelMutation,
  DeleteChannelMutationVariables,
} from "@/src/gql/graphql";
import { DELETE_CHANNEL } from "@/src/graphql/mutations/server/DeleteChannel";
import { useServer } from "@/src/hooks/graphql/server/useServer";
import { useModal } from "@/src/hooks/useModal";
import { useGeneralStore } from "@/src/store/generalStore";
import { useProfileStore } from "@/src/store/profileStore";
import { useMutation } from "@apollo/client";
import { Button, Modal, Text } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import React from "react";

interface Props {
  className?: string;
}

export const DeleteChannelModal: React.FC<Props> = ({ className }) => {
  const { isOpen, closeModal } = useModal("DeleteChannel");
  const { serverId } = useParams();
  const { server } = useServer(serverId as string);

  const channelToBeDeletedOrUpdatedId = useGeneralStore(
    (state) => state.channelToBeUpdatedOrDeletedId
  );

  const profile = useProfileStore((state) => state.profile);

  const [deleteChannel, { loading }] = useMutation<
    DeleteChannelMutation,
    DeleteChannelMutationVariables
  >(DELETE_CHANNEL, {
    variables: {
      channelId: channelToBeDeletedOrUpdatedId,
      email: profile?.email,
    },
    refetchQueries: ["GetServer"],
    onCompleted: () => {
      closeModal();
      router.push(`/servers/${server.id}`);
    },
  });

  const router = useRouter();

  return (
    <Modal
      opened={isOpen}
      onClose={closeModal}
      title="Delete Channel"
      size="xs"
      className={className}
    >
      <Text mt="md" fw={700}>
        Are you sure you want to delete this channel?
      </Text>
      <Button loading={loading} color="red" onClick={() => deleteChannel()}>
        Delete Channel
      </Button>
    </Modal>
  );
};
