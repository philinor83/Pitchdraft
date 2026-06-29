import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { proposalIntakeSchema } from "@/types/proposal";
import { generateProposalMarkdown } from "@/lib/openai";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const proposals = await prisma.proposal.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      clientName: true,
      clientCompany: true,
      projectType: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({ proposals });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = proposalIntakeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Invalid input" },
        { status: 400 },
      );
    }

    const intake = parsed.data;
    const contentMarkdown = await generateProposalMarkdown(
      intake,
      session.user.companyName,
    );

    const proposal = await prisma.proposal.create({
      data: {
        userId: session.user.id,
        title: intake.title,
        clientName: intake.clientName,
        clientCompany: intake.clientCompany || null,
        projectType: intake.projectType,
        intakeData: JSON.stringify(intake),
        contentMarkdown,
        status: "draft",
      },
    });

    return NextResponse.json({ proposal });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to generate proposal";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
