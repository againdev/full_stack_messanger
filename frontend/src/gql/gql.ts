/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  mutation CreateProfile($input: CreateProfileDto!) {\n    createProfile(input: $input) {\n      id\n      imageUrl\n      name\n      email\n    }\n  }\n": types.CreateProfileDocument,
    "\n  mutation UpdateServerWithNewInviteCode($serverId: Float!) {\n    updateServerWithNewInviteCode(serverId: $serverId) {\n      id\n      name\n      imageUrl\n      inviteCode\n    }\n  }\n": types.UpdateServerWithNewInviteCodeDocument,
    "\n  mutation CreateChannel($input: CreateChannelOnServerDto!, $email: String!) {\n    createChannel(input: $input, email: $email) {\n      id\n      name\n      imageUrl\n      members {\n        id\n      }\n    }\n  }\n": types.CreateChannelDocument,
    "\n  mutation CreateServer($input: CreateServerDto!, $file: Upload) {\n    createServer(input: $input, file: $file) {\n      id\n      name\n      imageUrl\n      members {\n        id\n      }\n    }\n  }\n": types.CreateServerDocument,
    "\n  mutation DeleteChannel($channelId: Float, $email: String!) {\n    deleteChannelFromServer(channelId: $channelId, email: $email)\n  }\n": types.DeleteChannelDocument,
    "\n  mutation DeleteServer($serverId: Float, $email: String!) {\n    deleteServer(serverId: $serverId, email: $email)\n  }\n": types.DeleteServerDocument,
    "\n  mutation LeaveServer($serverId: Float, $email: String!) {\n    leaveServer(serverId: $serverId, email: $email)\n  }\n": types.LeaveServerDocument,
    "\n  mutation UpdateServer($input: UpdateServerDto!, $file: Upload) {\n    updateServer(input: $input, file: $file) {\n      id\n      name\n      imageUrl\n    }\n  }\n": types.UpdateServerDocument,
    "\n  query GetServer($id: Float!, $email: String!) {\n    getServer(id: $id, email: $email) {\n      id\n      profileId\n      name\n      imageUrl\n      inviteCode\n      channels {\n        id\n        type\n        name\n      }\n      members {\n        id\n        role\n        profileId\n        profile {\n          id\n          name\n          imageUrl\n          email\n        }\n      }\n      profile {\n        id\n        name\n        imageUrl\n        email\n      }\n    }\n  }\n": types.GetServerDocument,
    "\n  query GetServers($email: String!) {\n    getServers(email: $email) {\n      id\n      name\n      imageUrl\n    }\n  }\n": types.GetServersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateProfile($input: CreateProfileDto!) {\n    createProfile(input: $input) {\n      id\n      imageUrl\n      name\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation CreateProfile($input: CreateProfileDto!) {\n    createProfile(input: $input) {\n      id\n      imageUrl\n      name\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateServerWithNewInviteCode($serverId: Float!) {\n    updateServerWithNewInviteCode(serverId: $serverId) {\n      id\n      name\n      imageUrl\n      inviteCode\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateServerWithNewInviteCode($serverId: Float!) {\n    updateServerWithNewInviteCode(serverId: $serverId) {\n      id\n      name\n      imageUrl\n      inviteCode\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateChannel($input: CreateChannelOnServerDto!, $email: String!) {\n    createChannel(input: $input, email: $email) {\n      id\n      name\n      imageUrl\n      members {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateChannel($input: CreateChannelOnServerDto!, $email: String!) {\n    createChannel(input: $input, email: $email) {\n      id\n      name\n      imageUrl\n      members {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateServer($input: CreateServerDto!, $file: Upload) {\n    createServer(input: $input, file: $file) {\n      id\n      name\n      imageUrl\n      members {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateServer($input: CreateServerDto!, $file: Upload) {\n    createServer(input: $input, file: $file) {\n      id\n      name\n      imageUrl\n      members {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteChannel($channelId: Float, $email: String!) {\n    deleteChannelFromServer(channelId: $channelId, email: $email)\n  }\n"): (typeof documents)["\n  mutation DeleteChannel($channelId: Float, $email: String!) {\n    deleteChannelFromServer(channelId: $channelId, email: $email)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteServer($serverId: Float, $email: String!) {\n    deleteServer(serverId: $serverId, email: $email)\n  }\n"): (typeof documents)["\n  mutation DeleteServer($serverId: Float, $email: String!) {\n    deleteServer(serverId: $serverId, email: $email)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LeaveServer($serverId: Float, $email: String!) {\n    leaveServer(serverId: $serverId, email: $email)\n  }\n"): (typeof documents)["\n  mutation LeaveServer($serverId: Float, $email: String!) {\n    leaveServer(serverId: $serverId, email: $email)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateServer($input: UpdateServerDto!, $file: Upload) {\n    updateServer(input: $input, file: $file) {\n      id\n      name\n      imageUrl\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateServer($input: UpdateServerDto!, $file: Upload) {\n    updateServer(input: $input, file: $file) {\n      id\n      name\n      imageUrl\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetServer($id: Float!, $email: String!) {\n    getServer(id: $id, email: $email) {\n      id\n      profileId\n      name\n      imageUrl\n      inviteCode\n      channels {\n        id\n        type\n        name\n      }\n      members {\n        id\n        role\n        profileId\n        profile {\n          id\n          name\n          imageUrl\n          email\n        }\n      }\n      profile {\n        id\n        name\n        imageUrl\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetServer($id: Float!, $email: String!) {\n    getServer(id: $id, email: $email) {\n      id\n      profileId\n      name\n      imageUrl\n      inviteCode\n      channels {\n        id\n        type\n        name\n      }\n      members {\n        id\n        role\n        profileId\n        profile {\n          id\n          name\n          imageUrl\n          email\n        }\n      }\n      profile {\n        id\n        name\n        imageUrl\n        email\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetServers($email: String!) {\n    getServers(email: $email) {\n      id\n      name\n      imageUrl\n    }\n  }\n"): (typeof documents)["\n  query GetServers($email: String!) {\n    getServers(email: $email) {\n      id\n      name\n      imageUrl\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;