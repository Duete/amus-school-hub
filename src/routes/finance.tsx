import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/school-layout";
import { FinancePortal } from "@/components/finance-portal";
import { schoolHead } from "@/lib/school";

export const Route = createFileRoute("/finance")({
  head: () =>
    schoolHead(
      "Fees and financial clearance",
      "View a learner fee statement, make an online payment, and check financial clearance at Mbale Progressive Secondary School.",
    ),
  component: Finance,
});

function Finance() {
  return (
    <>
      <PageIntro eyebrow="FEES & CLEARANCE" title="Keep school finances clear and easy to track.">
        Use the finance portal to view a learner statement, review the outstanding balance, request
        an online payment, and understand clearance status before the next school milestone.
      </PageIntro>
      <main className="site-width py-16 md:py-20">
        <FinancePortal />
      </main>
    </>
  );
}
