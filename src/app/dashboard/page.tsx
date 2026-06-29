import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Header } from "@/components/Header";
import { ProposalCard } from "@/components/ProposalCard";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const proposals = await prisma.proposal.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
  });

  const sent = proposals.filter((p) => p.status === "sent").length;
  const won = proposals.filter((p) => p.status === "won").length;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Hey{session.user.name ? `, ${session.user.name.split(" ")[0]}` : ""} 👋
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Your proposal workspace — build drafts here, sell them out there.
            </p>
          </div>
          <Link href="/proposals/new" className="btn-primary">
            + New proposal
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <StatCard label="Total proposals" value={proposals.length} />
          <StatCard label="Sent to clients" value={sent} />
          <StatCard label="Jobs won" value={won} accent />
        </div>

        {proposals.length === 0 ? (
          <div className="mt-10 rounded-2xl border-2 border-dashed border-violet-200 bg-white p-12 text-center">
            <span className="text-4xl">📄</span>
            <h2 className="mt-4 text-lg font-semibold text-slate-900">No proposals yet</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
              Make a practice one first. Then read{" "}
              <Link href="/earn" className="font-medium text-violet-600 hover:text-violet-700">
                how to get paid
              </Link>{" "}
              for writing these for other people.
            </p>
            <Link href="/proposals/new" className="btn-primary mt-6 inline-flex">
              Create first proposal
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {proposals.map((proposal) => (
              <ProposalCard key={proposal.id} {...proposal} />
            ))}
          </div>
        )}

        <div className="mt-10 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-6 text-white sm:flex sm:items-center sm:justify-between">
          <div>
            <h3 className="font-semibold">Ready to earn?</h3>
            <p className="mt-1 text-sm text-violet-100">
              Charge $10–20 per proposal for people you know. Parent-approved payments.
            </p>
          </div>
          <Link
            href="/earn"
            className="mt-4 inline-block rounded-xl bg-white px-4 py-2 text-sm font-semibold text-violet-700 sm:mt-0"
          >
            Money guide →
          </Link>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        accent
          ? "border-violet-200 bg-violet-50"
          : "border-slate-200 bg-white"
      }`}
    >
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`mt-1 text-3xl font-bold ${accent ? "text-violet-700" : "text-slate-900"}`}>
        {value}
      </p>
    </div>
  );
}
