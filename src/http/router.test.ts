import { expect, test } from "vitest";
import { Router } from "./router.js";

test("matches GET route", () => {
  const router = new Router();

  const handler = () => {};
  router.get("/posts", handler);
  const route = router.match("GET", "/posts");

  expect(route).toBeDefined();
  expect(route?.handler).toBe(handler);
});

test("does not match route with different method", () => {
  const router = new Router();
  const handler = () => {};
  router.get("/posts", handler);

  const route = router.match("POST", "/posts");

  expect(route).toBeUndefined();
});

test("does not match unknown path", () => {
  const router = new Router();
  const handler = () => {};
  router.get("/posts", handler);

  const route = router.match("GET", "/users");

  expect(route).toBeUndefined();
});

test("matches URL with query string", () => {
  const router = new Router();
  const handler = () => {};
  router.get("/posts", handler);

  const route = router.match("GET", "/posts?page=2");

  expect(route?.handler).toBe(handler);
});
