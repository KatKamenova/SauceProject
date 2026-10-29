import { expect, test } from "../../Fixtures/api-fixtures";

const sauceUsername = process.env.SAUCE_USERNAME;
const hasSauceCredentials =
  Boolean(sauceUsername) && Boolean(process.env.SAUCE_ACCESS_KEY);

test.use({ trace: "off" });

test.skip(
  !hasSauceCredentials,
  "Set SAUCE_USERNAME and SAUCE_ACCESS_KEY to run Sauce Labs API authentication tests.",
);

test("Sauce Labs API accepts valid Basic Auth credentials", async ({
  sauceApi,
}) => {
  if (!sauceUsername) {
    throw new Error("SAUCE_USERNAME is required for this API test.");
  }

  const response = await sauceApi.get(
    `/rest/v1/${encodeURIComponent(sauceUsername)}/jobs`,
  );

  expect(response.status()).toBe(200);
});
