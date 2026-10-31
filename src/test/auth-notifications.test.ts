import { describe, expect, it, beforeEach } from "vitest";
import { getNotificationLog, queueNotification } from "@/lib/notifications";
import { rolePermissions } from "@/lib/auth";

describe("role-based access", () => {
  it("keeps permissions scoped by role", () => {
    expect(rolePermissions.student).toContain("view:own-finance");
    expect(rolePermissions.student).not.toContain("manage:users");
    expect(rolePermissions.teacher).toContain("view:performance");
    expect(rolePermissions.teacher).toContain("view:admissions-records");
    expect(rolePermissions.teacher).toContain("view:fee-records");
    expect(rolePermissions.administrator).toContain("manage:notifications");
  });
});

describe("notification dispatcher", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("queues an admissions confirmation in preview mode", async () => {
    const record = await queueNotification("admissions.application_submitted", {
      recipient: "guardian@example.com",
      learnerName: "Amina Nankunda",
      reference: "MPS-APP-123456",
    });

    expect(record.status).toBe("preview");
    expect(record.subject).toContain("Application enquiry received");
    expect(getNotificationLog()).toHaveLength(1);
  });

  it("queues a payment confirmation with the amount", async () => {
    const record = await queueNotification("finance.payment_submitted", {
      recipient: "guardian@example.com",
      learnerName: "Amina Nankunda",
      reference: "MPS-PAY-123456",
      amount: "UGX 650,000",
    });

    expect(record.body).toContain("UGX 650,000");
    expect(record.event).toBe("finance.payment_submitted");
  });
});
