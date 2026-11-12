export type LearningResource = {
  title: string;
  href: string;
  description: string;
};

export const chemistryCompendiumHref = "/learning-materials/chemistry-examination-compendium.html";
export const chemistryJointMocksCompendiumHref =
  "/learning-materials/chemistry-examination-compendium-joint-mocks-2026.html";
export const chemistryMarkingGuideHref =
  "/learning-materials/chemistry-examination-compendium%20Marking%20Guide.html";

export const aLevelClassResources: Record<"S.5" | "S.6", Record<string, LearningResource[]>> = {
  "S.5": {
    Chemistry: [
      {
        title: "Chemistry Examination Compendium",
        href: chemistryCompendiumHref,
        description:
          "S.6-focused examination practice; selected questions can extend S.5 Chemistry revision.",
      },
      {
        title: "Chemistry Joint Mocks Compendium 2026",
        href: chemistryJointMocksCompendiumHref,
        description:
          "JJEB, UMTA, UNNASE, UTEC, and WAKISSHA-style Chemistry items for guided S.5 and S.6 revision.",
      },
      {
        title: "Chemistry Answer Guide — Trinity College Nabbingo",
        href: chemistryMarkingGuideHref,
        description:
          "A-Level worked answers and marking annotations for checking Chemistry revision exercises.",
      },
    ],
  },
  "S.6": {
    Chemistry: [
      {
        title: "Chemistry Examination Compendium",
        href: chemistryCompendiumHref,
        description:
          "Exam-style practice across electrochemistry, thermochemistry, kinetics, equilibria, and applied chemistry.",
      },
      {
        title: "Chemistry Joint Mocks Compendium 2026",
        href: chemistryJointMocksCompendiumHref,
        description:
          "A broad 2026 joint-mock collection covering electrochemistry, organic, inorganic, physical, and environmental Chemistry.",
      },
      {
        title: "Chemistry Answer Guide — Trinity College Nabbingo",
        href: chemistryMarkingGuideHref,
        description:
          "A-Level worked answers and marking annotations for checking Chemistry revision exercises.",
      },
    ],
  },
};
