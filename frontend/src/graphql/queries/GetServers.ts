import { gql } from "@apollo/client";

export const GET_SERVERS = gql`
  query GetServers($email: String!) {
    getServers(email: $email) {
      id
      name
      imageUrl
    }
  }
`;
