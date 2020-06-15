import React from "react";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
  dedupExchange,
  fetchExchange,
} from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";

export let createClient = () =>
  createUrqlClient({
    url: "/api/graphql",
    exchanges: [dedupExchange, cacheExchange({}), fetchExchange],
  });

export function Provider({ children, client }) {
  return <UrqlProvider value={client}>{children}</UrqlProvider>;
}
