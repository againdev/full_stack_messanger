"use client";
import {
  Button,
  Center,
  Image,
  rem,
  Stack,
  Tooltip,
  UnstyledButton,
  useMantineColorScheme,
} from "@mantine/core";
import React from "react";
import {
  IconArrowsJoin,
  IconMoon,
  IconPlus,
  IconSun,
} from "@tabler/icons-react";
import classes from "./sidebar.module.scss";
import { useModal } from "@/src/hooks/useModal";
import classNames from "classnames";
import { UserButton, UserProfile } from "@clerk/nextjs";
import { useServers } from "@/src/hooks/graphql/server/userServers";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
}

interface NavbarLinkProps {
  label: string;
  active?: boolean;
  imageUrl: string;
  onClick?: () => void;
}

function NavbarLink({ imageUrl, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right">
      <UnstyledButton
        onClick={onClick}
        data-active={active || undefined}
        variant="transparent"
        style={{ borderRadius: rem(100) }}
      >
        <Image
          src={imageUrl}
          w={rem(50)}
          h={rem(50)}
          radius={100}
          ml="md"
        ></Image>
      </UnstyledButton>
    </Tooltip>
  );
}

export const Sidebar: React.FC<Props> = ({ className }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const createServerModal = useModal("CreateServer");

  const { servers, loading } = useServers();
  const [active, setActive] = React.useState(0);
  const router = useRouter();

  const links = servers?.map((server, index) => (
    <NavbarLink
      key={server.id}
      onClick={() => {
        setActive(index);
        router.push(`/servers/${server.id}`);
      }}
      label={server.name}
      imageUrl={server.imageUrl}
    />
  ));

  return (
    <nav className={classNames(classes.navbar, className)}>
      <Stack>
        <Center>
          <Button
            className={classes.link}
            variant="subtle"
            radius={100}
            onClick={createServerModal.openModal}
          >
            <IconPlus radius={100} />
          </Button>
        </Center>
        <Center>
          <Button
            className={classes.link}
            variant="subtle"
            radius={100}
            onClick={() => {}}
          >
            <IconArrowsJoin radius={100} />
          </Button>
        </Center>

        <Stack justify="center" gap="md" mt="xl">
          {links}
        </Stack>
      </Stack>

      <Stack justify="center" align="center" >
        <Button
          className={classes.link}
          variant="subtle"
          onClick={toggleColorScheme}
          radius={100}
          p={0}
        >
          {colorScheme === "dark" ? (
            <IconMoon radius={100} />
          ) : (
            <IconSun radius={100} />
          )}
        </Button>
        <UserButton />
      </Stack>
    </nav>
  );
};
