/**
 * The contract between the web app and the API.
 *
 * Everything here is runtime-validated and framework-free: no Next imports, no
 * Nest decorators, no database types. Both sides depend on this package and
 * nothing depends on both sides, which is what keeps the boundary honest - a
 * change to a request shape breaks compilation on the client and the server in
 * the same commit rather than at runtime in production.
 */
export * from "./enums";
export * from "./policies";
export * from "./schemas";
