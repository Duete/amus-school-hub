import { describe, expect, it } from "vitest";
import { faculty, facultyServesCampus, sortFacultyAlphabetically } from "@/lib/faculty";

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

  it("lists Kedi Yefusa as the Boarding A'Level Mathematics teacher", () => {
    const member = faculty.find((person) => person.name === "Kedi Yefusa");
    expect(member?.role).toBe("A'Level Mathematics Teacher");
    expect(member?.subjects).toBe("Mathematics (A'Level)");
    expect(member?.department).toBe("Mathematics & Sciences");
    expect(member?.campus).toBe("Boarding");
    expect(member?.photo).toBeTruthy();
    expect(member?.email).toBeUndefined();
  });

  it("lists Mr. Katende Emmanuel as Boarding Science HoD with his photo", () => {
    const member = faculty.find((person) => person.name === "Mr. Katende Emmanuel");
    expect(member?.role).toBe("Head of Science Department");
    expect(member?.subjects).toBe("Science");
    expect(member?.department).toBe("Science Department");
    expect(member?.campus).toBe("Boarding");
    expect(member?.head).toBe(true);
    expect(member?.photo).toBeTruthy();
    expect(member?.photo).toMatch(/\.webp$/);
    expect(member?.photoPosition).toBe("50% 11%");
  });

  it("lists Mr. Booza Azalia Ashraf as Boarding History HoD with his photo", () => {
    const member = faculty.find((person) => person.name === "Mr. Booza Azalia Ashraf");
    expect(member?.role).toBe("Head of History Department");
    expect(member?.department).toBe("History Department");
    expect(member?.campus).toBe("Boarding");
    expect(member?.head).toBe(true);
    expect(member?.photo).toBeTruthy();
  });

  it("lists Mr. Engulu Daniel as Head of Business Education at both campuses", () => {
    const member = faculty.find((person) => person.name === "Mr. Engulu Daniel");
    expect(member?.role).toBe("Head of Business Education");
    expect(member?.subjects).toBe("Entrepreneurship");
    expect(member?.department).toBe("Business Education");
    expect(member?.campus).toBe("Both Campuses");
    expect(member?.bio).toBe(
      "Heads Business Education at both campuses and teaches Entrepreneurship across the Day and Boarding Campuses.",
    );
    expect(member?.head).toBe(true);
    expect(member?.photo).toBeTruthy();
    expect(member && facultyServesCampus(member, "Day Campus")).toBe(true);
    expect(member && facultyServesCampus(member, "Boarding")).toBe(true);
  });

  it("sorts campus department heads alphabetically by name, ignoring honorifics", () => {
    const heads = sortFacultyAlphabetically(faculty.filter((person) => person.head));
    expect(heads.map((member) => member.name)).toEqual([
      "Ms. Agnes Nakitto",
      "Mr. Booza Azalia Ashraf",
      "Mr. Daniel Kato",
      "Mr. Engulu Daniel",
      "Mr. Katende Emmanuel",
      "Mr. Kerichan Emmanuel",
      "Ms. Nabusayi Kanah Nangayo",
      "Ms. Nambafu Aisha",
      "Ms. Sarah Namukasa",
    ]);
  });

  it("lists Mr. Mugulo Joseph teaching O'Level History at Boarding", () => {
    const member = faculty.find((person) => person.name === "Mr. Mugulo Joseph");
    expect(member?.role).toBe("Teacher");
    expect(member?.subjects).toBe("History (O'Level)");
    expect(member?.campus).toBe("Boarding");
    expect(member?.photo).toBeTruthy();
  });

  it("lists Mrs. Buyi Alice Lamwaka as a Boarding History teacher", () => {
    const member = faculty.find((person) => person.name === "Mrs. Buyi Alice Lamwaka");
    expect(member?.role).toBe("Teacher");
    expect(member?.department).toBe("Languages & Humanities");
    expect(member?.subjects).toBe("History");
    expect(member?.campus).toBe("Boarding");
    expect(member?.bio).toBe("Teaches History at the Boarding Campus.");
    expect(member?.head).toBeUndefined();
    expect(member?.photo).toBeTruthy();
  });

  it("lists Mr. Gwire Muhammad as Day Campus DOS II in the directory with his own portrait", () => {
    const member = faculty.find((person) => person.name === "Mr. Gwire Muhammad");
    expect(member?.role).toBe("Assistant Director of Studies (DOS II)");
    expect(member?.campus).toBe("Day Campus");
    expect(member?.department).toBe("Administration");
    expect(member?.head).toBeFalsy();
    expect(member?.photo).toMatch(/staff-gwire-muhammad\.jpg$/);
    expect(member && facultyServesCampus(member, "Day Campus")).toBe(true);
    expect(member && facultyServesCampus(member, "Boarding")).toBe(false);
  });

  it("keeps each of the four November portraits on its own staff card", () => {
    const photoFor = (name: string) => faculty.find((person) => person.name === name)?.photo ?? "";
    expect(photoFor("Mr. Gwire Muhammad")).toMatch(/staff-gwire-muhammad\.jpg$/);
    expect(photoFor("Mr. Engulu Daniel")).toMatch(/staff-engulu-daniel\.jpg$/);
    expect(photoFor("Mr. Mugulo Joseph")).toMatch(/staff-mugulo-joseph\.jpg$/);
    expect(photoFor("Mrs. Buyi Alice Lamwaka")).toMatch(/staff-buyi-alice-lamwaka\.jpg$/);
    expect(
      new Set([
        photoFor("Mr. Gwire Muhammad"),
        photoFor("Mr. Engulu Daniel"),
        photoFor("Mr. Mugulo Joseph"),
        photoFor("Mrs. Buyi Alice Lamwaka"),
      ]).size,
    ).toBe(4);
  });
});
