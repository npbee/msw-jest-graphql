import merge from "lodash/merge";
import React from "react";
import { render } from "@testing-library/react";
import { graphql as mswGraphql, context } from "msw";
import { graphql as gql } from "graphql";
import { server } from "./server/server";
import { schema } from "./server/graphql";
import userEvent from "@testing-library/user-event";
import { Form, List } from "src/tweeter.jsx";

export { db } from "./server/db";
export * from "@testing-library/react";
export { server, userEvent };

/**
 * Some wrappers around `msw` graphql handlers. These will:
 */
export let graphql = {
  async resolve(req, res, ctx, createMockData) {
    let { query, variables } = req.body;

    // Get the full query response for this from our mocked schema
    let response = await gql(schema, query, {}, {}, variables);

    // Create the mock response for this particular request
    // Pass in the variables for convenience
    let mockData = createMockData(variables);

    // Merge the two together with the mock data taking precendence
    let finalResponse = merge(
      {},
      response,
      // Assume we want a `data` response if it wasn't part of the return
      // value
      mockData.data ? mockData : { data: mockData }
    );

    return res(context.json(finalResponse));
  },

  query(operationName, testResolver) {
    return mswGraphql.query(operationName, async (req, res, ctx) => {
      return graphql.resolve(req, res, ctx, testResolver);
    });
  },
  mutation(operationName, testResolver) {
    return mswGraphql.mutation(operationName, testResolver);
  },
};

export async function renderTweeter(props) {
  render(
    <>
      <Form />
      <List />
    </>
  );
}
