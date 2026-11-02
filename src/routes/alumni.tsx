import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Library,
  Network,
  UsersRound,
} from "lucide-react";
import { schoolHead } from "@/lib/school";

export const Route = createFileRoute("/alumni")({
  head: () =>
    schoolHead(
      "Alumni",
      "Reconnect with Mbale Progressive Secondary School and the people who shaped its story.",
      "/alumni",
    ),
  component: Alumni,
});

const memberBenefits = [
  {
    title: "Networking",
    text: "Reconnect with Progressive alumni in Uganda and around the world.",
    icon: Network,
  },
  {
    title: "Career mentorship",
    text: "Guide current learners and recent graduates with experience from your field.",
    icon: Handshake,
  },
  {
    title: "Scholarship support",
    text: "Help promising learners access the opportunities they need to continue their education.",
    icon: HeartHandshake,
  },
  {
    title: "Professional development",
    text: "Share practical knowledge through talks, workshops, and career conversations.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Stay connected",
    text: "Keep in touch with classmates, teachers, houses, clubs, and school news.",
    icon: UsersRound,
  },
  {
    title: "Give back",
    text: "Support learner activities, school projects, and the next generation of Progressive students.",
    icon: HeartHandshake,
  },
  {
    title: "Reunion events",
    text: "Return for reunions, school celebrations, and the moments that bring old friends together.",
    icon: CalendarDays,
  },
  {
    title: "Access to resources",
    text: "Reconnect with the school’s learning spaces, library, and community when arrangements allow.",
    icon: Library,
  },
];

const executivePlaceholders = [
  "Chairperson — name to be updated",
  "General Secretary — name to be updated",
  "Treasurer — name to be updated",
  "Welfare and Mobilisation Lead — name to be updated",
];

const notablePlaceholders = [
  "Education and research — name to be updated",
  "Public service and leadership — name to be updated",
  "Business and enterprise — name to be updated",
  "Professional and community service — name to be updated",
];

function Alumni() {
  return (
    <>
      <section className="bg-primary py-16 text-primary-foreground md:py-20">
        <div className="site-width">
          <p className="text-sm font-semibold tracking-[0.04em] text-secondary">Alumni</p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-tight md:text-6xl">
            Once with Us, Always with Us
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-primary-foreground/80">
            Mbale Progressive is part of the story of every learner who has passed through its
            classrooms, teams, clubs, and houses.
          </p>
        </div>
      </section>

      <div className="site-width py-16 md:py-24">
        <section
          className="grid gap-10 md:grid-cols-[0.72fr_1.28fr] md:items-start"
          aria-labelledby="welcome-heading"
        >
          <div>
            <p className="text-sm font-semibold tracking-[0.04em] text-primary">Welcome back</p>
            <h2 id="welcome-heading" className="mt-3 max-w-sm text-4xl leading-tight md:text-5xl">
              The school changes. The connection remains.
            </h2>
          </div>
          <div className="border-l-2 border-secondary pl-6">
            <p className="text-lg leading-8 text-foreground">Dear Progressive alumni,</p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
              Mbale Progressive was shaped by the learners, teachers, families, and communities who
              have carried its work forward since 1993. This is your place to reconnect, network,
              and give back to the school that helped shape your next step.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
              Whether you left recently or many years ago, your experience matters. Together, we can
              support current learners, strengthen school projects, and keep the spirit of “The Love
              of Education Brought Us Here” alive.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 font-bold text-primary">
                Contact the school <ArrowRight size={16} />
              </Link>
              <Link to="/news" className="inline-flex items-center gap-2 font-bold text-primary">
                Read school news <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-20" aria-labelledby="benefits-heading">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold tracking-[0.04em] text-primary">
                Why stay connected
              </p>
              <h2 id="benefits-heading" className="mt-3 text-3xl md:text-4xl">
                A network that keeps giving.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-muted-foreground">
              Alumni connection is practical: open a door, share a lesson, support a learner, or
              return for a conversation.
            </p>
          </div>
          <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {memberBenefits.map(({ title, text, icon: Icon }) => (
              <article key={title} className="bg-background p-6">
                <Icon className="text-primary" size={25} strokeWidth={1.5} />
                <h3 className="mt-5 text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="mt-20 grid gap-10 border-t border-border pt-12 md:grid-cols-2"
          aria-labelledby="leadership-heading"
        >
          <div>
            <p className="text-sm font-semibold tracking-[0.04em] text-primary">
              Alumni leadership
            </p>
            <h2 id="leadership-heading" className="mt-3 text-3xl">
              Executive alumni
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">
              The Progressive alumni executive will be listed here as the school confirms the names
              and roles. The structure is ready for the association’s official updates.
            </p>
            <ul className="mt-7 divide-y divide-border border-y border-border">
              {executivePlaceholders.map((item) => (
                <li key={item} className="py-4 text-sm font-semibold text-primary">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.04em] text-primary">
              Progressive beyond school
            </p>
            <h2 className="mt-3 text-3xl">Notable alumni</h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">
              Names and profiles will be added here as alumni achievements are confirmed. The school
              welcomes stories from every field, not only public profiles.
            </p>
            <ul className="mt-7 divide-y divide-border border-y border-border">
              {notablePlaceholders.map((item) => (
                <li key={item} className="py-4 text-sm font-semibold text-primary">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-20 grid gap-5 md:grid-cols-2" aria-label="Alumni next steps">
          <article className="border border-border bg-muted p-7">
            <GraduationCap className="text-primary" size={30} strokeWidth={1.5} />
            <h2 className="mt-6 text-2xl">Share your story</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Tell the school where life has taken you, what you remember, and how you would like to
              stay involved with Mbale Progressive.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary"
            >
              Send an update <ArrowRight size={15} />
            </Link>
          </article>
          <article className="border border-border bg-background p-7">
            <BookOpen className="text-primary" size={30} strokeWidth={1.5} />
            <h2 className="mt-6 text-2xl">Return to the school</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Plan a visit, reconnect with a teacher, support a school activity, or ask the office
              about an upcoming event.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary"
            >
              Plan a visit <ArrowRight size={15} />
            </Link>
          </article>
        </section>
      </div>
    </>
  );
}
