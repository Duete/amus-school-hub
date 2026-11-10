import { describe, expect, it } from "vitest";
import { notableAlumni } from "@/routes/alumni";

describe("Notable alumni", () => {
  it("lists Fazila Ikwaput with her school connection and a sourced biography", () => {
    const alumnus = notableAlumni.find((person) => person.name === "Fazila Ikwaput");

    expect(alumnus).toBeDefined();
    expect(alumnus?.classYear).toBe("Class year not listed");
    expect(alumnus?.role).toContain("attended Mbale Progressive Secondary School");
    expect(alumnus?.href).toBe(
      "https://www.monitor.co.ug/uganda/magazines/score/ikwaput-the-making-of-women-football-legend-3392332",
    );
    expect(alumnus?.source).toBe("Daily Monitor profile");
    expect(alumnus?.image).toMatch(/alumni-fazila-ikwaput\.webp$/);
    expect(alumnus?.imageAlt).toContain("Fazila Ikwaput");
    expect(alumnus?.imageCredit).toBe("Photo: Emami East Bengal via The Telegraph");
  });
});
