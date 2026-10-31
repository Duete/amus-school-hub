import { createFileRoute } from "@tanstack/react-router";
import { Building2, CheckCircle2, ShieldCheck, UsersRound } from "lucide-react";
import { PageIntro } from "@/components/school-layout";
import { schoolHead } from "@/lib/school";

export const Route = createFileRoute("/governance")({
  head: () =>
    schoolHead(
      "Governance and leadership",
      "Meet the Board of Governors and campus leadership team at Mbale Progressive Secondary School.",
    ),
  component: Governance,
});

const dayCampusLeaders = [
  ["Mr. Ocukul Julius", "Head Teacher · Day Campus"],
  ["Mr. Ssempala Nathan", "Deputy · Academics"],
  ["Ms. Nabukwasi Patience", "Deputy · Welfare and Administration"],
  ["Mr. Sahamali Elias", "Director of Studies I"],
  ["Mr. Gwire Muhammad", "Director of Studies II"],
];

const boardingLeaders = [
  ["Mr. Mudebo Ali Masai", "Head Teacher · Boarding"],
  ["Mrs. Buyi Alice Lamwaka", "Deputy Head Teacher"],
  ["Mr. Wamboga Asuman", "Director of Studies I"],
  ["Mr. Wangota Joshua", "Director of Studies II"],
];

function Governance() {
  return (
    <>
      <PageIntro
        eyebrow="GOVERNANCE & LEADERSHIP"
        title="Steady leadership for a growing school community."
      >
        Mbale Progressive Secondary School is supported by governance that keeps accountability,
        learner welfare, and quality education at the centre of school life.
      </PageIntro>

      <section className="site-width py-14 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="rounded-sm bg-muted p-7 md:p-9">
            <ShieldCheck className="text-primary" size={30} />
            <p className="eyebrow mt-6 text-primary">BOARD OF GOVERNORS</p>
            <h2 className="mt-3 text-3xl leading-tight">Strategic oversight and accountability.</h2>
            <p className="mt-5 leading-7 text-muted-foreground">
              The Board of Governors provides strategic oversight, ensures accountability, and
              supports school leadership in delivering quality education. It also provides a
              governance framework for responsible decisions that serve learners, families, staff,
              and the wider school community.
            </p>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <Building2 className="text-primary" size={23} />
              <h2 className="text-2xl">Leadership across both settings</h2>
            </div>
            <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
              Our Day Campus and Boarding setting have dedicated leaders for academics, welfare,
              administration, and studies.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <LeadershipGroup title="Day Campus" leaders={dayCampusLeaders} />
              <LeadershipGroup title="Boarding" leaders={boardingLeaders} />
            </div>
          </div>
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

function LeadershipGroup({ title, leaders }: { title: string; leaders: string[][] }) {
  return (
    <div className="rounded-sm border border-border p-5">
      <h3 className="text-xl">{title}</h3>
      <div className="mt-5 divide-y divide-border border-y border-border">
        {leaders.map(([name, role]) => (
          <div key={name} className="py-4">
            <p className="font-semibold text-primary">{name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
