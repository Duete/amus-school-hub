import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Search, UsersRound } from "lucide-react";
import { useMemo, useState } from "react";
import { schoolHead } from "@/lib/school";

export const Route = createFileRoute("/faculty")({
  head: () =>
    schoolHead(
      "Teaching Staff",
      "Meet the subject heads, teachers, and learner support team at Mbale Progressive Secondary School.",
      "/faculty",
    ),
  component: TeachingStaff,
});

type FacultyMember = {
  name: string;
  role: string;
  department: string;
  subjects: string;
  campus: string;
  bio: string;
  email: string;
  head?: boolean;
};

const faculty: FacultyMember[] = [
  {
    name: "Ms. Sarah Namukasa",
    role: "Head of Mathematics",
    department: "Mathematics & Sciences",
    subjects: "Mathematics · Further Mathematics",
    campus: "Day Campus",
    bio: "Leads numeracy planning across both levels and mentors learners through problem-solving clinics.",
    email: "s.namukasa@mbaleprogressive.sc.ug",
    head: true,
  },
  {
    name: "Mr. Isaac Waiswa",
    role: "Head of Science",
    department: "Mathematics & Sciences",
    subjects: "Chemistry · Integrated Science",
    campus: "Mbale Progressive Annex",
    bio: "Coordinates practical learning, laboratory safety, and science enrichment activities.",
    email: "i.waiswa@mbaleprogressive.sc.ug",
    head: true,
  },
  {
    name: "Ms. Agnes Nakitto",
    role: "Head of Languages",
    department: "Languages & Humanities",
    subjects: "English Language · Literature",
    campus: "Day Campus",
    bio: "Supports confident communication through reading, writing, debate, and performance.",
    email: "a.nakitto@mbaleprogressive.sc.ug",
    head: true,
  },
  {
    name: "Mr. Daniel Kato",
    role: "Head of Humanities",
    department: "Languages & Humanities",
    subjects: "History · Geography",
    campus: "Day Campus",
    bio: "Connects classroom learning to Uganda’s history, place, culture, and civic responsibility.",
    email: "d.kato@mbaleprogressive.sc.ug",
    head: true,
  },
  {
    name: "Ms. Ruth Atim",
    role: "Head of ICT & Innovation",
    department: "Technology & Enterprise",
    subjects: "ICT · Computer Studies · Entrepreneurship",
    campus: "Mbale Progressive Annex",
    bio: "Guides digital fluency, research skills, and enterprise projects for modern readiness.",
    email: "r.atim@mbaleprogressive.sc.ug",
    head: true,
  },
  {
    name: "Mr. Peter Ssenyonjo",
    role: "Senior Teacher",
    department: "Mathematics & Sciences",
    subjects: "Physics · Mathematics",
    campus: "Mbale Progressive Annex",
    bio: "Uses practical demonstrations to make abstract ideas visible and memorable.",
    email: "p.ssenyonjo@mbaleprogressive.sc.ug",
  },
  {
    name: "Ms. Esther Nalubega",
    role: "Senior Teacher",
    department: "Mathematics & Sciences",
    subjects: "Biology · Agriculture",
    campus: "Day Campus",
    bio: "Champions fieldwork, environmental awareness, and learner wellbeing.",
    email: "e.nalubega@mbaleprogressive.sc.ug",
  },
  {
    name: "Mr. Joseph Mugisha",
    role: "Teacher",
    department: "Languages & Humanities",
    subjects: "Kiswahili · French",
    campus: "Day Campus",
    bio: "Builds language confidence and cultural curiosity through conversation-led learning.",
    email: "j.mugisha@mbaleprogressive.sc.ug",
  },
  {
    name: "Ms. Lydia Achieng",
    role: "Teacher",
    department: "Languages & Humanities",
    subjects: "Christian Religious Education · General Paper",
    campus: "Mbale Progressive Annex",
    bio: "Helps learners examine ideas, values, and contemporary issues with care and clarity.",
    email: "l.achieng@mbaleprogressive.sc.ug",
  },
  {
    name: "Mr. Robert Ouma",
    role: "Teacher",
    department: "Technology & Enterprise",
    subjects: "Technology & Design · Technical Drawing",
    campus: "Mbale Progressive Annex",
    bio: "Develops hands-on making, design thinking, and safe workshop practice.",
    email: "r.ouma@mbaleprogressive.sc.ug",
  },
  {
    name: "Ms. Fiona Nambassa",
    role: "Learner Support Lead",
    department: "Learner Support",
    subjects: "Guidance · Study Skills · Careers",
    campus: "Day Campus",
    bio: "Coordinates mentoring, study habits, and pathways conversations for learners and families.",
    email: "f.nambassa@mbaleprogressive.sc.ug",
  },
  {
    name: "Mr. Michael Okello",
    role: "Sports & Activities Lead",
    department: "Learner Support",
    subjects: "Physical Education · Sports Leadership",
    campus: "Day Campus",
    bio: "Uses sport and co-curricular activities to grow teamwork, confidence, and belonging.",
    email: "m.okello@mbaleprogressive.sc.ug",
  },
];

const departments = [
  "All departments",
  ...Array.from(new Set(faculty.map((member) => member.department))),
];

function AcademicTabs() {
  return (
    <nav className="flex flex-wrap gap-2" aria-label="Academic sections">
      <a href="/academics#olevel" className="academic-tab">
        O’Level
      </a>
      <a href="/academics#alevel" className="academic-tab">
        A’Level
      </a>
      <Link to="/academics" className="academic-tab">
        Academic programme
      </Link>
      <Link to="/faculty" className="academic-tab academic-tab-active" aria-current="page">
        Teaching staff
      </Link>
    </nav>
  );
}

function TeachingStaff() {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All departments");
  const subjectHeads = faculty.filter((member) => member.head);
  const visibleFaculty = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();
    return faculty.filter((member) => {
      const matchesDepartment =
        department === "All departments" || member.department === department;
      const searchText =
        `${member.name} ${member.role} ${member.subjects} ${member.campus}`.toLowerCase();
      return matchesDepartment && (!normalizedQuery || searchText.includes(normalizedQuery));
    });
  }, [department, query]);

  return (
    <>
      <section className="bg-primary py-16 text-primary-foreground md:py-20">
        <div className="site-width">
          <p className="text-sm font-semibold tracking-[0.04em] text-secondary">Academics</p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-tight md:text-6xl">Teaching staff</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-primary-foreground/80">
            Subject knowledge, practical guidance, and steady support from S.1 through UACE.
          </p>
        </div>
      </section>

      <div className="border-b border-border bg-background">
        <div className="site-width py-5">
          <AcademicTabs />
        </div>
      </div>

      <div className="site-width py-16 md:py-20">
        <section aria-labelledby="staff-overview-heading">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold tracking-[0.04em] text-primary">Our teachers</p>
              <h2 id="staff-overview-heading" className="mt-3 text-4xl leading-tight md:text-5xl">
                People who know their subjects and their learners.
              </h2>
            </div>
            <p className="max-w-2xl border-l-2 border-secondary pl-5 leading-7 text-muted-foreground">
              Mbale Progressive’s teaching staff brings academic expertise, practical experience,
              and close learner support together across O’Level and A’Level. Begin with subject
              heads, then search the full directory.
            </p>
          </div>

          <div className="mt-10 grid gap-4 border-y border-border py-6 sm:grid-cols-3">
            <StaffStat value={String(faculty.length)} label="directory entries" />
            <StaffStat value={String(subjectHeads.length)} label="subject and programme leads" />
            <StaffStat value="2" label="campuses served" />
          </div>
        </section>

        <section className="mt-16" aria-labelledby="subject-heads-heading">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-sm font-semibold tracking-[0.04em] text-primary">
                Academic leadership
              </p>
              <h2 id="subject-heads-heading" className="mt-3 text-3xl">
                Subject heads
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              Subject heads coordinate planning, assessment quality, and teacher collaboration in
              their learning areas.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {subjectHeads.map((member) => (
              <StaffCard key={member.name} member={member} highlight />
            ))}
          </div>
        </section>

        <section className="mt-20 border-t border-border pt-12" aria-labelledby="directory-heading">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold tracking-[0.04em] text-primary">
                Teaching staff directory
              </p>
              <h2 id="directory-heading" className="mt-3 text-3xl">
                Find a teacher or learning area
              </h2>
            </div>
            <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
              <label className="relative block sm:min-w-64">
                <span className="sr-only">Search teaching staff</span>
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={17}
                />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="form-input pl-10"
                  placeholder="Search by name or subject"
                />
              </label>
              <label>
                <span className="sr-only">Filter by department</span>
                <select
                  value={department}
                  onChange={(event) => setDepartment(event.target.value)}
                  className="form-input min-w-52"
                >
                  {departments.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Showing {visibleFaculty.length} of {faculty.length} directory entries.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visibleFaculty.map((member) => (
              <StaffCard key={member.name} member={member} />
            ))}
          </div>
          {visibleFaculty.length === 0 && (
            <div className="mt-8 border border-dashed border-border p-10 text-center">
              <UsersRound className="mx-auto text-muted-foreground" size={26} />
              <p className="mt-4 font-semibold">No teaching staff match that search.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try a different name, subject, or department.
              </p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

function StaffStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l-2 border-secondary pl-4">
      <p className="font-display text-3xl text-primary">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function StaffCard({ member, highlight = false }: { member: FacultyMember; highlight?: boolean }) {
  return (
    <article
      className={`flex h-full flex-col border border-border p-6 ${highlight ? "bg-muted" : "bg-background"}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
          {member.name
            .split(" ")
            .map((part) => part[0])
            .slice(0, 2)
            .join("")}
        </div>
        {member.head && (
          <span className="bg-secondary px-3 py-1 text-[10px] font-bold tracking-[0.04em] text-secondary-foreground">
            Subject head
          </span>
        )}
      </div>
      <h3 className="mt-6 text-xl">{member.name}</h3>
      <p className="mt-1 text-sm font-semibold text-primary">{member.role}</p>
      <p className="mt-4 text-sm font-semibold">{member.subjects}</p>
      <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{member.bio}</p>
      <div className="mt-6 space-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
        <p>{member.department}</p>
        <p>{member.campus}</p>
        <a
          href={`mailto:${member.email}`}
          className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
        >
          <Mail size={14} /> {member.email}
        </a>
      </div>
    </article>
  );
}
