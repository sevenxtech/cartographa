import { GraphQLClient } from "graphql-request";

const hasuraUrl = process.env.HASURA_GRAPHQL_URL;
const token = process.env.HASURA_GRAPHQL_ADMIN_SECRET;

const useClient = () => {
  const client = new GraphQLClient(hasuraUrl as string, {
    headers: {
      "x-hasura-admin-secret": token!,
    },
  });
  return client;
};
export default useClient;
