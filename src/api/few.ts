import { HTTPClient } from "./HTTPClient";
import { loggerMiddleware } from "./middleware/logger";

const few = new HTTPClient();

few.use({
  onRequest: [(input) => loggerMiddleware(input, "request")],
  onResponse: [(input) => loggerMiddleware(input, "response")],
  onError: [(input) => loggerMiddleware(input, "error")],
});

export { few };
