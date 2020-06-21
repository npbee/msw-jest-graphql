/**
 * This is the test server. Only used in unit tests and uses the `msw/node`
 * package, but still references the same handlers
 */
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export let server = setupServer(...handlers);
