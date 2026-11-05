import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  BellRing,
  BookOpenCheck,
  HeartPulse,
  House,
  Music2,
  ShieldCheck,
  Trophy,
  UsersRound,
} from "lucide-react";
import sendOff from "@/assets/boys-team-with-the-deputor-madam-alice-and-games-teacher-before-send-off-for-nationals-2024.webp";
import arriving from "@/assets/team-ariving-for-the-finals.webp";
import outreachNorthRoad from "@/assets/outreach-north-road-primary.webp";
import karamojaSelfie from "@/assets/karamoja-association-selfie.webp";
import colourStudent from "@/assets/colour-festival-student.webp";
import colourCrowd from "@/assets/colour-festival-crowd.webp";
import colourGathering from "@/assets/colour-festival-gathering.webp";
import colourPerformer from "@/assets/colour-festival-performer.webp";
import { PageIntro } from "@/components/school-layout";
import { schoolHead } from "@/lib/school";

export const Route = createFileRoute("/campus-life")({
  head: () =>
    schoolHead(
      "Campus life",
      "Explore houses, clubs, sports, music, leadership, faith, boarding routines, and health services at Mbale Progressive Secondary School.",
    ),
  component: CampusLife,
});

const rhythm = [
  ["05:45", "Wake bell", "Boarding students prepare, bathe, and tidy their dorm spaces."],
  ["06:30", "Morning prep", "A focused period of supervised study before the school day begins."],
  ["07:45", "Assembly", "Notices, reflection, school identity, and preparation for the day ahead."],
  ["08:15", "Lessons", "Classroom learning with breaks through the afternoon."],
  [
    "16:30",
    "Games and clubs",
    "House sport, clubs, choir, debate, and other co-curricular activities.",
  ],
  ["19:00", "Evening prep", "Boarding students return to supervised study before lights out."],
];

const campusThreads = [
  [
    House,
    "Houses",
    "The school houses are Galiwango House, Mukongoni House, Nantume House, and Kaggwa House. House identity creates friendly competition, belonging, and opportunities for students to work together.",
  ],
  [
    BookOpenCheck,
    "Clubs",
    "Other clubs include the Red Cross Club, Writers' Club, Science Club, and Interact Club. The Debate Society also leads a strong programme: a deep run at the 2025 NIRA National Schools Debate Championship against more than 20 schools, First Runners-Up at the fourth 93.1 IUIU FM Inter-School Debate Championship, and a standout performance at the Mbale District UNSA Debate Championship.",
  ],
  [
    Trophy,
    "Sports",
    "Football, netball, basketball, athletics, and other games develop teamwork, discipline, fitness, and confidence.",
  ],
  [
    Music2,
    "Music, dance and drama",
    "Choir, instrumental music, traditional performance, and drama give learners a stage for expression.",
  ],
  [
    UsersRound,
    "Student leadership",
    "Student leaders and prefects help represent learner voices and support a positive school culture.",
  ],
  [
    ShieldCheck,
    "Faith and reflection",
    "Faith life includes the Muslim Students Association, Young Catholics Association, and Scripture Union, supporting learners in observing their faith and developing values for community life.",
  ],
];

function CampusLife() {
  return (
    <>
      <PageIntro eyebrow="CAMPUS LIFE" title="Life beyond the classroom.">
        The timetable is only part of the day. Houses, clubs, sports, music, faith, and boarding
        routines give learners places to compete, practise, lead, and rest. “The Love of Education
        Brought Us Here” is the school motto.
      </PageIntro>

      <section className="site-width py-14 md:py-20">
        <div className="flex items-start gap-4">
          <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Activity size={24} />
          </span>
          <div>
            <p className="eyebrow text-primary">A BOARDING DAY AT A GLANCE</p>
            <h2 className="mt-2 text-3xl md:text-4xl">From wake bell to evening prep.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
              The rhythm below is a guide to the boarding experience. Day Campus learners join the
              school community during the academic and co-curricular parts of the day.
            </p>
          </div>
        </div>
        <div className="mt-10 grid gap-0 border-y border-border md:grid-cols-3">
          {rhythm.map(([time, title, text]) => (
            <div
              key={time}
              className="border-b border-border py-6 md:border-r md:px-6 md:last:border-r-0"
            >
              <p className="font-display text-3xl text-secondary">{time}</p>
              <h3 className="mt-3 text-xl">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-muted py-14 md:py-20">
        <div className="site-width">
          <p className="eyebrow text-primary">SEVEN THREADS OF CAMPUS LIFE</p>
          <h2 className="mt-2 text-3xl md:text-4xl">Pick a thread to follow.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {campusThreads.map(([Icon, title, text]) => {
              const ThreadIcon = Icon as typeof House;
              return (
                <article key={title as string} className="bg-background p-6">
                  <div className="flex items-start gap-3">
                    <ThreadIcon
                      className="mt-0.5 shrink-0 text-primary"
                      size={20}
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                    <h3 className="text-xl">{title as string}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{text as string}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="site-width py-14 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow text-primary">BOARDING SUPPORT · WE UNLOCK THE FUTURE</p>
            <h2 className="mt-2 text-3xl md:text-4xl">The Temple of Knowledge.</h2>
            <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
              Boarding life combines supervised study, meals, rest, welfare, and personal
              responsibility. Clear house routines help students know what happens next and where to
              ask for help.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-sm border border-border p-5">
                <div className="flex items-center gap-3">
                  <House
                    className="shrink-0 text-primary"
                    size={20}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <h3 className="text-xl">House community</h3>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Students build friendships and learn to care for shared spaces and one another.
                </p>
              </div>
              <div className="rounded-sm border border-border p-5">
                <div className="flex items-center gap-3">
                  <BellRing
                    className="shrink-0 text-primary"
                    size={20}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <h3 className="text-xl">Supervised routines</h3>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Study, meals, activities, rest, and movement are supported by clear routines.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-sm bg-primary p-7 text-primary-foreground md:p-9">
            <p className="eyebrow text-secondary">BOARDING ONLY</p>
            <div className="mt-3 flex items-center gap-3">
              <HeartPulse size={24} strokeWidth={1.6} aria-hidden="true" />
              <h2 className="text-3xl">Health services</h2>
            </div>
            <p className="mt-5 leading-7 text-primary-foreground/80">
              Boarding students have access to health support for everyday wellbeing and illness
              management, with referral arrangements for care beyond the school setting.
            </p>
            <p className="mt-5 text-sm leading-6 text-primary-foreground/70">
              For current clinic hours, medication procedures, emergency contacts, and referral
              partners, families should confirm the latest guidance with the Boarding office.
            </p>
          </div>
        </div>
      </section>
      <section className="site-width py-14 md:py-20" aria-labelledby="moments-heading">
        <p className="eyebrow text-primary">MOMENTS TOGETHER</p>
        <h2 id="moments-heading" className="mt-2 text-3xl md:text-4xl">
          Cheering our teams on.
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[
            [
              sendOff,
              "The boys' team with Deputy Madam Alice and the Games Teacher before the send-off for Nationals 2024.",
            ],
            [arriving, "The team arriving for the finals."],
          ].map(([src, caption]) => (
            <figure key={caption}>
              <img
                className="w-full border border-border"
                src={src}
                alt={caption}
                loading="lazy"
                decoding="async"
              />
              <figcaption className="pt-3 text-sm text-muted-foreground">{caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section
        className="border-t border-border py-14 md:py-20"
        aria-labelledby="colour-festival-heading"
      >
        <div className="site-width">
          <p className="eyebrow text-primary">COLOUR FESTIVAL</p>
          <h2 id="colour-festival-heading" className="mt-2 text-3xl md:text-4xl">
            Students having fun during the Colour Festival.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
            The Colour Festival is one of the liveliest days on the school calendar. Coloured
            powder, music, and a full schoolyard give learners a chance to relax, celebrate, and
            be together outside the classroom.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                colourStudent,
                "A student poses during the Colour Festival, with the school building behind the crowd.",
              ],
              [
                colourCrowd,
                "Students packed the schoolyard for the Colour Festival.",
              ],
              [
                colourGathering,
                "Students gathered on the field for the Colour Festival programme.",
              ],
              [
                colourPerformer,
                "A performer on stage kept the crowd moving during the Colour Festival.",
              ],
            ].map(([src, caption]) => (
              <figure key={caption}>
                <img
                  className="w-full border border-border"
                  src={src}
                  alt={caption}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption className="pt-3 text-sm leading-6 text-muted-foreground">
                  {caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-t border-border py-14 md:py-20"
        aria-labelledby="diversity-heading"
      >
        <div className="site-width grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="eyebrow text-primary">CULTURAL ASSOCIATIONS</p>
            <h2 id="diversity-heading" className="mt-2 text-3xl md:text-4xl">
              United in diversity.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
              Cultural associations give learners a home for their heritage and a chance to share it
              with the whole school. The Karamoja Association is one of them, and its members
              gathered for a selfie during one of the school's cultural events and galas.
            </p>
            <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
              Traditional dance, music, and dress keep cultural expression visible at school and
              community events, and every learner is welcome to take part.
            </p>
          </div>
          <figure className="mx-auto w-full max-w-sm">
            <img
              className="w-full border border-border"
              src={karamojaSelfie}
              alt="Members of the Karamoja Association taking a selfie together during a school cultural event"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="pt-3 text-sm leading-6 text-muted-foreground">
              A selfie with the members of the Karamoja Association during one of the cultural
              events and galas.
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        className="border-t border-border bg-muted py-14 md:py-20"
        aria-labelledby="outreach-heading"
      >
        <div className="site-width">
          <p className="eyebrow text-primary">COMMUNITY OUTREACH</p>
          <h2 id="outreach-heading" className="mt-2 text-3xl md:text-4xl">
            Learning put to work in the community.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
            Learners take what they study beyond the school gate. Outreach visits combine guidance
            and counselling, tree planting, and Music, Dance and Drama (MDD) with the schools and
            communities we work with.
          </p>
          <figure className="mt-8">
            <img
              className="w-full border border-border"
              src={outreachNorthRoad}
              alt="Mbale Progressive Secondary School students carrying out an outreach at North Road Primary School"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="pt-3 text-sm leading-6 text-muted-foreground">
              Students carrying out an outreach at North Road Primary School, which involved
              guidance and counselling, tree planting, and MDD.
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
