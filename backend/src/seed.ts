import "dotenv/config";
import { pool, withTransaction } from "./db.js";

const seededUsers = [
  {
    email: "admin@mbaleprogressive.sc.ug",
    name: "Daniel Kato",
    externalAuthId: "seed-admin-001",
    role: "administrator" as const,
  },
  {
    email: "finance@mbaleprogressive.sc.ug",
    name: "Miriam Namusoke",
    externalAuthId: "seed-admin-002",
    role: "administrator" as const,
  },
  {
    email: "teacher@mbaleprogressive.sc.ug",
    name: "Sarah Namukasa",
    externalAuthId: "seed-teacher-001",
    role: "teacher" as const,
  },
  {
    email: "student@mbaleprogressive.sc.ug",
    name: "Amina Nankunda",
    externalAuthId: "seed-student-001",
    role: "student" as const,
  },
];

const userIds = new Map<string, string>();

await withTransaction(async (client) => {
  for (const user of seededUsers) {
    const result = await client.query<{ id: string }>(
      `insert into app_user (email, display_name, status, external_auth_id)
       values ($1, $2, 'active', $3)
       on conflict (normalized_email) do update set display_name = excluded.display_name, status = 'active', external_auth_id = excluded.external_auth_id, updated_at = now()
       returning id`,
      [user.email, user.name, user.externalAuthId],
    );
    userIds.set(user.email, result.rows[0].id);
    await client.query(
      `insert into user_role_assignment (user_id, role)
       values ($1, $2)
       on conflict (user_id, role) do update set revoked_at = null`,
      [result.rows[0].id, user.role],
    );
  }

  const studentId = userIds.get("student@mbaleprogressive.sc.ug")!;
  await client.query(
    `insert into student_profile (user_id, student_number, level, campus, date_of_birth, previous_school)
     values ($1, 'MPS-2026-0418', 'S.4 · O’level', 'Day Campus', '2012-06-14', 'Mbale Primary School')
     on conflict (user_id) do update set level = excluded.level, campus = excluded.campus, updated_at = now()`,
    [studentId],
  );

  const existingGuardian = await client.query<{ id: string }>(
    `select id from guardian where email = 'grace.nankunda@example.com' limit 1`,
  );
  const guardian = existingGuardian.rowCount
    ? existingGuardian
    : await client.query<{ id: string }>(
        `insert into guardian (name, email, phone)
         values ('Grace Nankunda', 'grace.nankunda@example.com', '+256 700 123 456')
         returning id`,
      );
  await client.query(
    `insert into student_guardian (student_user_id, guardian_id, relationship, is_primary)
     values ($1, $2, 'Parent / guardian', true)
     on conflict (student_user_id, guardian_id) do update set is_primary = true`,
    [studentId, guardian.rows[0].id],
  );

  const feeAccount = await client.query<{ id: string }>(
    `insert into fee_account (student_user_id, academic_year, term, total_charges, paid_to_date, currency)
     values ($1, '2026', 'Term 3', 1850000, 1200000, 'UGX')
     on conflict (student_user_id, academic_year, term) do update set total_charges = excluded.total_charges, paid_to_date = excluded.paid_to_date, updated_at = now()
     returning id`,
    [studentId],
  );
  await client.query(`delete from fee_line_item where fee_account_id = $1`, [
    feeAccount.rows[0].id,
  ]);
  await client.query(
    `insert into fee_line_item (fee_account_id, label, amount) values
      ($1, 'Tuition and learning', 1300000),
      ($1, 'Meals and welfare', 280000),
      ($1, 'Activities and assessment', 170000),
      ($1, 'Balance carried forward', 100000)`,
    [feeAccount.rows[0].id],
  );
});

console.log("Seeded administrator, teacher, and sample student records.");
await pool.end();
