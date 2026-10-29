import { expect, test } from "../../Fixtures/api-fixtures";

test("GET /posts/1 returns a post", async ({ api }) => {
  const response = await api.get("/posts/1");

  expect(response.status()).toBe(200);

  const post = await response.json();
  expect(post).toMatchObject({
    id: 1,
    userId: 1,
  });
  expect(post.title).toEqual(expect.any(String));
  expect(post.body).toEqual(expect.any(String));
});
