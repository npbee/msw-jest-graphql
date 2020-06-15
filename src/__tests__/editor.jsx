import {
  server,
  renderEditor,
  screen,
  fireEvent,
  graphql,
  waitFor,
} from "test/utils";

test("Can edit a the post", async () => {
  let testPost = {
    id: 1,
    title: "THE TITLE",
  };

  // By making this a jest mock, I can make assertions on it
  let resolve = jest.fn(() => ({
    post: testPost,
  }));

  server.use(
    // Setup the server response for this post.
    // I don't care about the `likes` here because it's not part of the editing
    // but I don't want the component to blow up when it's rendered. Also I
    // don't have to specify any `__typename` values just like I wouldn't in
    // the actual application
    graphql.query("Post", resolve)
  );
  let { update } = await renderEditor({ id: testPost.id });

  await screen.findByText("Edit Post");

  // Make sure we called the query with the correct args
  expect(resolve).toHaveBeenCalledTimes(1);
  expect(resolve).toHaveBeenCalledWith({ id: testPost.id });

  await screen.findByDisplayValue(testPost.title);
  let input = await screen.getByLabelText("Title");
  fireEvent.change(input, { target: { value: "THE TITLE EDITED" } });

  // It's important to assert which variables were provided on this mutation
  // because the results don't render back on the screen. It's possible we
  // may have complex logic that happens _before_ being sent to the server
  await waitFor(() => expect(update).toHaveBeenCalledTimes(1));
  expect(update).toHaveBeenCalledWith({ id: 1, title: "THE TITLE EDITED" });
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
