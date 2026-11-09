import { describe, expect, it } from "vitest";
import { faculty } from "@/lib/faculty";

describe("Teaching staff directory", () => {
  it("lists Madam Nabusayi Kanah Nangayo teaching English and Literature in English", () => {
    const member = faculty.find((person) => person.name === "Madam Nabusayi Kanah Nangayo");
    expect(member?.subjects).toBe("English · Literature in English");
    expect(member?.department).toBe("Languages & Humanities");
    expect(member?.campus).toBe("Boarding");
    expect(member?.photo).toBeTruthy();
  });

  it("lists Madam Abwoch Janet teaching English and A'Level Literature in English", () => {
    const member = faculty.find((person) => person.name === "Madam Abwoch Janet");
    expect(member?.subjects).toBe("English · Literature in English (A'Level)");
    expect(member?.department).toBe("Languages & Humanities");
    expect(member?.campus).toBe("Boarding");
    expect(member?.photo).toBeTruthy();
  });
});
