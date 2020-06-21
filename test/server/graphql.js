import { buildSchema } from "graphql";

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
}
`;

export let schema = buildSchema(schemaString);
