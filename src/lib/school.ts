import cityCampus from "@/assets/city-campus.jpg";
import hillsideCampus from "@/assets/hillside-campus.jpg";

export const campuses = [
  {
    slug: "day-campus",
    name: "Day Campus",
    setting: "Nyanza Road, near Namatala, Mbale City.",
    image: cityCampus,
    description:
      "Mbale Progressive Secondary School’s Day Campus is located on Nyanza Road, near Namatala, in Mbale City.",
    features: ["Day Campus", "Nyanza Road, near Namatala", "Mbale City"],
  },
  {
    slug: "mbale-progressive-annex",
    name: "Mbale Progressive Annex",
    setting: "Boarding campus.",
    image: hillsideCampus,
    description: "Mbale Progressive Annex is the school’s boarding campus.",
    features: ["Boarding campus", "Mbale Progressive Annex"],
  },
];

export function schoolHead(title: string, description: string) {
  const schoolName = "Mbale Progressive Secondary School";
  return {
    meta: [
      { title: `${title} | ${schoolName}` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} | ${schoolName}` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
