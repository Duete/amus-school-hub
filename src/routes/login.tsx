import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, KeyRound, ShieldCheck, UserRound } from "lucide-react";
import { useState, type FormEvent } from "react";
import { PageIntro } from "@/components/school-layout";
import { Button } from "@/components/ui/button";
import { roleLabels, type UserRole, useAuth } from "@/lib/auth";
import { schoolHead } from "@/lib/school";

export const Route = createFileRoute("/login")({
  head: () =>
    schoolHead(
      "Sign in",
      "Sign in to the Mbale Progressive student, teacher, or administrator portal.",
    ),
  component: Login,
});

const roles: UserRole[] = ["student", "teacher", "administrator"];

function Login() {
  const navigate = useNavigate();
  const { user, signIn, demoAccounts } = useAuth();
  const [role, setRole] = useState<UserRole>("student");
  const [email, setEmail] = useState("student@mbaleprogressive.sc.ug");
  const [password, setPassword] = useState("student2026");
  const [error, setError] = useState("");

  if (user) {
    return (
      <>
        <PageIntro eyebrow="ACCOUNT" title={`You’re signed in as ${user.name}.`}>
          Your role is {roleLabels[user.role]}. Open the portal to see the tools and information
          available to this account.
        </PageIntro>
        <section className="site-width py-16">
          <Button asChild>
            <Link to="/portal">
              Open my portal <ArrowRight />
            </Link>
          </Button>
        </section>
      </>
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = signIn(email, password, role);
    if (!result.ok) {
      setError(result.message ?? "Unable to sign in.");
      return;
    }
    navigate({ to: "/portal" });
  }

  function chooseRole(nextRole: UserRole) {
    const account = demoAccounts.find((candidate) => candidate.role === nextRole);
    setRole(nextRole);
    if (account) {
      setEmail(account.email);
      setPassword(account.password);
    }
    setError("");
  }

  return (
    <>
      <PageIntro eyebrow="SECURE PORTAL" title="One platform, the right view for every role.">
        Sign in as a student, teacher, or administrator. Each role receives a different set of
        portal permissions.
      </PageIntro>
      <section className="site-width grid gap-12 py-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20 md:py-20">
        <div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-primary" size={25} />
            <h2 className="text-2xl">Role-based access</h2>
          </div>
          <p className="mt-4 leading-7 text-muted-foreground">
            Students see their own learning and finance information. Teachers see classroom and
            performance tools. Administrators manage admissions, finance, notifications, and users.
          </p>
          <div className="mt-8 space-y-3 text-sm text-muted-foreground">
            {roles.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => chooseRole(item)}
                className={`flex w-full items-center gap-3 rounded-sm border p-4 text-left transition-colors ${role === item ? "border-primary bg-muted text-primary" : "border-border hover:border-primary"}`}
              >
                <UserRound size={17} /> <span className="font-semibold">{roleLabels[item]}</span>
              </button>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="rounded-sm border border-border p-6 md:p-8">
          <div className="flex items-center gap-3">
            <KeyRound className="text-primary" size={23} />
            <h2 className="text-2xl">Sign in</h2>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Preview mode uses local demo accounts. Connect a server-side identity provider before
            production use.
          </p>
          <div className="mt-7 space-y-5">
            <label className="block space-y-2 text-sm font-semibold">
              Role
              <select
                value={role}
                onChange={(event) => chooseRole(event.target.value as UserRole)}
                className="form-input"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="administrator">Administrator</option>
              </select>
            </label>
            <label className="block space-y-2 text-sm font-semibold">
              Email
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="form-input"
              />
            </label>
            <label className="block space-y-2 text-sm font-semibold">
              Password
              <input
                required
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="form-input"
              />
            </label>
            {error && (
              <p
                role="alert"
                className="rounded-sm border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive"
              >
                {error}
              </p>
            )}
            <Button type="submit" size="lg" className="w-full">
              Sign in to portal <ArrowRight />
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}
