import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  aLevelClassResources,
  chemistryCompendiumHref,
  chemistryJointMocksCompendiumHref,
} from "@/lib/learning-resources";

describe("e-Library Chemistry resources", () => {
  it.each(["S.5", "S.6"] as const)("lists both compendia in %s Chemistry", (className) => {
    const resources = aLevelClassResources[className]["Chemistry"];
    expect(resources?.map((resource) => resource.href)).toEqual([
      chemistryCompendiumHref,
      chemistryJointMocksCompendiumHref,
    ]);
  });

  it.each([
    [
      chemistryCompendiumHref,
      "public/learning-materials/chemistry-examination-compendium.pdf",
      /<span>0706575374<\/span>/g,
      1,
      /href="#section-1-item-1"/,
    ],
    [
      chemistryJointMocksCompendiumHref,
      "public/learning-materials/chemistry-examination-compendium-joint-mocks-2026.pdf",
      /<span>0706575374<\/span>/g,
      1,
      /href="#group-1-item-1"/,
    ],
  ] as const)(
    "serves %s as a watermarked HTML/PDF resource",
    (href, pdfRelativePath, watermark, count, firstItemLink) => {
      const filePath = resolve(process.cwd(), "public", href.slice(1));
      const pdfPath = resolve(process.cwd(), pdfRelativePath);
      expect(existsSync(filePath)).toBe(true);
      expect(existsSync(pdfPath)).toBe(true);

      const html = readFileSync(filePath, "utf8");
      expect(html).toContain('<div class="watermark-layer" aria-hidden="true">');
      expect(html.match(watermark) ?? []).toHaveLength(count);
      expect(html).toContain("download>Download PDF</a>");
      expect(html).toMatch(firstItemLink);
      expect(html).not.toMatch(/<script\b/i);
    },
  );
});
