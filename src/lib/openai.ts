import OpenAI from "openai";
import type { ProposalIntake } from "@/types/proposal";
import { PROJECT_TYPE_LABELS, TONE_LABELS } from "@/types/proposal";
import { generateDemoProposalMarkdown } from "@/lib/demo-proposal";

function shouldUseDemoMode() {
  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key || key === "sk-..." || process.env.USE_DEMO_MODE === "true") {
    return true;
  }
  return false;
}

function getClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
  return new OpenAI({ apiKey });
}

export async function generateProposalMarkdown(
  intake: ProposalIntake,
  userCompany?: string | null,
): Promise<string> {
  if (shouldUseDemoMode()) {
    return generateDemoProposalMarkdown(intake, userCompany);
  }

  const client = getClient();
  const company = intake.yourCompanyName || userCompany || "Our team";

  const systemPrompt = `You are an expert proposal writer for consultants and agencies.
Write client-ready proposals in Markdown. Be specific, credible, and outcome-focused.
Never invent fake case studies, metrics, or client names. Use placeholders like [metric] if data is missing.
Structure the proposal with these sections (use ## headings):
1. Executive Summary
2. Understanding Your Needs
3. Proposed Approach
4. Scope & Deliverables
5. Timeline & Milestones
6. Investment
7. Why ${company}
8. Next Steps

Keep pricing in the Investment section as a clear placeholder the user can edit unless a budget range was provided.
Use bullet lists where helpful. Aim for 800-1200 words.`;

  const userPrompt = `Create a proposal with these details:

Project title: ${intake.title}
Client: ${intake.clientName}${intake.clientCompany ? ` at ${intake.clientCompany}` : ""}
Project type: ${PROJECT_TYPE_LABELS[intake.projectType]}
Your company: ${company}
Tone: ${TONE_LABELS[intake.tone]}

Client problem / goal:
${intake.problemStatement}

Deliverables:
${intake.deliverables}

Timeline: ${intake.timeline}
${intake.budgetRange ? `Budget range: ${intake.budgetRange}` : "Budget: not specified — use a placeholder pricing section"}
${intake.additionalNotes ? `\nAdditional notes:\n${intake.additionalNotes}` : ""}`;

  const response = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.7,
  });

  const content = response.choices[0]?.message?.content?.trim();
  if (!content) {
    throw new Error("No content returned from OpenAI");
  }

  return content;
}
