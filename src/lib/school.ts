import cityCampus from "@/assets/city-campus.webp";
import hillsideCampus from "@/assets/hillside-campus.webp";

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

const schoolName = "Mbale Progressive Secondary School";
const publicOrigin = (import.meta.env.VITE_PUBLIC_SITE_URL as string | undefined)?.replace(
  /\/$/,
  "",
);
const knownPaths: Record<string, string> = {
  Home: "/",
  "About Mbale Progressive": "/about",
  Academics: "/academics",
  Admissions: "/admissions",
  "Admissions application": "/admissions/apply",
  "Campus life": "/campus-life",
  "Our campuses": "/campuses",
  Contact: "/contact",
  Faculty: "/faculty",
  "Fees and clearance": "/finance",
  "Governance and leadership": "/governance",
  "News and updates": "/news",
  Performance: "/performance",
  Scholarships: "/scholarships",
  "Sports & debate": "/sports",
};
const privateTitles = new Set([
  "Sign in",
  "My portal",
  "Database architecture",
  "Fees and financial clearance",
  "Apply for admission",
]);

type StructuredData = Record<string, unknown>;

export function schoolHead(
  title: string,
  description: string,
  path?: string,
  extraStructuredData: StructuredData[] = [],
  indexable = true,
) {
  const resolvedPath = path ?? knownPaths[title];
  const pageUrl = publicOrigin && resolvedPath ? `${publicOrigin}${resolvedPath}` : undefined;
  const schoolSchema: StructuredData = {
    "@context": "https://schema.org",
    "@type": "School",
    name: schoolName,
    description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mbale",
      addressRegion: "Eastern Uganda",
      addressCountry: "UG",
    },
    areaServed: "Mbale City and the Eastern Region of Uganda",
    ...(pageUrl ? { url: pageUrl } : {}),
  };

  return {
    meta: [
      { title: `${title} | ${schoolName}` },
      { name: "description", content: description },
      {
        name: "keywords",
        content: "Mbale secondary school, UCE, UACE, day and boarding school, Uganda",
      },
      {
        name: "robots",
        content: indexable && !privateTitles.has(title) ? "index,follow" : "noindex,nofollow",
      },
      { property: "og:title", content: `${title} | ${schoolName}` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: schoolName },
      ...(pageUrl ? [{ property: "og:url", content: pageUrl }] : []),
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: `${title} | ${schoolName}` },
      { name: "twitter:description", content: description },
      { "script:ld+json": schoolSchema },
      ...extraStructuredData.map((data) => ({ "script:ld+json": data })),
    ],
    ...(pageUrl ? { links: [{ rel: "canonical", href: pageUrl }] } : {}),
  };
}
