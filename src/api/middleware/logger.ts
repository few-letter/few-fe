const loggerMiddleware = <T>(
  input: T,
  phase: "request" | "response" | "error",
): T => {
  if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
    console.log(`[currentPhase: ${phase}]`, input);
  }

  return input;
};

export { loggerMiddleware };
