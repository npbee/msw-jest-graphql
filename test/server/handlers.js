import { graphql } from "graphql";
import { rest } from "msw";
import { schema } from "./graphql";
import { db } from "./db";

let resolvers = {
  post(_root, args, context) {
    let { id } = args;
    let { db } = context;
    return db.get("posts", id);
  },
  updatePost(_root, args, context) {
    let { id, title } = args;
    let { db } = context;
    db.update("posts", id, {
      title,
    });
    return db.get("posts", id);
  },
};

export let handlers = [
  rest.post("/api/graphql", async (req, res, ctx) => {
    let { query, variables } = req.body;
    let context = { db };
    let response = await graphql(schema, query, resolvers, context, variables);

    return res(ctx.delay(500), ctx.status(200), ctx.json(response));
    //
  }),
];
