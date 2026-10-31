type ApplicationInput = {
  studentName: string;
  dateOfBirth: string;
  entryLevel: string;
  campus: string;
  guardianName: string;
  phone: string;
  email: string;
  previousSchool?: string;
  notes?: string;
};

type PaymentInput = {
  studentId: string;
  amount: number;
  method: "mobile_money" | "card";
  payerEmail?: string;
  idempotencyKey: string;
};

export type StudentDashboardData = {
  profile: { student_number: string; level: string; campus: string } | null;
  applications: Array<{
    reference: string;
    entry_level: string;
    preferred_campus: string;
    status: string;
    submitted_at: string;
  }>;
  feeAccounts: Array<{
    academic_year: string;
    term: string;
    total_charges: string;
    paid_to_date: string;
    currency: string;
    balance: number;
  }>;
  payments: Array<{ reference: string; amount: string; status: string; initiated_at: string }>;
};

export type TeacherDashboardData = {
  applications: Array<{
    reference: string;
    learner_name: string;
    entry_level: string;
    preferred_campus: string;
    status: string;
    submitted_at: string;
  }>;
  payments: Array<{
    learner_name: string;
    student_number: string;
    reference: string;
    amount: string;
    status: string;
    initiated_at: string;
  }>;
};

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "");

async function post<T>(path: string, body: unknown): Promise<T> {
  if (!apiBaseUrl) throw new Error("API base URL is not configured");
  const response = await fetch(`${apiBaseUrl}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  const payload = (await response.json()) as T & { error?: string };
  if (!response.ok) throw new Error(payload.error ?? "Request failed");
  return payload;
}

async function get<T>(path: string): Promise<T> {
  if (!apiBaseUrl) throw new Error("API base URL is not configured");
  const response = await fetch(`${apiBaseUrl}${path}`, { credentials: "include" });
  const payload = (await response.json()) as T & { error?: string };
  if (!response.ok) throw new Error(payload.error ?? "Request failed");
  return payload;
}

export function isApiConfigured() {
  return Boolean(apiBaseUrl);
}

export function submitApplication(input: ApplicationInput) {
  return post<{ reference: string; notificationStatus: "queued" }>(
    "/api/admissions/applications",
    input,
  );
}

export function submitPayment(input: PaymentInput) {
  return post<{ reference: string; status: "pending"; notificationStatus: "queued" }>(
    "/api/payments",
    input,
  );
}

export function getStudentDashboard(externalAuthId: string) {
  return get<StudentDashboardData>(
    `/api/dashboard/student?externalAuthId=${encodeURIComponent(externalAuthId)}`,
  );
}

export function getTeacherDashboard(externalAuthId: string) {
  return get<TeacherDashboardData>(
    `/api/dashboard/teacher?externalAuthId=${encodeURIComponent(externalAuthId)}`,
  );
}
