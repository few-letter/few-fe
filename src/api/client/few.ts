import { HTTPClient } from "@/api/HTTPClient";
import { loggerMiddleware } from "@/api/middleware";

const few = new HTTPClient();

few.use({
  onRequest: [(input) => loggerMiddleware(input, "request")],
  onResponse: [(input) => loggerMiddleware(input, "response")],
  onError: [(input) => loggerMiddleware(input, "error")],
});

export { few };
