import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight, MapPin, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { campuses, schoolHead } from "@/lib/school";
import cityCampus from "@/assets/city-campus.jpg";
import hillsideCampus from "@/assets/hillside-campus.jpg";
import schoolLife from "@/assets/school-life.jpg";

const heroSlides = [
  {
    image: schoolLife,
    eyebrow: "MBALE CITY · EASTERN UGANDA",
    title: "A school that knows where it is going.",
    subheading: "The Love of Education Brought Us Here.",
    text: "Day and boarding education for more than 1,500 learners, from S.1 through UACE.",
    primary: "See the school",
    to: "/about" as const,
    secondary: "Ask about admission",
    secondaryTo: "/admissions" as const,
  },
  {
    image: cityCampus,
    eyebrow: "ESTABLISHED 1993",
    title: "Thirty years of steady work.",
    subheading: "Built in Mbale. Open to the region.",
    text: "What began as Mbale Progressive Academy is now a full secondary school with day and boarding pathways.",
    primary: "Read our history",
    to: "/about" as const,
    secondary: "View academics",
    secondaryTo: "/academics" as const,
  },
  {
    image: hillsideCampus,
    eyebrow: "DAY & BOARDING",
    title: "Two settings. One standard.",
    subheading: "Day Campus and Mbale Progressive Annex.",
    text: "Find the campus that fits your family, then speak to the school office about places and requirements.",
    primary: "View campuses",
    to: "/campuses" as const,
    secondary: "Contact the school",
    secondaryTo: "/contact" as const,
  },
];

const schoolFacts = [
  { value: "1,500+", label: "learners across both campuses" },
  { value: "400+", label: "UCE candidates each year" },
  { value: "300+", label: "UACE candidates each year" },
  { value: "1993", label: "school established" },
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
                text: "The Day Campus is on Nyanza Road near Namatala in Mbale City. Mbale Progressive Annex is the school’s boarding campus.",
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
        <div className="site-width grid grid-cols-2 divide-y divide-border py-3 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          {schoolFacts.map((fact) => (
            <div key={fact.label} className="px-4 py-5 first:pl-0 last:pr-0 sm:pl-6">
              <p className="font-display text-2xl font-semibold text-primary md:text-3xl">
                {fact.value}
              </p>
              <p className="mt-1 max-w-32 text-xs leading-5 text-muted-foreground">{fact.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28" aria-labelledby="campuses-heading">
        <div className="site-width">
          <div className="grid gap-8 md:grid-cols-[0.72fr_1.28fr] md:items-end">
            <div>
              <p className="eyebrow text-primary">DAY & BOARDING</p>
              <h2
                id="campuses-heading"
                className="mt-3 max-w-sm text-4xl leading-tight md:text-5xl"
              >
                Choose the setting that fits your family.
              </h2>
            </div>
            <p className="max-w-lg border-l-2 border-secondary pl-5 text-base leading-7 text-muted-foreground">
              The Day Campus sits on Nyanza Road near Namatala. Mbale Progressive Annex provides the
              boarding option. Both lead into the same academic programme.
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
                  <img
                    src={campus.image}
                    width={1024}
                    height={768}
                    loading="lazy"
                    alt={`${campus.name} campus setting`}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                <div className="p-6 md:p-7">
                  <p className="eyebrow text-muted-foreground">0{index + 1} · CAMPUS</p>
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
        className="border-y border-border bg-muted py-20 md:py-28"
        aria-labelledby="learning-heading"
      >
        <div className="site-width grid gap-10 md:grid-cols-[1fr_1.1fr] md:gap-20">
          <div>
            <p className="eyebrow text-primary">LEARNING PATHWAYS</p>
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
              <BookOpen className="text-primary" size={28} strokeWidth={1.5} />
              <h3 className="mt-5 text-2xl">O-Level / UCE</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                More than 17 subjects, with over 400 candidates registering and completing the
                course each year.
              </p>
            </article>
            <article className="border-t-2 border-secondary pt-5">
              <BookOpen className="text-primary" size={28} strokeWidth={1.5} />
              <h3 className="mt-5 text-2xl">A-Level / UACE</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                More than 15 subjects, with over 300 candidates completing the advanced level
                pathway each year.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28" aria-labelledby="life-heading">
        <div className="site-width grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p className="eyebrow text-primary">SPORT · DEBATE · STUDENT LIFE</p>
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
                The Day Campus is on Nyanza Road near Namatala. Mbale Progressive Annex is the
                boarding campus.
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
