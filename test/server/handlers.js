import { rest } from "msw";
import { resolve } from "./graphql";

export let handlers = [
  rest.post("/api/graphql", async (req, res, ctx) => {
    let { query, variables } = req.body;
    let response = await resolve(query, variables);

    return res(ctx.delay(100), ctx.status(200), ctx.json(response));
  }),
];
