import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileText } from "lucide-react";
import { PageIntro } from "@/components/school-layout";
import { Button } from "@/components/ui/button";
import { schoolHead } from "@/lib/school";

export const Route = createFileRoute("/admissions")({
  head: () =>
    schoolHead(
      "Admissions",
      "Learn about O-Level and A-Level study at Mbale Progressive Secondary School and request current entry guidance and fees.",
    ),
  component: Admissions,
});

function Admissions() {
  return (
    <>
      <PageIntro eyebrow="ADMISSIONS" title="Admissions at Mbale Progressive.">
        Mbale Progressive Secondary School is a mixed day and boarding secondary school in Mbale
        City, established in 1993. We offer O-Level (UCE) and A-Level (UACE) education.
      </PageIntro>
      <section className="site-width py-16">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            {
              title: "Choose your setting",
              text: "Day students attend the Day Campus on Nyanza Road near Namatala. Boarding students are based at Mbale Progressive Annex.",
            },
            {
              title: "Explore the study levels",
              text: "The school offers O-Level leading to UCE and A-Level leading to UACE.",
            },
            {
              title: "Request current guidance",
              text: "Ask the school for up-to-date entry guidance and fees before planning an application.",
            },
          ].map((step, i) => (
            <div key={step.title}>
              <p className="font-display text-4xl text-secondary">0{i + 1}</p>
              <h2 className="mt-5 text-xl">{step.title}</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 border-t border-border pt-8">
          <h2 className="text-2xl">Planning to join Mbale Progressive?</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
            Exact entry requirements and current fee amounts are not listed here. Please request the
            latest guidance directly from the school; admissions contact channels are awaiting
            confirmation.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/admissions/apply">
                Start an application <FileText />
              </Link>
            </Button>
            <Button asChild>
              <Link to="/contact">
                Admissions information <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/campuses">Explore our campuses</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
