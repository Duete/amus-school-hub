import { describe, it, expect } from "vitest";
import { campuses, schoolHead } from "@/lib/school";
import { campusPhotoGroups } from "@/lib/campus-photos";
describe("School campus structure", () => {
  it("features exactly two distinct campuses", () => {
    expect(campuses).toHaveLength(2);
    expect(new Set(campuses.map((campus) => campus.slug)).size).toBe(2);
    expect(campuses.map((campus) => ({ name: campus.name, slug: campus.slug }))).toEqual([
      { name: "Day Campus", slug: "day-campus" },
      { name: "Mbale Progressive Annex", slug: "mbale-progressive-annex" },
    ]);
    expect(campuses[0]?.description).toContain("Plot 8–15 Nabuyonga Rise");
    expect(campuses[0]?.image).toContain("hero-driveway.webp");
    expect(campuses[1]?.image).toContain("hero-frontage.webp");
  });

  it("assigns Day Campus facility photos and Annex building photos to the right galleries", () => {
    expect(campusPhotoGroups.dayCampus.map((photo) => photo.caption)).toEqual([
      "Day Campus driveway",
      "Day Campus grounds",
      "Administration block",
      "A-Level science block",
      "Science laboratory",
      "Classroom block",
      "A-Level Arts block",
    ]);
    expect(
      campusPhotoGroups.dayCampus
        .filter((photo) => photo.src.startsWith("/__l5e/"))
        .map((photo) => photo.src.split("/").at(-1)),
    ).toEqual([
      "day-campus-grounds.png",
      "day-campus-administration.jpg",
      "day-campus-two-storey-building.jpg",
      "day-campus-science-lab.jpg",
      "day-campus-classroom-block.jpg",
      "day-campus-art-design.jpg",
    ]);
    expect(campusPhotoGroups.annex.map((photo) => photo.caption)).toEqual([
      "Annex entrance and grounds",
      "School buses at the Boarding Campus",
      "Administration block",
      "Main classroom block",
      "A’Level Arts Block",
      "Classrooms and Court Yard",
      "Laboratory and Science Block",
      "Sick Bay and Library Block",
    ]);
    expect(
      campusPhotoGroups.annex.find((photo) => photo.caption === "Administration block")?.src,
    ).toContain("annex-administration-block.jpg");
    expect(
      campusPhotoGroups.annex.find(
        (photo) => photo.caption === "School buses at the Boarding Campus",
      )?.src,
    ).toContain("annex-school-buses.png");
    expect(
      campusPhotoGroups.annex.find((photo) => photo.caption === "Main classroom block")?.src,
    ).toContain("annex-main-classroom-block.png");
    expect(
      campusPhotoGroups.annex.find((photo) => photo.caption === "A’Level Arts Block")?.src,
    ).toContain("annex-a-level-arts-block.png");
    expect(
      campusPhotoGroups.annex.find((photo) => photo.caption === "Sick Bay and Library Block")?.src,
    ).toContain("hero-classrooms.webp");
    expect(
      campusPhotoGroups.annex.find((photo) => photo.caption === "Classrooms and Court Yard")?.src,
    ).toContain("annex-classrooms-courtyard.png");
    expect(
      campusPhotoGroups.annex.find((photo) => photo.caption === "Laboratory and Science Block")
        ?.src,
    ).toContain("hero-courtyard.webp");
  });
});

describe("School SEO metadata", () => {
  it("provides route metadata and answer-engine schemas", () => {
    const head = schoolHead("Academics", "UCE and UACE curriculum information.", "/academics");
    const meta = head.meta as Array<Record<string, unknown>>;
    const schemas = meta
      .filter((entry) => "script:ld+json" in entry)
      .map((entry) => entry["script:ld+json"] as Record<string, unknown>);

    expect(meta).toContainEqual({ title: "Academics | Mbale Progressive Secondary School" });
    expect(meta).toContainEqual({ name: "robots", content: "index,follow" });
    expect(schemas.map((schema) => schema["@type"])).toEqual([
      "School",
      "WebPage",
      "BreadcrumbList",
    ]);
  });

  it("keeps private portal pages out of search indexes", () => {
    const head = schoolHead("Fees and financial clearance", "Private finance portal.", "/finance");
    expect(head.meta).toContainEqual({ name: "robots", content: "noindex,nofollow" });
  });
});
