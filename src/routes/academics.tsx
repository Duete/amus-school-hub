import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/school-layout";
import { schoolHead } from "@/lib/school";
export const Route = createFileRoute("/academics")({
  head: () =>
    schoolHead(
      "Academics",
      "Learn about UCE/O-Level and UACE/A-Level pathways at Mbale Progressive Secondary School.",
    ),
  component: Academics,
});
function Academics() {
  return (
    <>
      <PageIntro eyebrow="ACADEMICS" title="Two stages of secondary education.">
        Mbale Progressive Secondary School offers O-Level studies leading to UCE, followed by
        A-Level studies leading to UACE.
      </PageIntro>
      <section className="site-width grid gap-x-16 gap-y-12 py-16 md:grid-cols-2">
        {[
          {
            title: "O-Level · UCE",
            text: "The O-Level pathway leads to the Uganda Certificate of Education (UCE).",
          },
          {
            title: "A-Level · UACE",
            text: "The A-Level pathway leads to the Uganda Advanced Certificate of Education (UACE).",
          },
        ].map(({ title, text }) => (
          <div key={title}>
            <h2 className="text-2xl">{title}</h2>
            <p className="mt-4 leading-7 text-muted-foreground">{text}</p>
          </div>
        ))}
        <p className="leading-7 text-muted-foreground md:col-span-2">
          Subject offerings and A-Level combinations can change; confirm current options directly
          with the school.
        </p>
      </section>
    </>
  );
}
