import { Router } from "express";
import { z } from "zod";
import { withTransaction } from "./db.js";

const paymentSchema = z.object({
  studentId: z.string().trim().min(2).max(80),
  amount: z.number().positive().max(100000000),
  method: z.enum(["mobile_money", "card", "bank_transfer"]),
  payerEmail: z.string().email().max(240).optional(),
  payerUserId: z.string().uuid().optional(),
  idempotencyKey: z.string().trim().min(12).max(160),
});

export const paymentsRouter = Router();

paymentsRouter.post("/", async (request, response, next) => {
  const parsed = paymentSchema.safeParse(request.body);
  if (!parsed.success) {
    response
      .status(400)
      .json({ error: "Invalid payment request", details: parsed.error.flatten() });
    return;
  }

  try {
    const result = await withTransaction(async (client) => {
      const account = await client.query<{
        id: string;
        learner_name: string;
        guardian_email: string | null;
      }>(
        `select fa.id, au.display_name as learner_name, g.email as guardian_email
           from fee_account fa
           join student_profile sp on sp.user_id = fa.student_user_id
           join app_user au on au.id = sp.user_id
           left join student_guardian sg on sg.student_user_id = sp.user_id and sg.is_primary = true
           left join guardian g on g.id = sg.guardian_id
          where sp.student_number = $1
          order by fa.updated_at desc
          limit 1`,
        [parsed.data.studentId],
      );
      if (account.rowCount === 0) {
        const error = new Error("Student account not found");
        (error as Error & { statusCode?: number }).statusCode = 404;
        throw error;
      }
      const feeAccount = account.rows[0];
      const reference = `MPS-PAY-${Date.now().toString().slice(-8)}`;
      const inserted = await client.query<{ id: string; reference: string }>(
        `insert into payment (reference, fee_account_id, payer_user_id, amount, method, status, idempotency_key)
         values ($1, $2, $3, $4, $5, 'pending', $6)
         on conflict (idempotency_key) do nothing
         returning id, reference`,
        [
          reference,
          feeAccount.id,
          parsed.data.payerUserId ?? null,
          parsed.data.amount,
          parsed.data.method,
          parsed.data.idempotencyKey,
        ],
      );
      const payment =
        inserted.rows[0] ??
        (
          await client.query<{ id: string; reference: string }>(
            `select id, reference from payment where idempotency_key = $1`,
            [parsed.data.idempotencyKey],
          )
        ).rows[0];
      if (!payment) throw new Error("Unable to create payment request");
      if (inserted.rows.length === 0) return payment;
      const recipient = parsed.data.payerEmail ?? feeAccount.guardian_email;
      if (recipient) {
        const subject = `Fee payment request received · ${payment.reference}`;
        const body = `Dear guardian, we have recorded the fee payment request for ${feeAccount.learner_name}. The finance office will reconcile the transaction. Reference: ${payment.reference}. Amount: UGX ${parsed.data.amount.toLocaleString("en-UG")}.`;
        await client.query(
          `insert into notification (event_type, recipient_email, subject, body, payment_id, status)
           values ('finance.payment_submitted', $1, $2, $3, $4, 'queued')`,
          [recipient, subject, body, payment.id],
        );
      }
      await client.query(
        `insert into audit_log (actor_user_id, action, entity_type, entity_id, metadata)
         values ($1, 'finance.payment_submitted', 'payment', $2, $3)`,
        [
          parsed.data.payerUserId ?? null,
          payment.id,
          JSON.stringify({ reference: payment.reference, amount: parsed.data.amount }),
        ],
      );
      return payment;
    });
    response
      .status(201)
      .json({ reference: result.reference, status: "pending", notificationStatus: "queued" });
  } catch (error) {
    next(error);
  }
});
