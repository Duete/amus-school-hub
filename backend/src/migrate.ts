import "dotenv/config";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { pool } from "./db.js";

const currentDir = fileURLToPath(new URL(".", import.meta.url));
const schemaPath = resolve(currentDir, "../../database/schema.sql");

try {
  const schema = await readFile(schemaPath, "utf8");
  await pool.query(schema);
  console.log(`Applied schema from ${schemaPath}`);
} finally {
  await pool.end();
}
