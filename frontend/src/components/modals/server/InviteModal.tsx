"use client";
import {
  UpdateServerWithNewInviteCodeMutation,
  UpdateServerWithNewInviteCodeMutationVariables,
} from "@/src/gql/graphql";
import { UPDATE_SERVER_WITH_NEW_INVITE_CODE } from "@/src/graphql/mutations/UpdateServerWithNewInviteCode";
import { useServer } from "@/src/hooks/graphql/server/useServer";
import { useModal } from "@/src/hooks/useModal";
import { useMutation } from "@apollo/client";
import { Button, Flex, Modal, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useClipboard } from "@mantine/hooks";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import React from "react";

interface Props {
  className?: string;
}

export const InviteModal: React.FC<Props> = ({ className }) => {
  const { isOpen, closeModal } = useModal("InvitePeople");
  const { serverId } = useParams();
  const { server } = useServer(serverId as string);

  const clipboard = useClipboard({
    timeout: 1000,
  });

  const [updateServerWithNewInviteCode, { loading }] = useMutation<
    UpdateServerWithNewInviteCodeMutation,
    UpdateServerWithNewInviteCodeMutationVariables
  >(UPDATE_SERVER_WITH_NEW_INVITE_CODE, {
    variables: {
      serverId: server?.id,
    },
  });

  const form = useForm({
    initialValues: {
      inviteCode: "",
    },
  });
  React.useEffect(() => {
    if (!server?.inviteCode) return;

    form.setValues({
      inviteCode: server?.inviteCode,
    });
  }, [server?.inviteCode]);
  
  const ref = React.useRef<HTMLInputElement>(null);

  return (
    <Modal
      className={className}
      opened={isOpen}
      onClose={closeModal}
      title="Invite People"
    >
      <Stack>
        <Flex>
          <TextInput
            label="Server Invite Code"
            w="100%"
            {...form.getInputProps("inviteCode")}
            rightSection={
              <Button variant="transparent" onClick={clipboard.copy}>
                {!clipboard.copied ? <IconCopy /> : <IconCheck color="green" />}
              </Button>
            }
          />
        </Flex>
        <Button
          disabled={loading}
          onClick={() => updateServerWithNewInviteCode()}
        >
          <Text mr="md">Generate New Invite Code</Text>
        </Button>
      </Stack>
    </Modal>
  );
};
