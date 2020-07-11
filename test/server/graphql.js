import { graphql } from "graphql";
import { buildSchema } from "graphql";
import { db } from "./db";

let schemaString = `
type Tweet {
  id: ID!,
  body: String!
  likes: Int!
}

type Query {
  tweets: [Tweet!]!
}

type Mutation {
  createTweet(body: String!): Tweet
  likeTweet(id: ID!): Tweet
}
`;

export let schema = buildSchema(schemaString);

/**
 * Our resolvers! Just like the real thing.
 */
let root = {
  tweets(args, context) {
    let { db } = context;
    return db.getAll("tweet");
  },
  createTweet(args, context) {
    let { db } = context;
    return db.create("tweet", { body: args.body });
  },
  likeTweet(args, context) {
    let { db } = context;
    return db.update("tweet", args.id, tweet => ({
      ...tweet,
      likes: tweet.likes + 1,
    }));
  },
};

export async function resolve(query, variables) {
  let context = { db };
  let response = await graphql(schema, query, root, context, variables);

  if (response.errors && process.env.STRICT_GRAPHQL) {
    throw new Error(response.errors[0]);
  }

  return response;
}
