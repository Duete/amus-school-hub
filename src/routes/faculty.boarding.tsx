import { createFileRoute } from "@tanstack/react-router";
import { CampusStaffPage } from "@/components/campus-staff-page";
import { schoolHead } from "@/lib/school";

export const Route = createFileRoute("/faculty/boarding")({
  head: () =>
    schoolHead(
      "Boarding Campus Teaching Staff",
      "Meet the teachers and academic leaders supporting learners at Mbale Progressive Secondary School’s Boarding Campus.",
      "/faculty/boarding",
    ),
  component: () => <CampusStaffPage campus="Boarding" />,
});
