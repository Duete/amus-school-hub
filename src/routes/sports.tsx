import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, MessageCircle, Music2, Trophy, Users } from "lucide-react";
import footballJuniorDuel from "@/assets/football-junior-duel.webp";
import footballMatchAction from "@/assets/football-match-action.webp";
import girlsWarmUp from "@/assets/girls-team-in-warm-up-before-the-match.webp";
import girlsResting from "@/assets/girls-team-resting-before-another-match.webp";
import districtLineUp from "@/assets/line-up-before-the-district-finals-2024.webp";
import teamWarmUp from "@/assets/team-warm-up.webp";
import teachersEleven from "@/assets/the-teacher-s-1st-eleven-before-a-game-with-prefects.webp";
import teachersCaptain from "@/assets/the-teachers-captain-and-the-assistant.webp";
import footballSquadCelebrationWide from "@/assets/football-squad-celebration-wide.webp";
import footballTeamLineup from "@/assets/football-team-lineup.webp";
import ttHalimaCommonwealth from "@/assets/tt-halima-commonwealth-2018.jpg";
import ttHurseyNambozo from "@/assets/tt-hursey-nambozo-2018.jpg";
import ttHalimaTrophy from "@/assets/tt-halima-trophy-2016.webp";
import reginaNakibuule from "@/assets/alumni-regina-nakibuule.jpg";
import redCrossCleaning from "@/assets/red-cross-cleaning-activity.webp";
import redCrossMembers from "@/assets/red-cross-members.webp";
import bugisuFinalsCelebration from "@/assets/bugisu-regionals-finals-2023-celebration.webp";
import bugisuRegionalChampions from "@/assets/bugisu-regionals-champions-2023.webp";
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
];

const houses = [
  {
    title: "Galiwango House",
    colour: "Yellow",
    text: "A bright house identity built around energy, teamwork, and friendly competition.",
    border: "border-yellow-400",
    swatch: "bg-yellow-400",
  },
  {
    title: "Nantume House",
    colour: "Coffee brown",
    text: "A grounded community where students build belonging through shared responsibility.",
    border: "border-amber-950",
    swatch: "bg-amber-950",
  },
  {
    title: "Kaggwa House",
    colour: "Blue",
    text: "A spirited house that brings focus, discipline, and pride to every contest.",
    border: "border-blue-600",
    swatch: "bg-blue-600",
  },
  {
    title: "Mukongoni House",
    colour: "Green",
    text: "A house shaped by growth, cooperation, and the confidence to contribute.",
    border: "border-green-600",
    swatch: "bg-green-600",
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
    image: footballSquadCelebrationWide,
    title: "Walking off together",
    text: "The squad celebrates together on the pitch.",
    alt: "Football squad celebrating on the pitch",
  },
  {
    image: footballJuniorDuel,
    title: "One on one",
    text: "Mbale Progressive junior in blue on the duel to win possession.",
    alt: "Mbale Progressive junior player in blue duelling an opponent for possession",
  },
];

const girlsFootballPhotos = [
  {
    image: girlsWarmUp,
    title: "Warm-up before the match",
    alt: "Mbale Progressive girls' football team warming up before a match",
  },
  {
    image: girlsResting,
    title: "Resting between matches",
    alt: "Mbale Progressive girls' football team resting before another match",
  },
];

const regionalChampionsPhotos = [
  {
    image: bugisuFinalsCelebration,
    title: "The final whistle",
    text: "Players celebrate on the pitch after the Bugisu Regionals Finals 2023.",
    alt: "Mbale Progressive football players celebrating on the pitch after the Bugisu Regionals Finals 2023",
  },
  {
    image: bugisuRegionalChampions,
    title: "Regional Champions 2023",
    text: "Progressive emerged as the Bugisu Regional Champions.",
    alt: "Mbale Progressive football team celebrating as Bugisu Regional Champions 2023",
  },
];

const redCrossPhotos = [
  {
    image: redCrossCleaning,
    title: "After the cleaning activity",
    text: "Red Cross members pose after a cleaning exercise, still in aprons and gloves.",
    alt: "Red Cross Club members posing for a photo after a cleaning activity",
  },
  {
    image: redCrossMembers,
    title: "Ready to serve",
    text: "Members in Uganda Red Cross Society aprons before the next task.",
    alt: "Red Cross Club members in Uganda Red Cross Society aprons standing together",
  },
];

const galleryGroups = [
  {
    title: "Match days",
    description: "Preparing for the big fixtures.",
    photos: [
      {
        image: districtLineUp,
        title: "Line-up before the District Finals 2024",
        alt: "Mbale Progressive team lined up before the District Finals 2024",
      },
      {
        image: teamWarmUp,
        title: "Team warm-up",
        alt: "Mbale Progressive football team warming up",
      },
    ],
  },
  {
    title: "Staff engaging in sports",
    description: "Teachers taking to the pitch alongside students.",
    photos: [
      {
        image: teachersEleven,
        title: "The teachers' first eleven with prefects",
        alt: "The teachers' first eleven posing with prefects before a game",
      },
      {
        image: teachersCaptain,
        title: "The teachers' captain and assistant",
        alt: "The teachers' football captain and assistant captain",
      },
    ],
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

function PhotoFigure({ image, title, alt }: { image: string; title: string; alt: string }) {
  return (
    <figure>
      <img
        className="h-64 w-full border border-border object-cover object-top"
        src={image}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
      <figcaption className="pt-3 text-sm font-medium">{title}</figcaption>
    </figure>
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
              In 2023, Progressive lifted the Bugisu Regionals Finals title to finish as Regional
              Champions.
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
                  className={
                    index === 0
                      ? "w-full border border-border"
                      : "h-64 w-full border border-border object-cover object-top"
                  }
                  src={photo.image}
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

        <div className="site-width mt-12">
          <p className="eyebrow text-primary">FOOTBALL · GIRLS</p>
          <h3 className="mt-2 text-2xl">Girls’ football</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {girlsFootballPhotos.map((photo) => (
              <PhotoFigure key={photo.title} {...photo} />
            ))}
          </div>
        </div>

        <div className="site-width mt-12">
          <p className="eyebrow text-primary">FOOTBALL · BUGISU REGIONALS FINALS 2023</p>
          <div className="mt-2 flex items-center gap-2">
            <Trophy className="text-primary" size={21} strokeWidth={1.6} aria-hidden="true" />
            <h3 className="text-2xl">Regional Champions</h3>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Celebrations after the final whistle during the Bugisu Regionals Finals 2023, when
            Progressive emerged as the Regional Champions.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {regionalChampionsPhotos.map((photo) => (
              <figure key={photo.title}>
                <img
                  className="w-full border border-border"
                  src={photo.image}
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
        <div className="site-width mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              src: ttHalimaCommonwealth,
              alt: "Halima Nambozo playing at the 2018 Commonwealth Games",
              caption:
                "Ugandan player Halima Nambozo (Mbale Progressive) competing with Wales' Anna Hursey at the 2018 Commonwealth Games, Gold Coast, Queensland, Australia.",
            },
            {
              src: ttHurseyNambozo,
              alt: "Anna Hursey and Halima Nambozo at the 2018 Commonwealth Games",
              caption:
                "Wales' Anna Hursey and Halima Nambozo in action — 2018 Commonwealth Games table tennis, Australia.",
            },
            {
              src: ttHalimaTrophy,
              alt: "Halima Nambozo presenting one of her trophies",
              caption: "Halima Nambozo presenting one of her trophies in 2016.",
            },
          ].map((photo) => (
            <figure key={photo.caption} className="border border-border bg-background">
              <img
                src={photo.src}
                alt={photo.alt}
                className="h-56 w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="p-3 text-sm leading-6 text-muted-foreground">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="site-width mt-8 grid gap-5 border border-border bg-background p-5 md:grid-cols-[12rem_1fr] md:items-center">
          <img
            src={reginaNakibuule}
            alt="Regina Nakibuule"
            className="h-48 w-full object-cover object-top md:h-40"
            loading="lazy"
            decoding="async"
          />
          <div>
            <p className="eyebrow text-primary">TOP TALENT FROM OUR CLUB</p>
            <h3 className="mt-2 text-2xl">Regina Nakibuule</h3>
            <p className="mt-1 text-sm font-semibold text-primary">Class of 2010</p>
            <p className="mt-2 leading-7 text-muted-foreground">
              Mbale Progressive table tennis club has also produced talents like Regina Nakibuule —
              FEASSSA Table Tennis commissar from 2019 to date, referee and umpire, ITTF & PTT level
              1 & 2 coach, Table Tennis coordinator for the Uganda Secondary Schools Sports
              Association (USSSA), and director with Pickleball Africa.
            </p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              <a
                className="inline-flex items-center gap-2 text-primary underline underline-offset-4"
                href="https://kawowo.com/2023/03/08/regina-nakibuule-a-multifaceted-female-sports-personality/"
                target="_blank"
                rel="noreferrer"
              >
                A multifaceted sports personality <ExternalLink size={14} />
              </a>
              <a
                className="inline-flex items-center gap-2 text-primary underline underline-offset-4"
                href="https://kawowo.com/2025/02/01/regina-nakibuule-ugandan-elevated-to-director-of-sports-development-role-on-continental-level-pickleball/"
                target="_blank"
                rel="noreferrer"
              >
                Pickleball Africa director role <ExternalLink size={14} />
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

        <div className="mt-16 border-t border-border pt-10" aria-labelledby="houses-heading">
          <div className="max-w-2xl">
            <p className="eyebrow text-primary">HOUSE COMMUNITY</p>
            <h2 id="houses-heading" className="mt-2 text-3xl md:text-4xl">
              Houses
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Four house communities give learners a strong sense of belonging and a reason to show
              up for one another in sport, service, and school life.
            </p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {houses.map((house) => (
              <article
                key={house.title}
                className={`border-t-4 ${house.border} bg-background p-5 shadow-sm`}
              >
                <div className="flex items-center gap-3">
                  <span className={`size-4 rounded-full ${house.swatch}`} aria-hidden="true" />
                  <p className="eyebrow text-primary">{house.colour}</p>
                </div>
                <h3 className="mt-4 text-xl">{house.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{house.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div
          className="mt-14 scroll-mt-28 border-t border-border pt-10 lg:grid lg:grid-cols-[0.42fr_1fr] lg:items-start lg:gap-10"
          id="red-cross-story"
        >
          <div>
            <p className="eyebrow text-primary">RED CROSS CLUB · SERVICE IN ACTION</p>
            <h3 className="mt-2 text-2xl">Members at work</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              First aid, preparedness, and practical service — pictured here after a cleaning
              activity.
            </p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:mt-0">
            {redCrossPhotos.map((photo) => (
              <figure key={photo.title}>
                <img
                  className="aspect-[3/4] w-full border border-border object-cover"
                  src={photo.image}
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
                "2023",
                "Bugisu Regionals",
                "Regional Champions after winning the Bugisu Regionals Finals.",
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
            <p className="eyebrow text-primary">SPORTS & ACTIVITY PHOTOS</p>
            <h2 id="gallery-heading" className="mt-2 text-3xl md:text-4xl">
              More moments from school life
            </h2>
          </div>
        </div>
        <div className="mt-8 space-y-10">
          {galleryGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-2xl">{group.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{group.description}</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.photos.map((photo) => (
                  <PhotoFigure key={photo.title} {...photo} />
                ))}
              </div>
            </div>
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
