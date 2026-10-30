import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { campuses, schoolHead } from "@/lib/school";

export const Route = createFileRoute("/campuses/$campus")({
  loader: ({ params }) => {
    const campus = campuses.find((c) => c.slug === params.campus);
    if (!campus) throw notFound();
    return campus;
  },
  head: ({ loaderData }) =>
    schoolHead(
      loaderData?.name ?? "Campus unavailable",
      loaderData?.description ?? "Day and boarding secondary education in Mbale City.",
    ),
  component: Campus,
});
function Campus() {
  const campus = Route.useLoaderData();
  return (
    <>
      <section className="school-hero">
        <img
          src={campus.image}
          width={1024}
          height={768}
          className="hero-image"
          alt="Illustrative campus scene"
        />
        <div className="hero-overlay" />
        <div className="site-width relative text-hero-foreground">
          <p className="eyebrow">PROGRESSIVE</p>
          <h1 className="mt-5 text-4xl md:text-6xl">{campus.name}</h1>
          <p className="mt-5 font-display text-xl">{campus.setting}</p>
          <Button asChild variant="hero" size="lg" className="mt-8">
            <Link to="/admissions">
              Explore admissions <ArrowRight />
            </Link>
          </Button>
          <p className="mt-3 text-xs text-hero-muted">Illustrative campus image.</p>
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
      <div className="site-width pb-16">
        <Button asChild variant="outline">
          <Link to="/campuses">View both campuses</Link>
        </Button>
      </div>
    </>
  );
}
