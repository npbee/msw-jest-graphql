import * as React from "react";
import ReactDOM from "react-dom";
import { Form, List } from "./tweeter";

async function bootstrap() {
  if (process.env.NODE_ENV === "development") {
    let { worker } = require("../test/server/worker");
    await worker.start();
  }
  ReactDOM.render(
    <>
      <Form />
      <List />
    </>,
    document.getElementById("root")
  );
}

bootstrap();
