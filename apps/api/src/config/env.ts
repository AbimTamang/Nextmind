import { z } from "zod";

/**
 * Environment is validated once, at boot, and never read via process.env again.
 *
 * The web app's previous behaviour was to fall back to a placeholder connection
 * string when DATABASE_URL was missing so that `next build` could still succeed.
 * An API has no such constraint: if it cannot reach its database it is not
 * healthy, and failing at startup is far cheaper to diagnose than failing on
 * the first request in production.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().url({ message: "DATABASE_URL must be a valid connection string" }),
  /** Comma-separated list of origins allowed to send credentialed requests. */
  CORS_ORIGINS: z
    .string()
    .default("http://localhost:3000")
    .transform((s) => s.split(",").map((o) => o.trim()).filter(Boolean)),
  /** Shared with the web app; both must agree or sessions will not validate. */
  BETTER_AUTH_SECRET: z.string().min(32).optional(),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(raw: Record<string, unknown>): Env {
  const parsed = envSchema.safeParse(raw);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  ${i.path.join(".") || "(root)"}: ${i.message}`)
      .join("\n");
    throw new Error(`Invalid environment:\n${issues}`);
  }
  return parsed.data;
}
