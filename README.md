# GitHub Copilot Training - Angular Samples

This repository is a hands-on playground for teaching engineers how to collaborate with GitHub Copilot while working inside a real Angular 21 + Vitest codebase. Each step adds more structure—from raw prompting, to guardrails, reusable prompts, skills, and finally fully orchestrated multi-agent workflows—so the team can see how Copilot can be shaped to behave predictably in enterprise environments.

---

## Repository layout

| Path | Purpose |
| --- | --- |
| `angular-example-app/` | The upstream Angular 21 reference app you will extend and test. Everything in the training flows targets this project. |
| `step-0/` | Manual prompt exercises. Start here to feel Copilot’s default behavior and document rough edges. |
| `step-1/` | Copilot guardrails. Contains curated instructions (see `step-1/copilot-instructions.md` and `angular-example-app/.github/copilot-instructions.md`) for safe, repeatable test generation. |
| `step-2/` | Prompt file starter (`step-2/prompts`). Centralize reusable prompt templates so participants don’t have to retype long instructions. |
| `step-3/` | Skills library (`step-3/skills/`). Capture domain-specific “recipes” (e.g., “write Vitest spec for Angular standalone component”) that Copilot or agents can reuse. |
| `step-4/` | Multi-step workflows (`step-4/agents/`, `step-4/skills/`). Stitch prompts + skills into agent pipelines that analyze components, draft plans, write tests, and validate results. |
| `.github/` | Repo-level automation hooks (useful later when you roll out PR checks, workflows, etc.). Currently empty in this skeleton. |

---

## Training flow

1. **Step 0 – Manual prompts**  
   - Work inside `step-0/README.md`.  
   - Prompt Copilot manually (e.g., “Write test case for app.component.ts”).  
   - Capture what worked, what failed, and pain points you want to address with better instructions.

2. **Step 1 – Custom instructions (guardrails)**  
   - Load the instructions from `angular-example-app/.github/copilot-instructions.md` (also duplicated in `step-1/copilot-instructions.md` for quick reference).  
   - These guardrails enforce Angular 21 + Vitest best practices: zoneless change detection, `TestBed` usage, explicit Vitest imports, etc.  
   - Run a training session where participants first attempt the same tests as Step 0 but with these instructions active.

3. **Step 2 – Prompt file (shared templates)**  
   - Populate `step-2/prompts` with copy/paste-ready prompt templates (e.g., *“Given component X, follow the guardrails to produce a spec with AAA pattern and coverage assertions.”*).  
   - Encourage teams to log new prompt snippets as they discover what consistently yields good output.

4. **Step 3 – Skills (procedural playbooks)**  
   - Store repeatable workflows (skills) inside `step-3/skills/`. Examples:  
     - “Audit component inputs/outputs”  
     - “Generate Vitest spec skeleton”  
     - “Add coverage assertions + error cases”  
   - These can be JSON/YAML/Markdown—whatever format you’ll later feed into agents or internal tooling.

5. **Step 4 – Agent mode / Copilot coding agent**  
   - Combine prompts + skills into longer pipelines under `step-4/agents/`.  
   - Example pipeline:  
     1. Agent reads component → produces test plan.  
     2. Agent writes/updates spec files.  
     3. Agent runs `npm run test:coverage` and reports gaps.  
   - This step demonstrates how Copilot (or any LLM agent) can be guided end-to-end with minimal human editing.

## Decision matrix

| Scenario | Use this |
| --- | --- |
| One-off clarification or exploratory question | **Prompt** (ask Copilot inline or in chat) |
| Enforcing team-wide coding/test standards | **Custom instructions** (e.g., `angular-example-app/.github/copilot-instructions.md`) |
| “Copy/paste” reusable requests | **Prompt file** (shared templates in `step-2/prompts`) |
| Large multi-part work items | **Agent mode / Copilot coding agent** (delegate as a multi-step job) |
| Specialized repeatable workflows | **Custom agent** (store flows in `step-4/agents/`) |
| Procedural knowledge, scripts, validation steps, domain playbooks | **Skill** (documented in `step-3/skills/`) |
---

## Running the Angular example app

All exercises assume you work in the `angular-example-app/` folder.

```bash
cd angular-example-app
npm install          # install dependencies
npm start            # run the dev server
npm run test         # unit tests (Vitest)
npm run test:coverage
npm run verify:all   # lint, stylelint, tests, build, e2e, lighthouse
```

> Tip: Keep the dev server running while you iterate on prompts so Copilot/TestBed errors can be verified immediately.

---

## Copilot guardrails summary

The authoritative guardrails live in **`angular-example-app/.github/copilot-instructions.md`**. They enforce:

- Correct Angular 21 testing imports (`provideZonelessChangeDetection`, `TestBed`, etc.).
- Mandatory `await TestBed.compileComponents()` before `createComponent`.
- Explicit Vitest globals (`vi`, `describe`, `it`, `beforeEach`, `expect`).
- Zoneless change detection requirements (`provideZonelessChangeDetection`, manual `whenStable`/`detectChanges`).
- `vi.spyOn`/`vi.fn` usage instead of Jasmine APIs.
- Preferred command: `npm run test:coverage`.

Reference them directly from Copilot (Command Palette → “Open Copilot Instructions”) or by copying the file contents into Copilot Chat before a session.

---

## Suggested practice backlog

1. **Step 0 to Step 1 delta:** Write tests for `src/app/app.component.ts` manually, then repeat with guardrails. Document differences.  
2. **Forms & validators:** Use the prompt file to generate tests for `src/app/shared/validators/password.validator.ts`.  
3. **HTTP services:** Build a skill for mocking services via `TestBed.inject` and apply it to `src/app/core/services/language.service.ts`.  
4. **Routing/guards:** Create an agent workflow that inspects `src/app/features/authentication/guards/authentication.guard.ts` and outputs both a plan and spec.  
5. **Regression safety:** Update prompts/skills when you find Copilot regressions (e.g., forgetting `compileComponents`). Track fixes in the prompt file.

---

## Next steps for facilitators

1. Flesh out `step-2/prompts` with your preferred templates.  
2. Add real skill definitions to `step-3/skills/` (Markdown outlines or structured JSON).  
3. Define at least one end-to-end workflow under `step-4/agents/`.  
4. During workshops, capture lessons learned directly into these folders so future cohorts inherit better guidance.

Happy training—use these steps to show how Copilot evolves from “autocomplete sidekick” into a controllable part of your Angular testing workflow.
