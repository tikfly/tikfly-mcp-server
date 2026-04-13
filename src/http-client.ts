import { getApiKey } from "./utils/utils.js";

const HOST = "tiktok-api23.p.rapidapi.com";
const BASE_URL = `https://${HOST}`;

export async function tikflyFetch(
  path: string,
  params: Record<string, string>
): Promise<unknown> {
  const url = new URL(BASE_URL + path);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") url.searchParams.set(k, v);
  }

  const res = await fetch(url.toString(), {
    headers: {
      "x-rapidapi-key": getApiKey(),
      "x-rapidapi-host": HOST,
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Tikfly API error ${res.status}: ${body}`);
  }

  return res.json();
}
