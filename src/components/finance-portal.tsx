import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  FileCheck2,
  LockKeyhole,
  Receipt,
  WalletCards,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type PaymentState = "idle" | "review" | "success";

const account = {
  learner: "Amina Nankunda",
  studentId: "MPS-2026-0418",
  level: "S.4 · O’level",
  campus: "Day Campus",
  term: "Term 3 · 2026",
  total: 1850000,
  paid: 1200000,
  items: [
    ["Tuition and learning", 1300000],
    ["Meals and welfare", 280000],
    ["Activities and assessment", 170000],
    ["Balance carried forward", 100000],
  ] as [string, number][],
};

const formatAmount = (amount: number) => `UGX ${amount.toLocaleString("en-UG")}`;

export function FinancePortal() {
  const [studentId, setStudentId] = useState("");
  const [lookupComplete, setLookupComplete] = useState(false);
  const [amount, setAmount] = useState("650000");
  const [method, setMethod] = useState("Mobile money");
  const [paymentState, setPaymentState] = useState<PaymentState>("idle");

  function handleLookup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLookupComplete(true);
    setPaymentState("idle");
  }

  function handlePayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPaymentState("review");
  }

  const balance = account.total - account.paid;
  const clearanceReady = balance === 0;

  return (
    <div className="space-y-8">
      <section className="rounded-sm border border-border bg-muted p-6 md:p-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
          <div>
            <div className="flex items-center gap-3">
              <WalletCards className="text-primary" size={24} />
              <h2 className="text-2xl">Find a learner account</h2>
            </div>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              Enter the school-issued student ID to view the current statement, make a payment, and
              check financial clearance.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <LockKeyhole size={14} /> Secure account lookup
          </span>
        </div>
        <form onSubmit={handleLookup} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <label className="flex-1">
            <span className="sr-only">Student ID</span>
            <input
              required
              value={studentId}
              onChange={(event) => setStudentId(event.target.value)}
              className="form-input bg-background"
              placeholder="e.g. MPS-2026-0418"
            />
          </label>
          <Button type="submit">
            View statement <ArrowRight />
          </Button>
        </form>
        <p className="mt-3 text-xs text-muted-foreground">
          Demo account: enter any student ID to preview the portal.
        </p>
      </section>

      {lookupComplete && (
        <>
          <section className="grid gap-4 md:grid-cols-3">
            <div className="rounded-sm border border-border p-5 md:col-span-2">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="eyebrow text-primary">LEARNER ACCOUNT</p>
                  <h2 className="mt-2 text-2xl">{account.learner}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {studentId || account.studentId} · {account.level} · {account.campus}
                  </p>
                </div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">
                  {account.term}
                </span>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="bg-muted p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    Term charges
                  </p>
                  <p className="mt-2 font-display text-2xl text-primary">
                    {formatAmount(account.total)}
                  </p>
                </div>
                <div className="bg-muted p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    Paid to date
                  </p>
                  <p className="mt-2 font-display text-2xl text-primary">
                    {formatAmount(account.paid)}
                  </p>
                </div>
                <div className="bg-muted p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    Balance due
                  </p>
                  <p className="mt-2 font-display text-2xl text-primary">{formatAmount(balance)}</p>
                </div>
              </div>
            </div>
            <div
              className={`rounded-sm border p-5 ${clearanceReady ? "border-primary bg-accent" : "border-secondary bg-secondary/20"}`}
            >
              <FileCheck2 className="text-primary" size={25} />
              <p className="mt-5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Financial clearance
              </p>
              <p className="mt-2 text-xl font-semibold">
                {clearanceReady ? "Cleared" : "Pending balance"}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {clearanceReady
                  ? "This account is ready for clearance."
                  : "Settle the outstanding balance or contact finance for an approved arrangement."}
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-sm border border-border p-6">
              <div className="flex items-center gap-3">
                <Receipt className="text-primary" size={21} />
                <h2 className="text-xl">Statement summary</h2>
              </div>
              <div className="mt-6 divide-y divide-border border-y border-border">
                {account.items.map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 py-3 text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-semibold">{formatAmount(value)}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs leading-5 text-muted-foreground">
                Amounts shown are an illustrative account snapshot. The finance office remains the
                source of truth for current charges.
              </p>
            </div>

            <div className="rounded-sm border border-border p-6">
              <div className="flex items-center gap-3">
                <CreditCard className="text-primary" size={21} />
                <h2 className="text-xl">Make an online payment</h2>
              </div>
              {paymentState === "success" ? (
                <div className="mt-7 rounded-sm bg-muted p-6">
                  <CheckCircle2 className="text-primary" size={30} />
                  <h3 className="mt-4 text-2xl">Payment request recorded</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Reference MPS-PAY-2026-1048 is ready for reconciliation. A production gateway
                    will complete the mobile money or card authorization.
                  </p>
                  <Button
                    className="mt-6"
                    variant="outline"
                    onClick={() => setPaymentState("idle")}
                  >
                    Make another payment
                  </Button>
                </div>
              ) : paymentState === "review" ? (
                <div className="mt-7 rounded-sm bg-muted p-6">
                  <p className="eyebrow text-primary">REVIEW PAYMENT</p>
                  <h3 className="mt-3 text-2xl">{formatAmount(Number(amount) || 0)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {method} · {account.learner}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button onClick={() => setPaymentState("success")}>
                      Confirm payment request <CheckCircle2 />
                    </Button>
                    <Button variant="outline" onClick={() => setPaymentState("idle")}>
                      Edit payment
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handlePayment} className="mt-6 space-y-5">
                  <label className="block space-y-2 text-sm font-semibold">
                    Amount to pay
                    <input
                      required
                      min="1"
                      type="number"
                      value={amount}
                      onChange={(event) => setAmount(event.target.value)}
                      className="form-input"
                    />
                  </label>
                  <fieldset className="space-y-3">
                    <legend className="text-sm font-semibold">Payment method</legend>
                    {["Mobile money", "Visa or Mastercard"].map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-3 rounded-sm border border-border p-3 text-sm"
                      >
                        <input
                          type="radio"
                          name="method"
                          value={option}
                          checked={method === option}
                          onChange={(event) => setMethod(event.target.value)}
                          className="accent-primary"
                        />
                        {option}
                      </label>
                    ))}
                  </fieldset>
                  <Button type="submit">
                    Continue to secure payment <ArrowRight />
                  </Button>
                  <p className="text-xs leading-5 text-muted-foreground">
                    No card or mobile money details are collected in this demo. Connect a
                    PCI-compliant payment gateway before production use.
                  </p>
                </form>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
