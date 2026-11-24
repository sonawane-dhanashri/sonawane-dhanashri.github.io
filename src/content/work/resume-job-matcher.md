---
title: "AI-powered resume–job matcher"
summary: "Semantic matching between resumes and job descriptions, with an explanation of the skills a candidate is missing"
description: "Project: a semantic resume and job matcher using embeddings, Milvus vector search, FastAPI and LangChain to rank matches and explain missing skills."
order: 4
context: "Personal project"
period: ""
stack: ["Python", "FastAPI", "LangChain", "Milvus", "PostgreSQL"]
diagrams:
  - title: "Matching flow"
    description: "Resumes and job descriptions become embeddings, are ranked by vector search, and the gaps are explained."
    steps:
      - label: "Resume and job description"
        kind: "io"
      - label: "Embeddings"
        kind: "model"
        note: "Both documents are turned into embeddings."
      - label: "Vector search"
        note: "Milvus ranks matches by similarity."
      - label: "Scoring"
        note: "FastAPI endpoints return the match score."
      - label: "Missing skills"
        kind: "model"
        note: "A LangChain workflow explains which skills the candidate is missing for the job."
      - label: "Ranked matches with reasons"
        kind: "io"
    stores:
      - name: "Milvus"
        role: "vector search"
      - name: "PostgreSQL"
        role: "application data"
---

## What it does

The matcher compares resumes with job descriptions by meaning, not by keyword overlap. It ranks the matches and explains what a candidate is missing for a given job.

## What I built

- **Semantic matching.** The system creates embeddings for resumes and job descriptions and ranks matches with Milvus vector search.
- **Scoring endpoints.** FastAPI endpoints expose the scores.
- **Explanations.** LangChain workflows explain a candidate's missing skills.

## Decisions

- **Embeddings over keywords.** A resume and a job description often describe the same skill in different words. Comparing embeddings matches on meaning.
- **A score is not enough.** A number alone does not tell a candidate what to do next, so the system also says which skills are missing.
