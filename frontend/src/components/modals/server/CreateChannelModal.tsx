"use client";
import {
  ChannelType,
  CreateChannelMutation,
  CreateChannelMutationVariables,
} from "@/src/gql/graphql";
import { CREATE_CHANNEL } from "@/src/graphql/mutations/server/CreateChannel";
import { useServer } from "@/src/hooks/graphql/server/useServer";
import { useModal } from "@/src/hooks/useModal";
import { useGeneralStore } from "@/src/store/generalStore";
import { useProfileStore } from "@/src/store/profileStore";
import { useMutation } from "@apollo/client";
import {
  Button,
  Flex,
  Group,
  Modal,
  rem,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useParams } from "next/navigation";
import React from "react";

interface Props {
  className?: string;
}

export const CreateChannelModal: React.FC<Props> = ({ className }) => {
  const { isOpen, closeModal } = useModal("CreateChannel");
  const channelType = useGeneralStore(
    (state) => state.channelTypeForCreateChannelModal
  );

  const form = useForm({
    initialValues: {
      name: "",
      type: channelType ? channelType : ChannelType.Text,
    },

    validate: {
      name: (value) =>
        !value.trim()
          ? "Please enter a name"
          : value === "general"
          ? "Channel name cannot be general"
          : null,
      type: (value) => !value.trim() && "Please select a type",
    },
    validateInputOnChange: true,
  });

  const { serverId } = useParams();
  const { server } = useServer(serverId as string);

  const profile = useProfileStore((state) => state.profile);
  const [createChannel, { loading, error }] = useMutation<
    CreateChannelMutation,
    CreateChannelMutationVariables
  >(CREATE_CHANNEL, {
    variables: {
      input: {
        serverId: server?.id,
        name: form.values.name,
        type: form.values.type,
      },
      email: profile.email,
    },
    refetchQueries: ["GetServer"],
    onCompleted: () => {
      closeModal();
      form.reset();
    },
  });

  const channelTypeForCreateChannelModal = useGeneralStore(
    (state) => state.channelTypeForCreateChannelModal
  );
  React.useEffect(() => {
    if (!channelTypeForCreateChannelModal) return;
    form.setFieldValue("type", channelTypeForCreateChannelModal);
  }, [channelType]);

  return (
    <Modal
      title="Create Channel"
      className={className}
      opened={isOpen}
      onClose={closeModal}
    >
      <Stack>
        <Flex direction="column" h={rem(250)}>
          <TextInput
            mb="md"
            label="Channel Name"
            {...form.getInputProps("name")}
            error={form.errors.name || error?.message}
          ></TextInput>
          <Select
            {...form.getInputProps("type")}
            label="Channel Type"
            data={Object.values(ChannelType).map((type) => type)}
          />
        </Flex>
        <Group>
          <Button color="red" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            onClick={() => createChannel()}
            loading={loading}
            variant="gradient"
            disabled={
              !form.values.name ||
              !form.values.type ||
              loading ||
              !!error?.message
            }
          >
            Create Channel
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
