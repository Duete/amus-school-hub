import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, MessageCircle, Music2, Trophy, Users } from "lucide-react";
import cityCampus from "@/assets/city-campus.webp";
import footballJuniorDuel from "@/assets/football-junior-duel.webp.asset.json";
import footballMatchAction from "@/assets/football-match-action.webp.asset.json";
import footballSquadCelebration from "@/assets/football-squad-celebration.webp.asset.json";
import footballSquadCelebrationWide from "@/assets/football-squad-celebration-wide.webp.asset.json";
import footballTeamLineup from "@/assets/football-team-lineup.webp.asset.json";
import hillsideCampus from "@/assets/hillside-campus.webp";
import schoolLife from "@/assets/school-life.webp";
import { PageIntro } from "@/components/school-layout";
import { schoolHead } from "@/lib/school";

export const Route = createFileRoute("/sports")({
  head: () =>
    schoolHead(
      "Co-Curricular",
      "Sports, clubs, faith associations, music, debate, table tennis, and student activities at Mbale Progressive Secondary School.",
    ),
  component: Sports,
});

const sportsActivities = [
  {
    label: "Sport & athletics",
    title: "Football",
    text: "Boys’ and girls’ teams represent Bugisu Region in district, zonal, and national competition.",
    href: "#football-history",
  },
  {
    label: "Sport & athletics",
    title: "Table tennis",
    text: "A long-running talent pathway from Mbale Tigers links to the 2016 Thika Open and Kateregga Memorial title.",
    href: "#table-tennis-history",
  },
  {
    label: "Mind & voice",
    title: "Debate Society",
    text: "Research, rebuttal, and public speaking — with national knockout and First Runners-Up results in 2025/2026.",
    href: "#debate-story",
  },
];

const clubs = [
  {
    title: "Red Cross Club",
    text: "Students learn first aid, preparedness, service, and practical ways to support the school community.",
    meta: "Service and wellbeing",
  },
  {
    title: "Writers’ Club",
    text: "A home for poetry, essays, school journalism, creative writing, and confident expression.",
    meta: "Writing and communication",
  },
  {
    title: "Science Club",
    text: "Learners test ideas through experiments, projects, and conversations about science in daily life.",
    meta: "Experiments and projects",
  },
  {
    title: "Interact Club",
    text: "Students practise leadership through service activities, outreach, and practical responsibility.",
    meta: "Leadership and service",
  },
  {
    title: "Muslim Students Association",
    text: "A faith community for prayer, reflection, fellowship, and service within school life.",
    meta: "Faith and fellowship",
  },
  {
    title: "Young Catholics Association",
    text: "Students grow through prayer, fellowship, reflection, and participation in school events.",
    meta: "Faith and fellowship",
  },
  {
    title: "Scripture Union",
    text: "A student-led space for Bible study, prayer, encouragement, and practical Christian living.",
    meta: "Faith and fellowship",
  },
  {
    title: "Houses",
    text: "Galiwango, Mukongoni, Nantume, and Kaggwa bring learners together for healthy competition and belonging.",
    meta: "Galiwango · Mukongoni · Nantume · Kaggwa",
  },
];

const footballPhotos = [
  {
    image: footballTeamLineup,
    title: "Starting eleven",
    text: "The match-day lineup before kick-off.",
    alt: "Football starting eleven lined up on the pitch before kick-off",
  },
  {
    image: footballMatchAction,
    title: "In the contest",
    text: "Blue and white kits battle for the ball.",
    alt: "Two football players, one in blue and one in white, contesting the ball",
  },
  {
    image: footballSquadCelebration,
    title: "After the whistle",
    text: "The squad walks off with a tribute held aloft.",
    alt: "Football squad walking off the pitch with arms raised and tribute cards held overhead",
  },
  {
    image: footballSquadCelebrationWide,
    title: "Walking off together",
    text: "The same celebration from a wider angle.",
    alt: "Wider view of the football squad celebrating on the pitch",
  },
  {
    image: footballJuniorDuel,
    title: "One on one",
    text: "A junior fixture duel for possession.",
    alt: "Two junior football players duelling for the ball",
  },
];

const gallery = [
  {
    image: schoolLife,
    title: "School life",
    text: "Learning, friendship, and activity beyond the classroom.",
  },
  {
    image: cityCampus,
    title: "Day Campus",
    text: "A place for sport, clubs, leadership, and shared routines.",
  },
  {
    image: hillsideCampus,
    title: "Boarding community",
    text: "The Annex supports structured boarding life and student growth.",
  },
];

function ActivityCard({
  label,
  title,
  text,
  href,
}: {
  label: string;
  title: string;
  text: string;
  href: string;
}) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", href);
  };

  return (
    <article className="border border-border bg-background p-5">
      <p className="eyebrow text-primary">{label}</p>
      <h3 className="mt-3 text-2xl">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
      <a
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4"
        href={href}
        onClick={handleClick}
      >
        Read the story <ExternalLink size={14} />
      </a>
    </article>
  );
}

function Sports() {
  return (
    <>
      <PageIntro eyebrow="CO-CURRICULAR" title="A fuller school life, beyond the timetable.">
        Sport, music, debate, faith, service, and clubs give Progressive learners places to practise
        discipline, confidence, teamwork, and responsibility.
      </PageIntro>

      <section className="site-width py-14 md:py-20" aria-labelledby="sports-athletics-heading">
        <div className="flex items-end justify-between gap-6 border-b border-border pb-6">
          <div>
            <p className="eyebrow text-primary">SPORTS & ATHLETICS</p>
            <h2 id="sports-athletics-heading" className="mt-2 text-3xl md:text-4xl">
              Train with purpose. Compete with pride.
            </h2>
          </div>
          <Trophy className="hidden text-primary md:block" size={36} strokeWidth={1.4} />
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {sportsActivities.map((activity) => (
            <ActivityCard key={activity.title} {...activity} />
          ))}
        </div>
      </section>

      <section
        className="scroll-mt-28 border-y border-border bg-muted py-14 md:py-20"
        id="football-history"
        aria-labelledby="football-heading"
      >
        <div className="site-width grid gap-8 lg:grid-cols-[0.42fr_1fr]">
          <div>
            <p className="eyebrow text-primary">FOOTBALL · HISTORY</p>
            <h2 id="football-heading" className="mt-3 text-3xl md:text-4xl">
              Pitch Perfect
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              The golden legacy of Mbale Progressive football, from Bugisu pitches to the national
              stage.
            </p>
          </div>
          <div className="space-y-4 leading-7 text-muted-foreground">
            <p>
              Sports bursaries built the early talent pathway. In 2016, Progressive won both Mbale
              District Copa Qualifiers: the boys beat Nkoma SS 4–3 on penalties and the girls beat
              Mbale Comprehensive 2–0.
            </p>
            <p>
              The teams became regulars in USSSA qualifiers. The boys recorded a 3–2 win over
              Nyamitanga SS at the 2022 National Championship while the girls continued building a
              disciplined, technically gifted pipeline.
            </p>
            <p>
              In 2026, the boys drew 1–1 with Kisozi Seed, beat Ssaku SS 2–0, defeated Masindi SS
              5–4 on penalties in the Round of 32, and reached the Round of 16 in Lira. The campaign
              finished with a 4–2 shootout defeat to London College Nansana and a national ranking
              of 14th.
            </p>
          </div>
        </div>

        <div className="site-width mt-12">
          <p className="eyebrow text-primary">FOOTBALL · PHOTOGRAPHS</p>
          <h3 className="mt-2 text-2xl">Photographs from the pitch</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {footballPhotos.map((photo, index) => (
              <figure
                key={photo.title}
                className={index === 0 ? "sm:col-span-2 lg:col-span-2" : ""}
              >
                <img
                  className="h-56 w-full border border-border object-cover lg:h-64"
                  src={photo.image.url}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption className="pt-3">
                  <h4 className="text-lg">{photo.title}</h4>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{photo.text}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section
        className="site-width scroll-mt-28 py-14 md:py-20"
        id="debate-story"
        aria-labelledby="debate-heading"
      >
        <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:gap-10">
          <MessageCircle className="text-primary" size={38} strokeWidth={1.4} />
          <div>
            <p className="eyebrow text-primary">MUSIC, VOICE & PERFORMANCE</p>
            <h2 id="debate-heading" className="mt-2 text-3xl md:text-4xl">
              Debate at Progressive
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
              In 2025/2026, the Debate Society reached the national knockout rounds at the NIRA
              National Schools Debate Championship, finished First Runners-Up at the fourth 93.1
              IUIU FM Inter-School Debate Championship, and performed strongly at the Mbale District
              UNSA Debate Championship.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              <a
                className="inline-flex items-center gap-2 text-primary underline underline-offset-4"
                href="https://www.youtube.com/watch?v=T-jv1_wk9Js"
                target="_blank"
                rel="noreferrer"
              >
                IUIU FM championship report <ExternalLink size={14} />
              </a>
              <a
                className="inline-flex items-center gap-2 text-primary underline underline-offset-4"
                href="https://inspired.calicotab.com/niraschools/results/round/5/?view=debate"
                target="_blank"
                rel="noreferrer"
              >
                NIRA 2025 results <ExternalLink size={14} />
              </a>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                [
                  "Music",
                  "Choir, instrumental music, and school performances give students a disciplined creative outlet.",
                ],
                [
                  "Dance",
                  "Traditional dance keeps cultural expression visible in school and community events.",
                ],
                [
                  "Drama",
                  "Students write, direct, and perform stories that ask useful questions about society.",
                ],
              ].map(([title, text]) => (
                <article key={title} className="border-t-4 border-primary bg-muted p-5">
                  <div className="flex items-start gap-3">
                    <Music2
                      className="mt-0.5 shrink-0 text-primary"
                      size={20}
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                    <h3 className="text-xl">{title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="scroll-mt-28 border-y border-border bg-muted py-14 md:py-20"
        id="table-tennis-history"
        aria-labelledby="table-tennis-heading"
      >
        <div className="site-width grid gap-8 lg:grid-cols-[0.42fr_1fr]">
          <div>
            <p className="eyebrow text-primary">SPORT & ATHLETICS · TABLE TENNIS</p>
            <h2 id="table-tennis-heading" className="mt-3 text-3xl md:text-4xl">
              From grassroots to giants
            </h2>
          </div>
          <div className="space-y-4 leading-7 text-muted-foreground">
            <p>
              The modern programme took shape around 2013 through talent development linked to Mbale
              Tigers Table Tennis Club. By 2015, Progressive teams were appearing on national
              stages.
            </p>
            <p>
              In 2016, the school’s players swept top honours at the Kenya Thika Open International
              Table Tennis tournament. Two months later, Captain Brian Bineni led the boys to the
              Kateregga Memorial Schools Championship title after a 3–1 semi-final win over
              Kakungulu Memorial and a final victory over defending champions Mbogo College.
            </p>
            <p>
              Sports scholarships and talent pathways continue to support elite prospects. Training
              runs every evening after classes in the indoor sports hall.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              <a
                className="inline-flex items-center gap-2 text-primary underline underline-offset-4"
                href="https://kawowo.com/2016/05/04/uganda-table-tennis-players-impress-at-thika-tourney/"
                target="_blank"
                rel="noreferrer"
              >
                Kawowo report <ExternalLink size={14} />
              </a>
              <a
                className="inline-flex items-center gap-2 text-primary underline underline-offset-4"
                href="https://www.youtube.com/watch?v=QcQCGP1nBEU"
                target="_blank"
                rel="noreferrer"
              >
                NTV Uganda archive <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="site-width py-14 md:py-20" aria-labelledby="clubs-heading">
        <div className="flex items-end justify-between gap-6 border-b border-border pb-6">
          <div>
            <p className="eyebrow text-primary">CLUBS & SOCIETIES</p>
            <h2 id="clubs-heading" className="mt-2 text-3xl md:text-4xl">
              Find a place to contribute.
            </h2>
          </div>
          <Users className="hidden text-primary md:block" size={36} strokeWidth={1.4} />
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {clubs.map((club) => (
            <article key={club.title} className="border-t-4 border-primary bg-background p-5">
              <h3 className="text-xl">{club.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{club.text}</p>
              <p className="mt-5 border-t border-border pt-3 text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                {club.meta}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="border-y border-border bg-muted py-14 md:py-20"
        aria-labelledby="achievements-heading"
      >
        <div className="site-width">
          <p className="eyebrow text-primary">OUR ACHIEVEMENTS</p>
          <h2 id="achievements-heading" className="mt-2 text-3xl md:text-4xl">
            Excellence beyond the classroom
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              [
                "2026",
                "National football",
                "Round of 16 at the National Boys Football Championship in Lira; ranked 14th nationally.",
              ],
              [
                "2025/2026",
                "Debate",
                "National knockout rounds at NIRA, First Runners-Up at the 93.1 IUIU FM championship, and strong district UNSA performance.",
              ],
              [
                "2016 → today",
                "Table tennis",
                "International breakthrough at the Kenya Thika Open and the Kateregga Memorial Schools Championship title.",
              ],
            ].map(([year, title, text]) => (
              <article key={title} className="border-t border-primary pt-4">
                <p className="text-sm font-semibold text-primary">{year}</p>
                <h3 className="mt-2 text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-width py-14 md:py-20" aria-labelledby="gallery-heading">
        <div className="flex items-end justify-between gap-6 border-b border-border pb-6">
          <div>
            <p className="eyebrow text-primary">ACTIVITY GALLERY</p>
            <h2 id="gallery-heading" className="mt-2 text-3xl md:text-4xl">
              Moments that make the school
            </h2>
          </div>
          <p className="hidden max-w-sm text-sm leading-6 text-muted-foreground md:block">
            A visual sample of the places where Progressive learners study, play, serve, and grow.
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          {gallery.map((item, index) => (
            <figure key={item.title} className={index === 0 ? "md:row-span-2" : ""}>
              <img
                className="h-56 w-full object-cover md:h-64"
                src={item.image}
                alt={item.title}
                loading="lazy"
                decoding="async"
              />
              <figcaption className="border-b border-border py-4">
                <h3 className="text-xl">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section
        className="border-t border-border bg-muted py-14 md:py-16"
        aria-labelledby="support-heading"
      >
        <div className="site-width grid gap-8 md:grid-cols-[auto_1fr] md:gap-10">
          <Users className="text-primary" size={38} strokeWidth={1.4} />
          <div>
            <p className="eyebrow text-primary">STUDENT SUPPORT</p>
            <h2 id="support-heading" className="mt-2 text-2xl md:text-3xl">
              Galiwango Foundation scholarship
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
              The Galiwango Foundation sponsors more than 50 students across both campuses and all
              levels. Merit awards also support strong PLE entrants, class leaders, and top UCE
              performers moving into A-Level.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
