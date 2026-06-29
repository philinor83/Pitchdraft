import { z } from "zod";

export const proposalIntakeSchema = z.object({
  title: z.string().min(3, "Project title is required"),
  clientName: z.string().min(2, "Client name is required"),
  clientCompany: z.string().optional(),
  projectType: z.enum([
    "strategy-consulting",
    "marketing-agency",
    "design-branding",
    "software-development",
    "retainer",
    "other",
  ]),
  problemStatement: z
    .string()
    .min(20, "Describe the client's problem or goal (at least 20 characters)"),
  deliverables: z.string().min(10, "List expected deliverables"),
  timeline: z.string().min(3, "Timeline is required"),
  budgetRange: z.string().optional(),
  tone: z.enum(["professional", "friendly", "bold", "consultative"]),
  yourCompanyName: z.string().optional(),
  additionalNotes: z.string().optional(),
});

export type ProposalIntake = z.infer<typeof proposalIntakeSchema>;

export const PROJECT_TYPE_LABELS: Record<ProposalIntake["projectType"], string> = {
  "strategy-consulting": "Strategy / Consulting",
  "marketing-agency": "Marketing Agency",
  "design-branding": "Design / Branding",
  "software-development": "Software Development",
  retainer: "Retainer / Ongoing",
  other: "Other",
};

export const TONE_LABELS: Record<ProposalIntake["tone"], string> = {
  professional: "Professional",
  friendly: "Friendly & approachable",
  bold: "Bold & confident",
  consultative: "Consultative & advisory",
};
