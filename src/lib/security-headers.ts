const defaultSecurityHeaders = [
  ["Referrer-Policy", "strict-origin-when-cross-origin"],
  ["Permissions-Policy", "camera=(), geolocation=(), microphone=()"],
  ["X-Content-Type-Options", "nosniff"],
] as const;

export function withDefaultSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [name, value] of defaultSecurityHeaders) {
    if (!headers.has(name)) headers.set(name, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
