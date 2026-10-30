import { describe, it, expect } from "vitest";
import { campuses } from "@/lib/school";
describe("School campus structure", () => {
  it("features exactly two distinct campuses", () => {
    expect(campuses).toHaveLength(2);
    expect(new Set(campuses.map((campus) => campus.slug)).size).toBe(2);
    expect(campuses.map((campus) => ({ name: campus.name, slug: campus.slug }))).toEqual([
      { name: "Day Campus", slug: "day-campus" },
      { name: "Mbale Progressive Annex", slug: "mbale-progressive-annex" },
    ]);
    expect(campuses[0].description).toContain("Nyanza Road, near Namatala");
  });
});
