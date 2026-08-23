/**
 * Moved to @nextminds/contracts - the API and the web app must validate against
 * the same definitions, so they cannot live inside either one.
 *
 * This file stays as a re-export so the ~100 existing `@/lib/types` imports keep
 * working. New code should import from "@nextminds/contracts" directly.
 */
export * from "@nextminds/contracts";
