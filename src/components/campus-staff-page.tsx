import { Link } from "@tanstack/react-router";
import { Mail, UsersRound } from "lucide-react";
import { directorsOfStudies, faculty, type FacultyMember } from "@/lib/faculty";

export type StaffCampus = "Day Campus" | "Boarding";

export function CampusStaffPage({ campus }: { campus: StaffCampus }) {
  const campusMembers = faculty.filter((member) => member.campus === campus);
  const heads = campusMembers.filter((member) => member.head);
  const teachingStaff = campusMembers.filter((member) => !member.head);
  const leaders = directorsOfStudies.filter((leader) => leader.campus === campus);
  const isBoarding = campus === "Boarding";

  return (
    <>
      <section className="bg-primary py-16 text-primary-foreground md:py-20">
        <div className="site-width">
          <p className="text-sm font-semibold tracking-[0.04em] text-secondary">Academics</p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-tight md:text-6xl">
            {campus} teaching staff
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-primary-foreground/80">
            Meet the teachers and academic leaders supporting learners at the {campus}.
          </p>
        </div>
      </section>
      <div className="border-b border-border bg-background">
        <nav className="site-width flex flex-wrap gap-2 py-5" aria-label="Teaching staff pages">
          <Link to="/faculty" className="academic-tab">
            Staff overview
          </Link>
          <Link
            to="/faculty/day"
            className={`academic-tab ${campus === "Day Campus" ? "academic-tab-active" : ""}`}
            aria-current={campus === "Day Campus" ? "page" : undefined}
          >
            Day Campus staff
          </Link>
          <Link
            to="/faculty/boarding"
            className={`academic-tab ${isBoarding ? "academic-tab-active" : ""}`}
            aria-current={isBoarding ? "page" : undefined}
          >
            Boarding staff
          </Link>
        </nav>
      </div>
      <div className="site-width py-16 md:py-20">
        <div className="grid gap-8 border-b border-border pb-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-primary">
              Campus academic office
            </p>
            <h2 className="mt-3 text-4xl leading-tight md:text-5xl">
              A team close to each learner.
            </h2>
          </div>
          <p className="max-w-2xl border-l-2 border-secondary pl-5 leading-7 text-muted-foreground">
            The {campus} team brings subject expertise, assessment planning, and learner support
            together for the school day and the wider academic journey.
          </p>
        </div>

        {leaders.length > 0 && (
          <section className="mt-12" aria-labelledby="campus-leadership-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-primary">
              Academic leadership
            </p>
            <h2 id="campus-leadership-heading" className="mt-3 text-3xl">
              Directors of Studies
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {leaders.map((leader) => (
                <article key={leader.name} className="bg-primary p-5 text-primary-foreground">
                  <img
                    src={leader.photo}
                    alt={`Portrait of ${leader.name}`}
                    width={800}
                    height={800}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <h3 className="mt-4 text-xl">{leader.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-secondary">{leader.role}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        <StaffGroup title="Heads of departments" members={heads} highlight />
        <StaffGroup title="Teaching staff" members={teachingStaff} />

        {campusMembers.length === 0 && (
          <div className="mt-12 border border-dashed border-border p-10 text-center">
            <UsersRound className="mx-auto text-muted-foreground" size={26} />
            <p className="mt-4 font-semibold">No staff entries are listed for this campus yet.</p>
          </div>
        )}
      </div>
    </>
  );
}

function StaffGroup({
  title,
  members,
  highlight = false,
}: {
  title: string;
  members: FacultyMember[];
  highlight?: boolean;
}) {
  if (members.length === 0) return null;
  return (
    <section
      className="mt-12 border-t border-border pt-10"
      aria-labelledby={title.replaceAll(" ", "-").toLowerCase()}
    >
      <h2 id={title.replaceAll(" ", "-").toLowerCase()} className="text-3xl">
        {title}
      </h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <StaffCard key={member.name} member={member} highlight={highlight} />
        ))}
      </div>
    </section>
  );
}

function StaffCard({ member, highlight = false }: { member: FacultyMember; highlight?: boolean }) {
  return (
    <article
      className={`flex h-full flex-col border border-border p-6 ${highlight ? "bg-muted" : "bg-background"}`}
    >
      <div className="relative flex aspect-[4/3] items-end justify-between gap-4 bg-primary p-5 text-primary-foreground">
        {member.photo ? (
          <img
            src={member.photo}
            alt={`Portrait of ${member.name}`}
            width={800}
            height={800}
            loading="lazy"
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <div className="flex size-20 items-center justify-center border border-primary-foreground/40 bg-primary-foreground/10 text-2xl font-semibold">
            {member.name
              .split(" ")
              .map((part) => part[0])
              .slice(0, 2)
              .join("")}
          </div>
        )}
        {member.head && (
          <span className="relative bg-secondary px-3 py-1 text-[10px] font-bold tracking-[0.04em] text-secondary-foreground">
            Subject head
          </span>
        )}
      </div>
      <h3 className="mt-5 text-xl">{member.name}</h3>
      <p className="mt-1 text-sm font-semibold text-primary">{member.role}</p>
      <p className="mt-4 text-sm font-semibold">{member.subjects}</p>
      <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{member.bio}</p>
      <div className="mt-6 space-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
        <p>{member.department}</p>
        <p>{member.campus}</p>
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
          >
            <Mail size={14} /> {member.email}
          </a>
        )}
      </div>
    </article>
  );
}
