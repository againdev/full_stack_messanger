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
import classes from "./CreateServerModal.module.scss";
import { IconUpload, IconX } from "@tabler/icons-react";

interface Props {
  className?: string;
}

export const CreateServerModal: React.FC<Props> = ({ className }) => {
  const { isOpen, closeModal } = useModal("CreateServer");
  const form = useForm({
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) => !value.trim() && "Please enter a name.",
    },
  });

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

  console.log(file);

  return (
    <Modal className={className} title="Create a server" opened={isOpen} onClose={closeModal}>
      <Text>
        Give your server personality with a name an image. You can always change
        it later.
      </Text>
      <form onSubmit={form.onSubmit(() => {})}>
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

            {imagePreview && (
              <Flex pos="relative" w={rem(150)} h={rem(150)} mt="md">
                <>
                  <Button
                    onClick={() => setImagePreview(null)}
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
            disabled={!!form.errors.name}
            w={"30%"}
            type="submit"
            variant={"gradient"}
            mt="md"
          >
            Create Server
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
