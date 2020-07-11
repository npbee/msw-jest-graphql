import merge from "lodash/merge";
import { rest, context } from "msw";
import { resolve } from "./graphql";

const { json } = context;

export function handleGraphQLResponse(createMockedResponse = () => ({})) {
  return async function handleResponse(req, res, ctx) {
    let { query, variables } = req.body;
    let rawResponse = await resolve(query, variables);
    let mockedResponse = createMockedResponse(variables);

    if (!mockedResponse.data && !mockedResponse.errors) {
      // Assume a `data` response unless specified
      mockedResponse = { data: mockedResponse };
    }

    let response = merge(rawResponse, mockedResponse);

    return res(ctx.delay(100), ctx.status(200), json(response));
  };
}

export let handlers = [rest.post("/api/graphql", handleGraphQLResponse())];
