import { createFileRoute } from "@tanstack/react-router";
import { Droplets, ExternalLink, MessageCircle, Trophy } from "lucide-react";
import { PageIntro } from "@/components/school-layout";
import { schoolHead } from "@/lib/school";

export const Route = createFileRoute("/sports")({
  head: () =>
    schoolHead(
      "Sports & debate",
      "Football, debate, and table tennis at Mbale Progressive Secondary School, including the school’s 2026 national championship result and table-tennis history.",
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
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              <a
                href="https://www.youtube.com/watch?v=T-jv1_wk9Js"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-primary underline underline-offset-4"
              >
                Watch the IUIU FM championship report <ExternalLink size={14} />
              </a>
              <a
                href="https://inspired.calicotab.com/niraschools/results/round/5/?view=debate"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-primary underline underline-offset-4"
              >
                View NIRA 2025 results <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <article className="site-width py-14 md:py-16" aria-labelledby="table-tennis-heading">
        <div className="grid gap-6 md:grid-cols-[auto_1fr] md:gap-7">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Trophy size={24} strokeWidth={1.6} />
          </span>
          <div>
            <p className="eyebrow text-primary">TABLE TENNIS · NEWS FEATURE</p>
            <h2 id="table-tennis-heading" className="mt-2 text-2xl md:text-3xl">
              From Grassroots to Giants: The Unstoppable Rise of Mbale Progressive Table Tennis
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
              Mbale Progressive Secondary School has cemented its status as a premier powerhouse of
              Ugandan table tennis. Over the last decade, our athletes have transformed from local
              underdogs into national champions, dominating the biggest school stages.
            </p>
            <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
              <strong className="text-foreground">
                The Genesis: Laying Foundations (2013–2015).
              </strong>{" "}
              The roots of the school’s modern dominance took shape around 2013. Partnering with
              local developmental initiatives like the Mbale Tigers Table Tennis Club, the school
              began investing in raw talent. These structures provided the foundational training
              that turned high-potential students into structured, disciplined competitors. By 2015,
              the school was regularly sending teams to national stages, laying the groundwork for a
              major breakthrough.
            </p>
            <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
              <strong className="text-foreground">
                Breaking Boundaries & International Glory (2016).
              </strong>{" "}
              May 2016 became the golden breakthrough. At the Kenya Thika Open International Table
              Tennis tournament in Nairobi, Mbale Progressive players swept top honours. Two months
              later, the boys carried that confidence to the Kateregga Memorial Schools Championship
              at MTN Arena-Lugogo, where Captain Brian Bineni led the team through a decisive run.
            </p>
            <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 leading-7 text-muted-foreground">
              <li>
                In the semi-finals, they avenged a past defeat by beating Kakungulu Memorial 3–1.
              </li>
              <li>
                In the grand finale, they dethroned defending champions Mbogo College to win the
                overall Boys’ Team Trophy.
              </li>
            </ul>
            <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
              <strong className="text-foreground">
                Sustaining Excellence & Local Dominance (2017–Present).
              </strong>{" "}
              Following the historic 2016 season, Mbale Progressive became a household name. The
              school established strong talent pathways, using sports scholarships to help elite
              prospects balance rigorous training with top-tier academics. At national events such
              as the Fresh Dairy Secondary School Games and regional opens, Progressive players have
              continued to command the podium and feature prominently in the Mbale Schools Table
              Tennis Championship.
            </p>
            <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
              From a hungry team of contenders in 2013 to regional heavyweights today, the journey
              proves that dedication breeds true champions. Table-tennis training runs every evening
              after classes in the indoor sports hall. Pick up a racket and join the legacy.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              <a
                href="https://kawowo.com/2016/05/04/uganda-table-tennis-players-impress-at-thika-tourney/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-primary underline underline-offset-4"
              >
                Read the Kawowo report <ExternalLink size={14} />
              </a>
              <a
                href="https://www.youtube.com/watch?v=QcQCGP1nBEU"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-primary underline underline-offset-4"
              >
                Watch the NTV Uganda archive <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </article>

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
