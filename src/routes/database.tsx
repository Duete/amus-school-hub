import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Database,
  FileCheck2,
  GraduationCap,
  KeyRound,
  MailCheck,
  ServerCog,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import { PageIntro } from "@/components/school-layout";
import { Button } from "@/components/ui/button";
import { schoolHead } from "@/lib/school";

export const Route = createFileRoute("/database")({
  head: () =>
    schoolHead(
      "Database architecture",
      "Preview the persistent PostgreSQL schema and backend integration architecture for Mbale Progressive Secondary School.",
    ),
  component: DatabaseArchitecture,
});

const tables = [
  ["Identity", "app_user · user_role_assignment · auth_session"],
  ["Learners", "student_profile · guardian · student_guardian"],
  ["Admissions", "admissions_application"],
  ["Finance", "fee_account · fee_line_item · payment"],
  ["Operations", "notification · audit_log"],
];

function DatabaseArchitecture() {
  return (
    <>
      <PageIntro eyebrow="DATA ARCHITECTURE" title="A durable foundation for the school hub.">
        This preview shows how the frontend, Express API, PostgreSQL schema, payment provider, and
        email outbox fit together before production credentials are connected.
      </PageIntro>
      <section className="site-width py-12 md:py-16">
        <div className="rounded-sm border border-border bg-muted p-5 md:p-8">
          <div className="flex items-center gap-3">
            <ServerCog className="text-primary" size={24} />
            <h2 className="text-2xl">Request flow</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-5 md:items-center">
            <ArchitectureNode
              icon={GraduationCap}
              label="Frontend forms"
              detail="Admissions · Payments"
            />
            <Arrow className="hidden md:block" />
            <ArchitectureNode icon={ServerCog} label="Express API" detail="Validate · Authorize" />
            <Arrow className="hidden md:block" />
            <ArchitectureNode icon={Database} label="PostgreSQL" detail="Persist · Audit" />
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-5 md:items-center">
            <div className="hidden md:block" />
            <div className="hidden md:block" />
            <div className="hidden md:block" />
            <Arrow className="hidden md:block" />
            <div className="grid gap-4 sm:grid-cols-2">
              <ArchitectureNode
                icon={WalletCards}
                label="Payment gateway"
                detail="Verified webhooks"
              />
              <ArchitectureNode
                icon={MailCheck}
                label="Email worker"
                detail="Notification outbox"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tables.map(([title, contents]) => (
            <article key={title} className="rounded-sm border border-border p-6">
              <Database className="text-primary" size={22} />
              <h3 className="mt-4 text-xl">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{contents}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-sm border border-border p-6 md:p-8">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-primary" size={22} />
              <h2 className="text-2xl">Security boundaries</h2>
            </div>
            <ul className="mt-6 space-y-4 text-sm leading-6 text-muted-foreground">
              <li>Server-only database credentials and email/payment provider secrets.</li>
              <li>HttpOnly sessions with role checks enforced in API handlers.</li>
              <li>Payment confirmation only from a verified provider webhook.</li>
              <li>
                Audit records for role changes, application review, payment state changes, and
                notification retries.
              </li>
            </ul>
          </section>
          <section className="rounded-sm border border-border bg-accent p-6 md:p-8">
            <KeyRound className="text-primary" size={22} />
            <h2 className="mt-4 text-2xl">Implementation status</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              The Express API and migration/seed commands are in the repository. Connect
              `DATABASE_URL`, run the migration, seed development data, and set `VITE_API_BASE_URL`
              to switch the forms from preview mode.
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link to="/login">
                Open role sign-in <ArrowRight />
              </Link>
            </Button>
          </section>
        </div>
      </section>
    </>
  );
}

function ArchitectureNode({
  icon: Icon,
  label,
  detail,
}: {
  icon: typeof Database;
  label: string;
  detail: string;
}) {
  return (
    <div className="rounded-sm border border-border bg-background p-5 text-center">
      <Icon className="mx-auto text-primary" size={25} />
      <p className="mt-3 font-semibold">{label}</p>
      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
    </div>
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <div className={className}>
      <ArrowRight className="mx-auto text-secondary" size={22} />
    </div>
  );
}
