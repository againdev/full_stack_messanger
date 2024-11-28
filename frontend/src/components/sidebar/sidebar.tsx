"use client";
import { Button, Center, Stack, useMantineColorScheme } from "@mantine/core";
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

interface Props {
  className?: string;
}

export const Sidebar: React.FC<Props> = ({ className }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const createServerModal = useModal("CreateServer");

  return (
    <nav className={classNames(classes.navbar, className)}>
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

      <Stack justify="center" align="center">
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
