import { createFileRoute } from "@tanstack/react-router";
import { CampusStaffPage } from "@/components/campus-staff-page";
import { schoolHead } from "@/lib/school";

export const Route = createFileRoute("/faculty/day")({
  head: () =>
    schoolHead(
      "Day Campus Teaching Staff",
      "Meet the teachers and academic leaders supporting learners at Mbale Progressive Secondary School’s Day Campus.",
      "/faculty/day",
    ),
  component: () => <CampusStaffPage campus="Day Campus" />,
});
