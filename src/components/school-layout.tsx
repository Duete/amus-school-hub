import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, BookOpen, ChevronDown, LogIn, Menu, UserCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

const navigation = [
  { type: "link", name: "Our school", to: "/about" },
  { type: "link", name: "Governance", to: "/governance" },
  {
    type: "group",
    name: "Campus life",
    children: [
      { name: "Campus life", to: "/campus-life" },
      { name: "Our campuses", to: "/campuses" },
      { name: "Sports & student life", to: "/sports" },
    ],
  },
  {
    type: "group",
    name: "Learning",
    children: [
      { name: "Learning", to: "/academics" },
      { name: "Performance", to: "/performance" },
    ],
  },
  { type: "link", name: "Faculty", to: "/faculty" },
  { type: "link", name: "Fees & clearance", to: "/finance" },
  { type: "link", name: "Admissions", to: "/admissions" },
  { type: "link", name: "Contact", to: "/contact" },
] as const;

export function SchoolHeader() {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const isActive = (to: string) =>
    location.pathname === to || location.pathname.startsWith(`${to}/`);
  return (
    <>
      <div className="bg-primary text-primary-foreground">
        <div className="site-width flex min-h-9 items-center justify-between gap-3 text-xs">
          <span>Mixed day and boarding secondary education in Mbale City.</span>
          <Link to="/contact" className="flex items-center gap-2">
            Campus information <ArrowRight size={13} />
          </Link>
        </div>
      </div>
      <header className="border-b border-border bg-background">
        <div className="site-width flex h-24 items-center justify-between gap-6">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-3"
            aria-label="Mbale Progressive Secondary School home"
          >
            <span className="flex h-12 w-11 items-center justify-center rounded-b-xl border-2 border-primary text-primary">
              <BookOpen size={25} strokeWidth={1.5} />
            </span>
            <span>
              <span className="block font-display text-lg font-semibold text-primary sm:text-xl">
                MBALE PROGRESSIVE
              </span>
              <span className="block text-[10px] font-bold text-muted-foreground">
                SECONDARY SCHOOL · EST. 1993
              </span>
            </span>
          </Link>
          <nav aria-label="Main navigation" className="hidden items-center gap-5 xl:flex">
            {navigation.map((item) =>
              item.type === "link" ? (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`border-b-2 py-3 text-sm font-semibold transition-colors ${isActive(item.to) ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-primary"}`}
                >
                  {item.name}
                </Link>
              ) : (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(item.name)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <button
                    type="button"
                    className={`flex items-center gap-1 border-b-2 py-3 text-sm font-semibold transition-colors ${item.children.some((child) => isActive(child.to)) ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-primary"}`}
                    aria-expanded={activeMenu === item.name}
                    onClick={() => setActiveMenu(activeMenu === item.name ? null : item.name)}
                  >
                    {item.name}
                    <ChevronDown size={15} />
                  </button>
                  {activeMenu === item.name && (
                    <div className="absolute left-0 top-full z-40 min-w-56 border border-border bg-background p-2 shadow-xl">
                      <p className="px-3 pb-2 pt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                        Explore {item.name}
                      </p>
                      {item.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          onClick={() => setActiveMenu(null)}
                          className={`block px-3 py-2 text-sm font-semibold ${isActive(child.to) ? "bg-muted text-primary" : "text-foreground hover:bg-muted hover:text-primary"}`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ),
            )}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            {user ? (
              <>
                <Button asChild variant="outline" size="sm">
                  <Link to="/portal">
                    <UserCircle /> {user.name.split(" ")[0]}
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  Sign out
                </Button>
              </>
            ) : (
              <Button asChild variant="outline" size="sm">
                <Link to="/login">
                  <LogIn /> Sign in
                </Link>
              </Button>
            )}
            <Button asChild>
              <Link to="/admissions">
                Admission enquiries <ArrowRight />
              </Link>
            </Button>
          </div>
          <Button
            className="xl:hidden"
            variant="ghost"
            size="icon"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
        {open && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="site-width flex flex-col gap-1 pb-5"
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
          >
            {navigation.map((item) =>
              item.type === "link" ? (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-3 text-sm font-semibold"
                >
                  {item.name}
                </Link>
              ) : (
                <div key={item.name} className="border-b border-border pb-2">
                  <p className="py-3 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                    {item.name}
                  </p>
                  {item.children.map((child) => (
                    <Link
                      key={child.to}
                      to={child.to}
                      onClick={() => setOpen(false)}
                      className="block py-2 pl-3 text-sm font-semibold text-muted-foreground"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              ),
            )}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="py-3 text-sm font-semibold"
            >
              Visit & contact
            </Link>
            {user ? (
              <>
                <Link
                  to="/portal"
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-3 text-sm font-semibold"
                >
                  My portal · {user.name.split(" ")[0]}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    setOpen(false);
                  }}
                  className="py-3 text-left text-sm font-semibold"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-semibold"
              >
                Sign in
              </Link>
            )}
          </nav>
        )}
      </header>
    </>
  );
}

export function SchoolFooter() {
  return (
    <footer className="bg-primary py-12 text-primary-foreground">
      <div className="site-width">
        <div className="flex flex-col justify-between gap-8 sm:flex-row">
          <div>
            <h2 className="font-display text-2xl">Mbale Progressive Secondary School</h2>
            <p className="mt-3 max-w-md text-sm text-primary-foreground/75">
              A mixed day and boarding secondary school in Mbale City, Uganda. Established in 1993.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            <Link to="/campuses">Our campuses</Link>
            <Link to="/campus-life">Campus life</Link>
            <Link to="/governance">Governance</Link>
            <Link to="/academics">Learning</Link>
            <Link to="/faculty">Faculty</Link>
            <Link to="/performance">Performance</Link>
            <Link to="/finance">Fees & clearance</Link>
            <Link to="/sports">Sports & student life</Link>
            <Link to="/admissions">Admissions</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div className="mt-9 flex flex-wrap justify-between gap-3 border-t border-primary-foreground/20 pt-5 text-xs text-primary-foreground/60">
          <span>© {new Date().getFullYear()} Mbale Progressive Secondary School</span>
          <span>Illustrative photography · Campus images are not documentary photographs</span>
        </div>
      </div>
    </footer>
  );
}

export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-muted py-16 md:py-20">
      <div className="site-width">
        <p className="eyebrow text-primary">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl leading-tight md:text-5xl">{title}</h1>
        <div className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">{children}</div>
      </div>
    </section>
  );
}
