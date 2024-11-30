import {
  ChannelType,
  GetServerQuery,
  GetServerQueryVariables,
} from "@/src/gql/graphql";
import { GET_SERVER } from "@/src/graphql/queries/GetServer";
import { useProfileStore } from "@/src/store/profileStore";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useServer = (serverId: string) => {
  const profile = useProfileStore((state) => state.profile);

  const { data: dataServer, loading } = useQuery<
    GetServerQuery,
    GetServerQueryVariables
  >(GET_SERVER, {
    variables: {
      id: Number(serverId),
      email: profile?.email,
    },
    onError: () => {
      const router = useRouter();
      router.push("/");
    },
  });
  const textChannels =
    dataServer?.getServer?.channels?.filter(
      (channel) => channel.type === ChannelType.Text
    ) || [];

  const audioChannels =
    dataServer?.getServer?.channels.filter(
      (channel) => channel.type === ChannelType.Audio
    ) || [];

  const videoChannels =
    dataServer?.getServer?.channels.filter(
      (channel) => channel.type === ChannelType.Video
    ) || [];

  const members = dataServer?.getServer.members?.find(
    (member) => member.profileId !== profile?.id
  );

  const role = dataServer?.getServer.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return {
    server: dataServer?.getServer,
    loading,
    textChannels,
    audioChannels,
    videoChannels,
    members,
    role,
  };
};
