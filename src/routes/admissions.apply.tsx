import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, FileText, ShieldCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/school-layout";
import { isApiConfigured, submitApplication } from "@/lib/api";
import { queueNotification, type NotificationRecord } from "@/lib/notifications";
import { schoolHead } from "@/lib/school";

export const Route = createFileRoute("/admissions/apply")({
  head: () =>
    schoolHead(
      "Apply for admission",
      "Submit a four-step application enquiry for O’Level or A’Level study at Mbale Progressive Secondary School.",
    ),
  component: ApplyForAdmission,
});

const steps = ["Student info", "Academics", "Parent", "Contact"];
const requiredFieldsByStep: Record<number, string[]> = {
  1: ["studentName", "unebIndex", "dateOfBirth", "sex", "nationality", "homeDistrict"],
  2: ["entryLevel", "campus", "previousSchool"],
  3: ["guardianName", "phone", "email"],
  4: ["consent"],
};

function ApplyForAdmission() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [notification, setNotification] = useState<NotificationRecord | null>(null);
  const [submissionError, setSubmissionError] = useState("");

  function validateStep(form: HTMLFormElement, currentStep: number) {
    const missingField = requiredFieldsByStep[currentStep].find((name) => {
      const field = form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | null;
      if (!field) return false;
      return name === "consent" ? !field.checked : !field.value.trim();
    });

    if (!missingField) return true;
    const field = form.elements.namedItem(missingField) as
      HTMLInputElement | HTMLSelectElement | null;
    field?.reportValidity();
    return false;
  }

  function nextStep(form: HTMLFormElement) {
    if (validateStep(form, step)) {
      setSubmissionError("");
      setStep((current) => Math.min(current + 1, steps.length));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmissionError("");

    for (const currentStep of Object.keys(requiredFieldsByStep).map(Number)) {
      if (!validateStep(form, currentStep)) {
        setStep(currentStep);
        return;
      }
    }

    const formData = new FormData(form);
    const reference = `MPS-APP-${Date.now().toString().slice(-6)}`;
    const additionalDetails = [
      `UNEB index: ${String(formData.get("unebIndex") ?? "")}`,
      `Sex: ${String(formData.get("sex") ?? "")}`,
      `Religion: ${String(formData.get("religion") ?? "Not provided")}`,
      `Nationality: ${String(formData.get("nationality") ?? "")}`,
      `Home district: ${String(formData.get("homeDistrict") ?? "")}`,
    ].join("\n");
    const notes = [String(formData.get("notes") ?? "").trim(), additionalDetails]
      .filter(Boolean)
      .join("\n\n");

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
          notes,
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
          <div className="mx-auto max-w-2xl border border-border bg-muted p-8 md:p-10">
            <CheckCircle2 className="text-primary" size={34} />
            <h2 className="mt-5 text-3xl">Enquiry saved</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Your enquiry reference is ready. Keep it for follow-up with the admissions office.
            </p>
            <p className="mt-4 border border-border bg-background p-4 text-sm leading-6 text-muted-foreground">
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
      <section className="bg-primary py-16 text-primary-foreground md:py-20">
        <div className="site-width">
          <p className="text-sm font-semibold tracking-[0.04em] text-secondary">Admissions</p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-tight md:text-6xl">
            Admission application
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-primary-foreground/80">
            Start your application enquiry for O’Level or A’Level at Mbale Progressive Secondary
            School.
          </p>
        </div>
      </section>

      <section className="site-width py-12 md:py-16">
        <div className="mx-auto max-w-4xl border border-border bg-background p-5 shadow-sm sm:p-8 md:p-10">
          <div className="mb-10 grid grid-cols-4 gap-2" aria-label="Application progress">
            {steps.map((label, index) => {
              const stepNumber = index + 1;
              const active = stepNumber === step;
              const complete = stepNumber < step;
              return (
                <div key={label} className="relative text-center">
                  {index < steps.length - 1 && (
                    <span
                      className={`absolute left-1/2 top-5 -z-0 h-px w-full ${complete ? "bg-secondary" : "bg-border"}`}
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={`relative z-10 mx-auto flex size-10 items-center justify-center rounded-full border text-sm font-bold ${active || complete ? "border-primary bg-primary text-primary-foreground" : "border-border bg-muted text-muted-foreground"}`}
                  >
                    {stepNumber}
                  </span>
                  <span
                    className={`mt-3 block text-xs font-semibold sm:text-sm ${active ? "text-primary" : "text-muted-foreground"}`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          <form
            onSubmit={handleSubmit}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                step < steps.length &&
                event.target instanceof HTMLInputElement
              ) {
                event.preventDefault();
              }
            }}
          >
            {step === 1 && (
              <fieldset className="space-y-5">
                <legend className="border-b border-secondary pb-3 text-2xl font-semibold text-primary">
                  Student information
                </legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Full name"
                    name="studentName"
                    placeholder="Enter the learner’s full name"
                  />
                  <Field label="UNEB index number" name="unebIndex" placeholder="e.g. U1234/567" />
                  <Field label="Date of birth" name="dateOfBirth" type="date" />
                  <SelectField label="Sex" name="sex" options={["Male", "Female"]} />
                  <SelectField
                    label="Religion"
                    name="religion"
                    options={["Catholic", "Protestant", "Pentecostal", "Muslim", "Other"]}
                    required={false}
                  />
                  <Field label="Nationality" name="nationality" placeholder="e.g. Ugandan" />
                  <Field
                    label="Home district"
                    name="homeDistrict"
                    placeholder="Enter home district"
                    className="sm:col-span-2"
                  />
                </div>
              </fieldset>
            )}

            {step === 2 && (
              <fieldset className="space-y-5">
                <legend className="border-b border-secondary pb-3 text-2xl font-semibold text-primary">
                  Academic placement
                </legend>
                <p className="text-sm leading-6 text-muted-foreground">
                  Tell the admissions team which pathway and campus you are considering. The office
                  will confirm current placement guidance.
                </p>
                <div className="grid gap-5 sm:grid-cols-2">
                  <SelectField
                    label="Applying for"
                    name="entryLevel"
                    options={["O’level · UCE", "A’level · UACE"]}
                  />
                  <SelectField
                    label="Preferred campus"
                    name="campus"
                    options={[
                      "Day Campus",
                      "Mbale Progressive Annex · Boarding",
                      "Open to guidance",
                    ]}
                  />
                  <Field
                    label="Previous school"
                    name="previousSchool"
                    placeholder="Enter the previous school"
                    className="sm:col-span-2"
                  />
                </div>
              </fieldset>
            )}

            {step === 3 && (
              <fieldset className="space-y-5">
                <legend className="border-b border-secondary pb-3 text-2xl font-semibold text-primary">
                  Parent or guardian
                </legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Parent or guardian name"
                    name="guardianName"
                    placeholder="Enter full name"
                  />
                  <Field label="Phone number" name="phone" type="tel" placeholder="+256 ..." />
                  <Field
                    label="Email address"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="sm:col-span-2"
                  />
                </div>
              </fieldset>
            )}

            {step === 4 && (
              <fieldset className="space-y-5">
                <legend className="border-b border-secondary pb-3 text-2xl font-semibold text-primary">
                  Contact and follow-up
                </legend>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="flex gap-4">
                    <FileText className="mt-1 shrink-0 text-primary" size={22} />
                    <div>
                      <h2 className="text-xl">What happens next?</h2>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        The admissions team will review the enquiry and respond with current
                        requirements, availability, and fee guidance.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <ShieldCheck className="mt-1 shrink-0 text-primary" size={22} />
                    <div>
                      <h2 className="text-xl">Keep originals safe</h2>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        This is an enquiry form. Do not upload original certificates or sensitive
                        documents here.
                      </p>
                    </div>
                  </div>
                </div>
                <label className="block space-y-2 text-sm font-semibold">
                  Anything you would like admissions to know?
                  <textarea
                    name="notes"
                    rows={5}
                    className="form-input resize-y"
                    placeholder="Subjects, boarding questions, or support needs"
                  />
                </label>
                <label className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
                  <input
                    required
                    type="checkbox"
                    name="consent"
                    className="mt-1 size-4 accent-primary"
                  />
                  <span>
                    I confirm that the information provided is accurate and may be used to respond
                    to this admissions enquiry.
                  </span>
                </label>
              </fieldset>
            )}

            {submissionError && (
              <p role="alert" className="mt-6 text-sm text-destructive">
                {submissionError}
              </p>
            )}

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
              <Link
                to="/admissions"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                <ArrowLeft size={16} /> Back to admissions
              </Link>
              <div className="flex gap-3">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep((current) => current - 1)}
                  >
                    Back
                  </Button>
                )}
                {step < steps.length ? (
                  <Button
                    type="button"
                    onClick={(event) => nextStep(event.currentTarget.form as HTMLFormElement)}
                  >
                    Next <ArrowRight />
                  </Button>
                ) : (
                  <Button type="submit">
                    Submit application <ArrowRight />
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  className = "",
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`space-y-2 text-sm font-semibold ${className}`}>
      {label}
      <input required name={name} type={type} className="form-input" placeholder={placeholder} />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  required = true,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="space-y-2 text-sm font-semibold">
      {label}
      <select required={required} name={name} className="form-input">
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
