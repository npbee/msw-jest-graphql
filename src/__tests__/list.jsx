import { renderList, screen, db, waitForElementToBeRemoved } from "test/utils";

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
