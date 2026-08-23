/**
 * Bootstraps a fresh database.
 *
 * Two steps, and the second is the one that used to be missing:
 *
 *   1. Apply schema.sql, which is a dump of the fully-migrated schema.
 *   2. Record every file in migrations/ as already applied.
 *
 * Without step 2, `migrate` would immediately try to re-apply changes the dump
 * already contains and fail on the first one ("column categoryId already
 * exists"), leaving every later migration unapplied - which is exactly how a
 * clean database ended up missing Course.shortDesc and failing the web build.
 *
 * Safe to re-run: it does nothing when the schema is already present.
 */
import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import { QueryTypes } from "sequelize";
import { sequelize } from "./sequelize";

const PACKAGE_ROOT = join(__dirname, "..");

async function main() {
  await sequelize.authenticate();
  console.log("Connected to database");

  const existing = await sequelize.query<{ tablename: string }>(
    `SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename = 'User'`,
    { type: QueryTypes.SELECT },
  );

  if (existing.length > 0) {
    console.log("Schema already present - nothing to do");
    await sequelize.close();
    return;
  }

  await sequelize.query(readFileSync(join(PACKAGE_ROOT, "schema.sql"), "utf8"));
  console.log("Applied schema.sql");

  // pg_dump sets search_path to '' for the duration of the restore, so anything
  // created afterwards on this connection has no schema to land in. Put it back
  // before touching SequelizeMeta.
  await sequelize.query(`SET search_path TO public`);

  // SequelizeMeta is excluded from the dump, so create it the same way the CLI
  // would and fill it with everything the dump already reflects.
  await sequelize.query(
    `CREATE TABLE IF NOT EXISTS public."SequelizeMeta" (
       "name" VARCHAR(255) NOT NULL,
       CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY ("name")
     )`,
  );

  const migrations = readdirSync(join(PACKAGE_ROOT, "migrations"))
    .filter((f) => f.endsWith(".js"))
    .sort();

  if (migrations.length > 0) {
    await sequelize.query(
      `INSERT INTO public."SequelizeMeta" ("name") VALUES ${migrations
        .map((_, i) => `($${i + 1})`)
        .join(", ")} ON CONFLICT ("name") DO NOTHING`,
      { bind: migrations },
    );
  }
  console.log(`Recorded ${migrations.length} migrations as applied`);

  await sequelize.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
