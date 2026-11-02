import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, GraduationCap, UsersRound } from "lucide-react";
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
          aria-labelledby="alumni-heading"
        >
          <div>
            <p className="text-sm font-semibold tracking-[0.04em] text-primary">Stay connected</p>
            <h2 id="alumni-heading" className="mt-3 max-w-sm text-4xl leading-tight md:text-5xl">
              The school changes. The connection remains.
            </h2>
          </div>
          <div className="border-l-2 border-secondary pl-6">
            <p className="max-w-2xl text-base leading-8 text-muted-foreground">
              Alumni carry the habits, friendships, and lessons formed at Mbale Progressive into new
              workplaces, communities, and generations. This page is a place to return to the
              school, share an update, and keep the door open for the people who came after you.
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

        <section className="mt-20 grid gap-5 md:grid-cols-2" aria-label="Alumni connection options">
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
            <UsersRound className="text-primary" size={30} strokeWidth={1.5} />
            <h2 className="mt-6 text-2xl">Return to the school</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Whether you are planning a visit, reconnecting with a teacher, or asking about a
              school event, start with the contact page so the office can guide you.
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
