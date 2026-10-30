import { Router } from "express";
import { z } from "zod";
import { withTransaction } from "./db.js";

const applicationSchema = z.object({
  studentName: z.string().trim().min(2).max(160),
  dateOfBirth: z.string().date().optional().or(z.literal("")),
  entryLevel: z.string().trim().min(2).max(80),
  campus: z.string().trim().min(2).max(120),
  guardianName: z.string().trim().min(2).max(160),
  phone: z.string().trim().min(7).max(40),
  email: z.string().email().max(240),
  previousSchool: z.string().trim().max(180).optional(),
  notes: z.string().trim().max(3000).optional(),
  submittedByUserId: z.string().uuid().optional(),
});

export const admissionsRouter = Router();

admissionsRouter.post("/applications", async (request, response, next) => {
  const parsed = applicationSchema.safeParse(request.body);
  if (!parsed.success) {
    response.status(400).json({ error: "Invalid application", details: parsed.error.flatten() });
    return;
  }

  try {
    const application = await withTransaction(async (client) => {
      const reference = `MPS-APP-${Date.now().toString().slice(-8)}`;
      const guardian = await client.query<{ id: string }>(
        `insert into guardian (name, email, phone) values ($1, $2, $3) returning id`,
        [parsed.data.guardianName, parsed.data.email, parsed.data.phone],
      );
      const guardianId = guardian.rows[0].id;
      const inserted = await client.query<{ id: string; reference: string }>(
        `insert into admissions_application
          (reference, learner_name, date_of_birth, entry_level, preferred_campus, guardian_id, previous_school, notes, status, submitted_by_user_id)
         values ($1, nullif($2, ''), nullif($3, '')::date, $4, $5, $6, $7, $8, 'submitted', $9)
         returning id, reference`,
        [
          reference,
          parsed.data.studentName,
          parsed.data.dateOfBirth ?? "",
          parsed.data.entryLevel,
          parsed.data.campus,
          guardianId,
          parsed.data.previousSchool ?? null,
          parsed.data.notes ?? null,
          parsed.data.submittedByUserId ?? null,
        ],
      );
      const row = inserted.rows[0];
      const subject = `Application enquiry received · ${row.reference}`;
      const body = `Dear guardian, we have received the admissions enquiry for ${parsed.data.studentName}. Our admissions team will follow up with the next steps. Reference: ${row.reference}.`;
      await client.query(
        `insert into notification (event_type, recipient_email, subject, body, application_id, status)
         values ('admissions.application_submitted', $1, $2, $3, $4, 'queued')`,
        [parsed.data.email, subject, body, row.id],
      );
      await client.query(
        `insert into audit_log (actor_user_id, action, entity_type, entity_id, metadata)
         values ($1, 'admissions.application_submitted', 'admissions_application', $2, $3)`,
        [
          parsed.data.submittedByUserId ?? null,
          row.id,
          JSON.stringify({ reference: row.reference }),
        ],
      );
      return row;
    });
    response.status(201).json({ reference: application.reference, notificationStatus: "queued" });
  } catch (error) {
    next(error);
  }
});
