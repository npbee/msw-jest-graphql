import { setupWorker, graphql } from "msw";
import { handlers as defaultHandlers } from "./handlers";

let handlers = [
  ...defaultHandlers,
  graphql.query("Post", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.data({
        __typename: "Query",
        post: {
          __typename: "Post",
          id: "1",
          title: "First Post",
          likes: 1,
        },
      })
    );
  }),
];

export let worker = setupWorker(...handlers);
