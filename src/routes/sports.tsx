import { createFileRoute } from "@tanstack/react-router";
import { Droplets, MessageCircle, Trophy } from "lucide-react";
import { PageIntro } from "@/components/school-layout";
import { schoolHead } from "@/lib/school";

export const Route = createFileRoute("/sports")({
  head: () =>
    schoolHead(
      "Sports & debate",
      "Football and debate at Mbale Progressive Secondary School, including football milestones in 2024 and 2026.",
    ),
  component: Sports,
});

function Sports() {
  return (
    <>
      <PageIntro eyebrow="SPORTS & DEBATE" title="Football, debate and community support.">
        Mbale Progressive Secondary School has a football and debate programme. The school’s
        football record includes milestones in 2024 and 2026.
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
              In 2024, Mbale Progressive Secondary School was among six schools representing Bugisu
              Region at the National Games. In 2026, its team advanced to the Round of 32 and
              reached the Round of 16 at the National Boys’ Football Championship.
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
              Debate is among the school’s activities alongside football.
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
            The foundation provided a scholarship to a student who had faced financial hardship.
          </p>
        </div>
      </section>
    </>
  );
}
