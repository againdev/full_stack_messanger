import { gql } from "@apollo/client";

export const GET_SERVER = gql`
  query GetServer($id: Float!, $email: String!) {
    getServer(id: $id, email: $email) {
      id
      profileId
      imageUrl
      inviteCode
      channels {
        id
        type
        name
      }
      members {
        id
        role
        profileId
        profile {
          id
          name
          imageUrl
          email
        }
      }
      profile {
        id
        name
        imageUrl
        email
      }
    }
  }
`;
