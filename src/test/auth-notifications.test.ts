import { describe, expect, it, beforeEach } from "vitest";
import { getNotificationLog, queueNotification } from "@/lib/notifications";
import { rolePermissions } from "@/lib/auth";

const notificationStorageKey = "mbale-progressive-notification-log";

describe("role-based access", () => {
  it("keeps permissions scoped by role", () => {
    expect(rolePermissions.student).toContain("view:own-finance");
    expect(rolePermissions.student).not.toContain("manage:users");
    expect(rolePermissions.student).not.toContain("view:own-performance");
    expect(rolePermissions.teacher).not.toContain("view:performance");
    expect(rolePermissions.teacher).toContain("view:admissions-records");
    expect(rolePermissions.teacher).toContain("view:fee-records");
    expect(rolePermissions.administrator).toContain("manage:notifications");
  });
});

describe("notification dispatcher", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("queues an admissions confirmation but stores no guardian or learner details", async () => {
    const record = await queueNotification("admissions.application_submitted", {
      recipient: "guardian@example.com",
      learnerName: "Amina Nankunda",
      reference: "MPS-APP-123456",
    });

    expect(record.status).toBe("preview");
    expect(record.subject).toContain("Application enquiry received");
    expect(record.recipient).toBe("guardian@example.com");
    expect(getNotificationLog()).toHaveLength(1);
    expect(getNotificationLog()[0]?.recipient).toBe("[redacted]");
    expect(getNotificationLog()[0]?.body).toBe("[redacted]");
    const stored = window.localStorage.getItem(notificationStorageKey) ?? "";
    expect(stored).not.toContain("guardian@example.com");
    expect(stored).not.toContain("Amina Nankunda");
  });

  it("redacts personally identifying fields in notification records saved by older versions", () => {
    window.localStorage.setItem(
      notificationStorageKey,
      JSON.stringify([
        {
          id: "legacy-record",
          event: "admissions.application_submitted",
          recipient: "guardian@example.com",
          subject: "Application enquiry received · MPS-APP-123456",
          body: "The enquiry concerns Amina Nankunda.",
          createdAt: "2026-01-01T00:00:00.000Z",
          status: "preview",
        },
      ]),
    );

    expect(getNotificationLog()[0]?.recipient).toBe("[redacted]");
    const stored = window.localStorage.getItem(notificationStorageKey) ?? "";
    expect(stored).not.toContain("guardian@example.com");
    expect(stored).not.toContain("Amina Nankunda");
  });

  it("returns a payment message to the current caller without persisting its personal details", async () => {
    const record = await queueNotification("finance.payment_submitted", {
      recipient: "guardian@example.com",
      learnerName: "Amina Nankunda",
      reference: "MPS-PAY-123456",
      amount: "UGX 650,000",
    });

    expect(record.body).toContain("UGX 650,000");
    expect(record.event).toBe("finance.payment_submitted");
    expect(window.localStorage.getItem(notificationStorageKey)).not.toContain("Amina Nankunda");
  });
});
