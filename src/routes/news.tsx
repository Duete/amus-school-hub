import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BellRing,
  BookOpen,
  CalendarDays,
  ExternalLink,
  Trophy,
  UsersRound,
} from "lucide-react";
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
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              <a
                href="https://www.youtube.com/watch?v=T-jv1_wk9Js"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-primary underline underline-offset-4"
              >
                IUIU FM championship report <ExternalLink size={14} />
              </a>
              <a
                href="https://inspired.calicotab.com/niraschools/results/round/5/?view=debate"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-primary underline underline-offset-4"
              >
                NIRA 2025 results <ExternalLink size={14} />
              </a>
            </div>
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

      <section className="site-width py-14 md:py-20" aria-labelledby="sports-news-heading">
        <div className="flex items-center gap-3">
          <Trophy className="text-primary" size={24} />
          <h2 id="sports-news-heading" className="text-3xl">
            Sports reports
          </h2>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <article className="border-l-2 border-secondary pl-6">
            <p className="eyebrow text-primary">FOOTBALL · HISTORY & MAY 2026</p>
            <h3 className="mt-3 text-2xl md:text-3xl">
              Pitch Perfect: The Golden Legacy of Mbale Progressive Football
            </h3>
            <p className="mt-4 leading-7 text-muted-foreground">
              Sports bursaries and local training grounds laid the foundation for the boys’ and
              girls’ programmes before 2013. In the 2016 Mbale District Copa Qualifiers, the boys
              beat Nkoma SS 4–3 on penalties and the girls beat Mbale Comprehensive 2–0 at Mbale
              Municipal Stadium to sweep both district trophies. The boys later recorded a 3–2
              National Championship win over Nyamitanga SS in 2022.
            </p>
            <p className="mt-3 leading-7 text-muted-foreground">
              The 2026 USSSA National Boys Football Championship in Lira brought the school’s most
              dramatic run yet. Progressive drew 1–1 with Kisozi Seed, beat Ssaku SS 2–0, then
              defeated Masindi SS 5–4 on penalties after a goalless Round of 32 match. The run ended
              against London College Nansana in the Round of 16 after a 4–2 shootout defeat, leaving
              the team among the top 16 schools nationally and ranked 14th in the country.
            </p>
            <Link
              to="/sports"
              className="mt-5 inline-flex items-center gap-2 font-bold text-primary"
            >
              Read the football record <ArrowRight size={16} />
            </Link>
          </article>
          <article className="border-l-2 border-secondary pl-6">
            <p className="eyebrow text-primary">TABLE TENNIS · NEWS FEATURE</p>
            <h3 className="mt-3 text-2xl md:text-3xl">
              From Grassroots to Giants: The Unstoppable Rise of Mbale Progressive Table Tennis
            </h3>
            <p className="mt-4 leading-7 text-muted-foreground">
              From foundations built with Mbale Tigers Table Tennis Club around 2013–2015 to
              national and international school stages, Progressive athletes have grown from local
              contenders into champions. The 2016 Kenya Thika Open brought a breakthrough: Mbale
              Progressive won the women’s team event, while Halima Nambozo retained the singles
              title and helped the team beat Mbale Tigers 3–2.
            </p>
            <p className="mt-3 leading-7 text-muted-foreground">
              Later that year, Captain Brian Bineni led the boys at the Kateregga Memorial Schools
              Championship at MTN Arena-Lugogo. The team beat Kakungulu Memorial 3–1 in the
              semi-final and dethroned defending champions Mbogo College in the grand finale to lift
              the overall Boys’ Team Trophy. Since 2017, sports scholarships and talent pathways
              have helped learners balance serious training with demanding academics, while the team
              continues to feature in the Fresh Dairy Secondary School Games, regional opens, and
              the Mbale Schools Table Tennis Championship.
            </p>
            <p className="mt-3 leading-7 text-muted-foreground">
              Training runs every evening after classes in the indoor sports hall. Pick up a racket
              and join the legacy.
            </p>
            <a
              href="https://kawowo.com/2016/05/04/uganda-table-tennis-players-impress-at-thika-tourney/"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 font-bold text-primary underline underline-offset-4"
            >
              Read the Kawowo report <ExternalLink size={16} />
            </a>
          </article>
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
