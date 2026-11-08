export type LearningResource = {
  title: string;
  href: string;
  description: string;
};

export const chemistryCompendiumHref = "/learning-materials/chemistry-examination-compendium.html";

export const aLevelClassResources: Record<"S.5" | "S.6", Record<string, LearningResource[]>> = {
  "S.5": {
    Chemistry: [
      {
        title: "Chemistry Examination Compendium",
        href: chemistryCompendiumHref,
        description:
          "S.6-focused examination practice; selected questions can extend S.5 Chemistry revision.",
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
    ],
  },
};
