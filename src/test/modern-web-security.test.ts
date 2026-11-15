import { describe, expect, it } from "vitest";
import { resolveAllowedCorsOrigins, isCorsOriginAllowed } from "../../backend/src/cors-policy";
import { isDashboardPreviewEnabled } from "../../backend/src/dashboard-preview";
import { withDefaultSecurityHeaders } from "@/lib/security-headers";

describe("server security defaults", () => {
  it("uses an exact development origin and fails closed for production without configuration", () => {
    expect(resolveAllowedCorsOrigins(undefined, "development")).toEqual(
      new Set(["http://localhost:8080"]),
    );
    expect(resolveAllowedCorsOrigins(undefined, "production")).toEqual(new Set());
  });

  it("accepts only explicitly configured browser origins and rejects wildcard configuration", () => {
    const allowed = resolveAllowedCorsOrigins(
      "https://school.example, https://admin.example",
      "production",
    );
    expect(isCorsOriginAllowed("https://school.example", allowed)).toBe(true);
    expect(isCorsOriginAllowed("https://evil.example", allowed)).toBe(false);
    expect(isCorsOriginAllowed(undefined, allowed)).toBe(false);
    expect(() => resolveAllowedCorsOrigins("*", "production")).toThrow(/wildcard/);
    expect(() => resolveAllowedCorsOrigins("https://school.example/path", "production")).toThrow(
      /exact/,
    );
  });

  it("allows the seed-ID dashboard only when explicitly enabled outside production", () => {
    expect(isDashboardPreviewEnabled("development", "true")).toBe(true);
    expect(isDashboardPreviewEnabled("production", "true")).toBe(false);
    expect(isDashboardPreviewEnabled("development", undefined)).toBe(false);
  });

  it("adds safe response headers without replacing stricter host configuration", async () => {
    const response = withDefaultSecurityHeaders(
      new Response("ok", {
        headers: { "Referrer-Policy": "no-referrer" },
      }),
    );
    expect(response.headers.get("Referrer-Policy")).toBe("no-referrer");
    expect(response.headers.get("Permissions-Policy")).toBe(
      "camera=(), geolocation=(), microphone=()",
    );
    expect(response.headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(await response.text()).toBe("ok");
  });
});
