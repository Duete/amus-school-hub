export function isDashboardPreviewEnabled(
  nodeEnvironment: string | undefined,
  previewMode: string | undefined,
) {
  return nodeEnvironment !== "production" && previewMode === "true";
}
