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

const oLevelCompulsorySubjects = [
  "Biology",
  "Chemistry",
  "Mathematics",
  "Physics",
  "English",
  "History and Political Education",
  "Geography",
];

const oLevelElectiveSubjects = [
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

const uce2025Performance = [
  ["PE", "0", "5", "8", "0", "0", "0", "13", "100.00%", "100.00%"],
  ["AGR", "0", "33", "108", "0", "2", "0", "143", "98.60%", "98.60%"],
  ["MAT", "5", "69", "329", "29", "5", "2", "439", "91.80%", "98.41%"],
  ["GEO", "5", "62", "324", "43", "3", "2", "439", "89.07%", "98.86%"],
  ["KIS", "0", "0", "8", "1", "0", "0", "9", "88.89%", "100.00%"],
  ["CRE", "1", "23", "236", "31", "1", "3", "295", "88.14%", "98.64%"],
  ["IRE", "0", "21", "90", "15", "0", "0", "126", "88.10%", "100.00%"],
  ["ICT", "0", "2", "104", "14", "0", "2", "122", "86.89%", "98.36%"],
  ["BIO", "1", "31", "346", "56", "2", "3", "439", "86.10%", "98.86%"],
  ["ENT", "1", "10", "67", "14", "0", "0", "92", "84.78%", "100.00%"],
  ["HIS", "1", "37", "320", "73", "6", "2", "439", "81.55%", "98.18%"],
  ["ENG", "3", "50", "293", "88", "3", "2", "439", "78.82%", "98.86%"],
  ["CHE", "0", "21", "314", "99", "2", "3", "439", "76.31%", "98.86%"],
  ["LUMASAABA", "0", "4", "2", "1", "1", "0", "8", "75.00%", "87.50%"],
  ["PHY", "1", "25", "290", "116", "4", "3", "439", "71.98%", "98.41%"],
  ["F/A", "0", "0", "20", "6", "1", "1", "28", "71.43%", "92.86%"],
  ["LIT", "0", "0", "5", "10", "0", "1", "16", "31.25%", "93.75%"],
  ["Sub Total", "18", "393", "2859", "586", "30", "23", "", "", ""],
  ["PROJECT", "332", "12", "92", "2", "1", "", "439", "99.32%", "99.77%"],
  ["Grand Total", "350", "405", "2951", "588", "31", "23", "", "", ""],
];

const ucePassRateChart = uce2025Performance
  .filter((row) => row[8] && row[9])
  .map(([subject, , , , , , , , passAc, passAd]) => ({
    subject,
    passAc: Number.parseFloat(passAc),
    passAd: Number.parseFloat(passAd),
  }));

const aLevelPrincipalSubjects = [
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

const aLevelSubsidiarySubjects = ["General Paper", "Subsidiary Mathematics", "Subsidiary ICT"];

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

function SubjectGroup({ title, subjects }: { title: string; subjects: string[] }) {
  return (
    <div>
      <h4 className="mb-4 text-xl text-foreground">{title}</h4>
      <SubjectList subjects={subjects} />
    </div>
  );
}

function UcePassRateChart() {
  return (
    <figure
      className="border border-border bg-background p-5 md:p-6"
      aria-labelledby="uce-chart-title"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-primary">GRAPHICAL VIEW</p>
          <figcaption id="uce-chart-title" className="mt-2 text-2xl">
            2025 UCE pass rates by subject
          </figcaption>
        </div>
        <div
          className="flex gap-4 text-xs font-semibold text-muted-foreground"
          aria-label="Chart legend"
        >
          <span className="inline-flex items-center gap-2">
            <span className="size-2 rounded-full bg-primary" aria-hidden="true" /> A–C
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-2 rounded-full bg-secondary" aria-hidden="true" /> A–D
          </span>
        </div>
      </div>
      <div className="mt-7 space-y-3">
        {ucePassRateChart.map(({ subject, passAc, passAd }) => (
          <div
            key={subject}
            className="grid grid-cols-[72px_1fr] items-center gap-3 text-xs sm:grid-cols-[92px_1fr_1fr] sm:gap-4"
          >
            <span className="font-semibold text-primary">{subject}</span>
            <div className="space-y-1 sm:contents">
              <div
                className="flex items-center gap-2"
                role="img"
                aria-label={`${subject} A to C pass rate ${passAc.toFixed(2)} percent`}
              >
                <div className="h-2 flex-1 bg-muted" aria-hidden="true">
                  <div className="h-full bg-primary" style={{ width: `${passAc}%` }} />
                </div>
                <span className="w-14 text-right tabular-nums text-muted-foreground">
                  {passAc.toFixed(2)}%
                </span>
              </div>
              <div
                className="flex items-center gap-2"
                role="img"
                aria-label={`${subject} A to D pass rate ${passAd.toFixed(2)} percent`}
              >
                <div className="h-2 flex-1 bg-muted" aria-hidden="true">
                  <div className="h-full bg-secondary" style={{ width: `${passAd}%` }} />
                </div>
                <span className="w-14 text-right tabular-nums text-muted-foreground">
                  {passAd.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs leading-5 text-muted-foreground">
        Bars show the same percentages listed in the table below. Project Work is included as
        PROJECT; subtotal and grand-total rows are excluded from the subject comparison.
      </p>
    </figure>
  );
}

function Academics() {
  return (
    <>
      <PageIntro eyebrow="ACADEMICS" title="Learning with purpose, from UCE to UACE.">
        Mbale Progressive offers two stages of secondary education. O’level covers more than 17
        subjects and leads to UCE; A’level covers more than 15 subjects and leads to UACE. More than
        400 UCE and 300 UACE candidates complete their courses each year.
      </PageIntro>

      <section className="site-width grid gap-10 py-14 md:grid-cols-4 md:gap-8 md:py-16">
        <Stat value="1,500+" label="students across both campuses" icon={Users} />
        <Stat value="400+" label="UCE candidates each year" icon={GraduationCap} />
        <Stat value="300+" label="UACE candidates each year" icon={Lightbulb} />
        <Stat value="17+ / 15+" label="UCE / UACE subject areas" icon={BookOpen} />
      </section>

      <div className="border-t border-border">
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
                    More than 17 subject areas give learners room to explore academic, creative,
                    practical, and personal strengths.
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
            <div className="grid gap-10 lg:grid-cols-2">
              <SubjectGroup title="Compulsory subjects" subjects={oLevelCompulsorySubjects} />
              <SubjectGroup title="Elective subjects" subjects={oLevelElectiveSubjects} />
            </div>

            <section
              className="mt-16 border-t border-border pt-10"
              id="uce-performance"
              aria-labelledby="uce-performance-heading"
            >
              <div className="flex flex-wrap items-end justify-between gap-5">
                <div>
                  <p className="eyebrow text-primary">2025 UCE RESULTS</p>
                  <h3 id="uce-performance-heading" className="mt-2 text-3xl">
                    Subject performance
                  </h3>
                </div>
                <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                  The 2025 UCE results below show the grade distribution by subject. Pass A–C counts
                  grades A through C; pass A–D also includes grade D.
                </p>
              </div>
              <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
                <UcePassRateChart />
                <aside
                  className="border-l-2 border-secondary bg-muted p-6"
                  aria-labelledby="excellence-heading"
                >
                  <p className="eyebrow text-primary">A RECORD WORTH NOTING</p>
                  <h4 id="excellence-heading" className="mt-3 text-2xl">
                    Commitment to excellence
                  </h4>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    The 2025 results show what focused teaching, disciplined preparation, and steady
                    learner support can produce across the curriculum. Mbale Progressive’s
                    commitment to excellence is also reflected in the best student in the NLSC UCE
                    2025 results, who scored 9 As in 9 subjects and an A in Project Work.
                  </p>
                </aside>
              </div>
              <div className="mt-8 overflow-x-auto border border-border">
                <table className="min-w-[980px] w-full border-collapse text-xs tabular-nums">
                  <caption className="sr-only">
                    Mbale Progressive 2025 UCE subject performance
                  </caption>
                  <colgroup>
                    <col className="w-[150px]" />
                    {Array.from({ length: 7 }, (_, index) => (
                      <col key={`grade-column-${index}`} className="w-[58px]" />
                    ))}
                    <col className="w-[105px]" />
                    <col className="w-[115px]" />
                  </colgroup>
                  <thead className="bg-primary text-primary-foreground">
                    <tr>
                      <th scope="col" className="px-3 py-3 text-left font-bold">
                        Subject
                      </th>
                      {["A", "B", "C", "D", "E", "X", "TTL", "% Pass A–C", "% Pass A–D"].map(
                        (heading) => (
                          <th
                            key={heading}
                            scope="col"
                            className="whitespace-nowrap px-3 py-3 text-right font-bold"
                          >
                            {heading}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {uce2025Performance.map((row) => {
                      const isSummary = ["Sub Total", "PROJECT", "Grand Total"].includes(row[0]);
                      return (
                        <tr
                          key={row[0]}
                          className={
                            isSummary
                              ? "bg-muted font-bold text-foreground"
                              : "border-t border-border text-muted-foreground"
                          }
                        >
                          {row.map((value, index) => (
                            <td
                              key={`${row[0]}-${index}`}
                              className={`whitespace-nowrap px-3 py-3 text-right ${index === 0 ? "text-left font-semibold text-primary" : ""}`}
                            >
                              {value || "—"}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
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
                    <p className="font-display text-3xl text-primary">300+</p>
                    <p className="mt-1 text-sm text-muted-foreground">UACE candidates each year</p>
                  </div>
                  <div className="bg-background p-5">
                    <p className="font-display text-3xl text-primary">40:1</p>
                    <p className="mt-1 text-sm text-muted-foreground">student-to-teacher ratio</p>
                  </div>
                  <div className="bg-background p-5">
                    <p className="font-display text-3xl text-primary">15+</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      principal and subsidiary subjects
                    </p>
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
              <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr]">
                <SubjectGroup title="Principal subjects" subjects={aLevelPrincipalSubjects} />
                <SubjectGroup title="Subsidiary subjects" subjects={aLevelSubsidiarySubjects} />
              </div>

              <article className="mt-16 grid gap-8 border-t border-secondary pt-10 md:grid-cols-[0.8fr_1.2fr] md:items-center">
                <div>
                  <p className="eyebrow text-primary">A’LEVEL ACHIEVEMENT · UACE 2025</p>
                  <h3 className="mt-3 text-3xl md:text-4xl">Worasi Joel</h3>
                  <p className="mt-2 text-sm font-semibold text-primary">Best UACE 2025 student</p>
                </div>
                <div className="border-l-2 border-secondary pl-6">
                  <p className="font-display text-4xl text-primary">18 points</p>
                  <p className="mt-2 text-lg font-semibold">2ABB3 · BCM / ICT</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    A strong A’Level result in Biology, Chemistry, Mathematics, and ICT. Worasi
                    Joel’s performance reflects the focus and steady preparation expected of
                    Progressive learners at UACE.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
