import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ImageOff,
  MapPin,
  Pause,
  Play,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { campuses, schoolHead } from "@/lib/school";
import headteacherPhoto from "@/assets/admin-ocukul-julius-web.jpg";
import heroFrontage from "@/assets/hero-frontage.webp";
import heroCourtyard from "@/assets/hero-courtyard.webp";
import heroClassrooms from "@/assets/hero-classrooms.webp";
import heroDriveway from "@/assets/hero-driveway.webp";

const heroSlides = [
  {
    image: heroFrontage,
    eyebrow: "NABUYONGA RISE · MBALE CITY",
    title: "Welcome to Mbale Progressive.",
    subheading: "The Love of Education Brought Us Here.",
    text: "Our Day Campus sits on Plot 8–15 Nabuyonga Rise, Northern City Division, Mbale City.",
    primary: "Visit the Day Campus",
    to: "/campuses" as const,
    secondary: "Contact the school",
    secondaryTo: "/contact" as const,
  },
  {
    image: heroCourtyard,
    eyebrow: "LEARNING SPACES",
    title: "Room to learn and grow.",
    subheading: "Classrooms built around open courtyards.",
    text: "Spacious blocks give learners bright, airy places to study every day.",
    primary: "View academics",
    to: "/academics" as const,
    secondary: "Ask about admission",
    secondaryTo: "/admissions" as const,
  },
  {
    image: heroClassrooms,
    eyebrow: "OUR CAMPUS",
    title: "A calm place to focus.",
    subheading: "Green grounds, steady routines.",
    text: "Well-kept walkways and classrooms set the tone for serious, happy learning.",
    primary: "See campus life",
    to: "/campus-life" as const,
    secondary: "See the school",
    secondaryTo: "/about" as const,
  },
  {
    image: heroDriveway,
    eyebrow: "WELCOME",
    title: "Come and see for yourself.",
    subheading: "Visits every Saturday.",
    text: "Families are welcome to tour the school. Confirm the schedule with the office before travelling.",
    primary: "Plan a visit",
    to: "/contact" as const,
    secondary: "Ask about admission",
    secondaryTo: "/admissions" as const,
  },
];

const schoolFacts = [
  { value: "800", label: "O-Level learners enrolled" },
  { value: "20+", label: "O-Level subject options" },
  { value: "400", label: "A-Level learners enrolled" },
  { value: "17+", label: "A-Level subject options" },
];

const upcomingEvents = [
  {
    date: "SATURDAY",
    label: "Weekly school calendar",
    title: "Campus visitation",
    text: "Visit the Day Campus or Mbale Progressive Annex. Confirm the current schedule with the school office before travelling.",
    to: "/contact" as const,
    action: "Plan a visit",
  },
  {
    date: "AFTER CLASSES",
    label: "Sports calendar",
    title: "Table-tennis training",
    text: "Training runs every evening in the indoor sports hall. Learners can pick up a racket and join the school’s table-tennis programme.",
    to: "/sports" as const,
    action: "See sports life",
  },
  {
    date: "NEXT INTAKE",
    label: "Admissions calendar",
    title: "Admissions enquiries",
    text: "Ask the school office about available places, fees, entry requirements, and the right campus for your family.",
    to: "/admissions" as const,
    action: "Ask about admission",
  },
];

export const Route = createFileRoute("/")({
  head: () =>
    schoolHead(
      "Home",
      "Mbale Progressive Secondary School is a mixed day and boarding secondary school in Mbale City, offering UCE/O-Level and UACE/A-Level education. Established in 1993.",
      "/",
      [
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What kind of school is Mbale Progressive Secondary School?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Mbale Progressive Secondary School is a mixed day and boarding secondary school in Mbale City, Uganda, offering UCE/O-Level and UACE/A-Level pathways.",
              },
            },
            {
              "@type": "Question",
              name: "Where are the school campuses?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The Day Campus is on Plot 8–15 Nabuyonga Rise, Northern City Division, Mbale City. Mbale Progressive Annex is the school’s boarding campus.",
              },
            },
            {
              "@type": "Question",
              name: "How can a family enquire about admission?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Families can review the admissions information and submit an enquiry through the school’s online application page, then confirm current requirements with the school office.",
              },
            },
          ],
        },
      ],
    ),
  component: Index,
});

function Index() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const activeSlide = heroSlides[activeIndex];

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const selectSlide = (index: number) => {
    setActiveIndex((index + heroSlides.length) % heroSlides.length);
    setPaused(true);
  };

  if (!activeSlide) return null;

  return (
    <>
      <section
        className="school-hero"
        aria-roledescription="carousel"
        aria-label="Mbale Progressive highlights"
      >
        <img
          key={activeSlide.image}
          src={activeSlide.image}
          width={1920}
          height={1024}
          alt=""
          aria-hidden="true"
          className="hero-image"
          fetchPriority="high"
        />
        <div className="hero-overlay" />
        <div className="site-width relative z-10 grid w-full items-end gap-10 py-16 hero-enter lg:grid-cols-[minmax(0,1fr)_220px] lg:py-24">
          <div className="max-w-2xl text-hero-foreground" key={activeIndex}>
            <p className="eyebrow mb-5 flex items-center gap-3 text-secondary">
              <span className="h-px w-8 bg-secondary" />
              {activeSlide.eyebrow}
            </p>
            <h1 className="max-w-xl text-5xl leading-[1.08] sm:text-6xl lg:text-7xl">
              {activeSlide.title}
            </h1>
            <p className="mt-6 max-w-xl font-display text-2xl leading-tight sm:text-3xl">
              {activeSlide.subheading}
            </p>
            <p className="mt-5 max-w-lg text-base leading-7 text-hero-muted">{activeSlide.text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to={activeSlide.to}>
                  {activeSlide.primary}
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="lg">
                <Link to={activeSlide.secondaryTo}>{activeSlide.secondary}</Link>
              </Button>
            </div>
            <div
              className="mt-8 flex items-center gap-2"
              role="group"
              aria-label={`Slide ${activeIndex + 1} of ${heroSlides.length}`}
            >
              <button
                type="button"
                onClick={() => selectSlide(activeIndex - 1)}
                aria-label="Previous highlight"
                className="rounded-full border border-white/40 p-2 text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary"
              >
                <ChevronLeft size={18} />
              </button>
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.eyebrow}
                  type="button"
                  onClick={() => selectSlide(index)}
                  aria-label={`Show highlight ${index + 1}: ${slide.eyebrow}`}
                  aria-pressed={activeIndex === index}
                  className={`h-2.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${activeIndex === index ? "w-8 bg-secondary" : "w-2.5 bg-white/60 hover:bg-white"}`}
                />
              ))}
              <button
                type="button"
                onClick={() => selectSlide(activeIndex + 1)}
                aria-label="Next highlight"
                className="rounded-full border border-white/40 p-2 text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary"
              >
                <ChevronRight size={18} />
              </button>
              <button
                type="button"
                onClick={() => setPaused((value) => !value)}
                aria-label={paused ? "Play automatic highlights" : "Pause automatic highlights"}
                aria-pressed={paused}
                className="rounded-full border border-white/40 p-2 text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary"
              >
                {paused ? <Play size={16} /> : <Pause size={16} />}
              </button>
            </div>
          </div>
          <aside
            className="hero-facts border-l border-white/30 pl-5 text-hero-foreground"
            aria-label="School at a glance"
          >
            <p className="eyebrow text-secondary">At a glance</p>
            <dl className="mt-5 space-y-5">
              {schoolFacts.slice(0, 3).map((fact) => (
                <div key={fact.label}>
                  <dt className="text-xs leading-5 text-hero-muted">{fact.label}</dt>
                  <dd className="mt-1 font-display text-3xl">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <section aria-label="School facts" className="border-b border-border bg-background">
        <div className="site-width grid grid-cols-2 divide-y divide-border py-4 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          {schoolFacts.map((fact) => (
            <div key={fact.label} className="px-4 py-6 first:pl-0 last:pr-0 sm:pl-6">
              <p className="font-display text-2xl font-semibold text-primary md:text-3xl">
                {fact.value}
              </p>
              <p className="mt-1 max-w-32 text-xs leading-5 text-muted-foreground">{fact.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="border-b border-border bg-muted py-16 md:py-20"
        aria-labelledby="events-heading"
      >
        <div className="site-width">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold tracking-[0.04em] text-primary">Keep the date</p>
              <h2 id="events-heading" className="mt-3 max-w-xl text-4xl leading-tight md:text-5xl">
                What is coming up at Progressive.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-muted-foreground">
              Regular school activities and practical next steps for learners and families. Confirm
              term dates and arrangements with the school office.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {upcomingEvents.map((event) => (
              <article key={event.title} className="border border-border bg-background p-6">
                <div>
                  <p className="text-sm font-bold tracking-[0.08em] text-primary">{event.date}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{event.label}</p>
                </div>
                <div className="mt-6 flex items-start gap-3">
                  <CalendarDays
                    className="mt-1 shrink-0 text-primary"
                    size={20}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <h3 className="text-2xl">{event.title}</h3>
                </div>
                <p className="mt-3 min-h-20 text-sm leading-6 text-muted-foreground">
                  {event.text}
                </p>
                <Link
                  to={event.to}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary"
                >
                  {event.action} <ArrowRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28" aria-labelledby="campuses-heading">
        <div className="site-width">
          <div className="grid gap-8 md:grid-cols-[0.72fr_1.28fr] md:items-end">
            <div>
              <p className="text-sm font-semibold tracking-[0.04em] text-primary">Day & boarding</p>
              <h2
                id="campuses-heading"
                className="mt-3 max-w-sm text-4xl leading-tight md:text-5xl"
              >
                Choose the setting that fits your family.
              </h2>
            </div>
            <p className="max-w-lg border-l-2 border-secondary pl-5 text-base leading-7 text-muted-foreground">
              The Day Campus sits on Plot 8–15 Nabuyonga Rise, Mbale City. Mbale Progressive Annex
              provides the boarding option. Both lead into the same academic programme.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-5 lg:gap-8">
            {campuses.map((campus, index) => (
              <article
                key={campus.slug}
                className={`group overflow-hidden border border-border bg-card ${index === 1 ? "md:translate-y-12" : ""}`}
              >
                <Link
                  to="/campuses/$campus"
                  params={{ campus: campus.slug }}
                  className="relative block overflow-hidden"
                >
                  {campus.image ? (
                    <img
                      src={campus.image}
                      width={1024}
                      height={768}
                      loading="lazy"
                      alt={`${campus.name} grounds and buildings`}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-3 bg-muted p-6 text-center text-muted-foreground"
                      role="img"
                      aria-label={`${campus.name} photo not available`}
                    >
                      <ImageOff aria-hidden="true" size={26} strokeWidth={1.6} />
                      <span className="text-sm">No photo of this campus is available.</span>
                    </div>
                  )}
                </Link>
                <div className="p-6 md:p-7">
                  <p className="text-sm font-semibold tracking-[0.04em] text-muted-foreground">
                    Campus 0{index + 1}
                  </p>
                  <h3 className="mt-2 text-2xl">{campus.name}</h3>
                  <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin size={14} />
                    {campus.setting}
                  </p>
                  <Link
                    to="/campuses/$campus"
                    params={{ campus: campus.slug }}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-accent-foreground"
                  >
                    Campus details <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-y border-border bg-primary text-primary-foreground"
        aria-labelledby="headteacher-heading"
      >
        <div className="site-width grid gap-10 py-16 md:grid-cols-[0.7fr_1.3fr] md:items-center md:gap-16 md:py-20">
          <div className="relative">
            <img
              src={headteacherPhoto}
              width={640}
              height={800}
              loading="lazy"
              alt="Mr. Ocukul Julius, Day Campus Head Teacher"
              className="aspect-[4/5] w-full max-w-sm object-cover object-top grayscale-[20%]"
            />
            <p className="absolute bottom-4 left-4 bg-secondary px-3 py-2 text-xs font-bold text-secondary-foreground">
              Mr. Ocukul Julius
            </p>
          </div>
          <div>
            <Quote className="text-secondary" size={34} strokeWidth={1.4} />
            <p className="mt-5 text-sm font-semibold tracking-[0.04em] text-secondary">
              A message from the school
            </p>
            <h2
              id="headteacher-heading"
              className="mt-4 max-w-2xl text-4xl leading-tight md:text-5xl"
            >
              Education works best when a school knows every learner.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-primary-foreground/80">
              At Mbale Progressive, our work is steady and practical: teach well, guide closely, and
              give young people room to discover what they can do. Our Day Campus and Mbale
              Progressive Annex share the same academic purpose, the same high expectations, and the
              same responsibility to families.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-primary-foreground/80">
              We welcome learners who are ready to work, ask questions, serve others, and take their
              next step with confidence.
            </p>
            <p className="mt-7 text-sm font-semibold text-secondary">
              Mr. Ocukul Julius · Head Teacher, Day Campus
            </p>
          </div>
        </div>
      </section>

      <section
        className="border-y border-border bg-muted py-20 md:py-28"
        aria-labelledby="learning-heading"
      >
        <div className="site-width grid gap-10 md:grid-cols-[1fr_1.1fr] md:gap-20">
          <div>
            <p className="text-sm font-semibold tracking-[0.04em] text-primary">
              Learning pathways
            </p>
            <h2 id="learning-heading" className="mt-4 max-w-md text-4xl leading-tight md:text-5xl">
              A clear route from O-Level to A-Level.
            </h2>
            <Link
              to="/academics"
              className="mt-8 inline-flex items-center gap-2 font-bold text-primary"
            >
              See subjects and combinations <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <article className="border-t-2 border-primary pt-5">
              <div className="flex items-center gap-3">
                <BookOpen
                  className="shrink-0 text-primary"
                  size={22}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <h3 className="text-2xl">O-Level / UCE</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                20+ subject options and 800 learners enrolled at O-Level.
              </p>
            </article>
            <article className="border-t-2 border-secondary pt-5">
              <div className="flex items-center gap-3">
                <BookOpen
                  className="shrink-0 text-primary"
                  size={22}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <h3 className="text-2xl">A-Level / UACE</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                17+ subject options and 400 learners enrolled at A-Level.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28" aria-labelledby="life-heading">
        <div className="site-width grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p className="text-sm font-semibold tracking-[0.04em] text-primary">
              Sport · debate · student life
            </p>
            <h2 id="life-heading" className="mt-3 max-w-2xl text-4xl leading-tight md:text-5xl">
              Serious about the work. Proud of the life around it.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
              Mbale Progressive represented Bugisu Region and reached the Round of 16 at the 2026
              National Boys’ Football Championship in Lira, finishing 14th nationally. The Debate
              Society also took first runners-up at the 93.1 IUIU FM Inter-School Debate
              Championship.
            </p>
          </div>
          <div className="border-l-2 border-secondary pl-6">
            <p className="font-display text-5xl text-primary">14th</p>
            <p className="mt-1 text-sm text-muted-foreground">
              in the country · 2026 football championship
            </p>
            <Link
              to="/sports"
              className="mt-7 inline-flex items-center gap-2 font-bold text-primary"
            >
              Read the full record <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28" aria-labelledby="gallery-heading">
        <div className="site-width">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold tracking-[0.04em] text-primary">Day Campus</p>
              <h2 id="gallery-heading" className="mt-3 max-w-xl text-4xl leading-tight md:text-5xl">
                A closer look at the school buildings.
              </h2>
            </div>
            <Link to="/campuses" className="inline-flex items-center gap-2 font-bold text-primary">
              Explore the campuses <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-[1.25fr_0.75fr]">
            <Link
              to="/campuses/$campus"
              params={{ campus: "day-campus" }}
              className="group relative min-h-80 overflow-hidden bg-primary"
            >
              <img
                src={heroFrontage}
                loading="lazy"
                alt="Frontage and grounds of Mbale Progressive Secondary School"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/10 to-transparent" />
              <p className="absolute bottom-5 left-5 text-lg font-semibold text-white">
                School frontage and grounds
              </p>
            </Link>
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-1">
              <Link
                to="/campuses/$campus"
                params={{ campus: "day-campus" }}
                className="group relative min-h-40 overflow-hidden bg-primary"
              >
                <img
                  src={heroClassrooms}
                  loading="lazy"
                  alt="Classroom buildings at Mbale Progressive Secondary School"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <p className="absolute bottom-4 left-4 text-sm font-semibold text-white">
                  Classroom block
                </p>
              </Link>
              <Link
                to="/campuses/$campus"
                params={{ campus: "day-campus" }}
                className="group relative min-h-40 overflow-hidden bg-primary"
              >
                <img
                  src={heroCourtyard}
                  loading="lazy"
                  alt="School courtyard and classroom buildings at Mbale Progressive Secondary School"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <p className="absolute bottom-4 left-4 text-sm font-semibold text-white">
                  School courtyard
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className="border-y border-border bg-background py-20 md:py-24"
        aria-labelledby="faq-heading"
      >
        <div className="site-width grid gap-10 md:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="eyebrow text-primary">QUICK ANSWERS</p>
            <h2 id="faq-heading" className="mt-3 max-w-sm text-4xl leading-tight">
              Start with the facts.
            </h2>
          </div>
          <div className="divide-y divide-border border-t border-border">
            <details className="group py-5">
              <summary className="cursor-pointer list-none pr-8 font-semibold marker:content-none">
                What kind of school is Progressive?
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                A mixed day and boarding secondary school in Mbale City offering UCE/O-Level and
                UACE/A-Level education.
              </p>
            </details>
            <details className="group py-5">
              <summary className="cursor-pointer list-none pr-8 font-semibold marker:content-none">
                Where are the campuses?
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                The Day Campus is on Plot 8–15 Nabuyonga Rise, Mbale City. Mbale Progressive Annex
                is the boarding campus.
              </p>
            </details>
            <details className="group py-5">
              <summary className="cursor-pointer list-none pr-8 font-semibold marker:content-none">
                How do I enquire about admission?
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                Review the admissions guidance, send an online enquiry, and confirm current entry
                requirements with the school office.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section
        className="bg-primary py-14 text-primary-foreground"
        aria-labelledby="admissions-heading"
      >
        <div className="site-width flex flex-col items-start justify-between gap-7 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow text-secondary">NEXT STEP</p>
            <h2 id="admissions-heading" className="mt-3 font-display text-3xl">
              Need a place or a straight answer?
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-primary-foreground/75">
              Send an enquiry. The school office can confirm places, fees, entry requirements, and
              campus arrangements.
            </p>
          </div>
          <Button asChild variant="hero" size="lg">
            <Link to="/admissions">
              Admissions information <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
