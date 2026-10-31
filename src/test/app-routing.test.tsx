import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
const createTestRouter = () =>
  createRouter({ routeTree, context: { queryClient: new QueryClient() } });

describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const matches = createTestRouter().matchRoutes("/");
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches the Sports page at /sports", () => {
    const matches = createTestRouter().matchRoutes("/sports");
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it.each([
    ["/admissions/apply", "/admissions/apply"],
    ["/login", "/login"],
    ["/performance", "/performance"],
    ["/contact", "/contact"],
    ["/database", "/database"],
    ["/faculty", "/faculty"],
    ["/governance", "/governance"],
  ])("matches the %s page", (_label, path) => {
    const matches = createTestRouter().matchRoutes(path);
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});
