import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/school-layout";
import { campusPhotoGroups } from "@/lib/campus-photos";
import { schoolHead } from "@/lib/school";

export const Route = createFileRoute("/gallery")({
  head: () =>
    schoolHead(
      "Campus photo gallery",
      "Browse photographs of the Day Campus and Boarding Campus at Mbale Progressive Secondary School.",
      "/gallery",
    ),
  component: Gallery,
});

const gallerySections = [
  {
    id: "day-campus-gallery",
    eyebrow: "DAY CAMPUS",
    title: "Day Campus",
    campus: "day-campus",
    photos: campusPhotoGroups.dayCampus,
  },
  {
    id: "boarding-campus-gallery",
    eyebrow: "BOARDING CAMPUS · MBALE PROGRESSIVE ANNEX",
    title: "Mbale Progressive Annex",
    campus: "mbale-progressive-annex",
    photos: campusPhotoGroups.annex,
  },
] as const;

function Gallery() {
  return (
    <>
      <PageIntro eyebrow="SCHOOL GALLERY" title="Our campuses in pictures.">
        Explore photographs of the buildings, facilities, and learning spaces across Mbale
        Progressive Secondary School’s Day Campus and Boarding Campus.
      </PageIntro>
      <div className="site-width space-y-16 py-12 md:py-16">
        {gallerySections.map((section) => (
          <section key={section.id} aria-labelledby={section.id}>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow text-primary">{section.eyebrow}</p>
                <h2 id={section.id} className="mt-2 text-3xl md:text-4xl">
                  {section.title}
                </h2>
              </div>
              <Button asChild variant="outline">
                <Link to="/campuses/$campus" params={{ campus: section.campus }}>
                  View campus details <ArrowRight />
                </Link>
              </Button>
            </div>
            <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {section.photos.map(({ src, caption, alt }) => (
                <figure key={caption} className="border border-border bg-background">
                  <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full bg-muted object-contain"
                  />
                  <figcaption className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
                    {caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
