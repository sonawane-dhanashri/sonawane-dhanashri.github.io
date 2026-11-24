---
title: "Brand-to-campaign generation platform"
summary: "A generative AI pipeline that turns a brand's URL into marketing campaigns, with checks at every stage"
description: "Case study: a generative AI pipeline on Vertex AI that turns a brand URL into marketing campaigns, with fail-closed guardrails and automated QA."
order: 1
context: "SwayAlgo Technologies"
period: "2025 – 2026"
stack: ["Python", "FastAPI", "Vertex AI", "Gemini", "Claude", "Imagen", "PostgreSQL", "Docker", "Kubernetes", "GCP"]
diagrams:
  - title: "Campaign pipeline"
    description: "From a brand URL to a finished campaign. Steps marked with a diamond are checks that can stop or repeat the work."
    steps:
      - label: "Brand URL"
        kind: "io"
        note: "The only input a user gives."
      - label: "Input guardrails"
        kind: "gate"
        note: "Every model call goes through one shared Vertex AI client. The guardrails fail closed: if a request cannot be cleared, it is blocked."
      - label: "Brand extraction"
        note: "Reads the brand from its website."
      - label: "Creative brief"
        kind: "model"
        note: "An LLM writes the creative brief for the campaign."
      - label: "Image generation"
        kind: "model"
        note: "Google Imagen generates 1 to 5 brand assets in parallel per request, with safety checks. Backgrounds are removed with rembg (U2Net)."
      - label: "Vision review"
        kind: "gate"
        note: "A vision model reviews each generated image."
        loop: "Feedback goes back into generation"
      - label: "Layout"
        note: "Assets and copy are composed into campaign layouts."
      - label: "Automated QA"
        kind: "gate"
        note: "The finished campaign is checked automatically before it is returned."
      - label: "Campaign"
        kind: "io"
    stores:
      - name: "PostgreSQL"
        role: "application data"
      - name: "Docker + Kubernetes on GCP"
        role: "deployment"
  - title: "Spec-to-component workflow"
    description: "A second workflow in the same platform: natural-language specs become Canvas-2D game components."
    steps:
      - label: "Natural-language spec"
        kind: "io"
      - label: "LLM code generation"
        kind: "model"
        note: "The model writes a Canvas-2D game component from the spec."
      - label: "Render check"
        kind: "gate"
        note: "The generated component is rendered to confirm it actually runs and draws."
      - label: "LLM-as-a-judge"
        kind: "gate"
        note: "A vision model judges the rendered result against the spec."
        loop: "Output that fails goes back to generation"
      - label: "Accepted component"
        kind: "io"
    stores: []
---

## What it does

The platform takes a brand's website URL and returns marketing campaigns for that brand. Nothing else is asked of the user. Between the URL and the campaign sit five stages: brand extraction, an LLM-written creative brief, image generation, layout and automated QA.

I architected this pipeline end to end and built the services behind it.

## What I built

- **The pipeline itself.** Brand extraction, creative brief, image generation, layout and automated QA, connected as one flow.
- **An image-generation service on Google Imagen.** It generates 1 to 5 brand assets in parallel per request, runs safety checks, uses a vision model in a feedback loop, and removes backgrounds with rembg (U2Net).
- **A code-generation workflow.** It turns natural-language specs into Canvas-2D game components. Output is validated by render checks and by an LLM-as-a-judge vision loop.
- **A shared model client.** Gemini, Imagen and Claude sit behind one Vertex AI client with fail-closed input guardrails.
- **The API layer.** More than 15 async FastAPI routers, deployed with Docker and Kubernetes on GCP.

## Decisions

- **One client for every model.** With three models in use, guardrails written per call site drift apart. Routing Gemini, Imagen and Claude through a single client means the input guardrails are applied in one place and cannot be skipped.
- **Fail closed.** When a guardrail cannot clear a request, the request is blocked. A blocked request is a visible, recoverable failure. An unsafe one that slips through is not.
- **Generated work is checked before it is accepted.** Images are reviewed by a vision model. Generated code has to render, and then a judge model compares the result with the spec. Output moves forward only after it passes.
- **Parallel image generation.** A campaign needs several assets, so each request generates up to five at once.

## Evaluation

Each kind of output has its own check:

- **Images:** safety checks before generation, then a vision-model review with feedback.
- **Generated components:** a render check, then an LLM-as-a-judge vision loop.
- **Whole campaigns:** an automated QA stage at the end of the pipeline.
