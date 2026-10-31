import { createFileRoute } from "@tanstack/react-router";
import { Droplets, MessageCircle, Trophy } from "lucide-react";
import { PageIntro } from "@/components/school-layout";
import { schoolHead } from "@/lib/school";

export const Route = createFileRoute("/sports")({
  head: () =>
    schoolHead(
      "Sports & debate",
      "Football and debate at Mbale Progressive Secondary School, including the school’s 2026 national championship result.",
    ),
  component: Sports,
});

function Sports() {
  return (
    <>
      <PageIntro eyebrow="SPORTS & DEBATE" title="Results on the field and at the lectern.">
        Mbale Progressive Secondary School has consistently represented the Bugisu Region in
        secondary school football. The latest campaign reached the Round of 16 nationally.
      </PageIntro>

      <section className="site-width py-16 md:py-20" aria-labelledby="football-heading">
        <div className="flex items-start gap-4">
          <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Trophy size={24} strokeWidth={1.6} />
          </span>
          <div>
            <p className="eyebrow text-primary">FOOTBALL</p>
            <h2 id="football-heading" className="mt-2 text-3xl md:text-4xl">
              National football milestones
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
              Mbale Progressive has consistently represented the Bugisu Region. In the latest
              edition of the National Boys’ Football Championship, held in Lira from 10 to 20 May
              2026, the team reached the Round of 16 among leading secondary school teams from
              across Uganda and finished 14th nationally.
            </p>
          </div>
        </div>
      </section>

      <section
        className="border-y border-border bg-muted py-14 md:py-16"
        aria-labelledby="debate-heading"
      >
        <div className="site-width grid gap-5 md:grid-cols-[auto_1fr] md:gap-7">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-background text-primary">
            <MessageCircle size={23} strokeWidth={1.6} />
          </span>
          <div>
            <p className="eyebrow text-primary">DEBATE</p>
            <h2 id="debate-heading" className="mt-2 text-2xl md:text-3xl">
              Debate at Progressive
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
              In 2025/2026, the Debate Society reached the national knockout rounds at the NIRA
              National Schools Debate Championship, finished First Runners-Up at the fourth 93.1
              IUIU FM Inter-School Debate Championship, and won through district-level UNSA debate.
            </p>
          </div>
        </div>
      </section>

      <section className="site-width py-14 md:py-16" aria-labelledby="community-heading">
        <div className="grid gap-5 md:grid-cols-[auto_1fr] md:gap-7">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Droplets size={24} strokeWidth={1.6} />
          </span>
          <div>
            <p className="eyebrow text-primary">SCHOOL COMMUNITY</p>
            <h2 id="community-heading" className="mt-2 text-2xl md:text-3xl">
              Clean-water initiative
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
              Prudential Uganda and Tusafishe selected both Mbale Progressive Secondary School and
              Mbale Progressive Annex as beneficiaries of a clean-water initiative.
            </p>
          </div>
        </div>
      </section>

      <section
        className="border-t border-border bg-muted py-14 md:py-16"
        aria-labelledby="support-heading"
      >
        <div className="site-width">
          <p className="eyebrow text-primary">STUDENT SUPPORT</p>
          <h2 id="support-heading" className="mt-2 text-2xl md:text-3xl">
            Galiwango Foundation scholarship
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
            The Galiwango Foundation sponsors more than 50 students across both campuses and all
            levels. Merit awards also support strong PLE entrants, class leaders, and top UCE
            performers moving into A-Level.
          </p>
        </div>
      </section>
    </>
  );
}
