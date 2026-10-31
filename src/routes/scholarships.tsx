import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, HeartHandshake, Medal, UsersRound } from "lucide-react";
import { PageIntro } from "@/components/school-layout";
import { schoolHead } from "@/lib/school";

export const Route = createFileRoute("/scholarships")({
  head: () =>
    schoolHead(
      "Scholarships and sponsorships",
      "Explore sponsorship and merit-based scholarship opportunities at Mbale Progressive Secondary School.",
    ),
  component: Scholarships,
});

const opportunities = [
  {
    icon: HeartHandshake,
    title: "Galiwango Foundation sponsorship",
    text: "The Galiwango Foundation sponsors more than 50 students across all levels, supporting learners at both the Day Campus and the Boarding campus.",
  },
  {
    icon: Award,
    title: "PLE entry merit sponsorship",
    text: "Students who achieve highly in their PLE results may be considered for sponsorship to join Senior One, subject to the school’s selection and confirmation process.",
  },
  {
    icon: UsersRound,
    title: "Best student per class bursary",
    text: "A bursary is available for the best-performing student in each class, recognising consistent effort and achievement across the school year.",
  },
  {
    icon: Medal,
    title: "UCE to A-Level scholarship",
    text: "Top performers in the UCE examinations can receive full scholarships to continue with A-Level study at the school, subject to award confirmation.",
  },
];

function Scholarships() {
  return (
    <>
      <PageIntro eyebrow="SCHOLARSHIPS & SPONSORSHIPS" title="Support that keeps opportunity open.">
        Mbale Progressive Secondary School supports learners through foundation sponsorships and
        merit-based awards across Day Campus and Boarding.
      </PageIntro>

      <section className="site-width py-14 md:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {opportunities.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-sm border border-border p-6 md:p-8">
              <Icon className="text-primary" size={28} />
              <h2 className="mt-6 text-2xl">{title}</h2>
              <p className="mt-3 leading-7 text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-muted py-14 md:py-16">
        <div className="site-width grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="eyebrow text-primary">HOW TO ENQUIRE</p>
            <h2 className="mt-2 text-3xl">Ask about eligibility and availability.</h2>
            <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
              Scholarship and sponsorship awards are subject to eligibility, available places, and
              confirmation by the school or sponsoring organisation. Include the learner’s level,
              campus preference, and recent results when making an enquiry.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/admissions/apply"
              className="inline-flex items-center gap-2 font-bold text-primary"
            >
              Start an enquiry <ArrowRight size={17} />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 font-bold text-primary">
              Contact the school <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
