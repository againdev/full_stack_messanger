import { GetServersQuery, GetServersQueryVariables } from "@/src/gql/graphql";
import { GET_SERVERS } from "@/src/graphql/queries/GetServers";
import { useProfileStore } from "@/src/store/profileStore";
import { useQuery } from "@apollo/client";

export function useServers() {
  const profile = useProfileStore((state) => state.profile);

  const email = profile?.email;

  const { data: servers, loading } = useQuery<
    GetServersQuery,
    GetServersQueryVariables
  >(GET_SERVERS, {
    skip: !email,
    variables: { email },
  });

  return { servers: servers?.getServers, loading };
}
