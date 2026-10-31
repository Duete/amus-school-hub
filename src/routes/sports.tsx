import { createFileRoute } from "@tanstack/react-router";
import { Droplets, ExternalLink, MessageCircle, Trophy } from "lucide-react";
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
            <p className="eyebrow text-primary">TABLE TENNIS</p>
            <h2 id="table-tennis-heading" className="mt-2 text-2xl md:text-3xl">
              A school with a real table-tennis record
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
              Mbale Progressive’s table-tennis story reaches beyond school fixtures. Kawowo Sports
              reported that the school won the women’s team event at the 2016 Kenya Thika Open
              International Table Tennis event in Nairobi. Halima Nambozo retained the women’s
              singles title and helped the Progressive team beat Mbale Tigers 3–2 in the team final.
              The event brought together clubs and players from Kenya, Rwanda, Burundi, Tanzania,
              and Uganda.
            </p>
            <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
              The archive also includes an NTV Uganda report on a 25-school table-tennis event in
              which Mbale Progressive landed boys’ gold. These results give the club a place in the
              school’s wider sports identity: disciplined practice, competition experience, and
              opportunities that can open doors for talented learners.
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
