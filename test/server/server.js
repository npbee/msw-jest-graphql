import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export let server = setupServer(...handlers);
