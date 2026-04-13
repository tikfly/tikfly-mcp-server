export function getApiKey(): string {
  const key = process.env.API_KEY;
  if (!key) {
    throw new Error(
      "API_KEY environment variable is not set. " +
      "Subscribe to Tikfly and set your key: " +
      "https://docs.tikfly.io/getting-started/quickstart"
    );
  }
  return key;
}

export function ok(data: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
  };
}
