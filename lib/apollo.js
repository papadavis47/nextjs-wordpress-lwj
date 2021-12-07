import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://54.190.150.51/graphql",
  cache: new InMemoryCache(),
});
