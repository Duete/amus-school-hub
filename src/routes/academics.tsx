import { createFileRoute } from "@tanstack/react-router";
import {
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  Lightbulb,
  Scale,
  Users,
} from "lucide-react";
import { PageIntro } from "@/components/school-layout";
import { schoolHead } from "@/lib/school";

export const Route = createFileRoute("/academics")({
  head: () =>
    schoolHead(
      "Academics",
      "Explore O’level and A’level pathways, subjects, curriculum principles, and student support at Mbale Progressive Secondary School.",
    ),
  component: Academics,
});

const oLevelSubjects = [
  "English Language",
  "Mathematics",
  "Biology",
  "Chemistry",
  "Physics",
  "Geography",
  "History",
  "Christian Religious Education",
  "Islamic Religious Education",
  "Entrepreneurship",
  "Agriculture",
  "Information and Communication Technology",
  "Fine Art",
  "Music",
  "Physical Education",
  "Literature in English",
  "Kiswahili",
  "French",
  "Luganda",
  "Local Language",
  "Technology and Design",
  "Nutrition and Food Technology",
];

const aLevelSubjects = [
  "General Paper",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Geography",
  "History",
  "Economics",
  "Entrepreneurship",
  "Agriculture",
  "Computer Studies",
  "Information and Communication Technology",
  "Art",
  "Literature in English",
  "Divinity",
  "French",
  "Kiswahili",
  "Technical Drawing",
];

const oLevelPrinciples = [
  [
    "Competency-based",
    "Learners build skills they can apply in real-world situations, not only recall facts.",
  ],
  [
    "Learner-centred",
    "Teaching responds to learner needs and interests through active participation and exploration.",
  ],
  [
    "Skills first",
    "Communication, problem-solving, critical thinking, creativity, and collaboration are developed deliberately.",
  ],
  [
    "Knowledge in action",
    "Research, projects, and practical activities help learners connect classroom knowledge to life.",
  ],
  [
    "Values and citizenship",
    "The curriculum develops responsible, self-assured, and patriotic young people.",
  ],
];

const oLevelOutcomes = [
  "Self-assured individuals who can make decisions and take responsibility for their learning.",
  "Responsible and patriotic citizens who contribute positively to their communities.",
  "Lifelong learners who embrace improvement and continued discovery.",
  "Positive contributors to society with useful knowledge, skills, and values.",
];

const aLevelFocus = [
  [
    "Practical skills",
    "Learning connects theory to practice and builds tools that remain useful beyond school.",
  ],
  [
    "Competency-based learning",
    "Assessment values what learners can demonstrate, alongside what they know.",
  ],
  [
    "Modern readiness",
    "ICT, research techniques, financial literacy, and adaptable skills prepare learners for a changing workforce.",
  ],
  [
    "A seamless progression",
    "The abridged higher secondary curriculum is designed to connect with Uganda’s National Lower Secondary Curriculum.",
  ],
  [
    "Modular assessment",
    "Under the UACE approach, learners can retake failed subjects instead of repeating the entire examination.",
  ],
];

function Stat({ value, label, icon: Icon }: { value: string; label: string; icon: typeof Users }) {
  return (
    <div className="border-l-2 border-secondary pl-4">
      <Icon className="mb-3 text-primary" size={22} strokeWidth={1.7} />
      <p className="font-display text-3xl text-primary">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function SubjectList({ subjects }: { subjects: string[] }) {
  return (
    <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
      {subjects.map((subject) => (
        <li
          key={subject}
          className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"
        >
          <CheckCircle2 className="mt-1 shrink-0 text-primary" size={15} />
          <span>{subject}</span>
        </li>
      ))}
    </ul>
  );
}

function Academics() {
  return (
    <>
      <PageIntro eyebrow="ACADEMICS" title="Learning with purpose, from UCE to UACE.">
        Mbale Progressive Secondary School offers two connected stages of secondary education. Our
        O’level programme builds a broad foundation, while A’level helps learners deepen their
        strengths and prepare for life beyond school.
      </PageIntro>

      <section className="site-width grid gap-10 py-14 md:grid-cols-4 md:gap-8 md:py-16">
        <Stat value="20+" label="O’level subjects of study" icon={BookOpen} />
        <Stat value="800" label="O’level learners enrolled" icon={GraduationCap} />
        <Stat value="17+" label="A’level subjects of study" icon={Lightbulb} />
        <Stat value="400" label="A’level learners enrolled" icon={Users} />
      </section>

      <main className="border-t border-border">
        <section className="site-width py-16 md:py-20" id="olevel">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="eyebrow text-primary">LOWER SECONDARY · UCE</p>
              <h2 className="mt-4 text-4xl leading-tight md:text-5xl">
                O’level: a broad foundation for every learner.
              </h2>
              <p className="mt-6 leading-7 text-muted-foreground">
                Everyone deserves a chance to shine, whatever their interests and passions. Our
                O’level curriculum keeps choice central and gives each learner a balanced foundation
                for the Uganda Certificate of Education (UCE).
              </p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div className="rounded-sm bg-muted p-5">
                  <Users className="text-primary" size={22} />
                  <p className="mt-4 font-display text-2xl text-primary">Good support</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    A good teacher–student ratio helps learners receive attention, guidance, and
                    encouragement.
                  </p>
                </div>
                <div className="rounded-sm bg-muted p-5">
                  <Scale className="text-primary" size={22} />
                  <p className="mt-4 font-display text-2xl text-primary">Balanced choice</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    More than 20 subjects give learners room to explore academic, creative,
                    technical, and practical strengths.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <BadgeCheck className="text-primary" size={22} />
                  <h3 className="text-2xl">Curriculum principles</h3>
                </div>
                <div className="divide-y divide-border border-y border-border">
                  {oLevelPrinciples.map(([title, text]) => (
                    <div key={title} className="grid gap-1 py-4 sm:grid-cols-[170px_1fr] sm:gap-5">
                      <p className="font-semibold text-primary">{title}</p>
                      <p className="text-sm leading-6 text-muted-foreground">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <GraduationCap className="text-primary" size={19} />
                    <h3 className="text-xl">Key outcomes</h3>
                  </div>
                  <ul className="space-y-3">
                    {oLevelOutcomes.map((outcome) => (
                      <li
                        key={outcome}
                        className="flex gap-2 text-sm leading-6 text-muted-foreground"
                      >
                        <CheckCircle2 className="mt-1 shrink-0 text-primary" size={15} />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-sm border border-border p-5">
                  <ClipboardCheck className="text-primary" size={22} />
                  <h3 className="mt-4 text-xl">Assessment</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Continuous assessment and project work complement end-of-cycle examinations, so
                    progress is measured throughout the learning journey.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-border pt-10">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow text-primary">SUBJECTS OF STUDY</p>
                <h3 className="mt-2 text-3xl">A wide O’level offering</h3>
              </div>
              <p className="max-w-md text-sm leading-6 text-muted-foreground">
                Subject choices can be guided by learner interests, strengths, and future plans.
              </p>
            </div>
            <SubjectList subjects={oLevelSubjects} />
          </div>
        </section>

        <section className="bg-muted" id="alevel">
          <div className="site-width py-16 md:py-20">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
              <div>
                <p className="eyebrow text-primary">HIGHER SECONDARY · UACE</p>
                <h2 className="mt-4 text-4xl leading-tight md:text-5xl">
                  A’level: deepen strengths, discover direction.
                </h2>
                <p className="mt-6 max-w-2xl leading-7 text-muted-foreground">
                  A’level gives learners time to find their direction and prepare for life beyond
                  school. The abridged Ugandan higher secondary curriculum is practical,
                  competency-based, and designed to bridge the gap between theory and practice.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="bg-background p-5">
                    <p className="font-display text-3xl text-primary">400</p>
                    <p className="mt-1 text-sm text-muted-foreground">learners enrolled</p>
                  </div>
                  <div className="bg-background p-5">
                    <p className="font-display text-3xl text-primary">40:1</p>
                    <p className="mt-1 text-sm text-muted-foreground">student-to-teacher ratio</p>
                  </div>
                  <div className="bg-background p-5">
                    <p className="font-display text-3xl text-primary">17+</p>
                    <p className="mt-1 text-sm text-muted-foreground">subjects of study</p>
                  </div>
                </div>
              </div>
              <div className="border-l-2 border-secondary pl-6 lg:pl-10">
                <div className="mb-5 flex items-center gap-3">
                  <Lightbulb className="text-primary" size={22} />
                  <h3 className="text-2xl">What A’level develops</h3>
                </div>
                <div className="space-y-6">
                  {aLevelFocus.map(([title, text]) => (
                    <div key={title}>
                      <p className="font-semibold text-primary">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-16 border-t border-border pt-10">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="eyebrow text-primary">SUBJECTS OF STUDY</p>
                  <h3 className="mt-2 text-3xl">A’level pathways and combinations</h3>
                </div>
                <p className="max-w-md text-sm leading-6 text-muted-foreground">
                  Learners build combinations that support university, professional, technical, and
                  entrepreneurial ambitions.
                </p>
              </div>
              <SubjectList subjects={aLevelSubjects} />
            </div>
          </div>
        </section>
      </main>

      <section className="site-width py-12 text-sm leading-6 text-muted-foreground md:py-16">
        <p>
          Curriculum framing follows the competency-based direction described by the Uganda
          curriculum pages for{" "}
          <a
            className="font-semibold text-primary underline underline-offset-4"
            href="https://gayazahs.sc.ug/academics/olevel/"
            target="_blank"
            rel="noreferrer"
          >
            O’level
          </a>{" "}
          and{" "}
          <a
            className="font-semibold text-primary underline underline-offset-4"
            href="https://gayazahs.sc.ug/academics/alevel/"
            target="_blank"
            rel="noreferrer"
          >
            A’level
          </a>
          .
        </p>
      </section>
    </>
  );
}
