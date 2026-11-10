import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ImageOff } from "lucide-react";
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
        Progressive provides day and boarding secondary education in Mbale City. Compare the two
        settings before you enquire about a place.
      </PageIntro>
      <div className="site-width grid gap-10 py-16 md:grid-cols-2">
        {campuses.map((campus) => (
          <article key={campus.slug}>
            <div className="relative">
              {campus.image ? (
                <img
                  decoding="async"
                  src={campus.image}
                  width={1024}
                  height={768}
                  loading="lazy"
                  alt={`${campus.name} grounds and buildings`}
                  className="aspect-[4/3] w-full rounded-md object-cover"
                />
              ) : (
                <div
                  className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 rounded-md bg-muted p-6 text-center text-muted-foreground"
                  role="img"
                  aria-label={`${campus.name} photo not available`}
                >
                  <ImageOff aria-hidden="true" size={26} strokeWidth={1.6} />
                  <span className="text-sm">No photo of this campus is available.</span>
                </div>
              )}
            </div>
            <h2 className="mt-6 text-3xl">{campus.name}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{campus.description}</p>
            <Button asChild variant="link" className="mt-4 px-0">
              <Link to="/campuses/$campus" params={{ campus: campus.slug }}>
                View campus details <ArrowRight />
              </Link>
            </Button>
          </article>
        ))}
      </div>
    </>
  );
}
