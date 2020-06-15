import * as React from "react";
import ReactDOM from "react-dom";
import { Editor, Viewer } from "./editor";
import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { devtoolsExchange } from "@urql/devtools";

let client = createClient({
  url: "/api/graphql",
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    cacheExchange({}),
    fetchExchange,
  ],
});

async function bootstrap() {
  if (process.env.NODE_ENV === "development") {
    let { worker } = require("./mocks/worker");
    await worker.start();
  }
  ReactDOM.render(
    <Provider value={client}>
      <Editor id="1" />
      <Viewer id="1" />
    </Provider>,
    document.getElementById("root")
  );
}

bootstrap();
