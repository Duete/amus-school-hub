import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/school-layout";
import { Button } from "@/components/ui/button";
import { schoolHead } from "@/lib/school";
import schoolLife from "@/assets/school-life.jpg";
export const Route = createFileRoute("/about")({
  head: () =>
    schoolHead(
      "About Mbale Progressive",
      "Learn about Mbale Progressive Secondary School, established in 1993 in Mbale City, Eastern Uganda.",
      "/about",
    ),
  component: About,
});
function About() {
  return (
    <>
      <PageIntro eyebrow="ABOUT THE SCHOOL" title="Founded in 1993.">
        Mbale Progressive Secondary School is a mixed day and boarding secondary school serving
        learners in Mbale City, Eastern Uganda.
      </PageIntro>
      <section className="site-width grid items-center gap-12 py-16 md:grid-cols-2">
        <figure>
          <img
            src={schoolLife}
            alt="Illustrative school-life image"
            width={1920}
            height={1024}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-md object-cover"
          />
          <figcaption className="mt-2 text-xs text-muted-foreground">
            Illustrative image, not a documentary photograph of the school.
          </figcaption>
        </figure>
        <div>
          <h2 className="text-3xl">Founding history</h2>
          <p className="mt-5 leading-7 text-muted-foreground">
            The school was founded by the late Ambassador Dr. Hassan Waswa Ggaliwango. Hajji Imran
            Muluga was among its early teaching partners. Established as Mbale Progressive Academy,
            it is now known as Mbale Progressive Secondary School.
          </p>
          <p className="mt-4 leading-7 text-muted-foreground">
            The school has a Day Campus on Nyanza Road near Namatala and a boarding campus known as
            Mbale Progressive Annex.
          </p>
          <Button asChild className="mt-6">
            <Link to="/campuses">Explore our campuses</Link>
          </Button>
        </div>
      </section>

      <section
        className="border-y border-border bg-muted py-14 md:py-16"
        aria-labelledby="leadership-heading"
      >
        <div className="site-width grid gap-6 md:grid-cols-[auto_1fr] md:gap-8">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full bg-background text-primary"
            aria-hidden="true"
          >
            <span className="font-display text-xl">L</span>
          </div>
          <div>
            <p className="eyebrow text-primary">LEADERSHIP IN THE COMMUNITY</p>
            <h2 id="leadership-heading" className="mt-2 text-2xl md:text-3xl">
              Learners trusted to lead.
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
              A Mbale Progressive UNSA speaker contested at District level and emerged as the
              District UNSA Speaker. This achievement follows other school leaders who have
              contested and emerged victorious at both District and Regional levels, reflecting the
              quality of leadership developed at Progressive and the trust learners place in the
              school.
            </p>
            <Button asChild variant="link" className="mt-3 px-0">
              <Link to="/news">Read the latest leadership news</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
