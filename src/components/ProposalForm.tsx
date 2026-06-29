"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ProposalIntake } from "@/types/proposal";
import { PROJECT_TYPE_LABELS, TONE_LABELS } from "@/types/proposal";

const defaultValues: ProposalIntake = {
  title: "",
  clientName: "",
  clientCompany: "",
  projectType: "strategy-consulting",
  problemStatement: "",
  deliverables: "",
  timeline: "",
  budgetRange: "",
  tone: "professional",
  yourCompanyName: "",
  additionalNotes: "",
};

const TONE_COLORS: Record<ProposalIntake["tone"], string> = {
  professional: "from-slate-600 to-slate-800",
  friendly: "from-sky-500 to-blue-600",
  bold: "from-orange-500 to-red-500",
  consultative: "from-violet-500 to-purple-600",
};

type ProposalFormProps = {
  defaultCompanyName?: string | null;
};

export function ProposalForm({ defaultCompanyName }: ProposalFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<ProposalIntake>({
    ...defaultValues,
    yourCompanyName: defaultCompanyName || "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function updateField<K extends keyof ProposalIntake>(key: K, value: ProposalIntake[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate proposal");
      }

      router.push(`/proposals/${data.proposal.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="form-section-violet">
        <div className="form-section-header-violet">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-xl backdrop-blur-sm">
              📋
            </span>
            <div>
              <h2 className="text-lg font-bold text-white">Project basics</h2>
              <p className="text-sm text-violet-100">
                Who is the client and what kind of project is this?
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Project title" required accent="violet">
              <input
                className={inputClass}
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="Q3 growth strategy engagement"
                required
              />
            </Field>

            <Field label="Project type" required accent="violet">
              <select
                className={inputClass}
                value={form.projectType}
                onChange={(e) =>
                  updateField("projectType", e.target.value as ProposalIntake["projectType"])
                }
              >
                {Object.entries(PROJECT_TYPE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Client name" required accent="fuchsia">
              <input
                className={inputClass}
                value={form.clientName}
                onChange={(e) => updateField("clientName", e.target.value)}
                placeholder="Jane Smith"
                required
              />
            </Field>

            <Field label="Client company" accent="fuchsia">
              <input
                className={inputClass}
                value={form.clientCompany}
                onChange={(e) => updateField("clientCompany", e.target.value)}
                placeholder="Acme Corp"
              />
            </Field>

            <Field label="Your brand name" accent="purple">
              <input
                className={inputClass}
                value={form.yourCompanyName}
                onChange={(e) => updateField("yourCompanyName", e.target.value)}
                placeholder="Your name or business"
              />
            </Field>
          </div>

          <Field label="Writing tone" required accent="indigo">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {(Object.entries(TONE_LABELS) as [ProposalIntake["tone"], string][]).map(
                ([value, label]) => {
                  const isActive = form.tone === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => updateField("tone", value)}
                      className={`tone-pill ${
                        isActive
                          ? `tone-pill-active bg-gradient-to-r ${TONE_COLORS[value]} shadow-lg`
                          : "tone-pill-inactive"
                      }`}
                    >
                      {label}
                    </button>
                  );
                },
              )}
            </div>
          </Field>
        </div>
      </section>

      <section className="form-section-indigo">
        <div className="form-section-header-indigo">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-xl backdrop-blur-sm">
              🚀
            </span>
            <div>
              <h2 className="text-lg font-bold text-white">Scope & context</h2>
              <p className="text-sm text-indigo-100">
                The meat of the proposal — problems, deliverables, timeline
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-6">
          <Field label="Client problem or goal" required accent="indigo">
            <textarea
              className={`${inputClass} min-h-28 border-indigo-100 focus:border-indigo-400 focus:ring-indigo-500/15`}
              value={form.problemStatement}
              onChange={(e) => updateField("problemStatement", e.target.value)}
              placeholder="What challenge are they facing? What outcome do they want?"
              required
            />
          </Field>

          <Field label="Deliverables" required accent="violet">
            <textarea
              className={`${inputClass} min-h-24 border-violet-100 focus:border-violet-400 focus:ring-violet-500/15`}
              value={form.deliverables}
              onChange={(e) => updateField("deliverables", e.target.value)}
              placeholder="Audit report, 90-day roadmap, weekly check-ins..."
              required
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Timeline" required accent="sky">
              <input
                className={`${inputClass} border-sky-100 focus:border-sky-400 focus:ring-sky-500/15`}
                value={form.timeline}
                onChange={(e) => updateField("timeline", e.target.value)}
                placeholder="6 weeks, kickoff in March"
                required
              />
            </Field>

            <Field label="Budget range" accent="emerald" optional>
              <input
                className={`${inputClass} border-emerald-100 focus:border-emerald-400 focus:ring-emerald-500/15`}
                value={form.budgetRange}
                onChange={(e) => updateField("budgetRange", e.target.value)}
                placeholder="$15,000 – $20,000"
              />
            </Field>
          </div>

          <Field label="Additional notes" accent="amber" optional>
            <textarea
              className={`${inputClass} min-h-20 border-amber-100 focus:border-amber-400 focus:ring-amber-500/15`}
              value={form.additionalNotes}
              onChange={(e) => updateField("additionalNotes", e.target.value)}
              placeholder="Competitors, constraints, past work together..."
            />
          </Field>
        </div>
      </section>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-500 p-6 shadow-xl shadow-violet-400/30">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-white">Ready to generate?</p>
            <p className="mt-1 text-sm text-violet-100">
              {loading ? "✨ Building your proposal..." : "Takes about 15–30 seconds"}
            </p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-violet-700 shadow-lg transition hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Generating..." : "✨ Generate proposal"}
          </button>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  optional,
  accent,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  accent?: "violet" | "indigo" | "fuchsia" | "purple" | "sky" | "emerald" | "amber";
  children: React.ReactNode;
}) {
  const dotColors = {
    violet: "bg-violet-500",
    indigo: "bg-indigo-500",
    fuchsia: "bg-fuchsia-500",
    purple: "bg-purple-500",
    sky: "bg-sky-500",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
  };

  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-slate-700">
        {accent && <span className={`h-2 w-2 rounded-full ${dotColors[accent]}`} />}
        {label}
        {required && <span className="text-fuchsia-500">*</span>}
        {optional && <span className="text-xs font-normal text-slate-400">(optional)</span>}
      </span>
      {children}
    </label>
  );
}

const inputClass = "input-field";
