/**
 * This is the development server. Uses the worker from `msw` and references
 * the same handlers as our test server
 */
import { setupWorker } from "msw";
import { handlers } from "./handlers";

export let worker = setupWorker(...handlers);
