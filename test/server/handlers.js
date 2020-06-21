import { graphql } from "graphql";
import { rest } from "msw";
import { schema } from "./graphql";
import { db } from "./db";

let root = {
  tweets(args, context) {
    let { db } = context;
    return db.getAll("tweet");
  },
  createTweet(args, context) {
    let { db } = context;
    return db.create("tweet", { body: args.body });
  },
};

export let handlers = [
  rest.post("/api/graphql", async (req, res, ctx) => {
    let { query, variables } = req.body;
    let context = { db };
    let response = await graphql(schema, query, root, context, variables);

    if (response.errors) {
      console.error(response.errors[0]);
    }

    return res(ctx.delay(100), ctx.status(200), ctx.json(response));
  }),
];
