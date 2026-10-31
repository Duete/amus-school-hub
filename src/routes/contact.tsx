import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/school-layout";
import { Button } from "@/components/ui/button";
import { campuses, schoolHead } from "@/lib/school";

export const Route = createFileRoute("/contact")({
  head: () =>
    schoolHead(
      "Contact Mbale Progressive",
      "Find Mbale Progressive Secondary School’s Day Campus and boarding campus in Mbale City, then send an enquiry for current admission guidance.",
    ),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageIntro eyebrow="CONTACT US" title="Find our campuses.">
        Both school settings are in Mbale City. Use the campus details below, then send an enquiry
        if you need current fees, entry requirements, or visiting guidance.
      </PageIntro>
      <section className="site-width py-16">
        <div className="grid gap-10 md:grid-cols-2">
          {campuses.map((campus) => (
            <div key={campus.slug}>
              <MapPin className="text-primary" />
              <h2 className="mt-4 text-2xl">{campus.name}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{campus.setting}</p>
              <Button asChild variant="link" className="mt-4 px-0">
                <Link to="/campuses/$campus" params={{ campus: campus.slug }}>
                  View campus details <ArrowRight />
                </Link>
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-border pt-8">
          <h2 className="text-2xl">Official enquiry channels</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
            For a response from the admissions team, use the online enquiry form. Include the
            learner’s intended level, preferred campus, and any question about fees or boarding.
          </p>
          <Button asChild className="mt-6">
            <Link to="/admissions/apply">
              Submit admission enquiry <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
