---
title: "Multi-agent learning assistant"
summary: "Recommendation, tutoring and assessment agents that share memory to find skill gaps and suggest learning paths"
description: "Case study: a multi-agent learning assistant where recommendation, tutoring and assessment agents share memory and tools to find skill gaps."
order: 3
context: "SwayAlgo Technologies"
period: "2025 – 2026"
stack: ["Python", "FastAPI", "Google AI SDK"]
diagrams:
  - title: "How a message is handled"
    description: "Each message is routed by intent to one of three agents. All three read and write the same memory."
    steps:
      - label: "Learner message"
        kind: "io"
      - label: "Intent routing"
        note: "Each message is routed by intent, and the conversation context is kept across multi-step interactions."
      - label: "Agents"
        kind: "model"
        branches: ["Recommendation", "Tutoring", "Assessment"]
        note: "Three agents with separate jobs. They work from shared memory and structured tools."
      - label: "Skill gaps and learning path"
        kind: "io"
        note: "The system finds skill gaps and suggests a learning path."
    stores:
      - name: "Shared memory"
        role: "read and written by all three agents"
      - name: "Structured tools"
        role: "shared tool interfaces"
      - name: "FastAPI"
        role: "modular APIs"
---

## What it does

The assistant helps a learner work out what to study next. It finds skill gaps and suggests learning paths, and it can tutor and assess along the way.

## What I built

- **The multi-agent system.** Recommendation, tutoring and assessment agents that share memory and structured tools.
- **Intent-based routing.** Each message goes to the right agent, and conversation context is kept across multi-step interactions.
- **The API layer.** The system is exposed as modular FastAPI APIs.

## Decisions

- **Three agents with separate jobs.** Recommending, tutoring and assessing are different tasks. Each agent does one of them.
- **Shared memory.** The agents share memory, so what one learns about the learner is available to the others. An assessment can inform the next recommendation.
- **Routing by intent, with context kept.** A learner moves between asking, practising and being tested in one conversation. Routing sends each message to the right agent without losing the thread.
