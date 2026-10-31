import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type UserRole = "student" | "teacher" | "administrator";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

type DemoAccount = AuthUser & { password: string };

const demoAccounts: DemoAccount[] = [
  {
    id: "student-001",
    name: "Amina Nankunda",
    email: "student@mbaleprogressive.sc.ug",
    password: "student2026",
    role: "student",
  },
  {
    id: "teacher-001",
    name: "Sarah Namukasa",
    email: "teacher@mbaleprogressive.sc.ug",
    password: "teacher2026",
    role: "teacher",
  },
  {
    id: "admin-001",
    name: "Daniel Kato",
    email: "admin@mbaleprogressive.sc.ug",
    password: "admin2026",
    role: "administrator",
  },
];

export const roleLabels: Record<UserRole, string> = {
  student: "Student",
  teacher: "Teacher",
  administrator: "Administrator",
};

export const rolePermissions: Record<UserRole, string[]> = {
  student: ["view:own-profile", "view:own-performance", "view:own-finance", "submit:application"],
  teacher: [
    "view:own-profile",
    "view:performance",
    "manage:class-records",
    "view:faculty",
    "view:admissions-records",
    "view:fee-records",
  ],
  administrator: [
    "view:performance",
    "manage:admissions",
    "manage:finance",
    "manage:notifications",
    "manage:users",
  ],
};

type AuthContextValue = {
  user: AuthUser | null;
  isReady: boolean;
  signIn: (email: string, password: string, role: UserRole) => { ok: boolean; message?: string };
  signOut: () => void;
  hasPermission: (permission: string) => boolean;
  demoAccounts: Array<Pick<DemoAccount, "email" | "password" | "role" | "name">>;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "mbale-progressive-demo-session";

function readStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(readStoredUser);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  function signIn(email: string, password: string, role: UserRole) {
    const account = demoAccounts.find(
      (candidate) =>
        candidate.email.toLowerCase() === email.trim().toLowerCase() && candidate.role === role,
    );
    if (!account || account.password !== password) {
      return {
        ok: false,
        message: "The email, password, or selected role does not match this preview account.",
      };
    }
    const nextUser: AuthUser = {
      id: account.id,
      name: account.name,
      email: account.email,
      role: account.role,
    };
    setUser(nextUser);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    return { ok: true };
  }

  function signOut() {
    setUser(null);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isReady,
      signIn,
      signOut,
      hasPermission: (permission: string) =>
        Boolean(user && rolePermissions[user.role].includes(permission)),
      demoAccounts: demoAccounts.map(({ email, password, role, name }) => ({
        email,
        password,
        role,
        name,
      })),
    }),
    [isReady, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
