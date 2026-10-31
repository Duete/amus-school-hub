import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, FileText, ShieldCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { PageIntro } from "@/components/school-layout";
import { Button } from "@/components/ui/button";
import { isApiConfigured, submitApplication } from "@/lib/api";
import { queueNotification, type NotificationRecord } from "@/lib/notifications";
import { schoolHead } from "@/lib/school";

export const Route = createFileRoute("/admissions/apply")({
  head: () =>
    schoolHead(
      "Apply for admission",
      "Submit an application enquiry for O’level or A’level study at Mbale Progressive Secondary School.",
    ),
  component: ApplyForAdmission,
});

function ApplyForAdmission() {
  const [submitted, setSubmitted] = useState(false);
  const [notification, setNotification] = useState<NotificationRecord | null>(null);
  const [submissionError, setSubmissionError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const reference = `MPS-APP-${Date.now().toString().slice(-6)}`;
    setSubmissionError("");
    try {
      if (isApiConfigured()) {
        const result = await submitApplication({
          studentName: String(formData.get("studentName") ?? ""),
          dateOfBirth: String(formData.get("dateOfBirth") ?? ""),
          entryLevel: String(formData.get("entryLevel") ?? ""),
          campus: String(formData.get("campus") ?? ""),
          guardianName: String(formData.get("guardianName") ?? ""),
          phone: String(formData.get("phone") ?? ""),
          email: String(formData.get("email") ?? ""),
          previousSchool: String(formData.get("previousSchool") ?? ""),
          notes: String(formData.get("notes") ?? ""),
        });
        setNotification({
          id: result.reference,
          event: "admissions.application_submitted",
          recipient: String(formData.get("email") ?? ""),
          subject: `Application enquiry received · ${result.reference}`,
          body: "",
          createdAt: new Date().toISOString(),
          status: "queued",
        });
      } else {
        await queueNotification("admissions.application_submitted", {
          recipient: String(formData.get("email") ?? "admissions@mbaleprogressive.sc.ug"),
          learnerName: String(formData.get("studentName") ?? "the learner"),
          reference,
        }).then(setNotification);
      }
      setSubmitted(true);
    } catch (error) {
      setSubmissionError(
        error instanceof Error ? error.message : "Unable to submit the application.",
      );
    }
  }

  if (submitted) {
    return (
      <>
        <PageIntro
          eyebrow="APPLICATION RECEIVED"
          title="Your application enquiry is ready for review."
        >
          Thank you for sharing the learner’s details. The admissions team can use this information
          to follow up with entry guidance, availability, and the next steps.
        </PageIntro>
        <section className="site-width py-16 md:py-20">
          <div className="mx-auto max-w-2xl rounded-sm border border-border bg-muted p-8 md:p-10">
            <CheckCircle2 className="text-primary" size={34} />
            <h2 className="mt-5 text-3xl">Enquiry saved</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Your enquiry reference is ready. Keep it for follow-up with the admissions office.
            </p>
            <p className="mt-4 rounded-sm border border-border bg-background p-4 text-sm leading-6 text-muted-foreground">
              <span className="font-semibold text-primary">Email notification:</span>{" "}
              {notification?.status === "sent"
                ? `sent to ${notification.recipient}`
                : notification?.status === "queued"
                  ? "queued for the configured email provider"
                  : "saved for follow-up in this preview environment"}
            </p>
            {submissionError && (
              <p role="alert" className="mt-4 text-sm text-destructive">
                {submissionError}
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/contact">
                  Contact admissions <ArrowRight />
                </Link>
              </Button>
              <Button variant="outline" onClick={() => setSubmitted(false)}>
                Submit another enquiry
              </Button>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageIntro
        eyebrow="ADMISSIONS · APPLY"
        title="Start the conversation about joining Mbale Progressive."
      >
        Complete this application enquiry and the admissions team can respond with current
        requirements, placement guidance, and fee information for the selected pathway.
      </PageIntro>

      <section className="site-width grid gap-12 py-16 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 md:py-20">
        <aside>
          <Link
            to="/admissions"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            <ArrowLeft size={16} /> Back to admissions
          </Link>
          <div className="mt-10 space-y-7">
            <div className="flex gap-4">
              <FileText className="mt-1 shrink-0 text-primary" size={22} />
              <div>
                <h2 className="text-xl">What to prepare</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Learner details, guardian contacts, previous school information, and the preferred
                  study level.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <ShieldCheck className="mt-1 shrink-0 text-primary" size={22} />
              <div>
                <h2 className="text-xl">Your privacy</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  This page is an enquiry form. Do not upload original certificates or sensitive
                  documents here.
                </p>
              </div>
            </div>
          </div>
        </aside>

        <form onSubmit={handleSubmit} className="space-y-10">
          <fieldset className="space-y-5">
            <legend className="text-2xl">Learner details</legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-semibold">
                Learner’s full name
                <input
                  required
                  name="studentName"
                  className="form-input"
                  placeholder="e.g. Amina Nankunda"
                />
              </label>
              <label className="space-y-2 text-sm font-semibold">
                Date of birth
                <input required type="date" name="dateOfBirth" className="form-input" />
              </label>
              <label className="space-y-2 text-sm font-semibold">
                Applying for
                <select required name="entryLevel" className="form-input">
                  <option value="">Select a level</option>
                  <option>O’level · UCE</option>
                  <option>A’level · UACE</option>
                </select>
              </label>
              <label className="space-y-2 text-sm font-semibold">
                Preferred campus
                <select required name="campus" className="form-input">
                  <option value="">Select a campus</option>
                  <option>Day Campus</option>
                  <option>Mbale Progressive Annex · Boarding</option>
                  <option>Open to guidance</option>
                </select>
              </label>
            </div>
          </fieldset>

          <fieldset className="space-y-5">
            <legend className="text-2xl">Guardian contact</legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-semibold">
                Parent or guardian name
                <input
                  required
                  name="guardianName"
                  className="form-input"
                  placeholder="Full name"
                />
              </label>
              <label className="space-y-2 text-sm font-semibold">
                Phone number
                <input
                  required
                  type="tel"
                  name="phone"
                  className="form-input"
                  placeholder="+256 ..."
                />
              </label>
              <label className="space-y-2 text-sm font-semibold sm:col-span-2">
                Email address
                <input
                  required
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="you@example.com"
                />
              </label>
            </div>
          </fieldset>

          <fieldset className="space-y-5">
            <legend className="text-2xl">School background</legend>
            <label className="block space-y-2 text-sm font-semibold">
              Previous school
              <input name="previousSchool" className="form-input" placeholder="School name" />
            </label>
            <label className="block space-y-2 text-sm font-semibold">
              Anything you would like admissions to know?
              <textarea
                name="notes"
                rows={4}
                className="form-input resize-y"
                placeholder="Subjects, boarding questions, or support needs"
              />
            </label>
          </fieldset>

          <label className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
            <input required type="checkbox" name="consent" className="mt-1 size-4 accent-primary" />
            <span>
              I confirm that the information provided is accurate and may be used to respond to this
              admissions enquiry.
            </span>
          </label>

          {submissionError && (
            <p role="alert" className="text-sm text-destructive">
              {submissionError}
            </p>
          )}

          <Button type="submit" size="lg">
            Submit admission enquiry <ArrowRight />
          </Button>
        </form>
      </section>
    </>
  );
}
