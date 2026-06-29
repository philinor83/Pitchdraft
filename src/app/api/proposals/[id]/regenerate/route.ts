import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { proposalIntakeSchema } from "@/types/proposal";
import { generateProposalMarkdown } from "@/lib/openai";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(_request: Request, context: RouteContext) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  const existing = await prisma.proposal.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const intake = proposalIntakeSchema.parse(JSON.parse(existing.intakeData));
    const contentMarkdown = await generateProposalMarkdown(
      intake,
      session.user.companyName,
    );

    const proposal = await prisma.proposal.update({
      where: { id },
      data: { contentMarkdown },
    });

    return NextResponse.json({ proposal });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to regenerate proposal";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
