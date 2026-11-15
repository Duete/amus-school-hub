const localDevelopmentOrigin = "http://localhost:8080";

export function resolveAllowedCorsOrigins(
  configuredOrigins: string | undefined,
  nodeEnvironment: string | undefined,
): Set<string> {
  const origins = (configuredOrigins ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (origins.length === 0) {
    return nodeEnvironment === "production" ? new Set() : new Set([localDevelopmentOrigin]);
  }

  if (origins.includes("*")) {
    throw new Error(
      "CORS_ORIGIN must contain explicit origins; wildcard origins are not supported.",
    );
  }

  for (const origin of origins) {
    let parsed: URL;
    try {
      parsed = new URL(origin);
    } catch {
      throw new Error(`CORS_ORIGIN contains an invalid origin: ${origin}`);
    }

    if (!["http:", "https:"].includes(parsed.protocol) || parsed.origin !== origin) {
      throw new Error(`CORS_ORIGIN values must be exact HTTP(S) origins without paths: ${origin}`);
    }
  }

  return new Set(origins);
}

export function isCorsOriginAllowed(
  origin: string | undefined,
  allowedOrigins: ReadonlySet<string>,
) {
  return Boolean(origin && allowedOrigins.has(origin));
}
