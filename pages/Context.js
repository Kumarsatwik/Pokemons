import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
} from "@apollo/client";
import { createContext } from "react";

const client = new ApolloClient({
  uri: "https://graphql-pokemon2.vercel.app/.",
  cache: new InMemoryCache(),
});

export const MyContext = createContext({
  value: client,
});
