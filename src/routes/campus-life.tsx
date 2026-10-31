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
    "House identity creates friendly competition, belonging, and opportunities for students to work together.",
  ],
  [
    BookOpenCheck,
    "Clubs",
    "Clubs give learners space to explore debate, science, creativity, enterprise, and service beyond lessons.",
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
    "Christian and Muslim learners are supported in observing their faith and developing values for community life.",
  ],
];

function CampusLife() {
  return (
    <>
      <PageIntro eyebrow="CAMPUS LIFE" title="Life beyond the classroom.">
        A school day is shaped by more than the timetable. Houses, clubs, sports, music, leadership,
        faith, and boarding life help learners grow as part of a community.
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
                  <ThreadIcon className="text-primary" size={25} />
                  <h3 className="mt-5 text-xl">{title as string}</h3>
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
            <p className="eyebrow text-primary">BOARDING SUPPORT</p>
            <h2 className="mt-2 text-3xl md:text-4xl">A safe base for learning and living.</h2>
            <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
              Boarding life brings study, rest, friendships, welfare, and personal responsibility
              together. House routines and adult supervision help students settle into a purposeful
              rhythm.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-sm border border-border p-5">
                <House className="text-primary" size={22} />
                <h3 className="mt-4 text-xl">House community</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Students build friendships and learn to care for shared spaces and one another.
                </p>
              </div>
              <div className="rounded-sm border border-border p-5">
                <BellRing className="text-primary" size={22} />
                <h3 className="mt-4 text-xl">Supervised routines</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Study, meals, activities, rest, and movement are supported by clear routines.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-sm bg-primary p-7 text-primary-foreground md:p-9">
            <HeartPulse size={30} />
            <p className="eyebrow mt-6 text-secondary">BOARDING ONLY</p>
            <h2 className="mt-3 text-3xl">Health services</h2>
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
    </>
  );
}
