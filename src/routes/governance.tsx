import { createFileRoute } from "@tanstack/react-router";
import { Building2, CheckCircle2, ShieldCheck, UsersRound } from "lucide-react";
import { PageIntro } from "@/components/school-layout";
import { schoolHead } from "@/lib/school";
import buyiAliceLamwaka from "@/assets/admin-buyi-alice-lamwaka-web.jpg";
import gwireMuhammad from "@/assets/admin-gwire-muhammad-web.jpg";
import mudeboAliMasai from "@/assets/admin-mudebo-ali-masai-web.jpg";
import nabukwasiPatience from "@/assets/admin-nabukwasi-patience-web.jpg";
import ocukulJulius from "@/assets/admin-ocukul-julius-web.jpg";
import sahamaliElias from "@/assets/admin-sahamali-elias-web.jpg";
import ssempalaNathan from "@/assets/admin-ssempala-nathan-web.jpg";
import wangotaJoshua from "@/assets/admin-wangota-joshua-web.jpg";
import wambogaAsuman from "@/assets/admin-wamboga-asuman-web.jpg";

export const Route = createFileRoute("/governance")({
  head: () =>
    schoolHead(
      "Governance and leadership",
      "Meet the Board of Governors and campus leadership team at Mbale Progressive Secondary School.",
      "/governance",
    ),
  component: Governance,
});

const dayCampusLeaders = [
  { name: "Mr. Ocukul Julius", role: "Head Teacher · Day Campus", photo: ocukulJulius },
  { name: "Mr. Ssempala Nathan", role: "Deputy · Academics", photo: ssempalaNathan },
  {
    name: "Ms. Nabukwasi Patience",
    role: "Deputy · Welfare and Administration",
    photo: nabukwasiPatience,
  },
  { name: "Mr. Sahamali Elias", role: "Director of Studies I", photo: sahamaliElias },
  { name: "Mr. Gwire Muhammad", role: "Director of Studies II", photo: gwireMuhammad },
];

const boardingLeaders = [
  { name: "Mr. Mudebo Ali Masai", role: "Head Teacher · Boarding", photo: mudeboAliMasai },
  { name: "Mrs. Buyi Alice Lamwaka", role: "Deputy Head Teacher", photo: buyiAliceLamwaka },
  { name: "Mr. Wamboga Asuman", role: "Director of Studies I", photo: wambogaAsuman },
  { name: "Mr. Wangota Joshua", role: "Director of Studies II", photo: wangotaJoshua },
];

function Governance() {
  return (
    <>
      <PageIntro eyebrow="GOVERNANCE & LEADERSHIP" title="The people responsible for school life.">
        The Board of Governors provides oversight. Campus leaders handle academics, welfare,
        administration, and studies across Day Campus and Mbale Progressive Annex.
      </PageIntro>

      <section className="site-width py-14 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="rounded-sm bg-muted p-7 md:p-9">
            <ShieldCheck className="text-primary" size={30} />
            <p className="eyebrow mt-6 text-primary">BOARD OF GOVERNORS</p>
            <h2 className="mt-3 text-3xl leading-tight">Strategic oversight and accountability.</h2>
            <p className="mt-5 leading-7 text-muted-foreground">
              The Board of Governors sets direction and holds school leadership accountable for
              learner welfare, teaching, resources, and day-to-day stewardship.
            </p>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <Building2 className="text-primary" size={23} />
              <h2 className="text-2xl">Leadership across both settings</h2>
            </div>
            <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
              Each setting has named leaders for the work families need to reach: academics,
              welfare, administration, and studies.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <LeadershipGroup title="Day Campus" leaders={dayCampusLeaders} />
              <LeadershipGroup title="Boarding" leaders={boardingLeaders} />
            </div>
          </div>
        </div>
      </section>

      <section
        className="border-t border-border bg-muted py-14 md:py-16"
        aria-labelledby="student-leadership-heading"
      >
        <div className="site-width">
          <p className="eyebrow text-primary">STUDENT LEADERSHIP</p>
          <h2 id="student-leadership-heading" className="mt-2 text-2xl md:text-3xl">
            A culture of trusted public leadership.
          </h2>
          <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
            A Mbale Progressive UNSA speaker contested at District level and emerged as the District
            UNSA Speaker. Other Progressive leaders have also contested and emerged victorious at
            District and Regional levels, showing the quality of leaders developed by the school and
            the trust they have earned among Progressive learners.
          </p>
        </div>
      </section>

      <section className="border-t border-border bg-background">
        <div className="site-width grid gap-6 py-14 md:grid-cols-3 md:py-16">
          {[
            [
              UsersRound,
              "Learner-centred",
              "Governance and leadership keep learner growth, safety, and belonging visible in everyday decisions.",
            ],
            [
              CheckCircle2,
              "Clear responsibility",
              "Academic, welfare, administration, and studies functions have named leaders across the two settings.",
            ],
            [
              ShieldCheck,
              "Accountable progress",
              "Oversight supports quality education, responsible stewardship, and continuous school improvement.",
            ],
          ].map(([Icon, title, text]) => {
            const FeatureIcon = Icon as typeof ShieldCheck;
            return (
              <div key={title as string} className="border-l-2 border-secondary pl-5">
                <FeatureIcon className="text-primary" size={22} />
                <h3 className="mt-4 text-xl">{title as string}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text as string}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

function LeadershipGroup({
  title,
  leaders,
}: {
  title: string;
  leaders: Array<{ name: string; role: string; photo: string }>;
}) {
  return (
    <div>
      <h3 className="text-xl">{title}</h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {leaders.map(({ name, role, photo }) => (
          <article
            key={name}
            className="overflow-hidden rounded-sm border border-border bg-background"
          >
            <img
              src={photo}
              alt={`Representative portrait for ${name}`}
              width={640}
              height={640}
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
            <div className="border-t border-border p-4">
              <p className="font-semibold text-primary">{name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{role}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
