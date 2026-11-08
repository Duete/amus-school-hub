import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  FileText,
  FlaskConical,
  GraduationCap,
  Layers3,
} from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/school-layout";
import { schoolHead } from "@/lib/school";
import { aLevelClassResources, type LearningResource } from "@/lib/learning-resources";

export const Route = createFileRoute("/e-library")({
  head: () =>
    schoolHead(
      "e-Library",
      "Browse Mbale Progressive Secondary School e-Library shelves by O-Level and A-Level class, subject, and simulation.",
      "/e-library",
    ),
  component: ELibrary,
});

type SubjectGroup = {
  title: string;
  subjects: string[];
};

type ClassShelf = {
  name: string;
  description: string;
  groups: SubjectGroup[];
  resources?: Record<string, LearningResource[]>;
};

const oLevelCore = [
  "Biology",
  "Chemistry",
  "Mathematics",
  "Physics",
  "English",
  "History and Political Education",
  "Geography",
];

const oLevelElectives = [
  "Agriculture",
  "Art and Design",
  "Christian Religious Education",
  "Islamic Religious Education",
  "Entrepreneurship",
  "Information and Communication Technology",
  "Local Languages",
  "Kiswahili",
  "Literature",
  "Physical Education",
  "Foreign Languages",
  "Nutrition and Food Technology",
  "Performing Arts",
  "Technology and Design",
];

const aLevelPrincipal = [
  "Biology",
  "Chemistry",
  "Mathematics",
  "Physics",
  "History",
  "Geography",
  "Literature",
  "Christian Religious Education",
  "Local Languages",
  "Kiswahili",
  "Fine Art",
  "Entrepreneurship",
  "Islamic Religious Education",
  "Agriculture",
  "Economics",
];

const aLevelSubsidiary = ["General Paper", "Subsidiary Mathematics", "Subsidiary ICT"];

const oLevelClasses: ClassShelf[] = [
  {
    name: "S.1",
    description: "Start with the core concepts and build a reliable study routine.",
    groups: [
      { title: "Core subjects", subjects: oLevelCore },
      { title: "Elective shelves", subjects: oLevelElectives },
    ],
  },
  {
    name: "S.2",
    description: "Strengthen subject fluency through notes, practice, and reading.",
    groups: [
      { title: "Core subjects", subjects: oLevelCore },
      { title: "Elective shelves", subjects: oLevelElectives },
    ],
  },
  {
    name: "S.3",
    description: "Connect topics, revise deliberately, and prepare for deeper assessment.",
    groups: [
      { title: "Core subjects", subjects: oLevelCore },
      { title: "Elective shelves", subjects: oLevelElectives },
    ],
  },
  {
    name: "S.4",
    description: "Organise final UCE revision by subject, topic, and past-paper practice.",
    groups: [
      { title: "Core subjects", subjects: oLevelCore },
      { title: "Elective shelves", subjects: oLevelElectives },
    ],
  },
];

const aLevelClasses: ClassShelf[] = [
  {
    name: "S.5",
    description: "Settle into subject combinations and develop independent study habits.",
    resources: aLevelClassResources["S.5"],
    groups: [
      { title: "Principal subject shelves", subjects: aLevelPrincipal },
      { title: "Subsidiary shelves", subjects: aLevelSubsidiary },
    ],
  },
  {
    name: "S.6",
    description: "Focus revision around UACE preparation, examination technique, and next steps.",
    resources: aLevelClassResources["S.6"],
    groups: [
      { title: "Principal subject shelves", subjects: aLevelPrincipal },
      { title: "Subsidiary shelves", subjects: aLevelSubsidiary },
    ],
  },
];

function SubjectShelf({ subject, resources }: { subject: string; resources?: LearningResource[] }) {
  return (
    <li className="flex items-start gap-3 border-t border-border py-3 text-sm leading-6">
      <BookOpen className="mt-1 shrink-0 text-primary" size={16} strokeWidth={1.7} />
      <div className="min-w-0 flex-1">
        <span>{subject}</span>
        {resources?.map((resource) => (
          <a
            key={resource.href}
            href={resource.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${resource.title} in a new tab`}
            className="mt-3 flex max-w-xl items-start gap-3 border border-border bg-card p-3 transition-colors hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <FileText
              className="mt-0.5 shrink-0 text-primary"
              size={17}
              strokeWidth={1.7}
              aria-hidden="true"
            />
            <span className="min-w-0 flex-1">
              <span className="block font-semibold">{resource.title}</span>
              <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                {resource.description}
              </span>
              <span className="mt-2 block text-xs font-semibold text-primary">
                Open learning item
              </span>
            </span>
            <ArrowUpRight className="mt-0.5 shrink-0 text-primary" size={16} aria-hidden="true" />
          </a>
        ))}
      </div>
    </li>
  );
}

function ClassCard({ shelf }: { shelf: ClassShelf }) {
  return (
    <details className="group border border-border bg-background">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
        <div className="flex min-w-0 items-start gap-3">
          <Layers3
            className="mt-1 shrink-0 text-primary"
            size={20}
            strokeWidth={1.6}
            aria-hidden="true"
          />
          <div className="min-w-0">
            <p className="eyebrow text-primary">CLASS SHELF</p>
            <h3 className="mt-2 text-3xl">{shelf.name}</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{shelf.description}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3 text-primary">
          <ChevronDown
            className="transition-transform group-open:rotate-180"
            size={18}
            aria-hidden="true"
          />
          <span className="sr-only">Open {shelf.name} subjects</span>
        </div>
      </summary>
      <div className="space-y-7 border-t border-border px-6 pb-6 pt-4">
        {shelf.groups.map((group) => (
          <div key={group.title}>
            <h4 className="mb-2 text-lg">{group.title}</h4>
            <ul>
              {group.subjects.map((subject) => (
                <SubjectShelf
                  key={subject}
                  subject={subject}
                  resources={shelf.resources?.[subject]}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </details>
  );
}

function LevelSection({
  id,
  eyebrow,
  title,
  description,
  icon: Icon,
  classes,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: typeof GraduationCap;
  classes: ClassShelf[];
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-t border-border py-16 md:py-20"
      aria-labelledby={`${id}-heading`}
    >
      <div className="site-width">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div>
            <div className="flex items-center gap-3 text-primary">
              <Icon size={25} strokeWidth={1.7} />
              <p className="eyebrow">{eyebrow}</p>
            </div>
            <h2 id={`${id}-heading`} className="mt-4 text-4xl leading-tight md:text-5xl">
              {title}
            </h2>
            <p className="mt-5 max-w-md leading-7 text-muted-foreground">{description}</p>
            <p className="mt-6 border-l-2 border-secondary pl-4 text-sm leading-6 text-muted-foreground">
              Choose a class shelf, then find the subject area you need. School-approved notes,
              reading lists, revision guides, and past papers can be attached to each subject shelf.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {classes.map((shelf) => (
              <ClassCard key={shelf.name} shelf={shelf} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ELibrary() {
  return (
    <>
      <PageIntro eyebrow="E-LIBRARY" title="A subject shelf for every class.">
        Browse learning materials by pathway, class, and subject. The e-Library gives learners a
        clear route from their class shelf to the topics they are studying.
      </PageIntro>

      <section className="site-width py-12 md:py-16" aria-label="e-Library overview">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="border-l-2 border-secondary pl-4">
            <p className="font-display text-3xl text-primary">2</p>
            <p className="mt-1 text-sm text-muted-foreground">learning pathways</p>
          </div>
          <div className="border-l-2 border-secondary pl-4">
            <p className="font-display text-3xl text-primary">6</p>
            <p className="mt-1 text-sm text-muted-foreground">class shelves from S.1 to S.6</p>
          </div>
          <div className="border-l-2 border-secondary pl-4">
            <p className="font-display text-3xl text-primary">20+ / 17+</p>
            <p className="mt-1 text-sm text-muted-foreground">O-Level / A-Level subject options</p>
          </div>
        </div>
        <nav className="mt-12 flex flex-wrap gap-3" aria-label="e-Library level navigation">
          <a
            href="#olevel"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
          >
            O-Level shelves <ArrowRight size={15} />
          </a>
          <a
            href="#alevel"
            className="inline-flex items-center gap-2 rounded-full border border-primary px-4 py-2 text-sm font-bold text-primary"
          >
            A-Level shelves <ArrowRight size={15} />
          </a>
          <a
            href="#simulations"
            className="inline-flex items-center gap-2 rounded-full border border-primary px-4 py-2 text-sm font-bold text-primary"
          >
            Simulations <ArrowRight size={15} />
          </a>
        </nav>
      </section>

      <LevelSection
        id="olevel"
        eyebrow="O-LEVEL · UCE"
        title="S.1 to S.4 class shelves."
        description="Build a broad lower-secondary foundation with compulsory subjects and room for elective interests."
        icon={BookOpen}
        classes={oLevelClasses}
      />
      <LevelSection
        id="alevel"
        eyebrow="A-LEVEL · UACE"
        title="S.5 and S.6 class shelves."
        description="Work through principal and subsidiary subjects with a sharper focus on UACE, combinations, and next steps."
        icon={GraduationCap}
        classes={aLevelClasses}
      />
      <section
        id="simulations"
        className="scroll-mt-28 border-t border-border bg-muted py-16 md:py-20"
        aria-labelledby="simulations-heading"
      >
        <div className="site-width">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <div className="flex items-center gap-3 text-primary">
                <FlaskConical size={25} strokeWidth={1.7} />
                <p className="eyebrow">SIMULATIONS</p>
              </div>
              <h2 id="simulations-heading" className="mt-4 text-4xl leading-tight md:text-5xl">
                See difficult ideas in motion.
              </h2>
              <p className="mt-5 max-w-md leading-7 text-muted-foreground">
                Use interactive models to explore science and mathematics concepts, test variables,
                and connect classroom explanations to observable results.
              </p>
            </div>
            <article className="border border-border bg-background p-6 md:p-8">
              <p className="eyebrow text-primary">EXTERNAL LEARNING RESOURCE</p>
              <h3 className="mt-3 text-3xl">PhET Interactive Simulations</h3>
              <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
                Explore free, research-based simulations for physics, chemistry, mathematics, and
                other science topics. Learners should use the simulations alongside class notes and
                teacher guidance.
              </p>
              <a
                href="https://phet.colorado.edu/"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 font-bold text-primary underline underline-offset-4"
              >
                Open PhET simulations <ArrowRight size={16} />
              </a>
              <p className="mt-4 text-xs leading-5 text-muted-foreground">
                Opens the PhET website in a new tab. Mbale Progressive Secondary School does not
                host or control the external resource.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
