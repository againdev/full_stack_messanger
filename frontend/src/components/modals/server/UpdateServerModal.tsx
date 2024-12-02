"use client";
import { useModal } from "@/src/hooks/useModal";
import { useForm } from "@mantine/form";
import {
  Button,
  Flex,
  Group,
  Image,
  Modal,
  rem,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import React from "react";
import classes from "./UpdateServerModal.module.scss";
import { IconUpload, IconX } from "@tabler/icons-react";
import { useMutation } from "@apollo/client";
import {
  UpdateServerMutation,
  UpdateServerMutationVariables,
} from "@/src/gql/graphql";
import { useProfileStore } from "@/src/store/profileStore";
import { UPDATE_SERVER } from "@/src/graphql/mutations/server/UpdateServer";
import { useServer } from "@/src/hooks/graphql/server/useServer";
import { useParams } from "next/navigation";

interface Props {
  className?: string;
}

export const UpdateServerModal: React.FC<Props> = ({ className }) => {
  const [updateServer, { loading, error }] = useMutation<
    UpdateServerMutation,
    UpdateServerMutationVariables
  >(UPDATE_SERVER);

  const profileId = useProfileStore((state) => state.profile?.id);

  const { serverId } = useParams();
  const { server } = useServer(serverId as string);

  React.useEffect(() => {
    if (!server) return;

    form.setValues({ name: server.name });
    setImagePreview(server.imageUrl);
  }, [server?.name, server?.imageUrl]);

  const { isOpen, closeModal } = useModal("UpdateServer");
  const form = useForm({
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) => !value.trim() && "Please enter a name.",
    },
  });

  const onSubmit = () => {
    if (!form.validate()) return;

    updateServer({
      variables: {
        input: {
          name: form.values.name,
          serverId: server?.id,
        },
        file,
      },
      onCompleted: () => {
        setImagePreview(null);
        setFile(null);
        form.reset();
        closeModal();
      },
      refetchQueries: ["GetServers"],
    });
  };

  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  const [file, setFile] = React.useState<File | null>(null);
  const handleDropzoneChange: DropzoneProps["onDrop"] = (files) => {
    if (files.length === 0) {
      return setImagePreview(null);
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    setFile(files[0]);
    reader.readAsDataURL(files[0]);
  };

  return (
    <Modal
      className={className}
      title="Update server"
      opened={isOpen}
      onClose={closeModal}
    >
      <Text>
        Give your server personality with a name an image. You can always change
        it later.
      </Text>
      <form onSubmit={form.onSubmit(() => onSubmit())}>
        <Stack>
          <Flex justify="center" align="center" direction="column">
            {!imagePreview && (
              <Dropzone
                onDrop={(files) => {
                  handleDropzoneChange(files);
                }}
                accept={IMAGE_MIME_TYPE}
                className={classes.dropZone}
                mt="md"
              >
                <Group style={{ minHeight: 100, pointEvents: "none" }}>
                  <Dropzone.Accept>
                    <IconUpload size="3.2rem" stroke={1.5} />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX size="3.2rem" stroke={1.5} />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconUpload size="3.2rem" stroke={1.5} />
                  </Dropzone.Idle>
                  <>
                    <Text size="xl" inline>
                      Drag images here to click to select files
                    </Text>
                    <Text size="sm" c="dimmed" inline mt={7}>
                      Upload a server icon
                    </Text>
                  </>
                </Group>
              </Dropzone>
            )}

            {error?.message && !file && <Text c="red">{error?.message}</Text>}

            {imagePreview && (
              <Flex pos="relative" w={rem(150)} h={rem(150)} mt="md">
                <>
                  <Button
                    onClick={() => {
                      setImagePreview(null);
                      setFile(null);
                    }}
                    color="red"
                    pos="absolute"
                    style={{
                      zIndex: 1,
                      borderRadius: "50%",
                      padding: 0,
                      width: rem(30),
                      height: rem(30),
                      top: 0,
                      right: 15,
                    }}
                  >
                    <IconX color="white" />
                  </Button>
                  <Image
                    src={imagePreview}
                    width={rem(150)}
                    height={rem(150)}
                    radius={"50%"}
                  />
                </>
              </Flex>
            )}
          </Flex>
          <TextInput
            label="Server name"
            placeholder="Enter server name"
            {...form.getInputProps("name")}
            error={form.errors.name}
          />
          <Button
            disabled={!!form.errors.name || loading}
            w={"50%"}
            type="submit"
            variant={"gradient"}
            mt="md"
          >
            Update Server
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};