import { setupWorker } from "msw";
import { handlers } from "./handlers";

export let worker = setupWorker(...handlers);
