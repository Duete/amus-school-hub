import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  ExternalLink,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Library,
  Network,
  UsersRound,
} from "lucide-react";
import abduSwaibuKampanya from "@/assets/alumni-abdu-swaibu-kampanya.webp";
import arikotRacheal from "@/assets/alumni-ariokot-racheal.jpg";
import chrisArikoObore from "@/assets/alumni-chris-ariko-obore.webp";
import cindySanyu from "@/assets/alumni-cindy-sanyu.jpg";
import reginaNakibuule from "@/assets/alumni-regina-nakibuule.jpg";
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

type NotableAlumnus = {
  name: string;
  classYear: string;
  role: string;
  image?: string;
  imageAlt?: string;
  source?: string;
  href?: string;
  imageCredit?: string;
};

const notableAlumni: NotableAlumnus[] = [
  {
    name: "Chris Ariko Obore",
    classYear: "Class of 1998",
    role: "Investigative watchdog journalist at the Daily Monitor; appointed Director of Communication and Public Affairs for the Parliament of Uganda in 2015",
    image: chrisArikoObore,
    imageAlt: "Chris Ariko Obore",
    source: "Biography",
    href: "https://flashugnews.com/chris-ariko-obore-biography-age-education-family-wife/",
  },
  {
    name: "Ariokot Racheal",
    classYear: "Class of 2015",
    role: "Chemical Engineer and PhD researcher at the University of Chemistry and Technology in Prague, Czech Republic",
    image: arikotRacheal,
    imageAlt: "Ariokot Racheal",
    source: "Professional profile",
    href: "https://www.linkedin.com/in/racheal-ariokot/",
  },
  {
    name: "Hon. Abdu Swaibu Kampanya",
    classYear: "Class of 2016",
    role: "Lawyer and Member of Parliament for Iki-Iki County, Budaka",
    image: abduSwaibuKampanya,
    imageAlt: "Hon. Abdu Swaibu Kampanya",
    source: "Parliament profile",
    href: "https://www.parliament.go.ug/sites/default/files/2026-06/MEMBERS_2026.pdf",
  },
  {
    name: "Sanyu Cinderella a.k.a Cindy",
    classYear: "Class year not listed",
    role: "Ugandan musician, original member of Blu*3, and solo artist",
    image: cindySanyu,
    imageAlt: "Cindy Sanyu",
    source: "Wikipedia biography",
    href: "https://en.wikipedia.org/wiki/Cindy_Sanyu",
    imageCredit: "Photo: Kyakwera / Wikimedia Commons (CC BY-SA 4.0)",
  },
  {
    name: "Nakibuule Regina",
    classYear: "Class of 2010",
    role: "FEASSSA Table Tennis commissar (2019 to date), referee and umpire, ITTF & PTT level 1 & 2 coach, USSSA Table Tennis coordinator, and director with Pickleball Africa",
    image: reginaNakibuule,
    imageAlt: "Regina Nakibuule",
    source: "Kawowo profile",
    href: "https://kawowo.com/2023/03/08/regina-nakibuule-a-multifaceted-female-sports-personality/",
  },
  {
    name: "Mukamba Robert",
    classYear: "Class year not listed",
    role: "Politician and Director of Cream Nursery & Primary School, Mbale",
  },
];

function Alumni() {
  return (
    <>
      <section className="bg-primary py-8 text-primary-foreground md:py-12">
        <div className="site-width">
          <p className="text-sm font-semibold tracking-[0.04em] text-secondary">Alumni</p>
          <h1 className="mt-2 max-w-none whitespace-nowrap text-xl leading-tight sm:text-3xl md:text-5xl">
            Once with Us, Always with Us
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-primary-foreground/80 md:text-base md:leading-8">
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
                <div className="flex items-start gap-3">
                  <Icon
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
              Progressive alumni are making their mark in public service, communications, research,
              and community leadership. These profiles are a growing record of the people carrying
              the school’s story forward.
            </p>
            <div className="mt-7 grid gap-4">
              {notableAlumni.map((alumnus) => (
                <article
                  key={alumnus.name}
                  className="grid gap-4 border border-border bg-background p-4 sm:grid-cols-[5rem_1fr] sm:items-center"
                >
                  {alumnus.image ? (
                    <img
                      src={alumnus.image}
                      alt={alumnus.imageAlt ?? alumnus.name}
                      className="h-20 w-20 rounded-sm object-cover object-top"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div
                      className="flex h-20 w-20 items-center justify-center rounded-sm bg-primary text-xl font-bold text-primary-foreground"
                      aria-label={`Portrait unavailable for ${alumnus.name}`}
                    >
                      MR
                    </div>
                  )}
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <h3 className="text-xl">{alumnus.name}</h3>
                      <p className="text-xs font-bold uppercase tracking-[0.08em] text-primary">
                        {alumnus.classYear}
                      </p>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{alumnus.role}</p>
                    {alumnus.href && alumnus.source ? (
                      <a
                        href={alumnus.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-primary underline underline-offset-4"
                      >
                        {alumnus.source} <ExternalLink size={12} />
                      </a>
                    ) : null}
                    {alumnus.imageCredit ? (
                      <p className="mt-2 text-[11px] leading-4 text-muted-foreground">
                        {alumnus.imageCredit}
                      </p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-5 md:grid-cols-2" aria-label="Alumni next steps">
          <article className="border border-border bg-muted p-7">
            <div className="flex items-center gap-3">
              <GraduationCap
                className="shrink-0 text-primary"
                size={23}
                strokeWidth={1.6}
                aria-hidden="true"
              />
              <h2 className="text-2xl">Share your story</h2>
            </div>
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
            <div className="flex items-center gap-3">
              <BookOpen
                className="shrink-0 text-primary"
                size={23}
                strokeWidth={1.6}
                aria-hidden="true"
              />
              <h2 className="text-2xl">Return to the school</h2>
            </div>
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
