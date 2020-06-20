import {
  server,
  renderEditor,
  screen,
  fireEvent,
  graphql,
  waitFor,
  db,
} from "test/utils";

test("Can edit a the post", async () => {
  let testPost = db.create("posts", {
    title: "THE TITLE",
  });

  await renderEditor({ id: testPost.id, dontMock: true });

  await screen.findByText("Edit Post");

  // Wait for the post we created to be in the doc
  // Because we passed in the ID of the post we created above, we can use this
  // as an assertion that we are making the right DB call
  await screen.findByDisplayValue(testPost.title);

  let input = await screen.getByLabelText("Title");
  fireEvent.change(input, { target: { value: "THE TITLE EDITED" } });

  // await waitForElementToBeRemoved(() => screen.getByText(/Saving/));

  // It's important to assert which variables were provided on this mutation
  // because the results don't render back on the screen. It's possible we
  // may have complex logic that happens _before_ being sent to the server
  await waitFor(() =>
    expect(db.get("posts", testPost.id).title).toEqual("THE TITLE EDITED")
  );
});

test("Handles errors", async () => {
  let testPost = {
    id: 1,
    title: "THE TITLE",
  };

  let resolve = jest.fn(() => ({
    data: {
      post: null,
    },
    errors: [
      {
        message: "ERROR!",
      },
    ],
  }));

  server.use(graphql.query("Post", resolve));
  await renderEditor({ id: testPost.id });

  await screen.findByText("Error!");

  // Make sure we called the query with the correct args
  expect(resolve).toHaveBeenCalledTimes(1);
  expect(resolve).toHaveBeenCalledWith({ id: testPost.id });
});
