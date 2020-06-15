import { graphql } from "msw";

export let handlers = [
  graphql.mutation("UpdatePost", (req, res, ctx) => {
    let { variables } = req.body;

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.data({
        __typename: "Mutation",
        updatePost: {
          __typename: "Post",
          ...variables,
        },
      })
    );
  }),
];
