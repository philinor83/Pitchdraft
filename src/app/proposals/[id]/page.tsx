import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Header } from "@/components/Header";
import { ProposalEditor } from "@/components/ProposalEditor";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProposalPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const { id } = await params;

  const proposal = await prisma.proposal.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!proposal) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <Link
          href="/dashboard"
          className="text-sm font-medium text-brand-600 hover:text-brand-700 print:hidden"
        >
          ← Back to dashboard
        </Link>

        <div className="mt-6">
          <ProposalEditor
            id={proposal.id}
            initialTitle={proposal.title}
            initialContent={proposal.contentMarkdown}
            initialStatus={proposal.status}
            clientName={proposal.clientName}
          />
        </div>
      </main>
    </div>
  );
}
