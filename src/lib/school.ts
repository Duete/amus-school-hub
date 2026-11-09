import { campusImages } from "./campus-photos";

export const boardingCampusMapUrl = "https://maps.app.goo.gl/MtCo3saXVfs4Lf698";

export const campuses = [
  {
    slug: "day-campus",
    name: "Day Campus",
    setting: "Plot 8–15 Nabuyonga Rise, Northern City Division, Mbale City.",
    image: campusImages.dayCampusDriveway,
    mapUrl: "https://maps.app.goo.gl/aBA1SektMqr14yBn6",
    description:
      "Mbale Progressive Secondary School’s Day Campus is located on Plot 8–15 Nabuyonga Rise, Northern City Division, Mbale City.",
    features: ["Day Campus", "Plot 8–15 Nabuyonga Rise", "Northern City Division, Mbale City"],
  },
  {
    slug: "mbale-progressive-annex",
    name: "Mbale Progressive Annex",
    setting: "Nyanza Road, Industrial City Division, Mbale City.",
    image: campusImages.annexFrontage,
    mapUrl: boardingCampusMapUrl,
    description:
      "Mbale Progressive Annex, the school’s boarding campus, is located on Nyanza Road in Industrial City Division, Mbale City.",
    features: ["Boarding campus", "Nyanza Road", "Industrial City Division, Mbale City"],
  },
];

const schoolName = "Mbale Progressive Secondary School";
const publicOrigin = (
  (import.meta.env["VITE_PUBLIC_SITE_URL"] as string | undefined) ??
  "https://mbaleprogressive.sc.ug"
).replace(/\/$/, "");
const shareImagePath = "/og-school-campus.webp";
const knownPaths: Record<string, string> = {
  Home: "/",
  "About Mbale Progressive": "/about",
  Alumni: "/alumni",
  Academics: "/academics",
  "e-Library": "/e-library",
  Admissions: "/admissions",
  "Admissions application": "/admissions/apply",
  "Campus life": "/campus-life",
  "Our campuses": "/campuses",
  Contact: "/contact",
  "Teaching Staff": "/faculty",
  "Day Campus Teaching Staff": "/faculty/day",
  "Boarding Campus Teaching Staff": "/faculty/boarding",
  Faculty: "/faculty",
  "Fees and clearance": "/finance",
  "Governance and leadership": "/governance",
  "News and updates": "/news",
  Scholarships: "/scholarships",
  "Co-Curricular": "/sports",
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
  const pageTitle = `${title} | ${schoolName}`;
  const keywords = [
    "Mbale secondary school",
    "Mbale Progressive Secondary School",
    "UCE",
    "UACE",
    "O-Level",
    "A-Level",
    "day and boarding school",
    "Uganda",
  ];
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
  const pageSchema: StructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description,
    ...(pageUrl ? { url: pageUrl } : {}),
    isPartOf: {
      "@type": "WebSite",
      name: schoolName,
      ...(publicOrigin ? { url: publicOrigin } : {}),
    },
    about: { "@type": "EducationalOrganization", name: schoolName },
    ...(publicOrigin ? { primaryImageOfPage: `${publicOrigin}${shareImagePath}` } : {}),
  };
  const breadcrumbSchema: StructuredData | undefined =
    pageUrl && resolvedPath && resolvedPath !== "/"
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: schoolName,
              item: publicOrigin,
            },
            { "@type": "ListItem", position: 2, name: title, item: pageUrl },
          ],
        }
      : undefined;

  return {
    meta: [
      { title: pageTitle },
      { name: "description", content: description },
      { name: "keywords", content: keywords.join(", ") },
      {
        name: "robots",
        content: indexable && !privateTitles.has(title) ? "index,follow" : "noindex,nofollow",
      },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: schoolName },
      ...(pageUrl ? [{ property: "og:url", content: pageUrl }] : []),
      ...(publicOrigin
        ? [{ property: "og:image", content: `${publicOrigin}${shareImagePath}` }]
        : []),
      ...(publicOrigin ? [{ property: "og:image:alt", content: `${schoolName} campus` }] : []),
      { property: "og:locale", content: "en_UG" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: pageTitle },
      { name: "twitter:description", content: description },
      ...(publicOrigin
        ? [{ name: "twitter:image", content: `${publicOrigin}${shareImagePath}` }]
        : []),
      ...(publicOrigin ? [{ name: "twitter:image:alt", content: `${schoolName} campus` }] : []),
      { "script:ld+json": schoolSchema },
      { "script:ld+json": pageSchema },
      ...(breadcrumbSchema ? [{ "script:ld+json": breadcrumbSchema }] : []),
      ...extraStructuredData.map((data) => ({ "script:ld+json": data })),
    ],
    ...(pageUrl ? { links: [{ rel: "canonical", href: pageUrl }] } : {}),
  };
}
