import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { PROJECT_TYPE_LABELS } from "@/types/proposal";
import type { ProposalIntake } from "@/types/proposal";

type ProposalCardProps = {
  id: string;
  title: string;
  clientName: string;
  clientCompany: string | null;
  projectType: string;
  status: string;
  updatedAt: Date | string;
};

const STATUS_STYLES: Record<string, string> = {
  draft: "bg-amber-50 text-amber-700 ring-amber-600/20",
  sent: "bg-blue-50 text-blue-700 ring-blue-600/20",
  won: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  lost: "bg-slate-100 text-slate-600 ring-slate-500/20",
};

export function ProposalCard({
  id,
  title,
  clientName,
  clientCompany,
  projectType,
  status,
  updatedAt,
}: ProposalCardProps) {
  const typeLabel =
    PROJECT_TYPE_LABELS[projectType as ProposalIntake["projectType"]] || projectType;

  return (
    <Link
      href={`/proposals/${id}`}
      className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-slate-900 group-hover:text-violet-700">
            {title}
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            {clientName}
            {clientCompany ? ` · ${clientCompany}` : ""}
          </p>
          <p className="mt-2 text-xs text-slate-500">
            {typeLabel} · Updated {formatDate(updatedAt)}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium capitalize ring-1 ring-inset ${STATUS_STYLES[status] || STATUS_STYLES.draft}`}
        >
          {status}
        </span>
      </div>
    </Link>
  );
}
