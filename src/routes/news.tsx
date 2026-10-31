import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, BellRing, BookOpen, CalendarDays, UsersRound } from "lucide-react";
import { PageIntro } from "@/components/school-layout";
import { schoolHead } from "@/lib/school";

export const Route = createFileRoute("/news")({
  head: () =>
    schoolHead(
      "News and updates",
      "School news, notices, achievements, and updates from Mbale Progressive Secondary School.",
      "/news",
    ),
  component: News,
});

const updates = [
  {
    icon: BookOpen,
    eyebrow: "ACADEMICS",
    title: "UCE and UACE pathways",
    text: "Explore the school’s compulsory, elective, principal, and subsidiary subject offerings for the two national examination pathways.",
    to: "/academics",
    link: "Explore academics",
  },
  {
    icon: UsersRound,
    eyebrow: "CAMPUS LIFE",
    title: "Life beyond the classroom",
    text: "Houses, clubs, sports, music, leadership, faith, and boarding routines help learners grow as part of a community.",
    to: "/campus-life",
    link: "Explore campus life",
  },
  {
    icon: BellRing,
    eyebrow: "SCHOOL LEADERSHIP",
    title: "Governance and leadership",
    text: "Meet the Board of Governors overview and the Day Campus and Boarding leaders who support school life.",
    to: "/governance",
    link: "Meet school leadership",
  },
  {
    icon: Award,
    eyebrow: "STUDENT LEADERSHIP",
    title: "UNSA District Speaker",
    text: "A Mbale Progressive UNSA speaker contested at District level and emerged as the District UNSA Speaker, following other Progressive leaders who have won at District and Regional levels.",
    to: "/governance",
    link: "Explore leadership",
  },
];

function News() {
  return (
    <>
      <PageIntro eyebrow="NEWS & UPDATES" title="What’s happening around Progressive.">
        Follow school notices, academic updates, campus-life stories, achievements, and important
        information for learners and families.
      </PageIntro>

      <section className="site-width py-14 md:py-20">
        <div className="flex items-center gap-3">
          <CalendarDays className="text-primary" size={24} />
          <h2 className="text-3xl">Latest updates</h2>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {updates.map(({ icon: Icon, eyebrow, title, text, to, link }) => (
            <article key={title} className="flex flex-col rounded-sm border border-border p-6">
              <Icon className="text-primary" size={25} />
              <p className="eyebrow mt-6 text-primary">{eyebrow}</p>
              <h3 className="mt-3 text-2xl">{title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{text}</p>
              <Link
                to={to}
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary"
              >
                {link}
                <ArrowRight size={15} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-muted py-14 md:py-16">
        <div className="site-width flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="eyebrow text-primary">KEEP IN TOUCH</p>
            <h2 className="mt-2 text-3xl">Need a current school update?</h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
              Contact the school for the latest term notices, admissions guidance, event
              information, and family communications.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center gap-2 font-bold text-primary"
          >
            Contact the school <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
