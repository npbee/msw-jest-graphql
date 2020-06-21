import { setupWorker } from "msw";
import { handlers as defaultHandlers } from "./handlers";

let handlers = [...defaultHandlers];

export let worker = setupWorker(...handlers);
