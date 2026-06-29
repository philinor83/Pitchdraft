import type { ProposalIntake } from "@/types/proposal";
import { PROJECT_TYPE_LABELS, TONE_LABELS } from "@/types/proposal";

export function generateDemoProposalMarkdown(
  intake: ProposalIntake,
  userCompany?: string | null,
): string {
  const company = intake.yourCompanyName || userCompany || "Our team";
  const clientLabel = intake.clientCompany
    ? `${intake.clientName} at ${intake.clientCompany}`
    : intake.clientName;
  const projectType = PROJECT_TYPE_LABELS[intake.projectType];
  const tone = TONE_LABELS[intake.tone];
  const budget = intake.budgetRange || "[Add your pricing here — e.g. $5,000 fixed fee or $150/hour]";
  const notes = intake.additionalNotes
    ? `\n\n**Additional context:** ${intake.additionalNotes}`
    : "";

  const deliverableLines = intake.deliverables
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `- ${line.replace(/^[-*•]\s*/, "")}`)
    .join("\n");

  return `> **Demo mode** — This is a template draft built from your answers. Add an OpenAI API key to \`.env\` for full AI writing.

# ${intake.title}

**Prepared for:** ${clientLabel}  
**Prepared by:** ${company}  
**Project type:** ${projectType}  
**Tone:** ${tone}

---

## Executive Summary

${company} is pleased to submit this proposal for **${intake.title}**. Based on our understanding of your goals, we will help ${intake.clientName} move from the current challenge to a clear, actionable outcome within **${intake.timeline}**.

We recommend a focused engagement that prioritizes results, clear communication, and deliverables you can use immediately.${notes}

---

## Understanding Your Needs

${intake.clientName} has shared the following goal:

${intake.problemStatement}

We understand that success means solving this problem in a way that is practical, on schedule, and aligned with your expectations. Our proposal below is shaped directly around what you told us.

---

## Proposed Approach

We will work in structured phases so you always know what is happening next:

1. **Discovery** — Confirm goals, constraints, and success criteria with ${intake.clientName}.
2. **Execution** — Complete the core work described in Scope & Deliverables.
3. **Review & handoff** — Present results, gather feedback, and deliver final materials.

Communication will be regular and straightforward. You will have a clear point of contact from ${company} throughout the project.

---

## Scope & Deliverables

This engagement includes:

${deliverableLines}

Anything outside this scope can be added through a simple change request so the project stays on track.

---

## Timeline & Milestones

**Overall timeline:** ${intake.timeline}

| Phase | What happens |
|-------|----------------|
| Week 1 | Kickoff, confirm requirements, align on plan |
| Mid-project | Core work and first review |
| Final | Revisions, delivery, and handoff |

Exact dates can be adjusted together at kickoff.

---

## Investment

**Estimated investment:** ${budget}

Payment terms (edit as needed):
- 50% due at project start
- 50% due upon final delivery

---

## Why ${company}

- We listen first and tailor the work to your situation — not a one-size-fits-all template.
- You get clear deliverables and a timeline you can plan around.
- We communicate in plain language (${tone.toLowerCase()} style) so nothing feels confusing.

---

## Next Steps

1. Review this proposal and share any questions.
2. Confirm scope and timeline.
3. Sign off and schedule kickoff.

We look forward to working with ${intake.clientName}.

**Contact:** [Your email] · [Your phone]
`;
}
