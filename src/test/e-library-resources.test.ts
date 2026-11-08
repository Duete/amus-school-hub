import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { aLevelClassResources, chemistryCompendiumHref } from "@/lib/learning-resources";

describe("e-Library Chemistry resources", () => {
  it.each(["S.5", "S.6"] as const)("lists the compendium in %s Chemistry", (className) => {
    const resources = aLevelClassResources[className].Chemistry;
    expect(resources?.map((resource) => resource.title)).toContain(
      "Chemistry Examination Compendium",
    );
    expect(resources?.[0]?.href).toBe(chemistryCompendiumHref);
  });

  it("serves the local Chemistry compendium as a static HTML resource", () => {
    const filePath = resolve(process.cwd(), "public", chemistryCompendiumHref.slice(1));
    const pdfPath = resolve(
      process.cwd(),
      "public",
      "learning-materials/chemistry-examination-compendium.pdf",
    );
    expect(existsSync(filePath)).toBe(true);
    expect(existsSync(pdfPath)).toBe(true);

    const html = readFileSync(filePath, "utf8");
    expect(html).toContain("<title>Chemistry Examination Compendium");
    expect(html).toContain('<div class="watermark-layer" aria-hidden="true">');
    expect(html.match(/<span>0706575374<\/span>/g) ?? []).toHaveLength(1);
    expect(html).toContain('href="/learning-materials/chemistry-examination-compendium.pdf" download');
    expect(html).toContain('href="#section-1-item-1"');
    expect(html).toContain('id="section-1-item-1"');
    expect(html).toContain("pointer-events: none;");
    expect(html).not.toMatch(/<script\b/i);
  });
});
