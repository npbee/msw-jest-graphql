import {
  server,
  renderForm,
  screen,
  graphql,
  waitFor,
  userEvent,
  db,
} from "test/utils";

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  // eslint-disable-next-line no-console
  console.error.mockRestore();
});

test("Can create a new tweet", async () => {
  await renderForm();
  await screen.findByText("Create a new Tweet");

  let textarea = screen.getByLabelText("Body");
  let submit = screen.getByRole("button", { name: "Tweet" });
  userEvent.type(textarea, "LOL");
  userEvent.click(submit);

  await waitFor(() => expect(db.getAll("tweet")).toHaveLength(1));
  await waitFor(() => expect(textarea).toBeEmptyDOMElement());

  let newTweet = db.getAll("tweet")[0];
  expect(newTweet.body).toBe("LOL");
});

test("Handles errors", async () => {
  server.use(
    // Can drop down to raw `msw` if needed
    graphql.mutation("CreateTweet", (req, res, ctx) => {
      return res(ctx.errors(["Error creating tweet"]));
    })
  );

  await renderForm();
  await screen.findByText("Create a new Tweet");

  let textarea = screen.getByLabelText("Body");
  let submit = screen.getByRole("button", { name: "Tweet" });
  userEvent.type(textarea, "LOL");
  userEvent.click(submit);

  await screen.findByText("Error!");
  // eslint-disable-next-line no-console
  expect(console.error).toHaveBeenCalledTimes(1);
});
