# Mocking Ideas

Some ideas around testing React apps with:

- [Mock Service Worker](https://mswjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Jest](https://jest.io)
- [GraphQL](https://graphql.org/)

## In-Memory Database w/ Real Resolvers

Instead of mocking out every individual request in each test, all GraphQL request are mocked with a custom resolver and an in-memory database.

This is essentially what [MirageJS](https://miragejs.com/) prescribes, but using MSW instead just for demonstration.

```jsx
// Create a `tweet` in the database
db.create("tweet", {
  body: "LOL",
  likes: 0,
});

// Now render. Component will make the network call is it would in the live app
renderList();

// Assert that we have the things we expect in the DOM
await screen.findByText(/LOL/);
expect(screen.queryByText("0 likes")).toBeInTheDocument();
```

## Customized Mocked Queries and Mutations

For certain operations, it's too complicated to mock out what the real backend would do, so it's easier to mock out an individual request.

This is always available by using MSW directly, but it can be helpful to have a helper that allows for declaring only the parts of the response you need and removes some ceremony.

```jsx
// Instead of this...
import { server, graphql } from "test/utils";

test("xxx", async () => {
  server.use(
    graphql.query("Tweets", async (req, res, ctx) => {
      return [
        {
          __typename: "Tweet", // Some GraphQL apps need this
          id: "xxx",
          body: "LOL",
          likes: 1000,
        },
      ];
    })
  );
});

// We can make a helper in a hook-like fashion
// This will be merged with a real GraphQL response, so we don't have to
// specify GraphQL details
import { useMockedQuery } from "test/utils";

test("xxx", async () => {
  useMockedQuery("Tweets", _variables => {
    // If we need the variables
    // let { body } = variables;

    return {
      tweets: [
        {
          id: 1,
          body: "LOL",
          likes: 1000,
        },
      ],
    };
  });
});
```
