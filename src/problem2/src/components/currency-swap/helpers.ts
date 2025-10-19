import type {Token, TokenPriceData} from "./types.ts";
import {config} from "../../config.ts";

export const processTokenData = (data: TokenPriceData[]): Token[] => {
  const latestPrices = new Map<string, TokenPriceData>();
  data.forEach(item => {
    if (!item.price) return;

    const existing = latestPrices.get(item.currency);
    if (!existing || new Date(item.date) > new Date(existing.date)) {
      latestPrices.set(item.currency, item);
    }
  });

  return Array.from(latestPrices.values()).map(token => ({
    ...token,
    iconUrl: `${config.iconBaseUrl}${token.currency}.svg`
  })).sort((a, b) => a.currency.localeCompare(b.currency));
};

export const fetchRetry = async <T>(url: string, options: { retries: number; delay?: number }): Promise<T> => {
  const { retries, delay = 1000 } = options;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return await response.json() as T;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      console.error(`Attempt ${attempt} failed for ${url}:`, lastError.message);
      if (attempt < retries) {
        await new Promise(res => setTimeout(res, delay));
      }
    }
  }
  throw lastError || new Error(`All fetch attempts failed for ${url}`);
};