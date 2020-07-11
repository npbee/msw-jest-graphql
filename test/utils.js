import React from "react";
import { render } from "@testing-library/react";
import { graphql } from "msw";
import { server, handleGraphQLResponse } from "./server/server";
import userEvent from "@testing-library/user-event";
import { Form, List } from "src/tweeter.jsx";

export { db } from "./server/db";
export * from "@testing-library/react";
export { server, userEvent, graphql };

/**
 * Some wrappers around `msw` graphql handlers. These will:
 */
export function renderForm() {
  render(<Form />);
}

export function renderList() {
  render(<List />);
}

export function useMockedQuery(operationName, createPartialResponse) {
  server.use(
    graphql.query(operationName, handleGraphQLResponse(createPartialResponse))
  );
}
