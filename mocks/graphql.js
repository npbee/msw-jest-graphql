import { makeExecutableSchema } from "@graphql-tools/schema";
import { addMocksToSchema } from "@graphql-tools/mock";

let schemaString = `
type Post {
  id: ID!,
  title: String!
  likes: Int!
}

type Query {
  post(id: ID!): Post
}

type Mutation {
  updatePost(id: ID!, title: String!): Post
}
`;

export let schema = addMocksToSchema({
  schema: makeExecutableSchema({ typeDefs: schemaString }),
});
