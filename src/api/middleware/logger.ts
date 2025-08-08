export const loggerMiddleware = <T>(
  input: T,
  phase: "request" | "response" | "error",
): T => {
  const isDev = process.env.NODE_ENV === "development";

  if (!isDev) return input;

  switch (phase) {
    case "request":
      if (input instanceof Request) {
        console.log(`[currentPhase: ${phase}]`, {
          url: input.url,
          method: input.method,
          headers: Object.fromEntries(input.headers.entries()),
          body: input.body ? "Request body exists" : "No body",
        });
      } else {
        console.log(`[currentPhase: ${phase}]`, input);
      }
      break;

    case "response":
      if (input instanceof Response) {
        console.log(`[currentPhase: ${phase}]`, {
          status: input.status,
          statusText: input.statusText,
          headers: Object.fromEntries(input.headers.entries()),
          url: input.url,
        });
      } else {
        console.log(`[currentPhase: ${phase}]`, input);
      }
      break;

    case "error":
      if (input instanceof Error) {
        console.log(`[currentPhase: ${phase}]`, {
          name: input.name,
          message: input.message,
          stack: input.stack,
        });
      } else {
        console.log(`[currentPhase: ${phase}]`, input);
      }
      break;

    default:
      console.log(`[currentPhase: ${phase}]`, input);
      break;
  }

  return input;
};
