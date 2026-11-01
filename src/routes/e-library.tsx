import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BookOpen, GraduationCap, Layers3 } from "lucide-react";
import { PageIntro } from "@/components/school-layout";
import { schoolHead } from "@/lib/school";

export const Route = createFileRoute("/e-library")({
  head: () =>
    schoolHead(
      "e-Library",
      "Browse Mbale Progressive Secondary School e-Library shelves by O-Level and A-Level class and subject.",
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
    groups: [
      { title: "Principal subject shelves", subjects: aLevelPrincipal },
      { title: "Subsidiary shelves", subjects: aLevelSubsidiary },
    ],
  },
  {
    name: "S.6",
    description: "Focus revision around UACE preparation, examination technique, and next steps.",
    groups: [
      { title: "Principal subject shelves", subjects: aLevelPrincipal },
      { title: "Subsidiary shelves", subjects: aLevelSubsidiary },
    ],
  },
];

function SubjectShelf({ subject }: { subject: string }) {
  return (
    <li className="flex items-start gap-3 border-t border-border py-3 text-sm leading-6">
      <BookOpen className="mt-1 shrink-0 text-primary" size={16} strokeWidth={1.7} />
      <span>{subject}</span>
    </li>
  );
}

function ClassCard({ shelf }: { shelf: ClassShelf }) {
  return (
    <article className="border border-border bg-background p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-primary">CLASS SHELF</p>
          <h3 className="mt-2 text-3xl">{shelf.name}</h3>
        </div>
        <Layers3 className="text-primary" size={25} strokeWidth={1.6} />
      </div>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{shelf.description}</p>
      <div className="mt-6 space-y-7">
        {shelf.groups.map((group) => (
          <div key={group.title}>
            <h4 className="mb-2 text-lg">{group.title}</h4>
            <ul>
              {group.subjects.map((subject) => (
                <SubjectShelf key={subject} subject={subject} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
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
            <p className="font-display text-3xl text-primary">30+</p>
            <p className="mt-1 text-sm text-muted-foreground">
              subject areas across the two levels
            </p>
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
    </>
  );
}
