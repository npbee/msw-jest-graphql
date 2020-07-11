import {
  renderList,
  screen,
  db,
  waitForElementToBeRemoved,
  useMockedQuery,
} from "test/utils";

test("Renders 0 likes", async () => {
  db.create("tweet", {
    body: "LOL",
    likes: 0,
  });

  renderList();
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/));

  await screen.findByText(/LOL/);
  expect(screen.queryByText("0 likes")).toBeInTheDocument();
});

test("Renders 1 like", async () => {
  db.create("tweet", {
    body: "LOL",
    likes: 1,
  });

  renderList();
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/));

  await screen.findByText(/LOL/);
  expect(screen.queryByText("1 like")).toBeInTheDocument();
});

// If you _really_ need to mock out a request with a custom response
// This is needed in some cases where server responses are complicated and
// you don't want to reimpliment everything.
test("Can show tweets with special responses", async () => {
  const tweet = db.create("tweet", {
    body: "LOL",
    likes: 0,
  });

  // eslint-disable-next-line
  useMockedQuery("Tweets", _variables => {
    // If we need the variables
    // let { body } = variables;

    return {
      tweets: [
        {
          ...tweet,
          body: "LOL",
          likes: 1000,
        },
      ],
    };
  });

  await renderList();
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/));

  await screen.findByText(/LOL/);
  expect(screen.queryByText("1000 likes")).toBeInTheDocument();
});
