import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Header } from "@/components/Header";
import { ProposalForm } from "@/components/ProposalForm";
import { authOptions } from "@/lib/auth";

export default async function NewProposalPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8 text-center sm:text-left">
          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-md shadow-violet-300/40">
            ✨ Proposal maker
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Build your{" "}
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-500 bg-clip-text text-transparent">
              next proposal
            </span>
          </h1>
          <p className="mt-3 text-slate-600">
            Fill in the colorful sections below — we&apos;ll turn it into a full draft.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2 sm:justify-start">
            <StepBadge step="1" label="Basics" color="violet" active />
            <StepBadge step="2" label="Scope" color="indigo" active />
            <StepBadge step="3" label="Generate" color="fuchsia" />
          </div>
        </div>

        <ProposalForm defaultCompanyName={session.user.companyName} />
      </main>
    </div>
  );
}

function StepBadge({
  step,
  label,
  color,
  active,
}: {
  step: string;
  label: string;
  color: "violet" | "indigo" | "fuchsia";
  active?: boolean;
}) {
  const colors = {
    violet: active
      ? "bg-violet-600 text-white shadow-violet-300/50"
      : "bg-violet-100 text-violet-700",
    indigo: active
      ? "bg-indigo-600 text-white shadow-indigo-300/50"
      : "bg-indigo-100 text-indigo-700",
    fuchsia: active
      ? "bg-fuchsia-600 text-white shadow-fuchsia-300/50"
      : "bg-fuchsia-100 text-fuchsia-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold shadow-sm ${colors[color]}`}
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/25 text-[10px]">
        {step}
      </span>
      {label}
    </span>
  );
}
