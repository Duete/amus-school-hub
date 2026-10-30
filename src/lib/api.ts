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
