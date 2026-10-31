import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, BarChart3, BookOpenCheck, CalendarCheck2, Users } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageIntro } from "@/components/school-layout";
import { schoolHead } from "@/lib/school";

export const Route = createFileRoute("/performance")({
  head: () =>
    schoolHead(
      "Student performance",
      "Review a school performance analytics dashboard for attainment, attendance, subject results, and grade distribution.",
    ),
  component: Performance,
});

const trendData = [
  { term: "Term 1", average: 62, target: 65 },
  { term: "Term 2", average: 66, target: 67 },
  { term: "Term 3", average: 71, target: 70 },
  { term: "Term 1", average: 74, target: 72 },
  { term: "Term 2", average: 78, target: 74 },
  { term: "Term 3", average: 81, target: 76 },
];

const subjectData = [
  { subject: "English", score: 78 },
  { subject: "Maths", score: 74 },
  { subject: "Biology", score: 82 },
  { subject: "Chemistry", score: 69 },
  { subject: "Physics", score: 76 },
  { subject: "History", score: 85 },
];

const attendanceData = [
  { group: "S1–S2", attendance: 94 },
  { group: "S3–S4", attendance: 91 },
  { group: "S5–S6", attendance: 96 },
];

const gradeData = [
  { name: "Distinction", value: 28, color: "oklch(0.33 0.066 161)" },
  { name: "Credit", value: 44, color: "oklch(0.81 0.125 85)" },
  { name: "Pass", value: 21, color: "oklch(0.6 0.118 184.704)" },
  { name: "Support needed", value: 7, color: "oklch(0.72 0.11 35)" },
];

function Metric({
  value,
  label,
  change,
  icon: Icon,
}: {
  value: string;
  label: string;
  change: string;
  icon: typeof Users;
}) {
  return (
    <div className="rounded-sm border border-border bg-background p-5">
      <div className="flex items-start justify-between gap-4">
        <Icon className="text-primary" size={22} />
        <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
          <ArrowUpRight size={14} /> {change}
        </span>
      </div>
      <p className="mt-5 font-display text-3xl text-primary">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function Performance() {
  const [level, setLevel] = useState("Whole school");
  const [term, setTerm] = useState("Term 3 · 2026");
  const filteredSubjects = useMemo(
    () => (level === "A’level" ? subjectData.slice(0, 5) : subjectData),
    [level],
  );

  return (
    <>
      <PageIntro eyebrow="INSIGHT & PROGRESS" title="Performance, made visible.">
        A focused view of attainment, attendance, and subject-level movement so teachers can
        celebrate progress and act early when a learner needs support.
      </PageIntro>

      <div className="site-width py-12 md:py-16">
        <div className="flex flex-col justify-between gap-5 border-b border-border pb-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-primary">ANALYTICS DASHBOARD</p>
            <h2 className="mt-3 text-3xl">School performance snapshot</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Interface sample · figures are not an official examination report.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Level
              <select
                value={level}
                onChange={(event) => setLevel(event.target.value)}
                className="form-input mt-2 min-w-36 py-2 text-sm normal-case tracking-normal"
              >
                <option>Whole school</option>
                <option>O’level</option>
                <option>A’level</option>
              </select>
            </label>
            <label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Reporting period
              <select
                value={term}
                onChange={(event) => setTerm(event.target.value)}
                className="form-input mt-2 min-w-40 py-2 text-sm normal-case tracking-normal"
              >
                <option>Term 3 · 2026</option>
                <option>Term 2 · 2026</option>
                <option>Term 1 · 2026</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric value="81%" label="Average attainment" change="+7.2%" icon={BarChart3} />
          <Metric value="93.8%" label="Average attendance" change="+2.1%" icon={CalendarCheck2} />
          <Metric value="1,200" label="Learners represented" change="+4.5%" icon={Users} />
          <Metric value="72%" label="Target attainment" change="+5.6%" icon={BookOpenCheck} />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <section className="rounded-sm border border-border p-5 md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-xl">Average attainment trend</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Actual performance against the school target.
                </p>
              </div>
              <span className="text-xs font-semibold text-muted-foreground">{term}</span>
            </div>
            <div className="mt-8 h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 8, right: 12, left: -18, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 150)" />
                  <XAxis
                    dataKey="term"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "oklch(0.49 0.022 160)", fontSize: 12 }}
                  />
                  <YAxis
                    domain={[50, 90]}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "oklch(0.49 0.022 160)", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 4,
                      borderColor: "oklch(0.9 0.01 150)",
                      background: "oklch(1 0 0)",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="average"
                    name="Average attainment"
                    stroke="oklch(0.33 0.066 161)"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "oklch(0.33 0.066 161)" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    name="School target"
                    stroke="oklch(0.81 0.125 85)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="rounded-sm border border-border p-5 md:p-7">
            <h3 className="text-xl">Grade distribution</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Share of reported learner outcomes.
            </p>
            <div className="mt-3 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gradeData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={52}
                    outerRadius={82}
                    paddingAngle={3}
                    stroke="none"
                  >
                    {gradeData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              {gradeData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2 text-muted-foreground">
                  <span className="size-2 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span>
                    {entry.name} · {entry.value}%
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <section className="rounded-sm border border-border p-5 md:p-7">
            <h3 className="text-xl">Subject performance</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Average score by subject for {level.toLowerCase()}.
            </p>
            <div className="mt-8 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredSubjects}
                  layout="vertical"
                  margin={{ top: 0, right: 12, left: 10, bottom: 0 }}
                >
                  <CartesianGrid horizontal={false} stroke="oklch(0.9 0.01 150)" />
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "oklch(0.49 0.022 160)", fontSize: 12 }}
                  />
                  <YAxis
                    type="category"
                    dataKey="subject"
                    width={72}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "oklch(0.49 0.022 160)", fontSize: 12 }}
                  />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Bar
                    dataKey="score"
                    name="Average score"
                    fill="oklch(0.33 0.066 161)"
                    radius={[0, 3, 3, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="rounded-sm border border-border p-5 md:p-7">
            <h3 className="text-xl">Attendance by phase</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Daily attendance average for the selected period.
            </p>
            <div className="mt-8 space-y-7">
              {attendanceData.map((item) => (
                <div key={item.group}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-semibold">{item.group}</span>
                    <span className="text-muted-foreground">{item.attendance}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-muted">
                    <div
                      className="h-3 rounded-full bg-primary"
                      style={{ width: `${item.attendance}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 border-t border-border pt-5 text-sm leading-6 text-muted-foreground">
              <p className="font-semibold text-primary">Action signal</p>
              <p className="mt-2">
                S3–S4 attendance is below the whole-school average. Form tutors can use this view to
                plan timely follow-up.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
