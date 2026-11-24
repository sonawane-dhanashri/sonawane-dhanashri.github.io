---
title: "Voice AI customer support agent"
summary: "A real-time voice agent for multi-turn support calls that reaches customer data only through backend tools"
description: "Case study: a real-time voice support agent using Whisper, Gemini function calling and WebSockets, with customer data reached only through backend tools."
order: 2
context: "SwayAlgo Technologies"
period: "2025 – 2026"
stack: ["Python", "FastAPI", "WebSockets", "Whisper", "Gemini", "Redis", "PostgreSQL"]
diagrams:
  - title: "One turn of a support call"
    description: "Audio in, audio out, streamed over a WebSocket. The diamond marks the boundary between the model and the data."
    steps:
      - label: "Caller audio"
        kind: "io"
        note: "Streamed from the caller over a WebSocket."
      - label: "Speech-to-text"
        kind: "model"
        note: "Whisper transcribes the caller's speech."
      - label: "Reasoning"
        kind: "model"
        note: "Gemini decides what to say or which tool to call, using function calling."
      - label: "Backend tools"
        kind: "gate"
        note: "Customer and order data is read only through tool interfaces. The agent has no direct database access."
      - label: "Text-to-speech"
        kind: "model"
        note: "The reply is converted to speech."
      - label: "Spoken reply"
        kind: "io"
        note: "Streamed back to the caller."
    stores:
      - name: "Redis"
        role: "session state"
      - name: "PostgreSQL"
        role: "customer and order records"
      - name: "WebSockets"
        role: "streaming transport"
---

## What it does

The agent handles multi-turn customer support calls by voice, in real time. A caller speaks, the agent understands, looks up what it needs, and answers out loud. The conversation carries on across turns.

## What I built

- **The real-time voice loop.** Whisper for speech-to-text, Gemini for reasoning with function calling, and text-to-speech for the reply, streamed over WebSockets.
- **Secure tool interfaces.** The agent reads customer and order data only through backend tools, never through direct database access.
- **State and records.** Redis holds session state. PostgreSQL holds the records.

## Decisions

- **The model never touches the database.** A support agent needs customer and order data, which is exactly the data that must be protected. Every read goes through a backend tool with a defined interface, so what the agent can see is decided by the backend and not by the prompt.
- **Session state in Redis.** A call is many short turns. Keeping the session in Redis lets each turn pick up the conversation where the last one ended.
- **Streaming over WebSockets.** Voice is a conversation, so audio moves in both directions over one open connection.
