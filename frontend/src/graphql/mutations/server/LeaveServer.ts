import { gql } from "@apollo/client";

export const LEAVE_SERVER = gql`
  mutation LeaveServer($serverId: Float, $email: String!) {
    leaveServer(serverId: $serverId, email: $email)
  }
`;
