import { gql } from "@apollo/client";

export const CREATE_CHANNEL = gql`
  mutation CreateChannel($input: CreateChannelOnServerDto!, $email: String!) {
    createChannel(input: $input, email: $email) {
      id
      name
      imageUrl
      members {
        id
      }
    }
  }
`;
