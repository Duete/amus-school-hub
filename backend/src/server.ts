import "dotenv/config";
import cors from "cors";
import express from "express";
import { admissionsRouter } from "./admissions.js";
import { paymentsRouter } from "./payments.js";
import { pool } from "./db.js";

const app = express();
const port = Number(process.env.PORT ?? 8787);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",").map((origin) => origin.trim()) ?? true,
    credentials: true,
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
