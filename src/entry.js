import * as React from "react";
import ReactDOM from "react-dom";
import { Form, List } from "./tweeter";
import { Provider, createClient } from "./client";

async function bootstrap() {
  if (process.env.NODE_ENV === "development") {
    let { worker } = require("../test/server/worker");
    await worker.start();
  }
  ReactDOM.render(
    <Provider client={createClient()}>
      <Form />
      <List />
    </Provider>,
    document.getElementById("root")
  );
}

bootstrap();
