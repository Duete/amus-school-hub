import "dotenv/config";
import cors from "cors";
import express from "express";
import { admissionsRouter } from "./admissions.js";
import { dashboardRouter } from "./dashboard.js";
import { paymentsRouter } from "./payments.js";
import { pool } from "./db.js";
import { isCorsOriginAllowed, resolveAllowedCorsOrigins } from "./cors-policy.js";

const app = express();
const port = Number(process.env.PORT ?? 8787);
const allowedCorsOrigins = resolveAllowedCorsOrigins(process.env.CORS_ORIGIN, process.env.NODE_ENV);

app.use((_request, response, next) => {
  response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  response.setHeader("Permissions-Policy", "camera=(), geolocation=(), microphone=()");
  response.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

app.use(
  cors({
    origin: (origin, callback) => callback(null, isCorsOriginAllowed(origin, allowedCorsOrigins)),
  }),
);
app.use(express.json({ limit: "64kb" }));

app.get("/health", async (_request, response) => {
  try {
    await pool.query("select 1");
    response.json({ ok: true, database: "connected" });
  } catch {
    response.status(503).json({ ok: false, database: "unavailable" });
  }
});

app.use("/api/admissions", admissionsRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api/dashboard", dashboardRouter);

app.use(
  (
    error: unknown,
    _request: express.Request,
    response: express.Response,
    _next: express.NextFunction,
  ) => {
    const statusCode =
      typeof error === "object" &&
      error &&
      "statusCode" in error &&
      typeof error.statusCode === "number"
        ? error.statusCode
        : 500;
    console.error(error);
    response
      .status(statusCode)
      .json({ error: statusCode === 500 ? "Internal server error" : (error as Error).message });
  },
);

const server = app.listen(port, () => {
  console.log(`Mbale Progressive API listening on http://localhost:${port}`);
});

const shutdown = async () => {
  server.close();
  await pool.end();
};
process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);
