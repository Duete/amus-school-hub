import { describe, expect, it } from "vitest";
import { faculty } from "@/lib/faculty";

describe("Boarding Campus Heads of Department", () => {
  const heads = faculty.filter((member) => member.campus === "Boarding" && member.head);

  it("lists the supplied department heads under the Boarding Campus", () => {
    expect(heads).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Mr. Katende Emmanuel",
          department: "Science Department",
          campus: "Boarding",
          head: true,
          photo: expect.any(String),
        }),
        expect.objectContaining({
          name: "Booza Azalia Ashraf",
          department: "History Department",
          campus: "Boarding",
          head: true,
        }),
        expect.objectContaining({
          name: "Ms. Nambafu Aisha",
          department: "Divinity",
          campus: "Boarding",
          head: true,
        }),
        expect.objectContaining({
          name: "Ms. Nabusayi Kanah Nangayo",
          department: "Language Department",
          campus: "Boarding",
          head: true,
          photo: expect.any(String),
        }),
      ]),
    );
  });

  it("replaces the conflicting placeholder Science Department head", () => {
    expect(heads.some((member) => member.name === "Mr. Isaac Waiswa")).toBe(false);
  });

  it("does not list the removed Ruth Atim staff profile", () => {
    expect(faculty.some((member) => member.name === "Ms. Ruth Atim")).toBe(false);
  });
});
