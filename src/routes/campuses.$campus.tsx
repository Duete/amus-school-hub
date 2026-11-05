import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { campuses, schoolHead } from "@/lib/school";
import dayGrounds from "@/assets/day-campus-grounds.png.asset.json";
import dayClassrooms from "@/assets/day-campus-classroom-block.jpg.asset.json";
import dayArtDesign from "@/assets/day-campus-art-design.jpg.asset.json";
import dayBuilding from "@/assets/day-campus-two-storey-building.jpg.asset.json";
import dayAdministration from "@/assets/day-campus-administration.jpg.asset.json";
import dayScienceLab from "@/assets/day-campus-science-lab.jpg.asset.json";

const dayCampusPhotos = [
  { image: dayGrounds, caption: "Day Campus grounds" },
  { image: dayClassrooms, caption: "Classroom block and green spaces" },
  { image: dayArtDesign, caption: "S.6 Arts & Head Teacher's Block" },
  { image: dayBuilding, caption: "A'Level Sciences Block" },
  { image: dayAdministration, caption: "Administration Block" },
  { image: dayScienceLab, caption: "Science laboratory" },
];

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
        (tag) => !("property" in tag && tag.property?.startsWith("og:image")) &&
          !("name" in tag && tag.name?.startsWith("twitter:image")),
      ),
    };
  },
  component: Campus,
});
function Campus() {
  const campus = Route.useLoaderData();
  const isDayCampus = campus.slug === "day-campus";
  return (
    <>
      <section className="school-hero">
        <img
          src={isDayCampus ? dayGrounds.url : campus.image}
          width={1024}
          height={768}
          className="hero-image"
          alt={`${campus.name} campus setting`}
        />
        <div className="hero-overlay" />
        <div className="site-width relative text-hero-foreground">
          <p className="eyebrow">PROGRESSIVE</p>
          <h1 className="mt-5 text-4xl md:text-6xl">{campus.name}</h1>
          <p className="mt-5 font-display text-xl">{campus.setting}</p>
          <Button asChild variant="hero" size="lg" className="mt-8">
            <Link to="/admissions">
              Ask about admission <ArrowRight />
            </Link>
          </Button>
          {!isDayCampus && (
            <p className="mt-3 text-xs text-hero-muted">Representative campus image.</p>
          )}
        </div>
      </section>
      <section className="site-width grid gap-10 py-16 md:grid-cols-2">
        <div>
          <p className="eyebrow text-primary">SECONDARY EDUCATION IN MBALE CITY</p>
          <h2 className="mt-4 text-3xl">{campus.name}</h2>
          <p className="mt-5 leading-7 text-muted-foreground">{campus.description}</p>
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
      {isDayCampus && (
        <section className="site-width pb-16" aria-labelledby="day-campus-gallery">
          <p className="eyebrow text-primary">DAY CAMPUS</p>
          <h2 id="day-campus-gallery" className="mt-4 text-3xl">Around the campus</h2>
          <div className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {dayCampusPhotos.map(({ image, caption }) => (
              <figure key={image.asset_id}>
                <img
                  src={image.url}
                  alt={`${caption} at Mbale Progressive’s Day Campus`}
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
