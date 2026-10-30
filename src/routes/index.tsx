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
    title: "Mbale Progressive Secondary School",
    subheading: "A mixed day and boarding school.",
    text: "Offering O-Level/UCE and A-Level/UACE secondary education.",
    primary: "Discover our school",
    to: "/about" as const,
    secondary: "Explore campuses",
    secondaryTo: "/campuses" as const,
  },
  {
    image: cityCampus,
    eyebrow: "SCHOOL HISTORY",
    title: "Founded in 1993.",
    subheading: "By the late Ambassador Dr. Hassan Waswa Ggaliwango.",
    text: "First known as Mbale Progressive Academy, the school is now Mbale Progressive Secondary School.",
    primary: "Read our history",
    to: "/about" as const,
    secondary: "Learning pathways",
    secondaryTo: "/academics" as const,
  },
  {
    image: hillsideCampus,
    eyebrow: "DAY & BOARDING",
    title: "Day Campus and boarding Annex.",
    subheading: "Day Campus on Nyanza Road, near Namatala.",
    text: "The boarding campus is known as Mbale Progressive Annex.",
    primary: "View campus details",
    to: "/campuses" as const,
    secondary: "School life & sport",
    secondaryTo: "/sports" as const,
  },
];

const schoolHighlights = [
  { value: "1993", label: "Established" },
  { value: "2", label: "Campus locations" },
  { value: "—", label: "Student enrolment · figure pending" },
  { value: "—", label: "Staff total · figure pending" },
];

export const Route = createFileRoute("/")({
  head: () =>
    schoolHead(
      "Home",
      "Mbale Progressive Secondary School is a mixed day and boarding secondary school in Mbale City, offering UCE/O-Level and UACE/A-Level education. Established in 1993.",
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
        <div className="site-width relative hero-enter text-hero-foreground" key={activeIndex}>
          <p className="eyebrow mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-secondary" />
            {activeSlide.eyebrow}
          </p>
          <h1 className="max-w-2xl text-4xl leading-[1.16] sm:text-5xl lg:text-6xl">
            {activeSlide.title}
          </h1>
          <p className="mt-5 max-w-2xl font-display text-xl sm:text-2xl">
            {activeSlide.subheading}
          </p>
          <p className="mt-4 max-w-xl text-base leading-7 text-hero-muted">{activeSlide.text}</p>
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
          <p className="mt-3 text-xs text-white/75">Illustrative photography.</p>
        </div>
      </section>

      <section aria-label="School highlights" className="border-b border-border bg-background">
        <div className="site-width grid grid-cols-2 divide-y divide-border py-3 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          {schoolHighlights.map((item) => (
            <div
              key={item.label}
              className="flex flex-col justify-center px-4 py-5 text-center first:pl-0 last:pr-0"
            >
              <p
                className={`font-display text-2xl font-semibold md:text-3xl ${item.value === "—" ? "text-muted-foreground/70" : "text-primary"}`}
              >
                {item.value}
              </p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
        <p className="site-width pb-5 text-center text-xs text-muted-foreground">
          Student and staff figures will be added once confirmed by the school.
        </p>
      </section>

      <section className="py-16 md:py-20">
        <div className="site-width">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-primary">DAY & BOARDING</p>
              <h2 className="mt-3 text-3xl md:text-4xl">Two campuses in Mbale.</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              Explore the Day Campus and the boarding campus, Mbale Progressive Annex.
            </p>
          </div>
          <div className="mt-9 grid gap-8 md:grid-cols-2">
            {campuses.map((campus, index) => (
              <article
                key={campus.slug}
                className="group overflow-hidden rounded-md border border-border bg-card"
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
                    alt=""
                    aria-hidden="true"
                    className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-sm bg-primary/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                    Illustrative image
                  </span>
                </Link>
                <div className="p-6">
                  <p className="eyebrow text-muted-foreground">CAMPUS 0{index + 1}</p>
                  <div className="mt-2 flex items-center justify-between gap-4">
                    <h3 className="text-2xl">{campus.name}</h3>
                    <Button asChild variant="outline" size="icon">
                      <Link
                        to="/campuses/$campus"
                        params={{ campus: campus.slug }}
                        aria-label={`Explore ${campus.name}`}
                      >
                        <ArrowRight />
                      </Link>
                    </Button>
                  </div>
                  <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin size={14} />
                    {campus.setting}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 md:py-20">
        <div className="site-width grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="eyebrow text-primary">ACADEMICS</p>
            <h2 className="mt-4 text-3xl leading-snug md:text-4xl">
              O-Level/UCE
              <br />
              and A-Level/UACE.
            </h2>
          </div>
          <div>
            <BookOpen className="mb-4 text-primary" size={32} strokeWidth={1.5} />
            <p className="text-base leading-7 text-muted-foreground">
              Mbale Progressive Secondary School offers both secondary pathways. Current subject
              offerings and A-Level combinations should be confirmed with the school.
            </p>
            <Button asChild variant="link" className="mt-4 px-0">
              <Link to="/academics">
                Explore learning pathways <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="site-width grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow text-primary">SPORT & STUDENT LIFE</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Football and debate.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
              The school’s football record includes Bugisu representation at the 2024 National Games
              and a Round of 16 finish at the 2026 National Boys’ Football Championship.
            </p>
          </div>
          <Button asChild variant="outline" size="lg">
            <Link to="/sports">
              Explore sports &amp; student life <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>

      <section className="bg-primary py-14 text-primary-foreground">
        <div className="site-width flex flex-col items-start justify-between gap-7 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow text-secondary">YOUR NEXT STEP</p>
            <h2 className="mt-3 font-display text-3xl">Explore admissions at Progressive.</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-primary-foreground/75">
              Request current entry guidance and confirm the latest requirements with the school.
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
