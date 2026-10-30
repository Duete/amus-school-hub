import { Outlet, createFileRoute } from "@tanstack/react-router";
import { schoolHead } from "@/lib/school";

export const Route = createFileRoute("/admissions")({
  head: () =>
    schoolHead(
      "Admissions",
      "Admissions and application information for Mbale Progressive Secondary School.",
    ),
  component: AdmissionsLayout,
});

function AdmissionsLayout() {
  return <Outlet />;
}
