import { describe, expect, it } from "vitest";
import { faculty } from "@/lib/faculty";

describe("Faculty directory", () => {
  it("lists Ms. Nabusayi Kanah Nangayo as Boarding Language Department Head", () => {
    const member = faculty.find((person) => person.name === "Ms. Nabusayi Kanah Nangayo");
    expect(member?.subjects).toBe("English · Literature in English");
    expect(member?.department).toBe("Language Department");
    expect(member?.role).toBe("Head of Language Department");
    expect(member?.campus).toBe("Boarding");
    expect(member?.head).toBe(true);
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
