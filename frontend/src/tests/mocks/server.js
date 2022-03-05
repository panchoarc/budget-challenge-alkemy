import { setupServer } from "msw/node";

import registerHandler from "./handlers/registerHandler";
import loginHandler from "./handlers/loginHandler";

export const server = setupServer(...registerHandler, ...loginHandler);
