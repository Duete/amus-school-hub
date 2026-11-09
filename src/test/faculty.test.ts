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

  it("lists Mr. Kerichan Emmanuel as Boarding Head of ICT", () => {
    const member = faculty.find((person) => person.name === "Mr. Kerichan Emmanuel");
    expect(member?.role).toBe("Head of ICT");
    expect(member?.subjects).toBe("ICT · Computer Studies");
    expect(member?.department).toBe("Technology & Enterprise");
    expect(member?.campus).toBe("Boarding");
    expect(member?.head).toBe(true);
    expect(member?.photo).toBeTruthy();
  });

  it("lists Mr. Maani Asinani teaching Islamic Religious Education at Boarding", () => {
    const member = faculty.find((person) => person.name === "Mr. Maani Asinani");
    expect(member?.role).toBe("Teacher");
    expect(member?.subjects).toBe("Islamic Religious Education");
    expect(member?.department).toBe("Divinity");
    expect(member?.campus).toBe("Boarding");
    expect(member?.photo).toBeTruthy();
  });

  it("lists Ms. Mukoya Firdaus teaching O and A'Level Physics at Boarding", () => {
    const member = faculty.find((person) => person.name === "Ms. Mukoya Firdaus");
    expect(member?.role).toBe("Teacher");
    expect(member?.subjects).toBe("Physics (O & A'Level)");
    expect(member?.department).toBe("Mathematics & Sciences");
    expect(member?.campus).toBe("Boarding");
    expect(member?.photo).toBeTruthy();
  });
});
