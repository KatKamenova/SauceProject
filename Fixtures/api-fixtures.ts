import {
  request as playwrightRequest,
  test as base,
  type APIRequestContext,
} from "@playwright/test";

type ApiFixtures = {
  api: APIRequestContext;
  sauceApi: APIRequestContext;
};

const DEFAULT_API_BASE_URL = "https://jsonplaceholder.typicode.com";
const DEFAULT_SAUCE_API_BASE_URL = "https://api.us-west-1.saucelabs.com";

function getApiBaseUrl(): string {
  const configuredUrl = process.env.API_BASE_URL ?? DEFAULT_API_BASE_URL;

  let url: URL;
  try {
    url = new URL(configuredUrl);
  } catch {
    throw new Error("API_BASE_URL must be a valid absolute URL.");
  }

  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      "API_BASE_URL must use HTTP or HTTPS and must not contain credentials, a query, or a fragment.",
    );
  }

  return url.toString();
}

function getSauceApiBaseUrl(): string {
  const configuredUrl =
    process.env.SAUCE_API_BASE_URL ?? DEFAULT_SAUCE_API_BASE_URL;

  let url: URL;
  try {
    url = new URL(configuredUrl);
  } catch {
    throw new Error("SAUCE_API_BASE_URL must be a valid absolute URL.");
  }

  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      "SAUCE_API_BASE_URL must use HTTPS and must not contain credentials, a query, or a fragment.",
    );
  }

  return url.toString();
}

export const test = base.extend<ApiFixtures>({
  api: async ({}, use) => {
    const apiContext = await playwrightRequest.newContext({
      baseURL: getApiBaseUrl(),
    });

    try {
      await use(apiContext);
    } finally {
      await apiContext.dispose();
    }
  },
  sauceApi: async ({}, use) => {
    const username = process.env.SAUCE_USERNAME;
    const accessKey = process.env.SAUCE_ACCESS_KEY;

    if (!username || !accessKey) {
      throw new Error(
        "Set SAUCE_USERNAME and SAUCE_ACCESS_KEY to use the Sauce Labs API fixture.",
      );
    }

    const apiContext = await playwrightRequest.newContext({
      baseURL: getSauceApiBaseUrl(),
      httpCredentials: {
        username,
        password: accessKey,
      },
    });

    try {
      await use(apiContext);
    } finally {
      await apiContext.dispose();
    }
  },
});

export { expect } from "@playwright/test";
