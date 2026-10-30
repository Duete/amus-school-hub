import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/school-layout";
import { Button } from "@/components/ui/button";
import { campuses, schoolHead } from "@/lib/school";

export const Route = createFileRoute("/campuses/")({
  head: () => schoolHead("Our campuses", "Day and boarding secondary education in Mbale City."),
  component: Campuses,
});
function Campuses() {
  return (
    <>
      <PageIntro eyebrow="OUR CAMPUSES" title="Progressive campuses in Mbale City.">
        Progressive provides day and boarding secondary education in Mbale City. Explore the campus
        options.
      </PageIntro>
      <div className="site-width grid gap-10 py-16 md:grid-cols-2">
        {campuses.map((campus) => (
          <article key={campus.slug}>
            <div className="relative">
              <img
                src={campus.image}
                width={1024}
                height={768}
                loading="lazy"
                alt="Illustrative campus scene"
                className="aspect-[4/3] w-full rounded-md object-cover"
              />
              <span className="absolute left-4 top-4 rounded-sm bg-primary/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                Illustrative image
              </span>
            </div>
            <h2 className="mt-6 text-3xl">{campus.name}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{campus.description}</p>
            <Button asChild variant="link" className="mt-4 px-0">
              <Link to="/campuses/$campus" params={{ campus: campus.slug }}>
                View {campus.name} <ArrowRight />
              </Link>
            </Button>
          </article>
        ))}
      </div>
    </>
  );
}
