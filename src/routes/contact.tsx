import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/school-layout";
import { Button } from "@/components/ui/button";
import { campuses, schoolHead } from "@/lib/school";

export const Route = createFileRoute("/contact")({
  head: () =>
    schoolHead(
      "Contact Mbale Progressive",
      "View the Mbale Progressive Secondary School campus settings and locations. Official contact channels are awaiting confirmation.",
    ),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageIntro eyebrow="CONTACT US" title="Find our campuses.">
        Mbale Progressive Secondary School is based in Mbale City. Campus settings and location
        details are shown below.
      </PageIntro>
      <section className="site-width py-16">
        <div className="grid gap-10 md:grid-cols-2">
          {campuses.map((campus) => (
            <div key={campus.slug}>
              <MapPin className="text-primary" />
              <h2 className="mt-4 text-2xl">{campus.name}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{campus.setting}</p>
              <Button asChild variant="link" className="mt-4 px-0">
                <Link to="/campuses/$campus" params={{ campus: campus.slug }}>
                  Explore this campus <ArrowRight />
                </Link>
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-border pt-8">
          <h2 className="text-2xl">Official enquiry channels</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
            Verified phone, email, and messaging details have not yet been supplied for this
            website. They will be added once confirmed by the school.
          </p>
        </div>
      </section>
    </>
  );
}
