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
    </>
  );
}
