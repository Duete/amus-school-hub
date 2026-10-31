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

      <section
        className="border-y border-border bg-muted py-14 md:py-20"
        aria-labelledby="debate-news-heading"
      >
        <div className="site-width grid gap-8 lg:grid-cols-[1fr_0.34fr] lg:gap-16">
          <article>
            <p className="eyebrow text-primary">DEBATE SOCIETY · 2025/2026</p>
            <h2 id="debate-news-heading" className="mt-3 text-3xl leading-tight md:text-4xl">
              The Mighty Orators: Mbale Progressive Shines in the 2025/2026 Debating Arena!
            </h2>
            <p className="mt-5 leading-7 text-muted-foreground">
              What a year it has been for our brilliant wordsmiths. The Mbale Progressive Secondary
              School Debate Society has shown that critical thinking, sharp arguments, and eloquent
              public speaking are central to the Progressive experience.
            </p>
            <p className="mt-4 leading-7 text-muted-foreground">
              The team made a deep national run at the 2025 NIRA National Schools Debate
              Championship, debating critical policy issues against more than 20 elite schools from
              across the country. Senior speakers demonstrated intellectual maturity and earned
              respect on the national stage.
            </p>
            <p className="mt-4 leading-7 text-muted-foreground">
              At the fourth 93.1 IUIU FM Inter-School Debate Championship at the Islamic University
              in Uganda Main Campus, the team fought through a month-long youth-leadership
              tournament and finished as proud First Runners-Up after an electrifying final against
              Nkoma SS.
            </p>
            <p className="mt-4 leading-7 text-muted-foreground">
              Closer to home, Progressive debaters also dominated the Mbale District UNSA Debate
              Championship, showcasing research, quick-witted refutation, and the communication
              skills encouraged by the lower secondary curriculum.
            </p>
            <p className="mt-4 leading-7 text-muted-foreground">
              Congratulations to the student debaters and club patrons for hoisting the Mbale
              Progressive flag high. Students who want to sharpen their minds, conquer stage fright,
              and join a winning team are invited to join the Debate Society. Progressive Oyee!
            </p>
          </article>
          <aside className="self-start rounded-sm bg-primary p-7 text-primary-foreground md:p-8">
            <Award size={28} className="text-secondary" />
            <p className="eyebrow mt-6 text-secondary">DEBATING CLUB</p>
            <h3 className="mt-3 text-2xl">Research. Reason. Voice.</h3>
            <p className="mt-4 text-sm leading-6 text-primary-foreground/80">
              The Debate Society gives learners a practical space to research national issues, build
              persuasive arguments, listen carefully, and speak with confidence.
            </p>
            <p className="mt-4 text-sm font-semibold text-secondary">
              Join the team · Progressive Oyee!
            </p>
          </aside>
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
