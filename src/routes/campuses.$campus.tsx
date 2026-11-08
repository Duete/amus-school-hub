import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { campuses, schoolHead } from "@/lib/school";
import { campusPhotoGroups } from "@/lib/campus-photos";

export const Route = createFileRoute("/campuses/$campus")({
  loader: ({ params }) => {
    const campus = campuses.find((c) => c.slug === params.campus);
    if (!campus) throw notFound();
    return campus;
  },
  head: ({ loaderData }) => {
    const head = schoolHead(
      loaderData?.name ?? "Campus unavailable",
      loaderData?.description ?? "Day and boarding secondary education in Mbale City.",
    );
    return {
      ...head,
      meta: head.meta.filter(
        (tag) =>
          !("property" in tag && tag.property?.startsWith("og:image")) &&
          !("name" in tag && tag.name?.startsWith("twitter:image")),
      ),
    };
  },
  component: Campus,
});
function Campus() {
  const campus = Route.useLoaderData();
  const isDayCampus = campus.slug === "day-campus";
  const photos = isDayCampus ? campusPhotoGroups.dayCampus : campusPhotoGroups.annex;
  return (
    <>
      <section className="school-hero">
        {campus.image && (
          <>
            <img
              src={campus.image}
              width={1024}
              height={768}
              className="hero-image"
              alt={`${campus.name} grounds and buildings`}
            />
            <div className="hero-overlay" />
          </>
        )}
        <div className="site-width relative text-hero-foreground">
          <p className="eyebrow">PROGRESSIVE</p>
          <h1 className="mt-5 text-4xl md:text-6xl">{campus.name}</h1>
          <p className="mt-5 font-display text-xl">{campus.setting}</p>
          <Button asChild variant="hero" size="lg" className="mt-8">
            <Link to="/admissions">
              Ask about admission <ArrowRight />
            </Link>
          </Button>
          {!isDayCampus && !campus.image && (
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-hero-muted">
              <ImageOff aria-hidden="true" size={17} strokeWidth={1.6} />
              Annex building photo is not available in this gallery.
            </p>
          )}
        </div>
      </section>
      <section className="site-width grid gap-10 py-16 md:grid-cols-2">
        <div>
          <p className="eyebrow text-primary">SECONDARY EDUCATION IN MBALE CITY</p>
          <h2 className="mt-4 text-3xl">{campus.name}</h2>
          <p className="mt-5 leading-7 text-muted-foreground">{campus.description}</p>
          {campus.mapUrl && (
            <div className="mt-6 space-y-2 text-sm">
              <p className="text-muted-foreground">
                {isDayCampus
                  ? "GPS: 1.078571, 34.174396"
                  : "Use Google Maps for boarding-campus directions."}
              </p>
              <a
                href={campus.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-primary underline underline-offset-4"
              >
                Open in Google Maps <ArrowRight size={16} />
              </a>
            </div>
          )}
        </div>
        <ul className="space-y-5">
          {campus.features.map((feature) => (
            <li key={feature} className="flex items-center gap-4 border-b border-border pb-5">
              <Check className="text-primary" size={20} />
              {feature}
            </li>
          ))}
        </ul>
      </section>
      {photos.length > 0 && (
        <section className="site-width pb-16" aria-labelledby="campus-gallery">
          <p className="eyebrow text-primary">
            {isDayCampus ? "DAY CAMPUS" : "BOARDING CAMPUS · ANNEX"}
          </p>
          <h2 id="campus-gallery" className="mt-4 text-3xl">
            {isDayCampus ? "Day Campus buildings and facilities" : "Annex buildings and grounds"}
          </h2>
          <div className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map(({ src, caption, alt }) => (
              <figure key={caption}>
                <img
                  src={src}
                  alt={alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-lg object-contain bg-muted"
                />
                <figcaption className="mt-3 text-sm text-muted-foreground">{caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
      <div className="site-width pb-16">
        <Button asChild variant="outline">
          <Link to="/campuses">Compare both campuses</Link>
        </Button>
      </div>
    </>
  );
}
