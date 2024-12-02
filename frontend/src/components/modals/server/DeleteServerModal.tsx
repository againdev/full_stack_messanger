"use client";
import {
  DeleteServerMutation,
  DeleteServerMutationVariables,
} from "@/src/gql/graphql";
import { DELETE_SERVER } from "@/src/graphql/mutations/server/DeleteServer";
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

export const DeleteServerlModal: React.FC<Props> = ({ className }) => {
  const { isOpen, closeModal } = useModal("DeleteServer");
  const { serverId } = useParams();
  const { server } = useServer(serverId as string);

  const profile = useProfileStore((state) => state.profile);

  const [deleteServer, { loading }] = useMutation<
    DeleteServerMutation,
    DeleteServerMutationVariables
  >(DELETE_SERVER, {
    variables: {
      serverId: server?.id,
      email: profile?.email,
    },
    refetchQueries: ["GetServers"],
    onCompleted: () => {
      closeModal();
      router.push(`/`);
    },
  });

  const router = useRouter();

  return (
    <Modal
      opened={isOpen}
      onClose={closeModal}
      title="Delete Server"
      size="xs"
      className={className}
    >
      <Text mt="md" fw={700}>
        Are you sure you want to delete this server?
      </Text>
      <Button loading={loading} color="red" onClick={() => deleteServer()}>
        Delete Server
      </Button>
    </Modal>
  );
};
