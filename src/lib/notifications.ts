export type NotificationEvent = "admissions.application_submitted" | "finance.payment_submitted";

export type NotificationRecord = {
  id: string;
  event: NotificationEvent;
  recipient: string;
  subject: string;
  body: string;
  createdAt: string;
  status: "queued" | "sent" | "preview";
};

type NotificationPayload = {
  recipient: string;
  learnerName: string;
  reference: string;
  amount?: string;
};

const STORAGE_KEY = "mbale-progressive-notification-log";

function getStoredLog(): NotificationRecord[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as NotificationRecord[];
  } catch {
    return [];
  }
}

function saveRecord(record: NotificationRecord) {
  if (typeof window === "undefined") return;
  const next = [record, ...getStoredLog()].slice(0, 40);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("notification-log-updated"));
}

function buildMessage(event: NotificationEvent, payload: NotificationPayload) {
  if (event === "admissions.application_submitted") {
    return {
      subject: `Application enquiry received · ${payload.reference}`,
      body: `Dear guardian, we have received the admissions enquiry for ${payload.learnerName}. Our admissions team will follow up with the next steps. Reference: ${payload.reference}.`,
    };
  }
  return {
    subject: `Fee payment request received · ${payload.reference}`,
    body: `Dear guardian, we have recorded the fee payment request for ${payload.learnerName}. The finance office will reconcile the transaction and confirm clearance. Reference: ${payload.reference}. Amount: ${payload.amount ?? "not provided"}.`,
  };
}

export async function queueNotification(event: NotificationEvent, payload: NotificationPayload) {
  const message = buildMessage(event, payload);
  const endpoint = import.meta.env.VITE_EMAIL_NOTIFICATION_ENDPOINT as string | undefined;
  const record: NotificationRecord = {
    id: crypto.randomUUID(),
    event,
    recipient: payload.recipient,
    subject: message.subject,
    body: message.body,
    createdAt: new Date().toISOString(),
    status: endpoint ? "queued" : "preview",
  };

  saveRecord(record);

  if (endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ event, ...payload, ...message }),
      });
      const updated = { ...record, status: response.ok ? "sent" : "queued" } as NotificationRecord;
      saveRecord(updated);
      return updated;
    } catch {
      return record;
    }
  }

  return record;
}

export function getNotificationLog() {
  return getStoredLog();
}
