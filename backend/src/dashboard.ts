import { Router } from "express";
import { pool } from "./db.js";

export const dashboardRouter = Router();

type UserRow = {
  id: string;
  email: string;
  display_name: string;
  role: "student" | "teacher" | "administrator";
};

async function resolveUser(externalAuthId: string, role: UserRow["role"]) {
  const result = await pool.query<UserRow>(
    `select au.id, au.email, au.display_name, ura.role
       from app_user au
       join user_role_assignment ura on ura.user_id = au.id and ura.revoked_at is null
      where au.status = 'active'
        and au.external_auth_id in ($1, $2)
        and ura.role = $3
      limit 1`,
    [externalAuthId, `seed-${externalAuthId}`, role],
  );
  return result.rows[0] ?? null;
}

function requireIdentity(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

dashboardRouter.get("/student", async (request, response, next) => {
  const externalAuthId = requireIdentity(request.query.externalAuthId);
  if (!externalAuthId) {
    response.status(400).json({ error: "externalAuthId is required" });
    return;
  }
  try {
    const user = await resolveUser(externalAuthId, "student");
    if (!user) {
      response.status(403).json({ error: "Student dashboard access is not available" });
      return;
    }
    const [profile, applications, feeAccounts, payments] = await Promise.all([
      pool.query<{ student_number: string; level: string; campus: string }>(
        `select student_number, level, campus from student_profile where user_id = $1`,
        [user.id],
      ),
      pool.query<{
        reference: string;
        entry_level: string;
        preferred_campus: string;
        status: string;
        submitted_at: string;
      }>(
        `select reference, entry_level, preferred_campus, status, submitted_at
           from admissions_application
          where student_user_id = $1 or submitted_by_user_id = $1
          order by submitted_at desc
          limit 20`,
        [user.id],
      ),
      pool.query<{
        academic_year: string;
        term: string;
        total_charges: string;
        paid_to_date: string;
        currency: string;
      }>(
        `select academic_year, term, total_charges, paid_to_date, currency
           from fee_account
          where student_user_id = $1
          order by updated_at desc
          limit 5`,
        [user.id],
      ),
      pool.query<{
        reference: string;
        amount: string;
        status: string;
        initiated_at: string;
      }>(
        `select p.reference, p.amount, p.status, p.initiated_at
           from payment p
           join fee_account fa on fa.id = p.fee_account_id
          where fa.student_user_id = $1
          order by p.initiated_at desc
          limit 20`,
        [user.id],
      ),
    ]);

    response.json({
      user: { id: user.id, email: user.email, name: user.display_name, role: user.role },
      profile: profile.rows[0] ?? null,
      applications: applications.rows,
      feeAccounts: feeAccounts.rows.map((account) => ({
        ...account,
        balance: Number(account.total_charges) - Number(account.paid_to_date),
      })),
      payments: payments.rows,
    });
  } catch (error) {
    next(error);
  }
});

dashboardRouter.get("/teacher", async (request, response, next) => {
  const externalAuthId = requireIdentity(request.query.externalAuthId);
  if (!externalAuthId) {
    response.status(400).json({ error: "externalAuthId is required" });
    return;
  }
  try {
    const user = await resolveUser(externalAuthId, "teacher");
    if (!user) {
      response.status(403).json({ error: "Teacher dashboard access is not available" });
      return;
    }
    const [applications, payments] = await Promise.all([
      pool.query<{
        reference: string;
        learner_name: string;
        entry_level: string;
        preferred_campus: string;
        status: string;
        submitted_at: string;
      }>(
        `select aa.reference, aa.learner_name, aa.entry_level, aa.preferred_campus, aa.status, aa.submitted_at
           from admissions_application aa
          order by aa.submitted_at desc
          limit 50`,
      ),
      pool.query<{
        learner_name: string;
        student_number: string;
        reference: string;
        amount: string;
        status: string;
        initiated_at: string;
      }>(
        `select au.display_name as learner_name, sp.student_number, p.reference, p.amount, p.status, p.initiated_at
           from payment p
           join fee_account fa on fa.id = p.fee_account_id
           join student_profile sp on sp.user_id = fa.student_user_id
           join app_user au on au.id = sp.user_id
          order by p.initiated_at desc
          limit 50`,
      ),
    ]);

    response.json({
      user: { id: user.id, email: user.email, name: user.display_name, role: user.role },
      applications: applications.rows,
      payments: payments.rows,
    });
  } catch (error) {
    next(error);
  }
});
