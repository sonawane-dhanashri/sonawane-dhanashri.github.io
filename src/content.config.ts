import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const step = z.object({
  label: z.string(),
  // One line shown beside the step on the case study page.
  note: z.string().optional(),
  // Each kind has one colour in the diagram:
  // "gate"  a guardrail or validation step (accent)
  // "model" a step done by an LLM or other model (teal)
  // "io"    an input or output (amber, dashed)
  // "step"  everything else (neutral)
  kind: z.enum(["step", "gate", "io", "model"]).default("step"),
  // Parallel branches inside one step, e.g. three agents.
  branches: z.array(z.string()).optional(),
  // A feedback loop that starts at this step.
  loop: z.string().optional(),
});

const diagram = z.object({
  title: z.string(),
  description: z.string(),
  steps: z.array(step).min(2),
  // Stores and transports that sit beside the flow.
  stores: z.array(z.object({ name: z.string(), role: z.string() })).default([]),
});

const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    description: z.string().min(120).max(165),
    order: z.number(),
    context: z.string(),
    period: z.string(),
    stack: z.array(z.string()),
    repo: z.string().default(""),
    demo: z.string().default(""),
    featured: z.boolean().default(true),
    diagrams: z.array(diagram).min(1),
  }),
});

export const collections = { work };
