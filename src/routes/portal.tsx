import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  BookOpenCheck,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  Gauge,
  GraduationCap,
  Clock3,
  LogOut,
  UsersRound,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { PageIntro } from "@/components/school-layout";
import { Button } from "@/components/ui/button";
import { roleLabels, useAuth } from "@/lib/auth";
import { getNotificationLog, type NotificationRecord } from "@/lib/notifications";
import { schoolHead } from "@/lib/school";

export const Route = createFileRoute("/portal")({
  head: () =>
    schoolHead(
      "My portal",
      "Role-based student, teacher, and administrator tools for Mbale Progressive Secondary School.",
    ),
  component: Portal,
});

function Portal() {
  const { user, isReady, hasPermission, signOut } = useAuth();
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);

  useEffect(() => {
    if (user?.role === "administrator") {
      setNotifications(getNotificationLog());
      const refresh = () => setNotifications(getNotificationLog());
      window.addEventListener("notification-log-updated", refresh);
      return () => window.removeEventListener("notification-log-updated", refresh);
    }
  }, [user?.role]);

  if (!isReady) return null;

  if (!user) {
    return (
      <>
        <PageIntro eyebrow="PORTAL" title="Sign in to access your role-based workspace.">
          Students, teachers, and administrators have separate tools and permissions.
        </PageIntro>
        <section className="site-width py-16">
          <Button asChild>
            <Link to="/login">
              Go to sign in <ArrowRight />
            </Link>
          </Button>
        </section>
      </>
    );
  }

  return (
    <>
      <PageIntro
        eyebrow={`${roleLabels[user.role].toUpperCase()} PORTAL`}
        title={`Good to see you, ${user.name.split(" ")[0]}.`}
      >
        You are signed in as a {roleLabels[user.role].toLowerCase()}. This workspace only shows the
        areas enabled for your role.
      </PageIntro>
      <main className="site-width py-12 md:py-16">
        <div className="flex flex-col justify-between gap-5 border-b border-border pb-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-primary">ACCOUNT OVERVIEW</p>
            <h2 className="mt-3 text-3xl">{user.email}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Role: {roleLabels[user.role]} · Preview session
            </p>
          </div>
          <Button variant="outline" onClick={signOut}>
            <LogOut /> Sign out
          </Button>
        </div>

        {user.role === "student" && <StudentPortal hasPermission={hasPermission} />}
        {user.role === "teacher" && <TeacherPortal hasPermission={hasPermission} />}
        {user.role === "administrator" && (
          <AdministratorPortal hasPermission={hasPermission} notifications={notifications} />
        )}
      </main>
    </>
  );
}

function StudentPortal({ hasPermission }: { hasPermission: (permission: string) => boolean }) {
  return (
    <div className="mt-8 space-y-8">
      <div className="grid gap-5 md:grid-cols-3">
        <PortalCard
          icon={Gauge}
          title="My performance"
          text="Review attainment trends and subject progress."
          href="/performance"
          enabled={hasPermission("view:own-performance")}
        />
        <PortalCard
          icon={CreditCard}
          title="My finances"
          text="View the learner statement and payment status."
          href="/finance"
          enabled={hasPermission("view:own-finance")}
        />
        <PortalCard
          icon={GraduationCap}
          title="Scholarships"
          text="Review sponsorship and merit-award pathways."
          href="/scholarships"
          enabled={hasPermission("view:own-profile")}
        />
      </div>
      <section className="grid gap-8 lg:grid-cols-2">
        <PortalRecordPanel
          icon={ClipboardList}
          title="My admissions applications"
          description="Track submitted enquiries and the next action for each pathway."
          action={{ label: "Start an application", href: "/admissions/apply" }}
        >
          <RecordTable
            headers={["Reference", "Pathway", "Status"]}
            rows={[["MPS-APP-240418", "O’level · Day", "Under review"]]}
          />
        </PortalRecordPanel>
        <PortalRecordPanel
          icon={CreditCard}
          title="My fee-payment records"
          description="Review your latest payment request and current clearance status."
          action={{ label: "Open fees & clearance", href: "/finance" }}
        >
          <RecordTable
            headers={["Reference", "Amount", "Status"]}
            rows={[["MPS-PAY-240418", "UGX 650,000", "Pending"]]}
          />
          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-secondary-foreground">
            <Clock3 size={15} /> Outstanding balance requires finance clearance.
          </div>
        </PortalRecordPanel>
      </section>
    </div>
  );
}

function TeacherPortal({ hasPermission }: { hasPermission: (permission: string) => boolean }) {
  return (
    <div className="mt-8 space-y-8">
      <div className="grid gap-5 md:grid-cols-3">
        <PortalCard
          icon={BookOpenCheck}
          title="Class performance"
          text="Use the analytics dashboard to spot progress and support needs."
          href="/performance"
          enabled={hasPermission("view:performance")}
        />
        <PortalCard
          icon={UsersRound}
          title="Faculty directory"
          text="Find subject heads and connect with colleagues."
          href="/faculty"
          enabled={hasPermission("view:faculty")}
        />
        <PortalCard
          icon={ClipboardList}
          title="Class records"
          text="Manage class-record workflows when a data source is connected."
          enabled={hasPermission("manage:class-records")}
        />
      </div>
      <section className="grid gap-8 lg:grid-cols-2">
        <PortalRecordPanel
          icon={ClipboardList}
          title="Admissions applications"
          description="Review application enquiries that need academic or campus follow-up."
          action={{ label: "Open admissions", href: "/admissions" }}
          enabled={hasPermission("view:admissions-records")}
        >
          <RecordTable
            headers={["Applicant", "Entry level", "Status"]}
            rows={[
              ["Amina Nankunda", "O’level · Day", "New"],
              ["Isaac Waiswa", "A’level · Boarding", "Academic review"],
            ]}
          />
        </PortalRecordPanel>
        <PortalRecordPanel
          icon={CreditCard}
          title="Fee-payment records"
          description="View payment requests linked to your assigned learners and flag follow-up items for finance."
          action={{ label: "Open fee portal", href: "/finance" }}
          enabled={hasPermission("view:fee-records")}
        >
          <RecordTable
            headers={["Learner", "Reference", "Status"]}
            rows={[
              ["Amina Nankunda", "MPS-PAY-240418", "Pending reconciliation"],
              ["Isaac Waiswa", "MPS-PAY-240401", "Cleared"],
            ]}
          />
        </PortalRecordPanel>
      </section>
    </div>
  );
}

function PortalRecordPanel({
  icon: Icon,
  title,
  description,
  action,
  enabled = true,
  children,
}: {
  icon: typeof Gauge;
  title: string;
  description: string;
  action: { label: string; href: string };
  enabled?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={`rounded-sm border border-border p-6 ${enabled ? "bg-background" : "bg-muted/60"}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Icon className="text-primary" size={22} />
          <h2 className="text-xl">{title}</h2>
        </div>
        {enabled ? (
          <CheckCircle2 className="text-primary" size={19} />
        ) : (
          <span className="text-xs font-semibold text-muted-foreground">Restricted</span>
        )}
      </div>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
      {enabled ? (
        <>
          <div className="mt-5 overflow-x-auto">{children}</div>
          <Button asChild variant="outline" className="mt-5">
            <Link to={action.href}>
              {action.label} <ArrowRight />
            </Link>
          </Button>
        </>
      ) : (
        <p className="mt-6 text-sm text-muted-foreground">
          This record area is not enabled for this role.
        </p>
      )}
    </section>
  );
}

function RecordTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <table className="w-full min-w-[420px] text-left text-sm">
      <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
        <tr>
          {headers.map((header) => (
            <th key={header} className="px-3 py-3 font-bold">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {rows.map((row, rowIndex) => (
          <tr key={`${row[0]}-${rowIndex}`}>
            {row.map((cell, cellIndex) => (
              <td
                key={`${cell}-${cellIndex}`}
                className={`px-3 py-3 ${cellIndex === row.length - 1 ? "font-semibold text-primary" : "text-muted-foreground"}`}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function AdministratorPortal({
  hasPermission,
  notifications,
}: {
  hasPermission: (permission: string) => boolean;
  notifications: NotificationRecord[];
}) {
  return (
    <div className="mt-8 space-y-8">
      <div className="grid gap-5 md:grid-cols-3">
        <PortalCard
          icon={ClipboardList}
          title="Admissions"
          text="Review application enquiries and follow up with families."
          href="/admissions"
          enabled={hasPermission("manage:admissions")}
        />
        <PortalCard
          icon={CreditCard}
          title="Finance"
          text="Review balances, payment requests, and clearance."
          href="/finance"
          enabled={hasPermission("manage:finance")}
        />
        <PortalCard
          icon={UsersRound}
          title="User access"
          text="Manage role assignments when the identity provider is connected."
          enabled={hasPermission("manage:users")}
        />
      </div>
      <section className="rounded-sm border border-border p-6 md:p-8">
        <div className="flex items-center gap-3">
          <Bell className="text-primary" size={22} />
          <h2 className="text-2xl">Notification activity</h2>
        </div>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Admissions and payment events appear here while the email dispatcher is in preview mode or
          when a provider endpoint is configured.
        </p>
        {notifications.length === 0 ? (
          <p className="mt-6 rounded-sm bg-muted p-5 text-sm text-muted-foreground">
            No notification events recorded in this browser session.
          </p>
        ) : (
          <div className="mt-6 divide-y divide-border border-y border-border">
            {notifications.slice(0, 6).map((item) => (
              <div key={item.id} className="grid gap-2 py-4 sm:grid-cols-[1fr_auto]">
                <div>
                  <p className="font-semibold">{item.subject}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.recipient} · {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
                <span className="text-xs font-bold uppercase text-primary">{item.status}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function PortalCard({
  icon: Icon,
  title,
  text,
  href,
  enabled,
}: {
  icon: typeof Gauge;
  title: string;
  text: string;
  href?: string;
  enabled: boolean;
}) {
  return (
    <article
      className={`rounded-sm border border-border p-6 ${enabled ? "bg-background" : "bg-muted/60"}`}
    >
      <Icon className="text-primary" size={23} />
      <h3 className="mt-5 text-xl">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
      {href && enabled ? (
        <Button asChild variant="outline" className="mt-6">
          <Link to={href}>
            Open <ArrowRight />
          </Link>
        </Button>
      ) : (
        <p className="mt-6 text-xs font-semibold text-muted-foreground">
          {enabled ? "Provisioned" : "Not enabled for this role"}
        </p>
      )}
    </article>
  );
}
