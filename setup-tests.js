import "@testing-library/jest-dom";
import { queryCache } from "react-query";
import { server } from "./test/server/server";
import { db } from "./test/server/db";

// Set these up here so we don't have to do it for each test
beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  queryCache.clear();
  db.clear();
});
afterAll(() => server.close());
